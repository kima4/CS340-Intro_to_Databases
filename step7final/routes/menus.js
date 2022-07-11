module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Find all menus */
    function getMenus(res, mysql, context, complete){
        mysql.pool.query("SELECT menu_id, menu_name, menu_description, menu_creator FROM Menus", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.menus = results;
            complete();
        }); 
    
    }

    /* Retrieve all usernames to fill "Creator Name" dropdown menu */
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

    /* Find menus that start with a given string in the req */
    function getMenusWithNameLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
         var query = "SELECT menu_id, menu_name, menu_description, menu_creator FROM Menus WHERE menu_name LIKE " + mysql.pool.escape(req.params.s + '%');
        console.log(query)
  
        mysql.pool.query(query, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.menus = results;
              complete();
            });
    }

    /* Retrieve the information for a single menu when updating it*/
    function getMenu(res, mysql, context, id, complete){
        var sql = "SELECT menu_id, menu_name, menu_description, menu_creator FROM Menus WHERE menu_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.menu = results[0];
            complete();
        });
    }

    /* Display all menus */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchmenus.js", "deletemenu.js"];
        var mysql = req.app.get('mysql');
        getMenus(res, mysql, context, complete);
        getUsers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('menus', context);
            }
        }
    });

    /* Display all menus with names that start with a given string */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchmenus.js", "deletemenu.js"];
        var mysql = req.app.get('mysql');
        getMenusWithNameLike(req, res, mysql, context, complete);
        getUsers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('menus', context);
            }
        }
    });

    /* Display one menu for the specific purpose of updating it */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatemenu.js"];
        var mysql = req.app.get('mysql');
        getMenu(res, mysql, context, req.params.id, complete);
        getUsers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-menu', context);
            }
        }
    });

    /* Adds a menu, redirects to the "Menus" page after adding */
    router.post('/', function(req, res){
        console.log(req.body);
        var mysql = req.app.get('mysql');
        if(req.body.menu_creator === ''){
            var sql = "INSERT INTO Menus (menu_name, menu_description) VALUES (?,?)";
            var inserts = [req.body.menu_name, req.body.menu_description];
        }else{
            var sql = "INSERT INTO Menus (menu_name, menu_description, menu_creator) VALUES (?,?,?)";
            var inserts = [req.body.menu_name, req.body.menu_description, req.body.menu_creator];
        }
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/menus');
            }
        });
    });

    /* Update a menu with the received ID in the URI */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE Menus SET menu_name = ?, menu_description = ?, menu_creator = ? WHERE menu_id = ?";
        var inserts = [req.body.menu_name, req.body.menu_description, req.body.menu_creator, req.params.id];
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

    /* Delete a menu */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Menus WHERE menu_id = ?";
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