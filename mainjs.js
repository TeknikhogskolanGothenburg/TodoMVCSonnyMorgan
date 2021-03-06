// A Global to store options of sorting.
const footerButton = {
    ALL: "all",
    ACTIVE: "active",
    COMPLETED: "completed"
};
//Start Default option of "ALL"
let chosenFooterButton = footerButton.ALL;

// creates ul element
function createList() {
    let parent = document.querySelector("#todo-app-extension");
    let ul = document.createElement("ul");
    parent.appendChild(ul);
    const appFooter = document.querySelector("#todo-footer");
    appFooter.style.visibility = "visible";
    let toggleAll = document.querySelector("#button-toggle-all");
    toggleAll.style.display = "block";
    const clearCompleted = document.querySelector("#clear-completed");
    clearCompleted.style.display = "none";

}

// creates li element
function addToList() {
    let parent = document.querySelector("#todo-app-extension ul");
    let li = document.createElement("li");
    let div1 = document.createElement("div");
    let checkbox = document.createElement('input');
    let label = document.createElement("label");
    let button = document.createElement("input");
    let textbox = document.querySelector("#new-todo-textbox");
    
    button.type = "button";
    button.value = "X";
    button.className = "deleteButton";
    checkbox.type = "checkbox";
    checkbox.checked = false;
    checkbox.className = "checkboxes";

    let newListContent = textbox.value;
    label.textContent = newListContent;
    
    li.className = "listItem";
    
    li.appendChild(div1);
    div1.appendChild(checkbox);
    div1.appendChild(label);
    div1.appendChild(button);
    parent.appendChild(li);
    
 
    textbox.value = "";
    countItemsLeftToDo();
    toggleTodoFooter();
    fullOpacityToggleAllButton();
    persistantSort();
    contentEditableOnDoubleClick(label);
    
}

// remove button in the list functionality
function removeButtonEventListener() {
    let ul = document.querySelector("ul");

    // add eventlister to <ul> and add some event delegation
    // event.target is the child element that triggered the event <li> in the case of a <ul>
    // make sure the clicked element in the <li> is a button
    // delete <li> based off of the event.target
    ul.addEventListener("click", event => {
        let selectedElementTagName = event.target.tagName;
        let selectedElement = event.target;

        if (selectedElementTagName == "INPUT" && selectedElement.type == "button") {

            selectedElement.parentNode.parentNode.parentNode.removeChild(selectedElement.parentNode.parentNode);
            let listExists = Array.from(document.querySelectorAll("li"));
            if (listExists.length <= 0) {
                let parent = document.querySelector("#todoApp-extension");
                parent.removeChild(ul);
                let toggleAll = document.querySelector("#btnToggleAll");
                toggleAll.style.display = "none";
                let footer = document.querySelector("#todoFooter");
                footer.style.display = "none";
                let textBox = document.querySelector("#newTodoTextbox");
                textBox.style.paddingLeft = "82px";
            }
        }
    });
}

function contentEditableOnDoubleClick(label) {
    label.addEventListener("dblclick",()=>{
        label.contentEditable='true';
        label.focus();
        label.style.outline = "solid";
        label.style.outlineColor= "darkGrey";
        label.addEventListener("keypress", (e) => {
            let key = e.which || e.keyCode;
            if (key ===13) {
                label.contentEditable='false';
                label.style.outline = "none";  
            }
        });

    });
}

function toggleAllButtonEventListener() {
    let toggleAll = document.querySelector("#button-toggle-all");

    toggleAll.addEventListener("click", () => {
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
            let toggleAllBtnImg = document.querySelector("#button-toggle-all img");
            toggleAllBtnImg.style.opacity = "0.5";

        } else {
            for (i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
            }
            let toggleAllBtnImg = document.querySelector("#button-toggle-all img");
            toggleAllBtnImg.style.opacity = "1";
        }
    });
}

// function adds eventlistener to the textbox enter keypress event
function textBoxEventListener() {
    let textBox = document.querySelector("#new-todo-textbox");

    textBox.addEventListener("keypress", event => {
        // make sure you cant add empty string to list
        // use !! boolean conversion to achieve this
        // essentially means convert to boolean then set false then back to true
        if (textBox.value != !!textBox.value.trim()) {
            var key = event.which || event.keyCode;
            if (key == 13) {
                let ulExists = document.querySelector("#todo-app-extension ul");
                if (ulExists == null) {
                    createList();
                    addToList();

                    removeButtonEventListener();
                    textBox.style.paddingLeft = "40px";
                } else {
                    addToList();

                    removeButtonEventListener();
                    textBox.style.paddingLeft = "40px";
                }
            }
        }
    });

}

function activeButtonEventListener() {
    let active = document.querySelector("#active");
    active.addEventListener("click", () => {
        activeButtonClick();
    });
}

function activeButtonClick(){
        chosenFooterButton = footerButton.ACTIVE;

        let activeList = Array.from(document.querySelectorAll(".checkboxes"));
        for (i = 0; i < activeList.length; i++) {
            if (activeList[i].checked == true) {              
                activeList[i].parentNode.parentNode.style.display = "none"; // set <li> parent of activeList[i] to display:none
            } else {
                activeList[i].parentNode.parentNode.style.display = "block";
            }
        }
}

// all button in the footer functionality
function allButtonEventListener() {
    let all = document.querySelector("#all");
    
    all.addEventListener("click", () => {
        allButtonClick();
    });
}

function allButtonClick(){
    chosenFooterButton = footerButton.ALL;
        let allList = Array.from(document.querySelectorAll(".checkboxes"));
        for (i = 0; i < allList.length; i++) {
            allList[i].parentNode.parentNode.style.display = "block";
        }
}

