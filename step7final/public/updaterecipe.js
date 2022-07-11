function updateRecipe(id){
    $.ajax({
        url: '/recipes/' + id,
        type: 'PUT',
        data: $('#update-recipe').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
