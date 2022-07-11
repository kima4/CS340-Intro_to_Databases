function deleteRecipeUser(id){
    $.ajax({
        url: '/recipe-users/' + id,
        type: 'DELETE',
        success: function(results){
            window.location.reload(true);
        }
    })
}