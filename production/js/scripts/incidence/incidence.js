const serviceUrl = 'http://52.39.233.235:8554';


$(document).ready(function() {
   loadIncidences();
});

function loadIncidences() {

    fetch(serviceUrl + "/incidence",{
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then((response) =>{

        if(response.status === 200){
            incidences = response.json();

            incidences.then((data) =>{
               data.forEach((incidence) =>{
                   console.log(incidence);
                   $("#tableContent").append(addIncidenceTable(incidence))
               });

                var $datatable = $('#datatable-checkbox');

                $datatable.dataTable({
                    'order': [[ 1, 'asc' ]],
                    'columnDefs': [
                        { orderable: false, targets: [0] }
                    ]
                });
            });
        }


    });


    
}


function addIncidenceTable(data) {
    trComponent = document.createElement("tr");
    trComponent.className = "odd pointer";

    idComponent = document.createElement("td");
    idComponent.textContent = data.id;
    trComponent.appendChild(idComponent);

    storeComponent = document.createElement("td");
    storeComponent.textContent = data.clientStore.name;
    trComponent.appendChild(storeComponent);

    typeComponent = document.createElement("td");
    typeComponent.textContent = data.incidenceType.name;
    trComponent.appendChild(typeComponent);

    incomingOutcomingComponent = document.createElement("td");
    if(data.incomingOutcoming == 1){
        incomingOutcomingComponent.textContent = "Entrante";
    }else {
        incomingOutcomingComponent.textContent = "Saliente";
    }
    trComponent.appendChild(incomingOutcomingComponent);

    transmitterNameComponent = document.createElement("td");
    transmitterNameComponent.textContent = data.transmitterName;
    trComponent.appendChild(transmitterNameComponent);

    dateComponent = document.createElement("td");
    dateComponent.textContent = data.callDate;
    trComponent.appendChild(dateComponent);

    optionsComponent = document.createElement("td");
    optionsComponent.className = "last";
    optionsComponent.innerHTML = "<a href=\"incidents-detail.html\" class=\"btn btn-primary\"><i class=\"fa fa-eye\"></i></a>\n" +
        "<a href=\"incidents-edit.html\" class=\"btn btn-success\"><i class=\"fa fa-edit\"></i></a>";

    trComponent.appendChild(optionsComponent);


    return trComponent;
}
