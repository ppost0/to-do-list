import './assets/styles/style.css';
import './assets/styles/normalize.css';
// import {buildDefaultProject} from './modules/build-default-project.js';
// import {renderDefaultProject} from './modules/dom-manip.js';


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

//render projects to list display
function renderProjects() {
  let projects = Object.keys(projectsList);
  for (let i = 0; i < projects.length; i++) {
    const navProjects = document.getElementById('navProjects');
    let current = document.createElement('div');
    current.textContent = projects[i];
    navProjects.appendChild(current);

  }

}






//function for new task button
function newTask() {

}


//attach event to open new item form
const navProjectsButton = document.getElementById('navProjectsButton');
navProjectsButton.addEventListener('click', function() {
  const newItemForm = document.getElementById('newItemForm');
  newItemForm.style.display = 'grid';
})

//attach event to close new item form
const formCloseBtn = document.getElementById('formCloseBtn');
formCloseBtn.addEventListener('click', function(e) {
  e.target.parentElement.style.display = 'none';
})

//attach event for new project button, should clear form and add inputs for new project function
const newProjectBtn = document.getElementById('newProjectBtn');
newProjectBtn.addEventListener('click', function(e) {
  const newItemForm = document.getElementById('newItemForm');
  document.getElementById('newProjectBtn').remove();
  document.getElementById('newTaskBtn').remove();


})







//Testing
newProject('Work');

let myTask1 = taskFactory('Homework', 'Odin Project To Do List', new Date(2023, 3, 20), 'HIGH', false);

let myTask2 = taskFactory('Buy clothes', '', new Date(2023, 3, 22, 'LOW', false));

projectsList['Personal'].push(myTask1);

console.log(projectsList, 'Projects List');

addTaskToProject(myTask2, 'Work');

//update projects display
renderProjects();


