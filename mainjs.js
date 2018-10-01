// creates ul element
function createList() {
    let parent = document.querySelector("#todoApp-extension");
    let ul = document.createElement("ul");
    parent.appendChild(ul);
    let appFooter = document.querySelector("#todoFooter");
   // appFooter.style.display = "block";
    appFooter.style.display = "flex";
    
    
}

// creates li element
function addToList() {
    let parent = document.querySelector("#todoApp-extension ul");
    let li = document.createElement("li");
    let div1 = document.createElement("div");
    let checkbox = document.createElement('input');
    let label = document.createElement("label");
    let button = document.createElement("input");
    let textbox = document.querySelector("#newTodoTextbox");
    button.type = "button";
    button.value = "X";
    button.className = "deleteButton";
    checkbox.type = "checkbox";
    checkbox.checked = false;
    checkbox.className = "checkboxes";

    let newListContent = textbox.value;
    let result = "";
    while (newListContent.length > 0) {
    result += newListContent.substring(0, 30) + '\n';
    newListContent = newListContent.substring(30);
    }

    label.textContent = result;
    
    li.className = "listItem";

    li.appendChild(div1);
    div1.appendChild(checkbox);
    div1.appendChild(label);
    div1.appendChild(button);

    parent.appendChild(li);
    textbox.value = "";
}


function toggleAllButtonEventListener() {
    let toggleAll = document.querySelector("#btnToggleAll");

    toggleAll.addEventListener("click", event => {
        let checkAllStatus = false;
        let checkboxes = Array.from(document.querySelectorAll(".checkboxes"));
        for (i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked == true) {
                checkAllStatus = true;
            } else {
                checkAllStatus = false;
                break;
            }
        }
        if (checkAllStatus == true) {
            for (i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
        } else {
            for (i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
            }
        }
    });
}

// function adds eventlistener to the textbox enter keypress event
function textBoxEventListener() {
    let textBox = document.querySelector("#newTodoTextbox");

    textBox.addEventListener("keypress", event => {
        // make sure you cant add empty string to list
        // use !! boolean conversion to achieve this
        // essentially means convert to boolean then set false then back to true
        if(textBox.value != !!textBox.value.trim()){
            var key = event.which || event.keyCode;
            if (key == 13) {
                let ulExists = document.querySelector("#todoApp-extension ul");
                if (ulExists == null) {
                    createList();
                    addToList();
                    removeButtonEventListener();
                } else {
                    addToList();
                    removeButtonEventListener();
                }            
            }   
        }    
    });

}

function activeButtonEventListener(){
    let active = document.querySelector("#active");
    active.addEventListener("click", event =>{
    let activeList = Array.from(document.querySelectorAll(".checkboxes"));
    for(i = 0; i < activeList.length; i++){
        if(activeList[i].checked == true){
            // commented line below is for deleting the <li> rather than just hiding
          // activeList[i].parentNode.parentNode.parentNode.removeChild(activeList[i].parentNode.parentNode);
          activeList[i].parentNode.parentNode.style.display = "none"; // set <li> parent of activeList[i] to display:none
        }
        else{
          activeList[i].parentNode.parentNode.style.display = "block";  
        }
    }
    });
}

// all button in the footer functionality
function allButtonEventListener(){
    let all = document.querySelector("#all");
    all.addEventListener("click", event =>{
    let allList = Array.from(document.querySelectorAll(".checkboxes"));
    for(i = 0; i < allList.length; i++){
        allList[i].parentNode.parentNode.style.display = "block";
    }
    });
}

// remove button in the list functionality
function removeButtonEventListener(){
    let ul = document.querySelector("ul");

    // add eventlister to <ul> and add some event delegation
    // event.target is the child element that triggered the event <li> in the case of a <ul>
    // make sure the clicked element in the <li> is a button
    // delete <li> based off of the event.target
    ul.addEventListener("click", event=>{
        let selectedElementTagName = event.target.tagName;
        let selectedElement = event.target;
        if(selectedElementTagName == "INPUT" && selectedElement.type == "button"){
            selectedElement.parentNode.parentNode.parentNode.removeChild(selectedElement.parentNode.parentNode);
        }
    });
}


function inActiveButtonEventListener(){
    let inActive = document.querySelector("#completed");
    inActive.addEventListener("click", event =>{
    let inActiveList = Array.from(document.querySelectorAll(".checkboxes"));
    for(i = 0; i < inActiveList.length; i++){
        if(inActiveList[i].checked == false){
            // commented line below is for deleting the <li> rather than just hiding
          // activeList[i].parentNode.parentNode.parentNode.removeChild(activeList[i].parentNode.parentNode);
          inActiveList[i].parentNode.parentNode.style.display = "none"; // set <li> parent of activeList[i] to display:none
        }
        else{
            inActiveList[i].parentNode.parentNode.style.display = "block";  
          }
    }
    });
}

function deleteInActiveButtonEventListener(){
    let active = document.querySelector("#clearCompleted");
    active.addEventListener("click", event =>{
    let activeList = Array.from(document.querySelectorAll(".checkboxes"));
    for(i = 0; i < activeList.length; i++){
        if(activeList[i].checked == true){
            // commented line below is for deleting the <li> rather than just hiding
          activeList[i].parentNode.parentNode.parentNode.removeChild(activeList[i].parentNode.parentNode);
          //activeList[i].parentNode.parentNode.style.display = "none"; // set <li> parent of activeList[i] to display:none
        }
    }
    });
}


deleteInActiveButtonEventListener();
inActiveButtonEventListener();
textBoxEventListener();
toggleAllButtonEventListener();
activeButtonEventListener();
allButtonEventListener();