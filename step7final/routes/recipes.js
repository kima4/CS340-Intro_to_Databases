module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Find all recipes */
    function getRecipes(res, mysql, context, complete){
        mysql.pool.query("SELECT recipe_id, recipe_name, recipe_description, recipe_creator FROM Recipes", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipes = results;
            complete();
        }); 
    
    }

    /* Retrieve all usernames to fill the "Creator Name" dropdown menu */
    function getUsers(res, mysql, context, complete){
        mysql.pool.query("SELECT username FROM Users", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users = results;
            complete();
        })
    }
    
    /* Find recipes that start with a given string in the req */
    function getRecipesWithNameLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
         var query = "SELECT recipe_id, recipe_name, recipe_description, recipe_creator FROM Recipes WHERE recipe_name LIKE " + mysql.pool.escape(req.params.s + '%');
        console.log(query)
  
        mysql.pool.query(query, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.recipes = results;
              complete();
            });
    }

    /* Retrieve the information for a single recipe when updating it*/
    function getRecipe(res, mysql, context, id, complete){
        var sql = "SELECT recipe_id, recipe_name, recipe_description, recipe_creator FROM Recipes WHERE recipe_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipe = results[0];
            complete();
        });
    }

    /* Display all recipes */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchrecipes.js", "deleterecipe.js"];
        var mysql = req.app.get('mysql');
        getRecipes(res, mysql, context, complete);
        getUsers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('recipes', context);
            }
        }
    });

    /* Display all recipes with names that start with a given string */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchrecipes.js", "deleterecipe.js"];
        var mysql = req.app.get('mysql');
        getRecipesWithNameLike(req, res, mysql, context, complete);
        getUsers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('recipes', context);
            }
        }
    });

    /* Display one recipe for the specific purpose of updating it */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selecteduser.js", "updaterecipe.js"];
        var mysql = req.app.get('mysql');
        getRecipe(res, mysql, context, req.params.id, complete);
        getUsers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-recipe', context);
            }
        }
    });

    /* Adds a recipe, redirects to the "Recipes" page after adding */
    router.post('/', function(req, res){
        console.log(req.body);
        var mysql = req.app.get('mysql');
        if(req.body.recipe_creator === ''){
            var sql = "INSERT INTO Recipes (recipe_name, recipe_description) VALUES (?,?)";
            var inserts = [req.body.recipe_name, req.body.recipe_description];
        }else{
            var sql = "INSERT INTO Recipes (recipe_name, recipe_description, recipe_creator) VALUES (?,?,?)";
            var inserts = [req.body.recipe_name, req.body.recipe_description, req.body.recipe_creator];
        }
        
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/recipes');
            }
        });
    });

    /* Update a recipe with the received ID in the URI */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE Recipes SET recipe_name = ?, recipe_description = ?, recipe_creator = ? WHERE recipe_id = ?";
        var inserts = [req.body.recipe_name, req.body.recipe_description, req.body.recipe_creator, req.params.id];
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

    /* Delete a recipe */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Recipes WHERE recipe_id = ?";
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