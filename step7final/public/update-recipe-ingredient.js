function updateRecipeIngredient(id){
    $.ajax({
        url: '/recipe-ingredients/' + id,
        type: 'PUT',
        data: $('#update-recipe-ingredient').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
