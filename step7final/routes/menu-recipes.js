module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Find all menu-recipe relationships */
    function getMenuRecipes(res, mysql, context, complete){
        mysql.pool.query("SELECT MenuRecipes.menu_id, menu_recipe_id, menu_name, recipe_name, recipe_number FROM MenuRecipes INNER JOIN Menus ON MenuRecipes.menu_id = Menus.menu_id INNER JOIN Recipes ON MenuRecipes.recipe_id = Recipes.recipe_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.menurecipes = results;
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

    /* Retrieve the information for a single menu-recipe relationship when updating it*/
    function getMenuRecipe(res, mysql, context, id, complete){
        var sql = "SELECT MenuRecipes.menu_id, menu_recipe_id, menu_name, recipe_name, recipe_number FROM MenuRecipes INNER JOIN Menus ON MenuRecipes.menu_id = Menus.menu_id INNER JOIN Recipes ON MenuRecipes.recipe_id = Recipes.recipe_id WHERE menu_recipe_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.menu_recipe = results[0];
            complete();
        });
    }

    /* Display all menu-recipe relationships */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete-menu-recipe.js", "update-menu-recipe.js"];
        var mysql = req.app.get('mysql');
        getMenuRecipes(res, mysql, context, complete);
        getMenus(res, mysql, context, complete);
        getRecipes(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('menu-recipes', context);
            }
        }
    });

    /* Display one menu-recipe relationship for the specific purpose of updating it */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete-menu-recipe.js", "update-menu-recipe.js"];
        var mysql = req.app.get('mysql');
        getMenuRecipe(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-menu-recipe', context);
            }
        }
    });

    /* Adds a menu-recipe relationship, redirects to the "Menus to Recipes Junction" page after adding */
    router.post('/', function(req, res){
        console.log(req.body);
        var mysql = req.app.get('mysql');
        
        var sql = "INSERT INTO MenuRecipes (menu_id, recipe_id, recipe_number) VALUES (?,?,?)";
        var inserts = [req.body.menu_id, req.body.recipe_id, req.body.recipe_number];
        
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/menu-recipes');
            }
        });
    });
    
    /* Update a menu-recipe relationship with the received ID in the URI */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE MenuRecipes SET recipe_number = ? WHERE menu_recipe_id = ?";
        var inserts = [req.body.recipe_number, req.params.id];
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

    /* Delete a menu-recipe relationship */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM MenuRecipes WHERE menu_recipe_id = ?";
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