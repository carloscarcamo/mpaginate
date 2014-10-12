# mpaginate

This is a [Node.js](http://nodejs.org) module to paginate results with [mongoose](https://github.com/learnboost/mongoose) inspired by [mongoose-pages](https://github.com/hacksparrow/mongoose-pages).

#### Purpose

This is an open source module that provides an easy way to paginate results. The main purpose is extend mongoose providing it with functionality to paginate results.


## Usage

```npm install mpaginate```

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

mpaginate.paginate(peopleSchema);
var people = mongoose.model('people', peopleSchema);

mongoose.connect('mongodb://localhost/test', function(err){
    if(err) throw err;

    people.findAndPaginate({age:{'$gt':18}},{'_id':0, name:1, age:1, email:1}, 10, 1, function(err, data){
        if(err) console.error(err);
        console.dir(data);
        mongoose.connection.close();
    });
});
```

## License

Copyright (c) 2014 Carlos Eduardo Cárcamo

Licensed under GPLv2.
