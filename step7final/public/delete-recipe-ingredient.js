function deleteRecipeIngredient(id){
    $.ajax({
        url: '/recipe-ingredients/' + id,
        type: 'DELETE',
        success: function(results){
            window.location.reload(true);
        }
    })
}