/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function checkCurrentPage(page) {
    var path = window.location.pathname;
    return path && path.indexOf(page) !== -1;
}

function redirectTo(destination){
    window.location = destination;
}

$(document).ready(function () {    
    
    var userData = loadUserData();
    if (userData.key) {
        console.log("User data found!");
    } else {
        console.log("User data not stored!");
    }

    if (checkCurrentPage("index") && userData.key) {
        console.log("Redirecting to main");
        redirectTo("pages/principal.html");
    } else {
        if (!userData.key) {
            //TODO - Redirect to index
        } else if (typeof bootstrap === 'function') {
            console.log("Bootstrapping page!");
            bootstrap(userData);
        }
    }
});