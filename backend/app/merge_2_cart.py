from datetime import datetime
from models import Item, Cart, User, Banned_user, Regional_admin, db, add_as_row_in_corresponding_db
from math import ceil


def find_cart(item):
   items = get_eligible_items(item)
   if items == None: # If there is no items eligible for merging
      return None
   cart_items = knapsack_for_amazon(items, 75)
   if cart_items == None:
       return None
   regional_admin_id = get_regional_admin_id(item)
   cart = Cart(regional_admin_id)
   add_as_row_in_corresponding_db(cart)
   cart_items_id = [getattr(cart_item,'id') for cart_item in cart_items] # Isolating the banned user id
   update_items(cart_items_id, cart.id)


def get_eligible_items(item):
   curr_user = User.query.filter(User.id == item.user_id).first() # Getting the data of the user who added the new item
   banned_users = Banned_user.query.all() # Getting all the banned users
   banned_users_id = [getattr(b,'banned_user_id') for b in banned_users] # Isolating the banned user id
   eligible_users = User.query.filter(User.region == curr_user.region, ~User.id.in_(banned_users_id)).all() # Gtting all the other users who share the same region
   eligible_users_id = [getattr(u,'id') for u in eligible_users] # Isolating the user id
   items = []
   rows = Item.query.filter(Item.cart_id == None, Item.user_id.in_(eligible_users_id)).order_by(Item.id.asc()).all() # Getting the items who has no cart and it's user share the region with this item user
   for row in rows:
       items.append(row)
   return items


def knapsack_for_amazon(items, limit):
    table = [[0 for w in range(limit + 1)] for j in range(len(items) + 1)]
    for j in range(1, len(items) + 1):
        wt = ceil(items[j-1].price)
        val = ceil(items[j-1].price)
        for w in range(1, limit + 1):
            if wt > w:
                table[j][w] = table[j-1][w]
            else:
                table[j][w] = max(table[j-1][w],
                                  table[j-1][w-wt] + val)
    result = []
    w = limit
    sum = 0
    for j in range(len(items), 0, -1):
        was_added = table[j][w] != table[j-1][w]
        if was_added:
            wt = ceil(items[j-1].price)
            val = ceil(items[j-1].price)
            result.append(items[j-1])
            w -= wt
    for res in result:
        sum += res.price        
    if sum >= 49:        
        return result
    else:
        return None

def get_regional_admin_id(item):
   curr_user = User.query.filter(User.id == item.user_id).first() # Getting the data of the user who added the new item
   regional_admin = Regional_admin.query.filter(Regional_admin.region == curr_user.region).first()
   return regional_admin.id
   

def update_items(items_id, new_cart_id):
    items = Item.query.filter(Item.id.in_(items_id)) 
    for item in items:
        item.cart_id = new_cart_id
        item.status = 0
        item.status_change = datetime.utcnow()
        db.session.commit()
