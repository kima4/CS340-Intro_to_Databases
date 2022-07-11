module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Find all users */
    function getUsers(res, mysql, context, complete){
        mysql.pool.query("SELECT username, user_email, user_description FROM Users", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users = results;
            complete();
        })
    }

    /* Find usernames that start with a given string in the req */
    function getUsersWithNameLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
         var query = "SELECT username, user_email, user_description FROM Users WHERE username LIKE " + mysql.pool.escape(req.params.s + '%');
        console.log(query)
  
        mysql.pool.query(query, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.users = results;
              complete();
            });
    }

    /* Retrieve the information for a single user when updating it*/
    function getUser(res, mysql, context, id, complete){
        var sql = "SELECT username, user_email, user_description FROM Users WHERE username = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user = results[0];
            complete();
        });
    }

    /* Display all users */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteuser.js", "searchusers.js"];
        var mysql = req.app.get('mysql');
        getUsers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('users', context);
            }
        }
    });

    /* Display all usernames that start with a given string */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteuser.js", "searchusers.js"];
        var mysql = req.app.get('mysql');
        getUsersWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('users', context);
            }
        }
    });

    /* Display one user for the specific purpose of updating it */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteuser.js", "updateuser.js"];
        var mysql = req.app.get('mysql');
        getUser(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-user', context);
            }
        }
    });

    /* Adds a user, redirects to the "Users" page after adding */
    router.post('/', function(req, res){
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Users (username, user_email, user_description) VALUES (?,?,?)";
        var inserts = [req.body.username, req.body.user_email, req.body.user_description];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/users');
            }
        });
    });

    /* Update a user with the received username in the URI */
    router.put('/:username', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.username)
        var sql = "UPDATE Users SET user_email = ?, user_description = ? WHERE username = ?";
        var inserts = [req.body.user_email, req.body.user_description, req.params.username];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Delete a user */

    router.delete('/:username', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Users WHERE username = ?";
        var inserts = [req.params.username];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();