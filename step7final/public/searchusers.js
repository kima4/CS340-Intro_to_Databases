function searchUsersByUsername() {
    //get the username 
    var username_search_string  = document.getElementById('username_search_string').value
    //construct the URL and redirect to it
    window.location = '/users/search/' + encodeURI(username_search_string)
}
