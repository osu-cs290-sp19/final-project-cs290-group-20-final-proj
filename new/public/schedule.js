
var createBlockContainers = document.getElementsByTagName('td');
var saveButton = document.getElementById("Save");
var editButton = document.getElementById("Edit");
var deleteButton = document.getElementById("Delete");
var _tableslist;
var tableslist = [];


var className=document.querySelectorAll("[id^='table-class-input']")
var classLocation=document.querySelectorAll("[id^='table-location-input']")
var classTime=document.querySelectorAll("[id^='table-time-input']")


var inputText = document.getElementsByTagName('input');




function save(event){
    for (var i = 0; i < className.length; i++) {
        if (className[i].value == ""){
            className[i].classList.add('hidden');
        }
        if (classLocation[i].value == ""){
            classLocation[i].classList.add('hidden');
        }
        if (classTime[i].value == ""){
            classTime[i].classList.add('hidden');
        }
        else{
            className[i].classList.remove('hidden');
            classLocation[i].classList.remove('hidden');
            classTime[i].classList.remove('hidden');

        }
    }
    for (var j = 0; j < inputText.length; j++) {
        inputText[j].readOnly = "true"; ;
    }
    var tables = document.getElementsByClassName("eachtime");
    var _table=[];
    for(var i=0;i<tables.length-1;i++) {
        var stringtime= i+8;
        //批量获取 input 的值
        _table[i]=
        {
            scheduletime: stringtime+":00",
            slots:{
                Monday:{class:inputText[0+15*i].value,location:inputText[1+15*i].value,time:inputText[2+15*i].value},
                Tuesday:{class:inputText[3+15*i].value, location:inputText[4+15*i].value , time:inputText[5+15*i].value},
                Wednesday:{class:inputText[6+15*i].value, location:inputText[7+15*i].value , time:inputText[8+15*i].value},
                Thrusday:{class:inputText[9+15*i].value, location:inputText[10+15*i].value , time:inputText[11+15*i].value},
                Friday:{class:inputText[12+15*i].value, location:inputText[13+15*i].value , time:inputText[14+15*i].value}
            }
        }
        //debugger;
        tableslist.push(_table[i]);
        _tableslist={tableslist};
    } 
    
    saveContent();
}

function saveContent(){
    //var tableslist = [];

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
        console.log("success");
    };}
    xhr.open("POST", "/inputs", true);
    xhr.setRequestHeader('Content-type','application/json');
    xhr.send(JSON.stringify(_tableslist));
}

saveButton.addEventListener('click', save);

function edit(){
    for (var i = 0; i < className.length; i++) {
        className[i].classList.remove('hidden');
        classLocation[i].classList.remove('hidden');
        classTime[i].classList.remove('hidden');
    }
    for (var j = 0; j < inputText.length; j++) {
        inputText[j].readOnly = false; 
    }
}
editButton.addEventListener('click', edit);


function deleteAll(){
    for (var i = 0; i < className.length; i++) {
        className[i].classList.remove('hidden');
        classLocation[i].classList.remove('hidden');
        classTime[i].classList.remove('hidden');
    }
    for (var j = 0; j < inputText.length; j++) {
        inputText[j].readOnly = false; 

    }
    for (var m = 0; m < className.length; m++) {
        className[m].value = "";
        classLocation[m].value = "";
        classTime[m].value = "";
    }

}

deleteButton.addEventListener('click', deleteAll);



