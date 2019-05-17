var Book = require("./models/book-model");

// return all records
Book.find({}, (err, items) => {
  if (err) return next(err);
  console.log(items.length);
  // other code here
});

// return all records that match a condition
Book.find({'author':'mark twain'}, (err, items) => {
 if (err) return next(err);
 console.log("mark twain: " +items.length);
 // other code here
});

// return all records that match a condition
Book.find({'author':'Mark Twain'}, (err, items) => {
 if (err) return next(err);
 console.log("Mark Twain: " +items.length);
 // other code here
});

// return a single record
Book.findOne({'title':'Dune'}, (err, item) => {
  if (err) return next(err);
  console.log(item);
  // other code here
});

// insert or update a single record
var newBook = {'title':'dune', 'author':'frank herbert', 'pubdate': 1963 }
Book.updateOne({'title':'dune'}, newBook, {upsert:true}, (err, result) => {
  if (err) return next(err);
  console.log(result);
  // other code here
});