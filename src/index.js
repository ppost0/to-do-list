import './assets/styles/style.css';
import './assets/styles/normalize.css';



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

//render projects to projects navlist display
function renderProjects() {
  let oldNodes = document.querySelectorAll('.project-list-project');
  oldNodes.forEach((e) => {e.remove()});
  let projects = Object.keys(projectsList);
  for (let i = 0; i < projects.length; i++) {
    const navProjects = document.getElementById('navProjects');
    let current = document.createElement('div');
    current.textContent = projects[i];
    current.classList.add('project-list-project');
    navProjects.appendChild(current);
  }
}






//function for new task button
function newTask() {

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
})



//new project button, should clear form and add inputs for new project function
const newProjectBtn = document.getElementById('newProjectBtn');
newProjectBtn.addEventListener('click', function(e) {
  const newItemForm = document.getElementById('newItemForm');
  document.getElementById('newProjectBtn').style.display = 'none';
  document.getElementById('newTaskBtn').style.display = 'none';

  //title for new project
  let title = document.createElement('input');
  title.setAttribute('type', 'text');
  title.setAttribute('name', 'title');
  title.setAttribute('placeholder', 'New Project Title');

  //submit button
  let button = document.createElement('button');
  button.textContent = 'Submit';
  button.style.height = '50px';
  button.style.width = '100px';
  button.type = 'button';

  //click submit button
  button.addEventListener('click', function(a) {
    if (title.value.length > 1) {
      newProject(title.value);
      title.value = '';
      renderProjects();
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


})





//Testing
newProject('Work');

let myTask1 = taskFactory('Homework', 'Odin Project To Do List', new Date(2023, 3, 20), 'HIGH', false);

let myTask2 = taskFactory('Buy clothes', '', new Date(2023, 3, 22, 'LOW', false));

projectsList['Personal'].push(myTask1);

console.table('Projects List: ', projectsList);

addTaskToProject(myTask2, 'Work');

//update projects display
renderProjects();


