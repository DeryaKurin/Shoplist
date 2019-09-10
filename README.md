# Shoplist

Shoplist is an app where its users can create shopping lists and make modifications to them. Lists can be seen and altered by other users simultaneously.
This will let a group of people make shopping for the same list of items at different locations or times. With this app, we aimed to shorten shopping time and ease the experience for those who want to do shopping with their family members, friends or colleagues.


**Features / Highlights**
----

* Creating an account as a user
* Creating Shopping Lists
* Adding / Editing / Deleting Items in a lists
* Marking a list item as purchased or unpurchased


**Setup**
---
```
$ git clone https://github.com/DeryaKurin/Shoplist.git
$ cd shoplist
$ npm i
$ npm start
```


**Build**
---
`$ npm run build`

**Test the Build**
---
```
$ npm test
```
**Deploying**
---
The app is hosted on Heroku: https://deryakurin-shoplist.herokuapp.com/

**Future Improvements**
----
* Lists will have ownership relation with users, so that each user will have access to only their lists.

* Owner of a list can add other users to a list so that users will have access to the list on which they are added.
* Shoplist was built in Express.js a framework of Javascript library Node.js due to its scalability. Implementation of the additional features will be fast and efficient as we used modular code.
* We use PostgreSQL as the Relational Database Management System for the backend which gave us an ease and flexibility while creating our models and the relations between them i.e. lists and the list items.
It will be also beneficial when we implement user policies to define the access rights.
* Our Database is not in realtime, we could have achieved it by using React.js as the Front-End part of the project and the same PostgreSQL database for the back-end.

* If we continue with the same project to have the functionality of a realtime database:
We add a set of add/edit/delete triggers that create a notification event whenever anything changes in our db tables, using the added/edited/deleted ID as the payload.
A background process checks for notifications periodically and loads the changed record from the database to do the web service call.
Finally, we would be checking the database for notification events to trigger the web service call and it would behave like a realtime app.
