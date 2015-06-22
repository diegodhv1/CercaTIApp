/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//validate acces user by cc and password
function login() {
    var id = $("#cc").val();
    var password = $("#password").val();
    if (!id) {
        alert("Ingresar numero de documento");
        $("#cc").focus();
    } else if (!password) {
        alert("Ingresar contraseña");
        $("#password").focus();
    } else {
        $.ajax({
            type: 'GET',
            url: root + "users/login",
            dataType: 'json',
            contentType: 'application/json',
            data: {id: id, password: password},
            success: function (data) {
                console.log("Logged user " + id + "succesfully!");
                loadLoggedUser(id, data.api_key);
            },
            error: function (data, jqhr) {
                alert(data.responseText);
                console.log("Error: " + jqhr);
                $("#cc").focus();
                $("#password").val("");
            }
        });
    }
}

function confirmuser() { 
    var key = String(window.location.href).split('?')[1];   
    key = key.split('=')[1];
    console.log(key);
    $.ajax({
        type: 'PUT',
        url: root + "users/confirm",
        dataType: 'text',
        contentType: "text/plain",
        data: key,
        success: function (data) {     
            redirectTo("../index.html");
        },
        error: function (error) {
            console.log("Error al confirmar usuario");
        }
    });
}

function logoutUser() {
    $.ajax({
        type: 'GET',
        url: root + "users/logout",
        headers: {'x-api_key': getKey()},
        success: function (data) {
            console.log(data);
            alert("Ha finalizado la sesión del usuario");
            clearAll();
        },
        error: function (error) {
            console.log("Failed to log out user");
            clearAll();
        }
    });
}

function clearAll(){
    clearUserData();
    redirectTo("../index.html");
}
