import './assets/styles/style.css';
import './assets/styles/normalize.css';
import { compareAsc, format, parseISO } from 'date-fns'
import { renderPersonal, renderProjects, renderTasks } from './modules/dom-manip.js';


const taskFactory = (title, description, dueDate, priority, checked) => {
  return {title, description, dueDate, priority, checked};
}


//function for adding tasks to project
function addTaskToProject(task, project) {
  projectsList[project].push(task);
}


//create project list and default project: Personal
let projectsList = {};
projectsList['Personal'] = [];

//function for creating blank new user projects
function newProject(title) {
  projectsList[title] = [];
}


//open new item form
const navProjectsButton = document.getElementById('navProjectsButton');
navProjectsButton.addEventListener('click', function() {
  const newItemForm = document.getElementById('newItemForm');
  newItemForm.style.display = 'grid';
  const newProjectBtn = document.getElementById('newProjectBtn');
  newProjectBtn.style.display = 'block';
  const newTaskBtn = document.getElementById('newTaskBtn');
  newTaskBtn.style.display = 'block';
})

//close new item form
const formCloseBtn = document.getElementById('formCloseBtn');
formCloseBtn.addEventListener('click', function(e) {
  e.target.parentElement.style.display = 'none';
  let nodes = document.querySelectorAll('.inputs');
  let taskNodes = document.querySelectorAll('.inputs-task');
  //remove title input and submit button if close button is clicked
  nodes.forEach((e) => {e.remove()});
  taskNodes.forEach((e) => {e.remove()});
})


const navAll = document.getElementById('navAll');
navAll.addEventListener('click', renderTasks);



//new project button, should clear form and add inputs for new project
const newProjectBtn = document.getElementById('newProjectBtn');
newProjectBtn.addEventListener('click', function(e) {
  const newItemForm = document.getElementById('newItemForm');
  document.getElementById('newProjectBtn').style.display = 'none';
  document.getElementById('newTaskBtn').style.display = 'none';

  //title for new project
  let title = document.createElement('input');
  title.setAttribute('type', 'text');
  title.setAttribute('name', 'title');
  title.style.height = '50px';
  title.setAttribute('placeholder', 'New Project Title...');
  title.classList.add('inputs');

  //submit button
  let button = document.createElement('button');
  button.textContent = 'Add Project';
  button.style.height = '50px';
  button.style.width = '100px';
  button.type = 'button';
  button.classList.add('inputs');

  //click submit button
  button.addEventListener('click', function() {
    if (title.value.length > 30) {
      alert('Excessively long project title may cause visibility issues.')
    }

    if (title.value in projectsList) {
      title.value = '';
      alert('Project already exists.');

    } else if (parseInt(title.value[0]) >= 0 || parseInt(title.value[0]) <= 9 ) {
        alert('Please start the project title with a letter.')
        title.value = '';
    } else if (title.value.length > 0) {
      newProject(title.value);
      title.value = '';
      renderProjects();

      const newItemForm = document.getElementById('newItemForm');
      newItemForm.style.display = 'none';

      //remove title input and submit button
      let nodes = document.querySelectorAll('.inputs');
      nodes.forEach((e) => {e.remove()});
    }
  })

  newItemForm.appendChild(title);
  newItemForm.appendChild(button);
})

