/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var messageUserCreate = 'Usuario creado';
var messageValidatePass = 'Contraseña incorrecta: Debe contener 8 caracteres alfanumericos, mínimo 1 numérico y 1 en mayúscula';
var messageNameApp = 'Cerca De Ti';
var messageValidateEmail = 'Correo incorrecto';
var messageValidatePassUnequal = 'Contraseñas no coindiden';
var messageValidateName = 'Campo nombre vacío';
var messageValidateSurnames = 'campo Apellidos vacío';
var messageValidateId = 'Identificación requerida';
var messageValidateCepllphone = "Indicar fecha de nacimiento";
var succesRegisterUser = 'Registro exitoso, desea iniciar sesión?';
var root = 'http://172.16.3.228:8080/cercati/api/';
//var root = 'http://localhost:8080/cercati/api/';
var api_key = '';
var userIdActivo = '';
var namesLogin = "";
var surnamesLogin = "";
var passwordIdLogin = "";
var logoutUsersw = "0";

//complaint type
var complaintType = {
    PQR: 'PQR',
    CORRUPCION_ADMINISTRATIVA: 'Corrupción administrativa',
    SERVICIO_PUBLICO: 'Servicios públicos',
    INFRACCION_ESPACIO_PUBLICO: 'Uso del espacio público',
    INFRACCION_AMBIENTAL: 'Infracción ambiental',
    INCIDENTES_AMENAZAS: 'Incidentes y amenazas de seguridad'
};

var application_json_utf8 = "application/json; charset=UTF-8";




