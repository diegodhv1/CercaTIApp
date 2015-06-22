/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//To list active complaints
//29 may 2015
function complaintsCurrent() {
    var text1 = "";
    var text2 = "";
    var fechaHora, fecha, hora, code, urlPage;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        headers: {'x-api_key': getKey()},
        url: root + 'complaints/current',
        success: function (data) {
            for (i = 0; data.length; i += 1) {
                fechaHora = data[i].registrationDate;
                fechaHora = fechaHora.split("T");
                fecha = fechaHora[0];
                hora = fechaHora[1].slice(0, 5);
                code = data[i].code;
                urlPage = '"detalleDenunciaPQR.html"';
                text1 = "<li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit ui-li-has-count ui-first-child'>" + fecha + "<span class='ui-li-count ui-body-inherit'>" + data[i].state + "</span></li>&nbsp;&nbsp;&nbsp;&nbsp;";
                text2 = "<li><a onclick='goToPage(" + urlPage + "," + code + ",1)' data-transition='slidedown' class='ui-btn ui-btn-icon-right ui-icon-carat-r'><h2>" + complaintType[data[i].type] + " " + data[i].code + "</h2>&nbsp;&nbsp;&nbsp;&nbsp;<p><strong>Asunto:" + data[i].subject + "</strong></p>&nbsp;&nbsp;&nbsp;&nbsp;<p>" + data[i].description + "</p><p class='ui-li-aside'><strong>" + hora + "</strong></p></a></li>";
                $("#listComplaints").append(text1, text2);
            }
        },
        error: function (jqXHR) {
            console.log("Here Get complaints ERROR:" + jqXHR);
            fecha = fechaHora[0];
        }
    });

}


//History complaints  
// 29 may 2015
function historyComplaints() {    
    $("#idListViewhistoryComplaints").empty();
    var urlPage = '"detalleDenunciaPQR.html"';
    var code;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        contentType: application_json_utf8,
        headers: {'x-api_key': getKey()},
        url: root + 'complaints/current',
        success: function (data) {
            for (i = 0; i < data.length; i += 1) {
                code = data[i].code;
                $("#idListViewhistoryComplaints").append("<li class='ui-first-child ui-last-child'><a onclick='goToPage(" + urlPage + "," + code + ",1)' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + data[i].description + "</a></li>");
            }
        },
        error: function (data) {
            console.log("Here consultas error" + data.responseText);
        }
    });
}

//details complaints
//20 may 2015
function detailComplaints() {
    var codigoV = "";
    var codigo = "";
    try {
        codigoV = String(window.location.href).split('?')[1];
        codigo = codigoV.split('=')[1];
    } catch (err) {
        codigoV = "";
    }

    if (codigoV !== "") {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            contentType: application_json_utf8,
            url: root + 'complaints/' + codigo,
            headers: {'x-api_key': getKey()},
            success: function (data) {

                var title = "<div class='centrado'><h1 class='estiloLetra'>Detalle de Denuncias/PQR</h1> </div>";
                var code = "<h3>Código:</h3>" + data.code;
                var type = "<h3>Tipo/Categoria:</h3>" + complaintType[data.type];
                var registrationDate = "<h3>Fecha:</h3>" + data.registrationDate;
                var subject = "<h3>Asunto:</h3>" + data.subject;
                var description = "<h3>Descripción:</h3>" + data.description;
                var images = "<h3>Imagenes:</h3>";
                $("#idDetalleComplaint").append(title, code, type, registrationDate, subject, description, images);
                eventsOfComplaints(codigo);
            },
            error: function (jqXHR) {
                console.log("error detalle" + jqXHR);
            }
        });
    }

}


//To list events of a complaint
//29 may 2015
function eventsOfComplaints(codigo) {
    var text1 = "";
    var text2 = "";
    var fechaHora, fecha, hora;

    $.ajax({
        type: 'GET',
        dataType: 'json',
        contentType: application_json_utf8,
        headers: {'x-api_key': getKey()},
        url: root + 'complaints/events/' + codigo,
        success: function (data) {
            for (i = 0; data.length; i += 1) {
                fechaHora = data[i].ocurrenceDate;
                fechaHora = fechaHora.split("T");
                fecha = fechaHora[0];

                hora = fechaHora[1].slice(0, 5);
                text1 = "<li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit ui-li-has-count ui-first-child'>" + fecha + "</li>&nbsp;&nbsp;&nbsp;&nbsp;";
                text2 = "<li><a href='#' data-transition='slidedown' class='ui-btn ui-btn-icon-right ui-icon-carat-r'><p><h1>Descripción</h1></p>&nbsp;&nbsp;&nbsp;&nbsp;<p>" + data[i].contents + "</p><p class='ui-li-aside'><strong>" + hora + "</strong></p></a>&nbsp;&nbsp;&nbsp;&nbsp;</li>";
                $("#idListEventsByComplaint").append(text1, text2);
            }         
        },
        error: function (jqXHR) {
            console.log("Here Get complaints ERROR:" + jqXHR);
        }
    });


}


//Create complaints
//05 june 2015
function createComplaints() {
    var typeComplaint = $('select[name="typeComplaint"]').val();
    var subject = $('#idAsunto').val();
    var description = $('#idTextArea').val();
    var infoComplaint = "";
    // alert(""+typeComplaint +subject+description );
    if (typeComplaint === 1 || subject === "" || description === "") {
        alert("Ingresar datos");
    } else {
        infoComplaint = {
            description: description,
            subject: subject,
            type: typeComplaint
        };
        console.log("Intro create complaints");
        console.log("Registeer PQR:");
        console.log("data: " + JSON.stringify(infoComplaint));
        console.log("Key: " + getKey());
        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: application_json_utf8,
            headers: {'x-api_key': getKey()},
            url: root + 'complaints',
            data: JSON.stringify(infoComplaint),
            success: function (data) {
                alert("Registro exitoso");
                redirectTo("seguimiento.html");
                console.log("register succefully" + data);
            },
            error: function (data) {
                console.log("Error al registrar denuncia" + data.responseText);
            }
        });
    }
}


//Insert Event of complaints identify by code
//09 june 2015
function insertEvent() {
    try {
        var codeComplaint = String(window.location.href).split('?')[1];
        codeComplaint = codeComplaint.split('=')[1];
    } catch (err) {
        codeComplaint = "";
    }
    var comment = $("#idTextAreaCommentsUser").val();
    if (!codeComplaint) {
        alert("Ingresar un comentario");
        $("#idTextAreaCommentsUser").focus();
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'text',
            contentType: 'text/plain',
            headers: {'x-api_key': getKey()},
            url: root + 'complaints/comment/on/' + codeComplaint,
            data: comment,
            success: function (result) {
                alert("Comentario enviado satisfactoriamente.");
                console.log(result);
                $("#idListEventsByComplaint").empty();                
                $("#idTextAreaCommentsUser").val("");                                               
                eventsOfComplaints(codeComplaint);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Error registro.");
            }
        });         
    }
}

//Update user 
//09 june 2015 