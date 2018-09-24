
let toggleAll = document.querySelector("#btnToggleAll");

textBoxEventListener();


// function adds eventlistener to the textbox enter keypress event

function textBoxEventListener(){
    let textBox = document.querySelector("#newTodoTextbox");

    textBox.addEventListener("keypress", event =>{
        var key = event.which || event.keyCode;
        if (key == 13){
            let ulExists = document.querySelector("#todoApp-extension ul");
            if(ulExists == null){
                createList();
                addToList();
            }
            else{
                addToList();
            }
        }
        });
}

// creates ul element
function createList(){
    let parent = document.querySelector("#todoApp-extension");
    let ul = document.createElement("ul");
    parent.appendChild(ul);
    let appFooter = document.querySelector("#todoFooter");
    appFooter.style.display = "block";
}
// creates li element
function addToList(){
    let parent = document.querySelector("#todoApp-extension ul");
    let li = document.createElement("li");
    let div1 = document.createElement("div");
    let checkbox = document.createElement("checkbox");
    let label = document.createElement("label");
    let button = document.createElement("button");

    li.appendChild(div1);
    div1.appendChild(checkbox);
    div1.appendChild(label);
    div1.appendChild(button);
    
    parent.appendChild(li);
}