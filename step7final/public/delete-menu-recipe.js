function deleteMenuRecipe(id){
    $.ajax({
        url: '/menu-recipes/' + id,
        type: 'DELETE',
        success: function(results){
            window.location.reload(true);
        }
    })
}