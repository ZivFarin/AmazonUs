from app import Item, Cart, User
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

def find_cart(item):
   items = get_eligible_items(item)
   







def get_eligible_items(item):
   curr_user = User.query.filter(User.id == item.user_id).all() # getting the data of the user who added the new item
   eligible_users = User.query.filter(User.region == curr_user.region).all() # getting all the other users who share the same region
   eligible_users_id = [getattr(u,'id') for u in eligible_users] # isolating the user id
   return Item.query.filter(Item.cart_id == None, Item.id != item.id, Item.user_id.in_(eligible_users_id)).all() # getting the items who has no cart, is not the new item and it's user share the region with this item user





