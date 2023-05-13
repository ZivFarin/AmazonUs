import psycopg2 as pc2
from datetime import datetime, timezone

# this script deletes all the tables from the amazonus DB and creates new ones with mock data
# currently the script works on localhost DB, but could be operating on our DB server by replacing current host: amazonus.cjtaog2z5fsh.eu-north-1.rds.amazonaws.com

conn = pc2.connect(user="postgres", password="12345678", database="amazonus", host="localhost", port= '5432') # connecting to the DB
cur = conn.cursor() 
# deleting the tables 
sql = '''DROP table IF EXISTS items'''
cur.execute(sql)
sql = '''DROP table IF EXISTS carts'''
cur.execute(sql)
sql = '''DROP table IF EXISTS banned_users'''
cur.execute(sql)
sql = '''DROP table IF EXISTS regional_admins'''
cur.execute(sql)
sql = '''DROP table IF EXISTS users'''
cur.execute(sql)
# creating the new tables
cur.execute("""
    CREATE TABLE IF NOT EXISTS users(
        User_id serial PRIMARY KEY,
        Email VARCHAR ( 255 ) UNIQUE NOT NULL,
        Region VARCHAR ( 20 ) NOT NULL,
        First_Name VARCHAR ( 25 ) NOT NULL,
        Last_Name VARCHAR ( 25 ) NOT NULL,
        Telephone VARCHAR ( 12 ) UNIQUE NOT NULL
)
""")
cur.execute("""
    CREATE TABLE IF NOT EXISTS regional_admins(
        Admin_id serial PRIMARY KEY,
        Region VARCHAR ( 20 ) NOT NULL,
        First_Name VARCHAR ( 25 ) NOT NULL,
        Last_Name VARCHAR ( 25 ) NOT NULL,
        Email VARCHAR ( 255 ) UNIQUE NOT NULL
)
""")
cur.execute("""
    CREATE TABLE IF NOT EXISTS banned_users(
        User_id INT NOT NULL REFERENCES users(User_id),
        Ban_Date VARCHAR ( 20 ) NOT NULL,
        Ban_Reason VARCHAR ( 255 ) NOT NULL,
        PRIMARY KEY (User_id)
)
""")
cur.execute("""
    CREATE TABLE IF NOT EXISTS carts(
        Cart_id serial PRIMARY KEY,
        Status INT NOT NULL,
        Status_Change VARCHAR ( 20 ) NOT NULL,
        Regional_Admin INT NOT NULL REFERENCES regional_admins(Admin_id)
)
""")
# cart "status: '-1:PendingClientPayment 0:ClientsPayed 1:Oredered';
cur.execute("""
    CREATE TABLE IF NOT EXISTS items(
        Item_id serial PRIMARY KEY,
        User_id INT NOT NULL REFERENCES users(User_id),
        Cart_id INT REFERENCES carts(Cart_id),
        Status INT NOT NULL,
        Status_Change VARCHAR ( 20 ) NOT NULL,
        Price FLOAT NOT NULL,
        Name VARCHAR ( 255 ) NOT NULL,
        URL VARCHAR NOT NULL,
        Picture_URL VARCHAR ( 500 ) NOT NULL
)
""")
# item status: -1:PendingMatch 0:Matched 1:PedingPayment 2:Payed

