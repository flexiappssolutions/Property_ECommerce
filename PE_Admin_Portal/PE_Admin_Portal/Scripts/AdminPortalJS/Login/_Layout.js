$(document).ready(function () {

    if (window.localStorage.getItem("loggedInUsername") === null) {
        window.location = '../AdminLogin/SignIn';
        alert("Your session has expired. Kindly login again.");
    } else {
        var username = window.localStorage.getItem("loggedInUsername");        

        $('#user').html(" " + username);
    }
});

function logout() {
    window.localStorage.removeItem("loggedInUsername");    
    window.localStorage.removeItem("loggedInUserID");    
    window.location = ("../AdminLogin/SignIn");
}