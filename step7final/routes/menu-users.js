module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Find all menu-user relationships */
    function getMenuUsers(res, mysql, context, complete){
        mysql.pool.query("SELECT MenuUsers.menu_id, menu_user_id, menu_name, MenuUsers.username, menu_user_rating, menu_user_comment FROM MenuUsers INNER JOIN Menus ON MenuUsers.menu_id = Menus.menu_id INNER JOIN Users ON MenuUsers.username = Users.username", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.menuusers = results;
            complete();
        }); 
    }

    /* Retrieve all menu names to fill the "Menu Name" dropdown menu */
    function getMenus(res, mysql, context, complete){
        mysql.pool.query("SELECT menu_id, menu_name FROM Menus", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.menus = results;
            complete();
        }); 
    }

    /* Retrieve all usernames to fill the "Userame" dropdown menu */
    function getUsers(res, mysql, context, complete){
        mysql.pool.query("SELECT username FROM Users", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users = results;
            complete();
        });
    }

    /* Retrieve the information for a single menu-user relationship when updating it*/
    function getMenuUser(res, mysql, context, id, complete){
        var sql = "SELECT MenuUsers.menu_id, menu_user_id, menu_name, MenuUsers.username, menu_user_rating, menu_user_comment FROM MenuUsers INNER JOIN Menus ON MenuUsers.menu_id = Menus.menu_id INNER JOIN Users ON MenuUsers.username = Users.username WHERE menu_user_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.menu_user = results[0];
            complete();
        });
    }

    /* Display all menu-user relationships */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete-menu-user.js", "update-menu-user.js"];
        var mysql = req.app.get('mysql');
        getMenuUsers(res, mysql, context, complete);
        getMenus(res, mysql, context, complete);
        getUsers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('menu-users', context);
            }
        }
    });

    /* Display one menu-user relationship for the specific purpose of updating it */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete-menu-user.js", "update-menu-user.js"];
        var mysql = req.app.get('mysql');
        getMenuUser(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-menu-user', context);
            }
        }
    });

    /* Adds a menu-user relationship, redirects to the "Menus to Users Junction" page after adding */
    router.post('/', function(req, res){
        console.log(req.body);
        var mysql = req.app.get('mysql');
        
        var sql = "INSERT INTO MenuUsers (menu_id, username, menu_user_rating, menu_user_comment) VALUES (?,?,?,?)";
        var inserts = [req.body.menu_id, req.body.username, req.body.menu_user_rating, req.body.menu_user_comment];
        
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/menu-users');
            }
        });
    });
    
    /* Update a menu-user relationship with the received ID in the URI */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE MenuUsers SET menu_user_rating = ?, menu_user_comment = ? WHERE menu_user_id = ?";
        var inserts = [req.body.menu_user_rating, req.body.menu_user_comment, req.params.id];
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

    /* Delete a menu-user relationship */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM MenuUsers WHERE menu_user_id = ?";
        var inserts = [req.params.id];
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