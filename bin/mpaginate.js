module.exports = function(query, project, limit, pageNum, callback){
    var model = this,
        prevPage = 0,
        nextPage = 0;

    if ('object' != typeof query) {
        query = {};
    }
    if ('object' != typeof project) {
        project = {};
    }
    if(parseInt(limit)==NaN){
        limit = 0;
    }
    if(parseInt(pageNum)==NaN){
        pageNum = 1;
    }
    if(pageNum<=0){
        pageNum = 1;
    }
    if('function' != typeof callback){
        throw Error('Invalid type of parameter, callback needs to be a function.');
    }

    if(pageNum==1){
        prevPage = undefined;
        nextPage = 2;
    }else if(pageNum>1){
        prevPage = pageNum - 1;
        nextPage = pageNum + 1;
    }

    return model
                .find(query, project)
                .limit(limit)
                .skip(limit*pageNum)
                .exec(function(err, data){
                    if(err) callback(err);
                    model.count(query, function(err, count){
                        if(err) callback(err);
                        var result = {
                            docs:data,
                            count:count,
                            prevPage:prevPage,
                            nextPage:nextPage,
                        };
                        callback(null, result);
                    });
                });
};