//attach event for new task button, should clear form and add inputs for new task function
const newTaskBtn = document.getElementById('newTaskBtn');
newTaskBtn.addEventListener('click', function(e) {
  const newItemForm = document.getElementById('newItemForm');
  document.getElementById('newProjectBtn').style.display = 'none';
  document.getElementById('newTaskBtn').style.display = 'none';

  //title
  let title = document.createElement('input');
  title.setAttribute('type', 'text');
  title.setAttribute('name', 'title');
  title.setAttribute('placeholder', 'New Task Title...');
  title.classList.add('inputs-task');
  newItemForm.appendChild(title);

  //description
  let description = document.createElement('input');
  description.setAttribute('type', 'text');
  description.setAttribute('name', 'description');
  description.style.height = '100px';
  description.setAttribute('placeholder', 'Description...');
  description.classList.add('inputs-task');
  newItemForm.appendChild(description);

  //duedate
  let duedate = document.createElement('input');
  duedate.setAttribute('type', 'date');
  duedate.classList.add('inputs-task');
  newItemForm.appendChild(duedate);

  //priority
  let prio = document.createElement('select');
  prio.classList.add('inputs-task')
  let high = document.createElement('option');
  high.textContent = 'HIGH';
  let med = document.createElement('option');
  med.textContent = 'MED';
  let low = document.createElement('option');
  low.textContent = 'LOW';
  prio.appendChild(high);
  prio.appendChild(med);
  prio.appendChild(low);
  newItemForm.appendChild(prio);

  //project select
  let projectNode = document.createElement('select');
  projectNode.classList.add('inputs-task');
  for (let project in projectsList) {
    let currentNode = document.createElement('option');
    currentNode.textContent = project;
    projectNode.appendChild(currentNode);
  }
  newItemForm.appendChild(projectNode);

  //submit button
  let submit = document.createElement('button');
  submit.classList.add('inputs-task')
  submit.textContent = 'Add Task';
  submit.style.height = '30px';
  submit.setAttribute('type', 'button');
  newItemForm.appendChild(submit);

  //submit button event listener
  submit.addEventListener('click', function() {
    //add task to DOM
    let taskList = document.getElementById('taskList');
    let task = document.createElement('div');
    task.classList.add('task-list-task');

    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = title.value;
    task.appendChild(taskTitle);

    const taskDescription = document.createElement('div');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = description.value;
    task.appendChild(taskDescription);

    const taskDate = document.createElement('div');
    taskDate.classList.add('task-due-date');
    taskDate.textContent = format(parseISO(duedate.value), 'MMM do, yyyy');
    task.appendChild(taskDate);

    taskList.appendChild(task);

    //add task to project array

  });
})


//Testing
newProject('Work');

let myTask1 = taskFactory('Homework', 'Odin Project To Do List', format(new Date(2023, 3, 9), 'MMM do, yyyy'), 'HIGH', false);

let myTask2 = taskFactory('Buy supplies', '', format(new Date(2023, 3, 12), 'MMM do yyyy'), 'LOW', false);

let myTask3 = taskFactory('Defeat Gammamon', 'Gather your power...', format(new Date(2023, 3, 14), 'MMM do, yyyy'), 'MED', true);

let myTask4 = taskFactory('Venture to Peru', '', format(new Date(2023, 5, 20), 'MMM do, yyyy'), 'LOW', false );

let myTask5 = taskFactory('a');
let myTask6 = taskFactory('b');
let myTask7 = 'c';
let myTask8 = 'd';
let myTask9 = 'e';
let myTask10 = 'f';
let myTask11 = 'g';
let myTask12 = 'h';
let myTask13 = 'i';
let myTask14 = 'j';
let myTask15 = 'k';
let myTask16 = 'l';
let myTask17 = 'm';
let myTask18 = 'n';




addTaskToProject(myTask1, 'Personal');
addTaskToProject(myTask2, 'Work');
addTaskToProject(myTask3, 'Personal');
addTaskToProject(myTask4, 'Personal');
// addTaskToProject(myTask5, 'Personal');
// addTaskToProject(myTask6, 'Personal');
// addTaskToProject(myTask7, 'Personal');
// addTaskToProject(myTask8, 'Personal');
// addTaskToProject(myTask9, 'Personal');
// addTaskToProject(myTask10, 'Personal');
// addTaskToProject(myTask11, 'Personal');
// addTaskToProject(myTask12, 'Personal');
// addTaskToProject(myTask13, 'Personal');
// addTaskToProject(myTask14, 'Personal');
// addTaskToProject(myTask15, 'Personal');
// addTaskToProject(myTask16, 'Personal');
// addTaskToProject(myTask17, 'Personal');
// addTaskToProject(myTask18, 'Personal');



//update projects display
renderPersonal();
renderProjects();
renderTasks();


export {projectsList};