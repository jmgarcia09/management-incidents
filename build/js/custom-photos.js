var count = 0;
function readURL(input) {
    var url = input.value;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (input.files && input.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
        var reader = new FileReader();

        var newblock="<div class='col-md-3'>"+
            "<div class='thumbnail'>"+
            "<img class='img-cover' id='evidencias-"+ count +"' name='evidencias[]' src='#' alt='your image' />"+
            "</div>"+
            "</div>";
        $("#gallery-ticket").append(newblock);
        reader.onload = function (e) {
            $('#evidencias-'+count).attr('src', e.target.result);
            count++;
        }

        reader.readAsDataURL(input.files[0]);
    }else{
         $('#img').attr('src', '/assets/no_preview.png');
    }
}

// Grab elements, create settings, etc.
var video = document.getElementById('video');
// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var localstream;
$('#show-camera').click(function(){
    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        localstream=stream;
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
    }else if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia({ video: true }, function(stream) {
        localstream=stream;
        video.src = stream;
        video.play();
    }, errBack);
    } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia({ video: true }, function(stream){
            localstream=stream;
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, errBack);
    } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
        navigator.mozGetUserMedia({ video: true }, function(stream){
            localstream=stream;
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }

});
$('#close-camera').click(function(){
      video.pause();
  video.src = "";
  localstream.getTracks()[0].stop();
});
$('#snap').click(function(){
           context.drawImage(video, 0, 0, 400, 300);
            var newblock="<div class='col-md-3'>"+
            "<div class='thumbnail'>"+
            "<img class='img-cover' id='evidencias-"+ count +"' name='evidencias[]' src='#' alt='your image' />"+
            "</div>"+
            "</div>";
        $("#gallery-ticket").append(newblock);
        $('#evidencias-'+count).attr('src', canvas.toDataURL());
           count++;
        });


$("#file-1").change(function(){ 
        readURL(this);
    });