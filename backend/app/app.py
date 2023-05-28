from flask import Flask, request
from config import app
from models import User, Regional_admin, Banned_user, Cart, Item, add_as_row_in_corresponding_db,db
from merge_2_cart import find_cart
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy import and_
from datetime import datetime

import requests
from bs4 import BeautifulSoup
# User api

@app.route("/user", methods=["POST"])
def create_user_handler():
    # create user from json
    email = request.json["email"]
    region = request.json["region"]
    first_name = request.json["first_name"]
    last_name = request.json["last_name"]
    telephone = request.json["telephone"]
    user = User(email, region, first_name, last_name, telephone)

    add_as_row_in_corresponding_db(user)

    # Return the event as json (helps with UI)
    return user.to_json()

@app.route("/login/<email>", methods=["GET"])
def get_user_details_from_email(email):
    """get user details by email."""
    user_details = User.query.filter_by(email=email).one()
    return user_details.to_json()



# regional admin api

@app.route("/regional_admin", methods=["POST"])
def create_regional_admin():
    # create create_regional_admin from json
    email = request.json["email"]
    region = request.json["region"]
    first_name = request.json["first_name"]
    last_name = request.json["last_name"]
    regional_admin = Regional_admin(email, region, first_name, last_name)

    add_as_row_in_corresponding_db(regional_admin)

    # Return the event as json (helps with UI)
    return regional_admin.to_json()

@app.route("/regional_admin/<email>", methods=["GET"])
def check_regional_admin(email):
    """check if email is belong to regional admin."""
    try:
        regional_admin = Regional_admin.query.filter_by(email=email).one()
        regional_admin_json = regional_admin.to_json()
    except NoResultFound:
        regional_admin_json = {}
    return regional_admin_json
    


# banned user api

@app.route("/banned_user", methods=["POST"])
def ban_user():
    # create banned_user from json
    email = request.json["email"]
    ban_reason = request.json["ban_reason"]

    user = User.query.filter_by(email=email).one()
    banned_user_id = user.id

    banned_user = Banned_user(banned_user_id, ban_reason)

    add_as_row_in_corresponding_db(banned_user)

    # Return the event as json (helps with UI)
    return banned_user.to_json()

@app.route("/banned_user", methods=["GET"])
def ban_user_list():
    banned_user = Banned_user.query.filter(Banned_user.ban_date==None).all()
    banned_user_id = [getattr(b,'banned_user_id') for b in banned_user] # Isolating the banned users id
    banned_user_reason = [getattr(r,'ban_reason') for r in banned_user] # Isolating the banned user ban reason
    banned_user_user = User.query.filter(User.id.in_(banned_user_id)).all()
    banned_user_email = [getattr(e,'email') for e in banned_user_user] # Isolating the banned users email
    ban_request = []
    for i in range(len(banned_user_reason)): # appending the ban requests 
        ban_request.append(ban_request_to_json(banned_user_email[i], banned_user_reason[i]))
    return ban_request

def ban_request_to_json(banned_user_email, banned_user_reason): # create a jason instance of a ban request 
    return {
        "email": banned_user_email,
        "ban_reason": banned_user_reason
        }    

@app.route("/banned_user_ga", methods=["POST"])
def update_ga_decision():
    email = request.json["email"]
    decision = request.json["decision"]
    user = User.query.filter(User.email == email).first() # Getting the ban user id
    user_id = user.id
    if decision == 'True': # If hte general admin decided to ban
        ban_user=Banned_user.query.filter(Banned_user.banned_user_id == user_id).first() # Getting the banned_user row
        ban_user.ban_date = datetime.utcnow() # Update the ban time
    else: # The general admin decided no to ban
        ban_user=Banned_user.query.filter(Banned_user.banned_user_id == user_id).delete() # Delete the user's row from banned user table
    db.session.commit() # Commiting changes
    return ban_user.to_json()

@app.route("/unban_user", methods=["POST"])
def unban_user():
    email = request.json["email"]
    user = User.query.filter(User.email == email).first() # Getting the ban user id
    user_id = user.id
    ban_user=Banned_user.query.filter(Banned_user.banned_user_id == user_id).delete() # Delete the user's row from banned user table
    db.session.commit() # Commiting changes
    return ban_user.to_json()

# cart api

