const serviceUrl = 'http://52.39.233.235:8554';


$(document).ready(function() {
    loadStores();
    loadIncidenceType();
});




function loadStores() {
    fetch(serviceUrl + "/client-store",{
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then((response) =>{

        if(response.status === 200){
            stores = response.json();

            stores.then((data) =>{
                data.forEach((store) =>{
                    console.log(store);
                    var option = document.createElement("option");
                    option.value = store.id;
                    option.innerText = store.name;
                    $("#clientStoreId").append(option);
                });

            });
        }


    });

}


function loadIncidenceType() {
    fetch(serviceUrl + "/incidence-type",{
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then((response) =>{

        if(response.status === 200){
            incidenceTypes = response.json();

            incidenceTypes.then((data) =>{
                data.forEach((incidenceType) =>{
                    console.log(incidenceType);
                    var option = document.createElement("option");
                    option.value = incidenceType.id;
                    option.innerText = incidenceType.name;
                    $("#incidenceType").append(option);
                });

            });
        }


    });

}

function addIncidence() {

    let clientStoreId = $("#clientStoreId").val();
    let incomingOutcoming = $("#incomingOutcoming:checked").val();
    if(incomingOutcoming === "on"){
        incomingOutcoming = 1;
    }else {
        incomingOutcoming = 0;
    }

    let incidenceType = $("#incidenceType").val();
    let incidenceDescription = $("#incidenceDescription").val();
    let solutionDescription = $("#solutionDescription").val();
    let transmitterName = $("#transmitterName").val();
    let transmitterPhone = $("#transmitterPhone").val();

    var incidenceRequest = {
        clientStore : {
            id : clientStoreId
        },
        incidenceDescription : incidenceDescription,
        solutionDescription : solutionDescription,
        incidenceType : {
            id : incidenceType
        },
        user : {
            id : sessionStorage.getItem("userId")
        },
        transmitterName : transmitterName,
        transmitterPhone : transmitterPhone,
        incomingOutcoming : incomingOutcoming
    };

    console.log(incidenceRequest);

    callIncidenceService(incidenceRequest).then((response) =>{
        if(response.status !== 200){
            alert('Error al agregar incidencia');
            return false;
        }else {
            alert('Incidencia agregada correctamente.');
            window.location.replace("./incidents-list.html");
        }
    });

    return false;

}


async function callIncidenceService(requestData) {
    return fetch(serviceUrl + "/incidence/add",{
        method : 'POST',
        body : JSON.stringify(requestData),
        headers : {
            'Content-Type' : 'application/json'
        }
    });


}