// remove button in the list functionality
function removeButtonEventListener() {
    let ul = document.querySelector("ul");

    // add eventlister to <ul> and add some event delegation
    // event.target is the child element that triggered the event <li> in the case of a <ul>
    // make sure the clicked element in the <li> is a button
    // delete <li> based off of the event.target
    ul.addEventListener("click", event => {
        let selectedElementTagName = event.target.tagName;
        let selectedElement = event.target;

        if (selectedElementTagName == "INPUT" && selectedElement.type == "button") {

            selectedElement.parentNode.parentNode.parentNode.removeChild(selectedElement.parentNode.parentNode);
            let listExists = Array.from(document.querySelectorAll("li"));
            if (listExists.length <= 0) {
                let parent = document.querySelector("#todo-app-extension");
                parent.removeChild(ul);
                let toggleAll = document.querySelector("#button-toggle-all");
                toggleAll.style.display = "none";
                let footer = document.querySelector("#todo-footer");
                footer.style.visibility = "hidden"
                let textBox = document.querySelector("#new-todo-textbox");
                textBox.style.paddingLeft = "82px";
            }
        }
    });
}


function inActiveButtonEventListener() {
    let inActive = document.querySelector("#completed");
    inActive.addEventListener("click", () => {
        inActiveButtonClick();
    });
}

function inActiveButtonClick(){
    chosenFooterButton = footerButton.COMPLETED;
    let inActiveList = Array.from(document.querySelectorAll(".checkboxes"));
    for (i = 0; i < inActiveList.length; i++) {
        if (inActiveList[i].checked == false) {               
            inActiveList[i].parentNode.parentNode.style.display = "none"; // set <li> parent of activeList[i] to display:none
        } else {
            inActiveList[i].parentNode.parentNode.style.display = "block";
        }
    }
}

function deleteInActiveButtonEventListener() {
    let active = document.querySelector("#clear-completed");
    active.addEventListener("click", () => {
        let activeList = Array.from(document.querySelectorAll(".checkboxes"));
        for (i = 0; i < activeList.length; i++) {
            if (activeList[i].checked == true) {
                activeList[i].parentNode.parentNode.parentNode.removeChild(activeList[i].parentNode.parentNode);               
            }
        }
    });
}

//Things to be altered constantly on click
function updateOnClick() {
    const wholeAppArea = document.querySelectorAll('.todo-app');
    wholeAppArea.forEach(area => area.addEventListener('click', event =>
        countItemsLeftToDo() |
        toggleVisibilityClearCompleteButton() |
        toggleTodoFooter() |
        fullOpacityToggleAllButton() |
        persistantSort()

    ))
}

function toggleTodoFooter() {
    const activeList = Array.from(document.querySelectorAll(".checkboxes"));
    const appFooter = document.querySelector("#todo-footer");

    if (activeList.length == 0) {
        appFooter.style.display = "none";
    } else {
        appFooter.style.display = "block";
    }

}

function countItemsLeftToDo() {

    const lableForResult = document.querySelector("#items-left");
    const activeList = Array.from(document.querySelectorAll(".checkboxes"));
    let result = 0;
    for (i = 0; i < activeList.length; i++) {
        if (activeList[i].checked == false) {
            result++;
        }
    }
    lableForResult.textContent = `${result} items left `;
}

function toggleVisibilityClearCompleteButton() {

    const activeList = Array.from(document.querySelectorAll(".checkboxes"));

    let checkedBoxes = 0;
    for (i = 0; i < activeList.length; i++) {
        if (activeList[i].checked == true) {
            checkedBoxes++;
        }
    }

    const clearCompleted = document.querySelector("#clear-completed");
    if (checkedBoxes == 0) {
        clearCompleted.style.display = "none";
    } else {
        clearCompleted.style.display = "flex";
    }
}

function fullOpacityToggleAllButton() {
    let toggleAllBtnImg = document.querySelector("#button-toggle-all img");
    let checkboxes = Array.from(document.querySelectorAll(".checkboxes"));

    for (i = 0; i < checkboxes.length; i++) {

        let checkAllStatus = true;
        for (j = 0; j < checkboxes.length; j++) {
            if (!checkboxes[j].checked) {
                checkAllStatus = false;
                toggleAllBtnImg.style.opacity = "0.5";
                toggleAllBtnImg.style.visibility = 'visible';
            }

            if (checkAllStatus == true) {
                toggleAllBtnImg.style.opacity = "1";
                toggleAllBtnImg.style.visibility = 'visible';
            } else {
                toggleAllBtnImg.style.opacity = "0.5";
                toggleAllBtnImg.style.visibility = 'visible';
            }
        }
    }
    if (checkboxes.length == 0) {
        toggleAllBtnImg.style.visibility = 'hidden';
    }
}

// this function is used to refresh the app based on selected footer button
function persistantSort() {
    let all = document.querySelector("#all");
    let active = document.querySelector("#active");
    let completed = document.querySelector("#completed");

    if (chosenFooterButton == footerButton.ALL) {
        all.style.textDecoration = 'underline';
        active.style.textDecoration = 'none';
        completed.style.textDecoration = 'none';
        allButtonClick();
    } else if (chosenFooterButton == footerButton.ACTIVE) {
        all.style.textDecoration = 'none';
        active.style.textDecoration = 'underline';
        completed.style.textDecoration = 'none';
        activeButtonClick();
    } else if (chosenFooterButton == footerButton.COMPLETED) {
        all.style.textDecoration = 'none';
        active.style.textDecoration = 'none';
        completed.style.textDecoration = 'underline';
        inActiveButtonClick();
    }

}

updateOnClick();
deleteInActiveButtonEventListener();
inActiveButtonEventListener();
textBoxEventListener();
toggleAllButtonEventListener();
activeButtonEventListener();
allButtonEventListener();