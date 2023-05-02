# AMAZONUS
![Amazonus banner](resources/Amazonus.jpg "AmazonUs")
>**Capturing amazon's free shipping with the power of community.**

This is a [link to the project's word file](https://docs.google.com/document/d/1jmD3A_LeHQJUKwWg_DfLRRwrRqQm51C9XPU734alZHk/edit).

---
This project is based off of this video series (not a must watch. You can basically just follow the prerequisites below instead):
1. [Backend](https://www.youtube.com/watch?v=RcQwcyyCOmM)
2. [Frontend](https://www.youtube.com/watch?v=EAcD5ueqvHQ)



# Prerequisites

## Get a general sense of how the fullstack is built:
These are very short and actually use amazon (and it's API) as their main example, so watching them is quite a good idea:
+ [What is backend](https://www.youtube.com/watch?v=WG5ikvJ2TKA)
+ [What is frontend](https://www.youtube.com/watch?v=XBu54nfzxAQ)
+ [Super concise SQL explanation](https://www.youtube.com/watch?v=zsjvFFKOm3c), but you better also watch the [more in-depth video](https://www.youtube.com/watch?v=Cz3WcZLRaWc)<br/> which refers to MySQL - but it's good for SQLs in general.

## Required Installations
+ Download [python](https://www.python.org/downloads/)
  + Python packages
    + `pip install pipenv`
+ Download [PostgreSQL](https://www.postgresql.org/download/) ([this](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) might save you some searching...).
  + **Leave the 'PG-admin' option CHECKED!!!!!** (just leave all of them checked...)
  + In the second 'check the wanted options' I've checked **every thing except the already installed option** in it's latest version - in 64 bits.  Skip this at your own peril.
  + Make all DB related passwords '12345678', otherwise - go with the defaults.
+ Download [Postman](https://www.postman.com/downloads/) (which is used to "automate" api calls to the backend without needing a frontend or even a browser)

# preparing the project
+ Clone this project from this GitHub repo.
+ <u>Running the backend</u>
  + Preparing the backend server
    + in the terminal - `cd` into "backend" folder
    + Run `pipenv install` which will download and install all of this project's dependencies into an environment.
  + Running the backend server
    + Inside the backend folder - run `pipenv shell flask run`.<br/>
      It's better to keep this terminal open and open another one for the frontend using VSCode's 'split terminal feature.
    + Use a 'GET' request in postman on 'http://localhost:5000' just to see you get a valid responses.<br/>
      If you did - it works.<br/>
  + Preparing the DB:
    + Follow the instructions in the [backend video](https://www.youtube.com/watch?v=RcQwcyyCOmM) from about 09:40 and on regarding how to set up a DB on your computer.<br/>
    Note that your password should be '12345678' and the DB name should be 'amazonus'.
    Just keep on using these throughout the setup process.<br/>
    I recommend doing the sql server set up and postman actions with him until everything is working.
+ <u>Running the Frontend</u>
  + If you already have react installed on your computer - just navigate into the frontend folder and run `npm start` (you should do this after the server is running).