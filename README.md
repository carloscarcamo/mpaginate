mpaginate
=========
[![Build Status](https://travis-ci.org/carloscarcamo/mpaginate.svg?branch=master)](https://travis-ci.org/carloscarcamo/mpaginate)
[![devDependency Status](https://david-dm.org/carloscarcamo/mpaginate/dev-status.svg)](https://david-dm.org/carloscarcamo/mpaginate#info=devDependencies)

This is a [Node.js](http://nodejs.org) module to paginate results with [mongoose](https://github.com/learnboost/mongoose) inspired by [mongoose-pages](https://github.com/hacksparrow/mongoose-pages).

## Purpose ##

This is an open source module that provides an easy way to paginate results. The main purpose is extend mongoose providing it with functionality to paginate results.

## Installation ##
You need to install first [node.js](http://nodejs.org/) and [mongoose](https://github.com/learnboost/mongoose). Then:

```sh
$ npm install mpaginate
```

## Usage Example ##
To get the first 10 documents in collection

```javascript
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    mpaginate = require('mpaginate');

var peopleSchema = new schema({
    name: String,
    email: String,
    age: Number,
    phone: Number
});

mpaginate.paginate(peopleSchema);//extending model with pagination function

var people = mongoose.model('people', peopleSchema);

mongoose.connect('mongodb://localhost/test', function(err){
    if(err) throw err;
    
    people.findAndPaginate({age:{'$gt':18}},{'_id':0, name:1}, 10, 1, function(err, data){
        if(err) console.error(err);
        console.dir(data);
        mongoose.connection.close();
    });
});
```

## Documentation ##

In order to use mpaginate you need to include it in your project, remember that it depends of mongoose so make sure that mongoose is included.

```javascript
var mpaginate = require('mpaginate');
```

After include mpaginate you need to extend a mongoose schema

```javascript
mpaginate.paginate(yourSchema);
```

Now you can use findAndPaginate method with your model.

```javascript
yourModel.findAndPaginate(query, project, limit, pageNum, callback);
```

#### You need to pass five parameters to findAndPaginate method:
* query     ->  type Object: Your mongodb query ({a:1, b:{'$gt':1}}).
* project   ->  type Object: Your projection ({_id:0, a:1}).
* limit     ->  type Number: An integer value for the max number per pages, default 0.
* pageNum   ->  type Number: Number of page, default 1.
* callback  ->  type Function: A callback function. The callback receives two parameters, err and data.

#### The callback function receives two parameters as follows:
* err       -> instance of Error.
* data      -> a JSON object {}.
 
#### The data object returned is as follows:
* data.docs: The documents.
* data.count: Total number of documents in collection.
* data.prevPage: The number of the previous page.
* data.nextPage: The Number of the next page.


## License ##

Copyright (c) 2014 Carlos Eduardo Cárcamo

Licensed under GPLv2.
