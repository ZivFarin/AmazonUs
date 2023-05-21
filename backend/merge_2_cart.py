from app import Item, Cart, User, Banned_user
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

def find_cart(item):
   items = get_eligible_items(item)
   if items == None: # If there is no items eligible for merging
      return
   cart_items, cart_sum = knapsack_for_amazon(items, 75)







def get_eligible_items(item):
   curr_user = User.query.filter(User.id == item.user_id).all() # Getting the data of the user who added the new item
   banned_users = Banned_user.query.all() # Getting all the banned users
   banned_users_id = [getattr(b,'id') for b in banned_users] # Isolating the banned user id
   eligible_users = User.query.filter(User.region == curr_user.region, ~User.id.in_(banned_users_id)).all() # Gtting all the other users who share the same region
   eligible_users_id = [getattr(u,'id') for u in eligible_users] # Isolating the user id
   return Item.query.filter(Item.cart_id == None, Item.user_id.in_(eligible_users_id)).order_by(Item.id.asc()).all() # Getting the items who has no cart and it's user share the region with this item user

def knapsack_for_amazon(items, limit):
    table = [[0 for w in range(limit + 1)] for j in range(len(items) + 1)]
    for j in range(1, len(items) + 1):
        wt, val = items[j-1].price
        for w in range(1, limit + 1):
            if wt > w:
                table[j][w] = table[j-1][w]
            else:
                table[j][w] = max(table[j-1][w],
                                  table[j-1][w-wt] + val)
    result = []
    sum = table[j][w]
    w = limit
    for j in range(len(items), 0, -1):
        was_added = table[j][w] != table[j-1][w]
        if was_added:
            wt, val = items[j-1].price
            result.append(items[j-1])
            w -= wt
    if sum >= 49:        
        return (result, sum)
    else:
        return (None, None)