@app.route("/cart", methods=["POST"])
def add_cart():
    # create cart from json
    regional_Admin = request.json["regional_Admin"]
    cart = Cart(regional_Admin)

    add_as_row_in_corresponding_db(cart)

    # Return the event as json (helps with UI)
    return cart.to_json()

@app.route("/cart/<email>", methods=["GET"])
def get_all_regional_admin_carts(email):
    """get all carts of Regional admin by email."""
    regional_admin = Regional_admin.query.filter_by(email=email).one()
    carts = Cart.query.filter_by(regional_Admin = regional_admin.id).all()
    carts_list = []
    for cart in carts:
        carts_list.append(cart.to_json())
    return {"Carts": carts_list}


@app.route("/carts/<front_cart_id>", methods=["GET"])
def get_items_of_cart(front_cart_id):
    """get all items of cart by cart id."""
    items = Item.query.filter_by(cart_id = front_cart_id).all()
    items_list = []
    for item in items:
        email = User.query.filter_by(id = item.user_id).with_entities(User.email).one()
        item_json = item.to_json()  # Convert item object to JSON representation
        email_value = email[0]  # Extract the email value from the email object
        item_json["email"] = email_value  # Add email to the item JSON
        items_list.append(item_json)
    return items_list


# Need to create a 'PATCH' request too for cart's status updates.


# item api

def get_item_price_from_url(url):
    HEADERS = ({'User-Agent':'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.4044.113 Safari/5370.36 Brave/5035',
                                    'Accept-Language': 'en-US, en;q=0.5'})
    html = requests.get(url,headers=HEADERS)
    soup = BeautifulSoup(html.content, 'lxml')
    try:
        price_integer_request = soup.find("span", attrs={'class': 'a-price-whole'}) 
        price_integer = ''.join(filter(str.isdigit, str(price_integer_request)))
        price_decimal = soup.find("span", attrs={'class': 'a-price-fraction'}).string.strip().replace(',', '')
        totalPrice = float(price_decimal)/ 100.0 + float(price_integer)
    except AttributeError: 
        totalPrice = "-1" # if we have error price is -1
    return totalPrice

def get_item_name_from_url(url):
    path_parts = url.split('/')
    name = path_parts[3].replace('-', ' ')
    return name

def get_pict_from_url(url):
    HEADERS = ({'User-Agent':'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.4044.113 Safari/5370.36 Brave/5035',
                                    'Accept-Language': 'en-US, en;q=0.5'})
    html = requests.get(url,headers=HEADERS)
    soup = BeautifulSoup(html.content, 'lxml')
    try:
        price_integer_request = str(soup.find("div", attrs={'id': 'imgTagWrapperId'}))
        items = price_integer_request.split('"')
        index = next((i for i, cell in enumerate(items) if 'src=' in cell), -1)
        picture_url = items[index+1]
    except AttributeError: 
        picture_url = "-1" # if we have error price is -1
    return picture_url


@app.route("/item", methods=["POST"])
def add_item():
    # create item from json
    url = request.json["url"]
    email = request.json["email"]
    cart_id = None
    price = get_item_price_from_url(url)
    name = get_item_name_from_url(url)
    picture = get_pict_from_url(url)

    user = User.query.filter_by(email=email).one()
    user_id = user.id
    item = Item(user_id, cart_id,  price,  name,  url, picture)

    add_as_row_in_corresponding_db(item)
    find_cart(item)
    # Return the event as json (helps with UI)
    return item.to_json()


@app.route("/item/<email>", methods=["GET"])
def get_all_user_events(email):
    """get all items of user by user_id."""
    user = User.query.filter_by(email=email).one()
    items = Item.query.filter_by(user_id = user.id).all()
    items_list = []
    for item in items:
        items_list.append(item.to_json())
    return {"Items": items_list}

@app.route("/updateItems", methods=["POST"])
def update_Items():
    # create item from json
    email = request.json["email"]
    cart_id = request.json["cart_id"]
    user = User.query.filter_by(email=email).one()
    user_id = user.id
    items = Item.query.filter(and_(Item.cart_id == cart_id, Item.user_id == user_id)).all()
    items_json = []
    for item in items:
        item.status = 3
        item.status_change = datetime.utcnow()
        items_json.append(item.to_json())
    db.session.commit()
    # Return the event as json (helps with UI)
    return items_json



if __name__ == "__main__":
    app.run(debug=True)


