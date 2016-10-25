const express     = require('express');
const bodyParser  = require('body-parser'); 
const app         = express();
const MongoClient = require('mongodb').MongoClient;
var ObjectId      = require('mongodb').ObjectID;
var db, portOfMongo = '27017', userToSearchFor = 257666927, collection;
//Connection string for mongoDb, mongo db instance is running at port 27017
var url = 'mongodb://localhost:'+portOfMongo+'/users';
//Passing the connection string to the mongoclient object
MongoClient.connect(url, function(err, database) {
  console.log("Successfully connected to the database\n");
  db = database;
});
//Server running on port 3000
app.listen(3000, function() {
	console.log("Server running on port 3000");
});
//to catch request parameters (Get/Post/Put/Delete)
app.use(bodyParser.urlencoded({extended: true}));
//to enable the use of directory public
app.use(express.static('public'));
//using EJS (embedded javascript to display views
app.set('view engine', 'ejs')
//routing starts
app.get('/', function(req, res){
	res.render('main.ejs');
});
app.get('/twitter', function(req, res){
	res.render('index.ejs');
});
app.get('/ny', function(req, res){
	res.render('nyc.ejs');
});
app.get('/tweets/', function(req, res){
	var countWithoutFilters;
	var countTwitter;
	var page        =  parseInt(req.query.start);
	var limit       =  parseInt(req.query.length);
	var skip        =  page; 
	var searchQuery = {};
	searchQuery = req.query.search.value;
	searchQuery = (searchQuery == '' || searchQuery == undefined) ? {}:searchQuery;
	var searchId = parseInt(searchQuery);
	countNumberOfRowsInTweets(function(countWithoutFilters){
	    countNumberOfRowsInTweetsAfterFilters(searchQuery, function(countTwitter){
	        queryTweetsCollection(searchQuery, limit, skip, function(data){
	            res.send({
	                draw: req.query.draw,
	                recordsTotal: countWithoutFilters,
	                recordsFiltered: countTwitter,
	                data: data, 
	                page: parseInt(page)
	            });
	        });
	    });
	});	    
});
app.get('/twitter/view/:id', function(req, res){
	findTweetsById(parseInt(req.params.id), function(data){
			result = {tweet: data}
			res.render('data.ejs', result);
	});
});
app.get('/ny/view/:id', function(req, res){
	console.log(req.params.id);
	findNycById(String(req.params.id), function(data){
		console.log(data);
			result = {nycData: data}
			res.render('datanyc.ejs', result);
	});
});
app.post('/ny/addcomment', function(req,res){
	var id      = String(req.body.id);
	var comment = String(req.body.comment);
	console.log(comment);
	db.collection('nyc').update({"_id": ObjectId(id) }, {$set: {"comment": comment}});
	res.send("Success");
});
app.post('/twitter/addcomment', function(req,res){
	var id      = parseInt(req.body.id);
	var comment = String(req.body.comment);
	console.log(comment);
	db.collection('tweets').update({"id": id}, {$set: {"comment": comment}});
	res.send("Success");
});
app.get('/nyc/', function(req, res){
	var countWithoutFilters;
	var countNyc;
	var page        =  parseInt(req.query.start);
	var limit       =  parseInt(req.query.length);
	var skip        =  page; 
	var searchQuery = {};
	searchQuery = req.query.search.value;
	searchQuery = (searchQuery == '' || searchQuery == undefined) ? {}:searchQuery;
	var searchId = parseInt(searchQuery);
	countNumberOfRowsInNyc(function(countWithoutFilters){
	    countNumberOfRowsInNycAfterFilters(searchQuery, function(countNyc){
	        queryNycCollection(searchQuery, limit, skip, function(data){
	            res.send({
	                draw: req.query.draw,
	                recordsTotal: countWithoutFilters,
	                recordsFiltered: countNyc,
	                data: data, 
	                page: parseInt(page)
	            });
	        });
	    });
	});	    
});
function findTweetsById(searchId, callback){
	var searchId = parseInt(searchId);
	db.collection('tweets').find({id: searchId}).toArray(function(err, result){
		if(err)
			return console.log(err);
		callback(result);
	});
}
function countNumberOfRowsInTweets(callback)
{
db.collection('tweets').find().toArray(function(err,  result){
	if(err)
		return console.log(err);
	callback(result.length);
});	
}
function countNumberOfRowsInTweetsAfterFilters(searchQuery, callback)
{
var searchId = parseInt(searchQuery);
db.collection('tweets').find({ $or: [{text: new RegExp(searchQuery, 'i')}, {id: searchId}]}).toArray(function(err,  result){
	if(err)
		return console.log(err);
	callback(result.length);
});	
}
function queryTweetsCollection(searchQuery, limit, skip, callback)
{
limit = parseInt(limit);
skip  = parseInt(skip);
var searchId = parseInt(searchQuery);
db.collection('tweets').find({ $or: [{text: new RegExp(searchQuery, 'i')}, {id: searchId}]}).skip(skip).limit(limit).toArray(function(err, result){
	if(err)
		return console.log(err);
	callback(result);
});	
}
function findNycById(searchId, callback){
	var searchId = String(searchId);
	db.collection('nyc').find({_id: ObjectId(searchId)}).toArray(function(err, result){
		if(err)
			return console.log(err);
		callback(result);
	});
}
function countNumberOfRowsInNyc(callback)
{
	db.collection('nyc').find().toArray(function(err,  result){
		if(err)
			return console.log(err);
		callback(result.length);
	});	
}
function countNumberOfRowsInNycAfterFilters(searchQuery, callback)
{
	console.log("nyc filter called...");
	console.log(searchQuery);
	db.collection('nyc').find({$or:[{Year: searchQuery}, {Ethnicity: new RegExp(searchQuery, 'i')},{"Cause of Death": new RegExp(searchQuery, 'i')}]}).toArray(function(err,  result){
		if(err)
			return console.log(err);
		callback(result.length);
	});	
}
function queryNycCollection(searchQuery, limit, skip, callback)
{
	limit = parseInt(limit);
	skip  = parseInt(skip);
	db.collection('nyc').find({$or:[{Year:  searchQuery}, {Ethnicity: new RegExp(searchQuery, 'i')}, {"Cause of Death": new RegExp(searchQuery, 'i')}]}).skip(skip).limit(limit).toArray(function(err, result){
		if(err)
			return console.log(err);
		callback(result);
	});	
}