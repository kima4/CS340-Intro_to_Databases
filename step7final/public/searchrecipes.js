function searchRecipesByRecipeName() {
    //get the recipe name 
    var recipe_name_search_string  = document.getElementById('recipe_name_search_string').value
    //construct the URL and redirect to it
    window.location = '/recipes/search/' + encodeURI(recipe_name_search_string)
}
