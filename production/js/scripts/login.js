

const serviceUrl = 'http://localhost:8554';



function loginUser(){
    $("#errorMessage").text("");

    let username = $("#username").val();
    let password = $("#userPassword").val();

    let requestData = {
        user : username,
        password : password
    };

    callLogin(requestData).then((response) =>{

        if(response.status !== 200){
            $("#errorMessage").text("Usuario invalido");
            return false;
        }else {
            response.json().then((data) =>{
                console.log(data);
                alert("Usuario correcto");
                sessionStorage.setItem('userId',data.data.id);
                sessionStorage.setItem('user',username);
                window.location.replace("./index.html");
            });

        }
        console.log(response);
    }).catch((error) =>{
        $("#errorMessage").text("No fue posible iniciar sesion.");
    });


}


async function callLogin(requestData) {
    return fetch(serviceUrl + "/auth/login",{
        method : 'POST',
        body : JSON.stringify(requestData),
        headers : {
            'Content-Type' : 'application/json'
        }
    });


}

