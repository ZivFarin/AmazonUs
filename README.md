# AMAZONUS
![Amazonus banner](resources/Amazonus.jpg "AmazonUs")
**Capturing amazon's free shipping with the power of community.**

This is [the project's word file](https://docs.google.com/document/d/1jmD3A_LeHQJUKwWg_DfLRRwrRqQm51C9XPU734alZHk/edit), in which - are all sorts of things that should actually be here, such as:

---
This is based of of these video series (not a much watch, just follow the prerequisite):
1. [Backend](https://www.youtube.com/watch?v=RcQwcyyCOmM)
2. [Frontend](https://www.youtube.com/watch?v=EAcD5ueqvHQ)



# Prerequisites

## Get a general sense of what's going on:
These are very short and actually use amazon as their main example, so watching them is quite a good idea:
+ [What is backend](https://www.youtube.com/watch?v=WG5ikvJ2TKA)
+ [What is frontend](https://www.youtube.com/watch?v=XBu54nfzxAQ)
+ [Super concise SQL explanation](https://www.youtube.com/watch?v=zsjvFFKOm3c), but you better also watch the [more in-depth video](https://www.youtube.com/watch?v=Cz3WcZLRaWc)<br/> which refers to MySQL - but it's good for SQLs in general.

## Required Installations
+ Download [python](https://www.python.org/downloads/)
  + Python packages
    + `pip install pipenv`
+ Download [PostgreSQL](https://www.postgresql.org/download/)
  + ([this](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) might save you some time...).
  + **Leave the 'PG-admin' option CHECKED!!!!!** (just leave all of them checked...)
  + In the second 'check the wanted options' I've checked **every thing** in it's latest version - in 64 bits.  Skip this at your own peril.
  + Make all DB related passwords '12345678'.
+ Download [Postman](https://www.postman.com/downloads/) (which will automate api calls from the backend without needing a frontend or even a browser)

# preparing the project
+ Clone from repo
+ <u>Running the backend</u>
  + Running the backend server
    + in the terminal - `cd` into "backend" folder
    + Run `pipenv install`, then `pipenv shell`.
    + Keep this shell alive as you will run your backend in it from here on.
      You can use VSCode's 'split terminal feature' to run the back and front end simultaneously.
    + Run `flask run` to run the backend.
    + Use postman on 'http://localhost:5000' to see you get a response.  If you did - it works.
  + Preparing the DB:
    + Follow the instructions in the [backend video](https://www.youtube.com/watch?v=RcQwcyyCOmM) at about 09:40 on how to set up a DB on your computer.<br/>Note that your password should be '12345678' and the DB name should be 'amazonus'
+ <u>Running the Frontend</u>