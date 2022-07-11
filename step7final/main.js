var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main',});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/recipes', require('./routes/recipes.js'));
app.use('/ingredients', require('./routes/ingredients.js'));
app.use('/users', require('./routes/users.js'));
app.use('/menus', require('./routes/menus.js'));
app.use('/recipe-ingredients', require('./routes/recipe-ingredients.js'));
app.use('/recipe-users', require('./routes/recipe-users.js'));
app.use('/menu-recipes', require('./routes/menu-recipes.js'));
app.use('/menu-users', require('./routes/menu-users.js'));
app.use('/', express.static('public'));


app.listen(app.get('port'), function(){
    console.log('Express started on port ' + app.get('port') +'; press Ctrl+C to terminate.')
})