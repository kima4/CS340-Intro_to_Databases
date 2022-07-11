function searchMenusByMenuName() {
    //get the menu name 
    var menu_name_search_string  = document.getElementById('menu_name_search_string').value
    //construct the URL and redirect to it
    window.location = '/menus/search/' + encodeURI(menu_name_search_string)
}
