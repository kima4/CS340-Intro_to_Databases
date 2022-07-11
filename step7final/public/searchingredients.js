function searchIngredientsByIngredientName() {
    //get the ingredient name 
    var ingredient_name_search_string  = document.getElementById('ingredient_name_search_string').value
    //construct the URL and redirect to it
    window.location = '/ingredients/search/' + encodeURI(ingredient_name_search_string)
}
