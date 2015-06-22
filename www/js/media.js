/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// ********************* Captura de varias fotos  ******************************

function captureSuccess(mediaFiles) {
    var i, len, path;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        $("#capturaImg").append("<img alt='Foto' id='imageCamera" + i + "' width='100px' height='100px'/> ");
        var image = document.getElementById('imageCamera' + i);
        image.src = path;
    }
}

function captureError(error) {
    var msg = 'un error ah ocurrido en la captura: ' + error.code;
    navigator.notification.alert(msg, null, 'Error!');
}

// A button will call this function
function captureImage() {
    navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 10});
    $("#capturaImg").show();
}
// ********************* Captura de varias fotos  ******************************

// ********************* Captura Video  ******************************
var captureSuccessVideo = function (videoMediaFiles) {
    var i, path, len;
    for (i = 0, len = videoMediaFiles.length; i < len; i += 1) {
        path = videoMediaFiles[i].fullPath;
        $("#capturaVideo").append("<video alt='Foto' id='videoCamera" + i + "' controls width='100px' height='100px'></video>");
        var video = document.getElementById('videoCamera' + i);
        video.src = path;
    }
};

// capture error callback
var captureErrorVideo = function (error) {
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
};

// start video capture
function captureVideo() {
    navigator.device.capture.captureVideo(captureSuccessVideo, captureErrorVideo, {limit: 2});
    $("#capturaVideo").show();
}
// ********************* Captura Video  ******************************
