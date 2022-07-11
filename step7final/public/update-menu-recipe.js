function updateMenuRecipe(id){
    $.ajax({
        url: '/menu-recipes/' + id,
        type: 'PUT',
        data: $('#update-menu-recipe').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
