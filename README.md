# Twitter Application

> Twitter Application is a Node.js/Express.js based web application. As a part of curriculum for Knowledge Representation Technologies, task was to take exceptionally large data-set store it in MongoDB and do CRUD (create read update delete) operation on them through a client. I used EJS (embedded JavaScript) to render views, on the back-end Express.Js framework in vanilla form over the top of Node.Js. Frontend was designed using Twitter Bootstrap along with a server side implementation of JQuery Data-tables and jQuery.

## Installation Instructions

Below is the information regarding installation of the application

### Pre-requisites
- Mongo DB
- Node Js along with Node Package Manager
- Data-sets (tweets.csv, nycdeaths.csv)

#### Installing Mongo DB

```sh
$ npm install mongodb
```

##### Import data-sets and create users database
- Download tweets.csv and nycdeaths.csv
- In the terminal goto the directory where you downloaded the files

##### Import tweets.csv
Create collection tweets
```sh
$ mongoimport --headerline --db users --collection tweets --type csv --file tweets.csv
```
##### Import nycdeaths.csv
Create collection nyc
```sh
$ mongoimport --headerline --db users --collection nyc --type csv --file nycdeaths.csv
```
#### Installing Node Js
Depending on your operating system

```sh
https://nodejs.org/en/download/package-manager/
```

##### Installation on MAC via package manager

```sh
brew install node
```

##### Installation on Ubuntu via package manager

```sh
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs

```

#### Running server and web-app
Once you are done with installation of Node Js and Mongo Db along with importing of files
- Make a directory
- Download the source code, and put it inside the directory
- In the directory root, there is server.js.
- Run server.js by going to the root of directory in the terminal and then:
```sh
$ node server.js
```
- Then simply point your browser to 
```sh
http://localhost:3000
```
#### Author

Vipul Mehra https://www.linkedin.com/in/vipsm