conn.commit()
# inserting the mock data
cur.execute("""
    INSERT INTO users(Email, Region, First_Name, Last_Name, Telephone)
    VALUES('elad@gmail.com','Hamerkaz' , 'Elad', 'Zaltsman', '050-000-0000'),
    ('omri@gmail.com','Hamerkaz' , 'Omri', 'Steinberg', '050-111-1111'),
    ('ziv@gmail.com','North' , 'Ziv', 'Farin', '050-222-2222'),
    ('ploni@gmail.com','North' , 'Ploni', 'Almoni', '050-333-3333')
""") # mock users
cur.execute("""
    INSERT INTO regional_admins(Region, First_Name, Last_Name, Email)
    VALUES('Hamerkaz', 'Dvir', 'Bar Martziano', 'dbm@walla.com'),
    ('North', 'Ziv', 'Farin', 'zf@walla.com'),
    ('South', 'Eitan', 'Bar Shimon', 'ebs@walla.com'),
    ('Jerusalem area', 'Omri', 'Steinberg', 'os@walla.com'),
    ('Eilat', 'Elad', 'Zaltsman', 'ez@walla.com')
""") # mock regional admins
dt = datetime.now()
now = dt.strftime("'%d/%m/%Y %H:%M'")
tmp = "INSERT INTO banned_users(User_id, Ban_Date, Ban_Reason) VALUES(4, {}, 1)".format(now)
cur.execute(tmp) # mock bannd user
tmp = "INSERT INTO carts(Status, Status_Change, Regional_Admin) VALUES(-1, {}, 1)".format(now)
cur.execute(tmp) # mock cart
url= "'https://www.amazon.com/replacement-cartridges-compatible-limescale-impurities/dp/B071FJ6FBW/?_encoding=UTF8&pd_rd_w=TUxbD&content-id=amzn1.sym.9d9f1395-c6e2-4125-ae32-1d917e102cb5&pf_rd_p=9d9f1395-c6e2-4125-ae32-1d917e102cb5&pf_rd_r=D0AB7X5PGZ3PTXT2CEYZ&pd_rd_wg=BtHWj&pd_rd_r=726956f2-1a14-4dcd-b275-e12e44fe5525&ref_=pd_gw_exports_top_sellers_by_gl_rec'"
name = "'BRITA MAXTRA water filter cartridges, compatible with all BRITA jugs -reduce chlorine, limescale and impurities for great taste - 6 pack '"
tmp = """INSERT INTO items(User_id, Cart_id, Status, Status_Change, Price, Name, URL, Picture_URL) VALUES(1, 1, 1, {}, 39.47, {}, {}, 'no' )""".format(now, name, url)
cur.execute(tmp)
url= "'https://www.amazon.com/CRAFTSMAN-CMHT68129-SpeedDrive-Ratcheting-Screwdriver/dp/B08WVBQ147?pd_rd_w=KRYOj&content-id=amzn1.sym.724fac2e-0491-4f7a-a10d-2221f9a8bc9a&pf_rd_p=724fac2e-0491-4f7a-a10d-2221f9a8bc9a&pf_rd_r=7S88HQ8V6Q1CHSQ484PC&pd_rd_wg=ZmCHW&pd_rd_r=30e77617-8568-418a-80bd-c7c4e7a3720c&pd_rd_i=B08WVBQ147&psc=1&ref_=pd_bap_d_grid_rp_0_1_t'"
name = "'CRAFTSMAN Ratcheting Screwdriver, SpeedDrive, 2” Double Ended Bits Included, Handle Holds Up To 6 Bits'"
tmp = """INSERT INTO items(User_id, Cart_id, Status, Status_Change, Price, Name, URL, Picture_URL) VALUES(2, 1, 1, {}, 15.98, {}, {}, 'no' )""".format(now, name, url)
cur.execute(tmp)
url= "'https://www.amazon.com/Abicial-Japanese-Weightlifting-Penholder-Stationery/dp/B07MNW2ZT6/?_encoding=UTF8&pd_rd_w=D1ziB&content-id=amzn1.sym.b363cbdf-82ec-4abc-acc0-d6ad6035d0af&pf_rd_p=b363cbdf-82ec-4abc-acc0-d6ad6035d0af&pf_rd_r=D0AB7X5PGZ3PTXT2CEYZ&pd_rd_wg=BtHWj&pd_rd_r=726956f2-1a14-4dcd-b275-e12e44fe5525&ref_=pd_gw_bmx_gp_8e708y4n'"
name = "'MosBug New Japanese Creative Cute Crab Pen Holder Weightlifting Crabs Penholder Bracket Storage Rack Gift Stationery'"
tmp = """INSERT INTO items(User_id, Cart_id, Status, Status_Change, Price, Name, URL, Picture_URL) VALUES(3, NULL, -1, {}, 9.59, {}, {}, 'no' )""".format(now, name, url)
cur.execute(tmp)
# mock items
conn.commit()
conn.close()
