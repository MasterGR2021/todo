// pushing element itself

let allTasks = [];
let completedTasks = [];
let mode = 'All';
var firstTimeVisited = localStorage.getItem("firstTimeVisited");

const addNewTask = (e) => {

    e.preventDefault();

    const inputVal = document.getElementById('newTask');

    const inputText = newTask.value;

    if(allTasks.includes(inputText)){
        alert('cannot enter same tasks twice!!');
        inputVal.value = ''; //clearing input field
    }
    else{

        inputVal.value = ''; //clearing input field
    
        if(inputText == ''){
            alert('Pls add some task before adding them!!!');
        }
        else{
    
            const taskInfoDIV = document.createElement('div');
            taskInfoDIV.classList.add('task-info');
            
            const spanDIV = document.createElement('span');
            spanDIV.innerText = inputText;
        
            const taskOperationsDIV = document.createElement('div');
            taskOperationsDIV.classList.add('task-operations');
        
            const doneButton = document.createElement('button');
            const deleteButton = document.createElement('button');
        
            const doneImage = new Image();
            doneImage.src = "/icons/done.svg";
            doneImage.alt = "mark done";
            
            const deleteImage = new Image();
            deleteImage.src = "/icons/trash.svg";
            deleteImage.alt = "delete task";
        
            doneButton.appendChild(doneImage);
            deleteButton.appendChild(deleteImage);
        
            doneButton.classList.add('markdone');
            deleteButton.classList.add('deletetask');
        
            taskOperationsDIV.appendChild(doneButton);
            taskOperationsDIV.appendChild(deleteButton);
        
            taskInfoDIV.appendChild(spanDIV);
        
            const taskDIV = document.createElement('div');
            taskDIV.classList.add('task');
        
            taskDIV.appendChild(taskInfoDIV);
            taskDIV.appendChild(taskOperationsDIV);
        
            taskContainer.appendChild(taskDIV);
        
            allTasks.push(inputText);
            
            saveToLocalStorage();

        }

    }

}

const checkForUserActions = (e) => {

    const buttonClicked = e.target.classList[0];
    
    const actionOnDiv = e.target.parentNode.parentNode;

    const taskOfDivClicked = e.target.parentNode.parentNode.children[0].children[0].innerText;

    if(buttonClicked == 'markdone') {

        actionOnDiv.classList.toggle('mark-as-done');

        if(completedTasks.includes(taskOfDivClicked)){

            completedTasks = completedTasks.filter(item => item !== taskOfDivClicked);

        }
        else{

            completedTasks.push(taskOfDivClicked);

        }

        if(mode == 'Due') {

            actionOnDiv.classList.add('mark-as-deleted');

            actionOnDiv.addEventListener('transitionend', actionOnDiv.remove);

        }
        else if(mode == 'Done') {

            actionOnDiv.classList.remove('mark-as-done');

            actionOnDiv.classList.add('mark-as-deleted');

            actionOnDiv.addEventListener('transitionend', actionOnDiv.remove);

        }

    }
    else if(buttonClicked == 'deletetask'){

        actionOnDiv.classList.add('mark-as-deleted');

        allTasks = allTasks.filter(item => item !== taskOfDivClicked);

        completedTasks = completedTasks.filter(item => item !== taskOfDivClicked);

        actionOnDiv.addEventListener('transitionend', actionOnDiv.remove);

    }

    saveToLocalStorage();
}

const saveToLocalStorage = () => {

    localStorage.setItem("allTasks",JSON.stringify(allTasks));

    localStorage.setItem("completedTasks",JSON.stringify(completedTasks));

}

const createNewTaskDIV = (allTasksItem) => {

    const taskInfoDIV = document.createElement('div');
    taskInfoDIV.classList.add('task-info');
    
    const spanDIV = document.createElement('span');
    spanDIV.innerText = allTasksItem;

    const taskOperationsDIV = document.createElement('div');
    taskOperationsDIV.classList.add('task-operations');

    const doneButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    const doneImage = new Image();
    doneImage.src = "/icons/done.svg";
    doneImage.alt = "mark done";
    
    const deleteImage = new Image();
    deleteImage.src = "/icons/trash.svg";
    deleteImage.alt = "delete task";

    doneButton.appendChild(doneImage);
    deleteButton.appendChild(deleteImage);

    doneButton.classList.add('markdone');
    deleteButton.classList.add('deletetask');

    taskOperationsDIV.appendChild(doneButton);
    taskOperationsDIV.appendChild(deleteButton);

    taskInfoDIV.appendChild(spanDIV);

    const taskDIV = document.createElement('div');
    taskDIV.classList.add('task');

    taskDIV.appendChild(taskInfoDIV);
    taskDIV.appendChild(taskOperationsDIV);

    taskContainer.appendChild(taskDIV);

}

