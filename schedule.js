
var tableClass = document.getElementById("table-class-input");
var tableLocation = document.getElementById("location-attribution-input");
var tableTime= document.getElementById("time-attribution-input");


var createBlockContainers = document.getElementsByTagName('td');


var modalBackdrop = document.getElementById("modal-backdrop");
var modal = document.getElementById("create-table-modal");

var modalCancelButton  = document.getElementsByClassName("modal-cancel-button")[0];
var modalCloseButton = document.getElementsByClassName("modal-close-button")[0];
var modalAcceptButton = document.getElementsByClassName("modal-accept-button")[0];

function modalToggle1(event){
    if (modalBackdrop.classList.contains('hidden')){
        modal.classList.remove('hidden');
        modalBackdrop.classList.remove('hidden');
        console.log(event.target);
    }
}

function modalToggle2(event){
        modalBackdrop.classList.add('hidden');
        modal.classList.add('hidden');


}

function addtablecontent(event){
    if ((tableClass.value == "") || (tableLocation.value == "") ||(tableTime.value == "")){
      alert("You have not entered a value for Class location or time")
      return;
    }
    
    var className = document.createElement('p');
    className.classList.add('className');
    className.textContent = tableClass.value;
  
    var classLocation = document.createElement('p');
    classLocation.classList.add('classLocation');
    classLocation.textContent = tableLocation.value;

    var classTime = document.createElement('p');
    classTime.classList.add('classTime');
    classTime.textContent = classTime.value;

    var div = document.createElement('div');
    div.classList.add('content');
    div.appendChild(className);
    div.appendChild(classLocation);
    div.appendChild(classTime);
   
    createBlockContainers[2].appendChild(div);

  
    modalToggle2();
}

for (var i = 0; i < createBlockContainers.length; i++) {
   createBlockContainers[i].addEventListener('click', modalToggle1);
}
modalAcceptButton.addEventListener('click', addtablecontent);

modalCancelButton.addEventListener('click', modalToggle2);
modalCloseButton.addEventListener('click', modalToggle2);





