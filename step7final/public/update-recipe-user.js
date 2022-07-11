function updateRecipeUser(id){
    $.ajax({
        url: '/recipe-users/' + id,
        type: 'PUT',
        data: $('#update-recipe-user').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
