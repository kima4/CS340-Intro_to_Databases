function deleteIngredient(id){
    $.ajax({
        url: '/ingredients/' + id,
        type: 'DELETE',
        success: function(results){
            window.location.reload(true);
        }
    })
}