module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Find all recipe-user relationships */
    function getRecipeUsers(res, mysql, context, complete){
        mysql.pool.query("SELECT RecipeUsers.recipe_id, recipe_user_id, recipe_name, username, recipe_user_rating, recipe_user_comment FROM RecipeUsers INNER JOIN Recipes ON RecipeUsers.recipe_id = Recipes.recipe_id ORDER BY RecipeUsers.recipe_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipeusers = results;
            complete();
        }); 
    }

    /* Retrieve all recipe names to fill the "Recipe Name" dropdown menu */
    function getRecipes(res, mysql, context, complete){
        mysql.pool.query("SELECT recipe_id, recipe_name FROM Recipes", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipes = results;
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

    /* Retrieve the information for a single recipe-user relationship when updating it*/
    function getRecipeUser(res, mysql, context, id, complete){
        var sql = "SELECT RecipeUsers.recipe_id, recipe_user_id, recipe_name, username, recipe_user_rating, recipe_user_comment FROM RecipeUsers INNER JOIN Recipes ON RecipeUsers.recipe_id = Recipes.recipe_id WHERE recipe_user_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipe_user = results[0];
            complete();
        });
    }

    /* Display all recipe-ingredient relationships */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete-recipe-user.js", "update-recipe-user.js"];
        var mysql = req.app.get('mysql');
        getRecipeUsers(res, mysql, context, complete);
        getRecipes(res, mysql, context, complete);
        getUsers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('recipe-users', context);
            }
        }
    });

    /* Display one recipe-user relationship for the specific purpose of updating it */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete-recipe-user.js", "update-recipe-user.js"];
        var mysql = req.app.get('mysql');
        getRecipeUser(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-recipe-user', context);
            }
        }
    });

    /* Adds a recipe-user relationship, redirects to the "Recipes to Users Junction" page after adding */
    router.post('/', function(req, res){
        console.log(req.body);
        var mysql = req.app.get('mysql');
        
        var sql = "INSERT INTO RecipeUsers (recipe_id, username, recipe_user_rating, recipe_user_comment) VALUES (?,?,?,?)";
        var inserts = [req.body.recipe_id, req.body.username, req.body.recipe_user_rating, req.body.recipe_user_comment];
        
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/recipe-users');
            }
        });
    });
    
    /* Update a recipe-user relationship with the received ID in the URI */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE RecipeUsers SET recipe_user_rating = ?, recipe_user_comment = ? WHERE recipe_user_id = ?";
        var inserts = [req.body.recipe_user_rating, req.body.recipe_user_comment, req.params.id];
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

    /* Delete a recipe-user relationship */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM RecipeUsers WHERE recipe_user_id = ?";
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