# Twitter Application

> Twitter Application is a nodejs/express js based web application. It does some operations on the data which 
comes from MongoDb.To render view/html it uses EJS (embedded javascript). And on the back-end
it uses Express.Js framework in vanilla form over the top of Node.Js. Views are primarily designed using Twitter Bootstrap
and also uses server side implementation of Jquery Data-tables along with HTML and Jquery library.

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
