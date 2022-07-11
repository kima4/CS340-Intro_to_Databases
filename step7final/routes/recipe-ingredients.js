module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Find all recipe-ingredient relationships */
    function getRecipeIngredients(res, mysql, context, complete){
        mysql.pool.query("SELECT RecipeIngredients.recipe_id, recipe_ingredient_id, recipe_name, ingredient_name, ingredient_amount, recipe_step, recipe_action FROM RecipeIngredients INNER JOIN Recipes ON RecipeIngredients.recipe_id = Recipes.recipe_id INNER JOIN Ingredients ON RecipeIngredients.ingredient_id = Ingredients.ingredient_id ORDER BY RecipeIngredients.recipe_id, recipe_step", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipeingredients = results;
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

    /* Retrieve all ingredient names to fill the "Ingredient Name" dropdown menu */
    function getIngredients(res, mysql, context, complete){
        mysql.pool.query("SELECT ingredient_id, ingredient_name FROM Ingredients", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ingredients = results;
            complete();
        })
    }

    /* Retrieve the information for a single recipe-ingredient relationship when updating it*/
    function getRecipeIngredient(res, mysql, context, id, complete){
        var sql = "SELECT RecipeIngredients.recipe_id, recipe_ingredient_id, recipe_name, ingredient_name, ingredient_amount, recipe_step, recipe_action FROM RecipeIngredients INNER JOIN Recipes ON RecipeIngredients.recipe_id = Recipes.recipe_id INNER JOIN Ingredients ON RecipeIngredients.ingredient_id = Ingredients.ingredient_id WHERE recipe_ingredient_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipe_ingredient = results[0];
            complete();
        });
    }

    /* Display all recipe-ingredient relationships */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete-recipe-ingredient.js", "update-recipe-ingredient.js"];
        var mysql = req.app.get('mysql');
        getRecipeIngredients(res, mysql, context, complete);
        getRecipes(res, mysql, context, complete);
        getIngredients(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('recipe-ingredients', context);
            }
        }
    });

    /* Display one recipe-ingredient relationship for the specific purpose of updating it */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete-recipe-ingredient.js", "update-recipe-ingredient.js"];
        var mysql = req.app.get('mysql');
        getRecipeIngredient(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-recipe-ingredient', context);
            }
        }
    });

    /* Adds a recipe-ingredient relationship, redirects to the "Recipes to Ingredients Junction" page after adding */
    router.post('/', function(req, res){
        console.log(req.body);
        var mysql = req.app.get('mysql');
        
        var sql = "INSERT INTO RecipeIngredients (recipe_id, ingredient_id, ingredient_amount, recipe_step, recipe_action) VALUES (?,?,?,?,?)";
        var inserts = [req.body.recipe_id, req.body.ingredient_id, req.body.ingredient_amount, req.body.recipe_step, req.body.recipe_action];
        
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/recipe-ingredients');
            }
        });
    });
    
    /* Update a recipe-ingredient relationship with the received ID in the URI */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE RecipeIngredients SET ingredient_amount = ?, recipe_step = ?, recipe_action = ? WHERE recipe_ingredient_id = ?";
        var inserts = [req.body.ingredient_amount, req.body.recipe_step, req.body.recipe_action, req.params.id];
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

    /* Delete a recipe-ingredient relationship */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM RecipeIngredients WHERE recipe_ingredient_id = ?";
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