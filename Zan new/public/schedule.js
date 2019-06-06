
var createBlockContainers = document.getElementsByTagName('td');
var saveButton = document.getElementById("Save");
var editButton = document.getElementById("Edit");
var deleteButton = document.getElementById("Delete");
/*var blockContentHTML =Handlebars.templates.blockContent();


for (var i = 0; i < createBlockContainers.length; i++) {
    createBlockContainers[i].insertAdjacentHTML('afterbegin', blockContentHTML);
}*/

/*
var inputText=document.getElementsByTagName('input');

for (var i = 0; i < inputText.length; i++) {
    inputText[i].readOnly = "true"; ;
}
*/
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
    //saveContent();
}
/*
function saveContent(){
    //p批量获取 input 的值
    var tableslist = [];
    var k = 0;
    tables = document.getElementsByClass("eachtime");
    for(var i=0;i<tables.length-4;i++) {
        tablelist[i]= table[i];
        tds = tables[i].getElementsByTagName("td");
        for(var j=0;j<tds.length;j++) {
            var inputs = [];
            inputs = tds[j].getElementsByTagName("input");
            var content = {
                class : inputs[0].value,
                location : inputs[1].value,
                time : inputs[2].value,
            };
            ContentList[k]=content;
            k++;
        }


/*
    var xhr = new XMLHttpRequest(),
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            var inputs=[];
            var element=document.getElementsByTagName('input');
            for(var i=0;i<element.length-1;i++){
                if(element[i].value==0){
                     inputs.push(0);
                }
            
                else{
                    inputs.push(element[i].value);
                }
            }
        }

    };
    xhr.open("POST", "/inputs", true);

    xhr.send(JSON.stringify(input));

}
/*
    var inputs=[];
    var element=document.getElementsByTagName('input');
	for(var i=0;i<element.length-1;i++){
		if(element[i].value==0){
		     inputs.push(0);
        }
        else{
            inputs.push(element[i].value);
        }
    }
    var requestdata=JSON.stringify(ContentList);
}
    */


/*
function showTableContent(){
    var requestdatachange=JSON.parse(ContentList);

    for(var i=0;i<element.length-1;i++){
		element[i].value=requestdatachange[i].value;
    }
}
*/
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


/*
var website=[];
	var obj=document.getElementById("verification").getElementsByTagName("input");
	for(var i=0;i<obj.length;i++){
		if(obj[i].value.length>0){
		     website.push(obj[i].value);
		}
    }
*/
