var filter = "All";

// creates ul element
function createList() {
    let parent = document.querySelector("#todoApp-extension");
    let ul = document.createElement("ul");
    parent.appendChild(ul);
    const appFooter = document.querySelector("#todoFooter");
    appFooter.style.display = "flex";
    let toggleAll = document.querySelector("#btnToggleAll");
    toggleAll.style.display = "block";
    //let textBox = document.querySelector("#btnToggleAll");
    const clearCompleted = document.querySelector("#clearCompleted");
    clearCompleted.style.display = "none";

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

    countItemsLeftToDo();
    toggleTodoFooter();
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
        if (textBox.value != !!textBox.value.trim()) {
            var key = event.which || event.keyCode;
            if (key == 13) {
                let ulExists = document.querySelector("#todoApp-extension ul");
                if (ulExists == null) {
                    createList();
                    addToList();
                    removeButtonEventListener();
                    checkBoxEventListener();
                    textBox.style.paddingLeft = "40px";
                } else {
                    addToList();
                    removeButtonEventListener();
                    checkBoxEventListener();
                    textBox.style.paddingLeft = "40px";
                }
            }
        }
    });

}

function activeButtonEventListener() {
    let active = document.querySelector("#active");
    active.addEventListener("click", event => {
        filter = "Active";
        let activeList = Array.from(document.querySelectorAll(".checkboxes"));
        for (i = 0; i < activeList.length; i++) {
            if (activeList[i].checked == true) {
                // commented line below is for deleting the <li> rather than just hiding
                // activeList[i].parentNode.parentNode.parentNode.removeChild(activeList[i].parentNode.parentNode);
                activeList[i].parentNode.parentNode.style.display = "none"; // set <li> parent of activeList[i] to display:none
            } else {
                activeList[i].parentNode.parentNode.style.display = "block";
            }
        }

    });
}

// all button in the footer functionality
function allButtonEventListener() {
    let all = document.querySelector("#all");
    all.addEventListener("click", event => {
        filter = "All";
        let allList = Array.from(document.querySelectorAll(".checkboxes"));
        for (i = 0; i < allList.length; i++) {
            allList[i].parentNode.parentNode.style.display = "block";
        }
    });
}

// remove button in the list functionality
function removeButtonEventListener() {
    let ul = document.querySelector("ul");
    let ulParent = document.querySelector("#todoApp-extension");

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


function inActiveButtonEventListener() {
    let inActive = document.querySelector("#completed");
    inActive.addEventListener("click", event => {
        filter = "Completed";
        let inActiveList = Array.from(document.querySelectorAll(".checkboxes"));
        for (i = 0; i < inActiveList.length; i++) {
            if (inActiveList[i].checked == false) {
                // commented line below is for deleting the <li> rather than just hiding
                // activeList[i].parentNode.parentNode.parentNode.removeChild(activeList[i].parentNode.parentNode);
                inActiveList[i].parentNode.parentNode.style.display = "none"; // set <li> parent of activeList[i] to display:none
            } else {
                inActiveList[i].parentNode.parentNode.style.display = "block";
            }
        }
    });
}

function deleteInActiveButtonEventListener() {
    let active = document.querySelector("#clearCompleted");
    active.addEventListener("click", event => {
        let activeList = Array.from(document.querySelectorAll(".checkboxes"));
        for (i = 0; i < activeList.length; i++) {
            if (activeList[i].checked == true) {
                // commented line below is for deleting the <li> rather than just hiding
                activeList[i].parentNode.parentNode.parentNode.removeChild(activeList[i].parentNode.parentNode);
                //activeList[i].parentNode.parentNode.style.display = "none"; // set <li> parent of activeList[i] to display:none
            }
        }
    });
}

//Things to be altered constantly on click

function itemsLefteventListener() {
    const wholeAppArea = document.querySelectorAll('.todoApp');
    wholeAppArea.forEach(area => area.addEventListener('click', event =>
        countItemsLeftToDo() |
        toggleVisibilityClearCompleteButton() |
        toggleTodoFooter()
    ))
}

function toggleTodoFooter() {
    const activeList = Array.from(document.querySelectorAll(".checkboxes"));
    const appFooter = document.querySelector("#todoFooter");

    if (activeList.length == 0) {
        appFooter.style.display = "none";
    } else {
        appFooter.style.display = "flex";
    }

}

function countItemsLeftToDo() {

    const lableForResult = document.querySelector("#itemsLeft");
    const activeList = Array.from(document.querySelectorAll(".checkboxes"));
    let result = 0;
    for (i = 0; i < activeList.length; i++) {
        if (activeList[i].checked == false) {
            result++;
        }
    }
    lableForResult.textContent = `${result} items left`;
}

function toggleVisibilityClearCompleteButton() {

    const activeList = Array.from(document.querySelectorAll(".checkboxes"));

    let checkedBoxes = 0;
    for (i = 0; i < activeList.length; i++) {
        if (activeList[i].checked == true) {
            checkedBoxes++;
        }
    }

    const clearCompleted = document.querySelector("#clearCompleted");
    if (checkedBoxes == 0) {
        clearCompleted.style.display = "none";
    } else {
        clearCompleted.style.display = "flex";
    }
}



function checkBoxEventListener() {
    let checkboxes = Array.from(document.querySelectorAll(".checkboxes"));
    let all = document.querySelector("#all");
    let active = document.querySelector("#active");
    let completed = document.querySelector("#completed");

    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", event => {
            if (filter == "All") {

                all.style.textDecoration='underline';
                active.style.textDecoration='none';
                completed.style.textDecoration='none';
                all.click();
               
            } else if (filter == "Active") {
                all.style.textDecoration='none';
                active.style.textDecoration='underline';
                completed.style.textDecoration='none';
                active.click();
            } else if (filter == "Completed") {
                all.style.textDecoration='none';
                active.style.textDecoration='none';
                completed.style.textDecoration='underline';
                completed.click();
            }
        });
    }
}



itemsLefteventListener();
deleteInActiveButtonEventListener();
inActiveButtonEventListener();
textBoxEventListener();
toggleAllButtonEventListener();
activeButtonEventListener();
allButtonEventListener();