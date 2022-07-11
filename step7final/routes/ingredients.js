module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Find all ingredients */
    function getIngredients(res, mysql, context, complete){
        mysql.pool.query("SELECT ingredient_id, ingredient_name, ingredient_category FROM Ingredients", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ingredients = results;
            complete();
        })
    }

    /* Find ingredients that start with a given string in the req */
    function getIngredientsWithNameLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
         var query = "SELECT ingredient_id, ingredient_name, ingredient_category FROM Ingredients WHERE ingredient_name LIKE " + mysql.pool.escape(req.params.s + '%');
        console.log(query)
  
        mysql.pool.query(query, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.ingredients = results;
              complete();
            });
        }
    
    /* Retrieve the information for a single ingredient when updating it*/
    function getIngredient(res, mysql, context, id, complete){
        var sql = "SELECT ingredient_id, ingredient_name, ingredient_category FROM Ingredients WHERE ingredient_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ingredient = results[0];
            complete();
        });
    }

    /* Display all ingredients */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchingredients.js", "deleteingredient.js"];
        var mysql = req.app.get('mysql');
        getIngredients(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('ingredients', context);
            }
        }
    });

    /*Display all ingredients with names that start with a given string */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchingredients.js", "deleteingredient.js"];
        var mysql = req.app.get('mysql');
        getIngredientsWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('ingredients', context);
            }
        }
    });

    /* Display one ingredient for the specific purpose of updating it */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateingredient.js"];
        var mysql = req.app.get('mysql');
        getIngredient(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-ingredient', context);
            }
        }
    });

    /* Adds an ingredient, redirects to the "Ingredients" page after adding */
    router.post('/', function(req, res){
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Ingredients (ingredient_name, ingredient_category) VALUES (?,?)";
        var inserts = [req.body.ingredient_name, req.body.ingredient_category];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/ingredients');
            }
        });
    });

    /* Update an ingredient with the received ID in the URI */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE Ingredients SET ingredient_name = ?, ingredient_category = ? WHERE ingredient_id = ?";
        var inserts = [req.body.ingredient_name, req.body.ingredient_category, req.params.id];
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

    /* Delete an ingredient */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Ingredients WHERE ingredient_id = ?";
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