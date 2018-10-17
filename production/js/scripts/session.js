$(document).ready(function() {

    if(!sessionStorage.getItem('user')){
        window.location.replace("./login.html");
    }
});