const renderTasksFromLocalStorage = () => {

    navbarHeading.innerText = localStorage.getItem('userName');

    if(localStorage.getItem("allTasks") == null) {

        allTasks = [];
    }
    else{

        allTasks = JSON.parse(localStorage.getItem("allTasks"));
        
        completedTasks = JSON.parse(localStorage.getItem("completedTasks"));

    }

    allTasks.forEach( function(allTasksItem) {

        createNewTaskDIV(allTasksItem);
    
    });

    const taskDIVs = [...taskContainer.children];

    taskDIVs.forEach(function(task) {

        const taskText = task.children[0].children[0].innerText;

        if(completedTasks.includes(taskText)){

            task.classList.toggle('mark-as-done');

        }

    });

}

const openMenu = () => {

    menuDropdown.classList.toggle('opened');

    menuBtn.classList.toggle('opened');

    overlay.classList.toggle('opened');

}

const clearAllTasks = () => {

    const allTasksDIVs = [...taskContainer.children]

    allTasksDIVs.forEach(function(task){

        task.remove();

    })

}

const filterByAll = () => {

    clearAllTasks();

    allTasks.forEach(function(allTasksItem){

        createNewTaskDIV(allTasksItem);

    });

    const currentAllTasks = [...taskContainer.children];

    currentAllTasks.forEach(function(currentAllTasksItem){

        if(completedTasks.includes(currentAllTasksItem.children[0].children[0].innerText)){

            currentAllTasksItem.classList.add('mark-as-done');

        }

    });

}

const filterByDone = () => {

    clearAllTasks();

    completedTasks.forEach(function(completedTasksItem){

        createNewTaskDIV(completedTasksItem);
        
    });
    
    const currentAllTasks = [...taskContainer.children]

    currentAllTasks.forEach(function(currentAllTasksItem){

        currentAllTasksItem.classList.add('mark-as-done-light');

    });
    
}

const filterByDue = () => {

    clearAllTasks();

    allTasks.forEach(function(allTasksItem){

        if(!completedTasks.includes(allTasksItem)){

            createNewTaskDIV(allTasksItem);

        }

    });

}

const runFilterCheck = (menuItem) => {

    const chosenMenuOptionDIV = menuItem.target;

    const allOptions = [...menuItems.children]

    allOptions.forEach(function(option){

        option.classList.remove('active');

    });

    if(chosenMenuOptionDIV.innerText == 'All'){

        mode = 'All';

        chosenMenuOptionDIV.classList.add('active');

        filterByAll();

    }
    else if(chosenMenuOptionDIV.innerText == 'Done'){

        mode = 'Done';

        chosenMenuOptionDIV.classList.add('active');

        filterByDone();

    }
    else if(chosenMenuOptionDIV.innerText == 'Due'){

        mode = 'Due';

        chosenMenuOptionDIV.classList.add('active');

        filterByDue();

    }
    else if(chosenMenuOptionDIV.innerText == 'Delete All'){

        const allTasksDIVs = [...taskContainer.children];

        allTasksDIVs.forEach(function(taskDIV) {

            taskDIV.classList.add('mark-as-deleted');

            taskDIV.addEventListener('transitionend', taskDIV.remove);
            
        });
        
        allTasks = []

        completedTasks = []

        saveToLocalStorage();

    }

}
 
const userNameElement = document.getElementById('userName');

const navbarHeading = document.getElementById('navbarHeading');

const submitUserName = document.getElementById('submitUserName');

submitUserName.addEventListener('click', function(e){

    e.preventDefault();
    navbarHeading.innerText = userNameElement.value;
    overlayFirst.classList.add('opened');
    localStorage.setItem('userName', userNameElement.value);

});

const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', addNewTask);

const taskContainer = document.getElementById('taskContainer');

taskContainer.addEventListener('click', checkForUserActions);

const menuBtn = document.getElementById('menuBtn');

const menuDropdown = document.getElementById('menuDropdown');

menuBtn.addEventListener('click', openMenu);

const menuItems = document.getElementById('menuItems');

// set all as default active
menuItems.children[0].classList.add('active');

menuItems.addEventListener('click', runFilterCheck);

window.onload = renderTasksFromLocalStorage

const overlayFirst = document.getElementById('overlayFirst');

if(firstTimeVisited == null) {

    localStorage.setItem('firstTimeVisited', '1');
    overlayFirst.classList.remove('opened');
    allTasks.push('Test (click on the check to mark this task completed or the delete button to remove this task from list)');
    saveToLocalStorage();

}
else {

    overlayFirst.classList.add('opened');

}
