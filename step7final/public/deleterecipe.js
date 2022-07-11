function deleteRecipe(id){
    $.ajax({
        url: '/recipes/' + id,
        type: 'DELETE',
        success: function(results){
            window.location.reload(true);
        }
    })
}