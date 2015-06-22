/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// device APIs are available
//
function storeUserData(userData) {
  
    console.log("Saving user data to storage");
    
    window.localStorage.setItem("names", userData.names);
    window.localStorage.setItem("surnames",userData.surnames);
    window.localStorage.setItem("key", userData.key);
}

function loadUserData(){
    console.log("Loading user data from storage");
    
    return {
        names : window.localStorage.getItem("names"),
        surnames : window.localStorage.getItem("surnames"),
        key: window.localStorage.getItem("key")
    };
}

function getKey(){
    console.log("Retrieving key from storage");
    return window.localStorage.getItem("key");
}

function clearUserData(){
    window.localStorage.clear();
    window.localStorage.setItem("key", "");
}

