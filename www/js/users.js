/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Module users

//validate fields at create user
function validateFieldsUser() {
    var idusers = $('#identification').val();
    var namesUser = $('#names').val();
    var surnamesUser = $('#surnames').val();
    var emailUser = $('#email').val();
    var passUser = $('#passwordUser').val();
    var confirmPassword = $('#password2').val();
    var celphoneUser = $('#cellphone').val();
    var validate = true;
    var validatePass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    var validateEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (idusers === "") {
        alert(messageValidateId);
        $('#identification').focus();
        validate = false;
    } else {
        validate = false;
        if (passUser === "" || !validatePass.test(passUser)) {
            alert(messageValidatePass);
            $('#password').focus();
        } else {
            if (passUser !== confirmPassword) {
                alert(messageValidatePassUnequal);
                $('#password2').focus();
            } else {
                if (namesUser === "") {
                    alert(messageValidateName);
                    $('#names').focus();
                } else {
                    if (surnamesUser === "") {
                        alert(messageValidateSurnames);
                        $('#surnames').focus();
                    } else {
                        if (celphoneUser === "") {
                            alert(messageValidateCepllphone);
                            $('#cellphone').focus();
                        } else {
                            if (!validateEmail.test(emailUser)) {
                                alert(messageValidateEmail);
                                $('#email').focus();
                            } else {
                                validate = true;
                            }
                        }
                    }
                }
            }
        }
    }
    return validate;
}

function createUser() {
    var boolean = validateFieldsUser();
    if (boolean) {
        var idusers = $('#identification').val();
        var namesUser = $('#names').val();
        var surnamesUser = $('#surnames').val();
        var emailUser = $('#email').val();
        var celphoneUser = $('#cellphone').val();
        var passUser = $('#passwordUser').val();
        $.ajax({
            type: 'POST',
            url: root + "users",
            contentType: application_json_utf8,
            data: JSON.stringify({
                id: idusers,
                names: namesUser,
                surnames: surnamesUser,
                email: emailUser,
                cellphone: celphoneUser,
                password: passUser
            }),
            success: function () {
                alert("Registro exitoso, confirme el usuario en su cuenta de correo suministrada.");
                //storeUserData({id: idusers, names: namesUser, surnames: surnamesUser});
                redirectTo("../index.html");               
            },
            error: function (data) {
                alert(data.responseText);
                console.log("Error registro" + data.responseText);
            }
        });

    }
}

function loadLoggedUser(id, key) {
    console.log("Getting user info from server - ID:" + id + " key:" + key);
    $.ajax({
        type: 'GET',
        url: root + 'users/' + id,
        dataType: 'json',
        headers: {'x-api_key': key},
        success: function (data) {
            console.log("Got User " + data);
            storeUserData({
                names : data.names, 
                surnames: data.surnames, 
                key: key
            });            
            redirectTo("pages/principal.html");
        },
        error: function (data) {
            console.log("Error get user " + data.responseText);
        }
    });
}

function showUserInfo(data) {
    $("#idNameUserlogin").append(" "+data.names + "  " + data.surnames);
}

function goToPage(url, code, flag) {
    flag === 1 ? window.location = url + "?code=" + code : window.location = url;
}

//get user for to update 
function getUserUpdate() {

    var key = window.localStorage.getItem("key");
    var id = window.localStorage.getItem("id"); 
    $.ajax({
        type: 'GET',
        url: root + 'users/' + id,
        dataType: 'json',
        contentType: application_json_utf8,
        headers: {'x-api_key': key},
        success: function (data) {
            
           // window.location = "registro.html";

           /* $('#identification').val(data.names);
            $('#names').val(data.names);
            $('#surnames').val(data.names);
            $('#email').val(data.names);
            $('#cellphone').val(data.names);
            $('#passwordUser').val(data.names);
            $('#password2').val(data.names);*/
            alert(data.names);
            
        },
        error: function (data) {
            console.log("Error get user " + data.responseText);
        }
    });
}