
// creates ul element
function createList() {
    let parent = document.querySelector("#todoApp-extension");
    let ul = document.createElement("ul");
    parent.appendChild(ul);
    let appFooter = document.querySelector("#todoFooter");
    appFooter.style.display = "block";
}

// creates li element
function addToList() {
    let parent = document.querySelector("#todoApp-extension ul");
    let li = document.createElement("li");
    let div1 = document.createElement("div");
    let checkbox = document.createElement('input');
    let label = document.createElement("label");
    let button = document.createElement("button");
    let textbox = document.querySelector("#newTodoTextbox");
   
    checkbox.type="checkbox";
    checkbox.checked = false;
    checkbox.className ="checkboxes";
    
    label.textContent = textbox.value;
    li.className = "listItem";

    li.appendChild(div1);
    div1.appendChild(checkbox);
    div1.appendChild(label);
    div1.appendChild(button);

    parent.appendChild(li);
    textbox.value = "";
}


function toggleAllButtonEventListener(){
    let toggleAll = document.querySelector("#btnToggleAll");
    
    toggleAll.addEventListener("click", event =>{
        let checkAllStatus = false;
        let checkboxes = Array.from(document.querySelectorAll(".checkboxes"));
        for(i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked == true){
            checkAllStatus = true;
        }
        else{
            checkAllStatus = false;
            break;
        }
        }
        if(checkAllStatus == true){
            for(i = 0; i < checkboxes.length; i++){
                checkboxes[i].checked = false;
            }
        }
        else{
            for(i = 0; i < checkboxes.length; i++){
                checkboxes[i].checked = true;
            }
        }
    });
}

// function adds eventlistener to the textbox enter keypress event
function textBoxEventListener() {
    let textBox = document.querySelector("#newTodoTextbox");

    textBox.addEventListener("keypress", event => {
        var key = event.which || event.keyCode;
        if (key == 13) {
            let ulExists = document.querySelector("#todoApp-extension ul");
            if (ulExists == null) {
                createList();
                addToList();
            } else {
                addToList();
            }
        }
    });

}

textBoxEventListener();
toggleAllButtonEventListener();