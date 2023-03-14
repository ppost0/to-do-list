import './assets/styles/style.css';
import './assets/styles/normalize.css';
import { compareAsc, format } from 'date-fns'
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
  //remove title input and submit button if close button is clicked
  nodes.forEach((e) => {e.remove()});
})



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
  button.addEventListener('click', function(a) {
    if (title.value.length > 30) {
      alert('Excessively long project title may cause visibility issues.')
    }
    if (projectsList[title.value] !== undefined) {
      alert('Project title already exists.');
      title.value = '';
    } else if (title.value.length > 0) {
      newProject(title.value);
      title.value = '';
      renderProjects();
      const newItemForm = document.getElementById('newItemForm');
      newItemForm.style.display = 'none';
      let nodes = document.querySelectorAll('.inputs');
      //remove title input and submit button
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

  //description

  //duedate

  //priority

  //checkbox

  //delete btn

})





//Testing
newProject('Work');

let myTask1 = taskFactory('Homework', 'Odin Project To Do List', format(new Date(2023, 3, 20), 'MM-dd-yy'), 'HIGH', false);

let myTask2 = taskFactory('Buy clothes', '', format(new Date(2023, 3, 12), 'MM-dd-yy'), 'LOW', false);

projectsList['Personal'].push(myTask1);

addTaskToProject(myTask2, 'Work');

//update projects display
renderPersonal();
renderProjects();
renderTasks();


export {projectsList};