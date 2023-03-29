import './assets/styles/style.css';
import './assets/styles/normalize.css';
import { compareAsc, format, parseISO, isToday, parse, isThisWeek, isThisMonth } from 'date-fns'
import { renderPersonal, renderProjects, renderTasks } from './modules/dom-manip.js';


const taskFactory = (title, description, dueDate, priority, checked) => {
  return {title, description, dueDate, priority, checked};
}


//function for adding tasks to project
function addTaskToProject(task, project) {
  projectsList[project].push(task);
  localStorage.setItem('items', JSON.stringify(projectsList));
  console.log(localStorage);
}


//create project list and default project: Personal
let projectsList = {};
projectsList['Personal'] = [];
if (localStorage.items !== undefined) {
  projectsList = JSON.parse(localStorage.getItem('items'));
  console.log(JSON.parse(localStorage.getItem('items')));
}

//function for creating blank new user projects
function newProject(title) {
  projectsList[title] = [];
  localStorage.setItem('projects', JSON.stringify(Object.keys(projectsList)));
  console.log(localStorage);
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

//attach event listener to render all tasks
const navAll = document.getElementById('navAll');
navAll.addEventListener('click', renderTasks);


//attach event listener to render tasks due Today
const navToday = document.getElementById('navToday');
navToday.addEventListener('click', function() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  for (let project in projectsList) {
    for (let i = 0; i < projectsList[project].length; i++) {
      if (isToday(parse(projectsList[project][i].dueDate, 'MMM do, yyyy', new Date()))) {

        const task = document.createElement('div');
        task.classList.add('task-list-task');

        const title = document.createElement('div');
        title.classList.add('task-title');
        title.textContent = projectsList[project][i].title;

        const description = document.createElement('div');
        description.classList.add('task-description');
        description.textContent = projectsList[project][i].description;

        const date = document.createElement('div');
        date.classList.add('task-due-date');
        date.textContent = projectsList[project][i].dueDate;

        const prio = document.createElement('div');
        prio.classList.add('task-priority');
        prio.textContent = projectsList[project][i].priority;

        const checkboxDiv = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = projectsList[project][i].checked;
        checkbox.classList.add('task-checkbox');
        checkboxDiv.classList.add('checkbox-div');

        const del = document.createElement('button');
        del.classList.add('delete-task-button');
        del.textContent = '×';

        checkboxDiv.appendChild(del);
        checkboxDiv.appendChild(checkbox)
        task.appendChild(title);
        task.appendChild(description);
        task.appendChild(date);
        task.appendChild(prio);
        task.appendChild(checkboxDiv);
        taskList.appendChild(task);

        del.addEventListener('click', function(e) {
          //delete task node
          e.target.parentElement.parentElement.remove();
          //delete task from project
          for (let project in projectsList) {
            for (let i = 0; i < projectsList[project].length; i++) {
              if (e.target.parentElement.parentElement.children[0].innerText === projectsList[project][i].title) {
                projectsList[project].splice(i, 1);
              }
            }
          }
          console.log(projectsList);
        })
      }
    }
  }
})




//attach event listener to render tasks due This Week
const navThisWeek = document.getElementById('navThisWeek');
navThisWeek.addEventListener('click', function() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  for (let project in projectsList) {
    for (let i = 0; i < projectsList[project].length; i++) {
      if (isThisWeek(parse(projectsList[project][i].dueDate, 'MMM do, yyyy', new Date()))) {

        const task = document.createElement('div');
        task.classList.add('task-list-task');

        const title = document.createElement('div');
        title.classList.add('task-title');
        title.textContent = projectsList[project][i].title;

        const description = document.createElement('div');
        description.classList.add('task-description');
        description.textContent = projectsList[project][i].description;

        const date = document.createElement('div');
        date.classList.add('task-due-date');
        date.textContent = projectsList[project][i].dueDate;

        const prio = document.createElement('div');
        prio.classList.add('task-priority');
        prio.textContent = projectsList[project][i].priority;

        const checkboxDiv = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = projectsList[project][i].checked;
        checkbox.classList.add('task-checkbox');
        checkboxDiv.classList.add('checkbox-div');

        const del = document.createElement('button');
        del.classList.add('delete-task-button');
        del.textContent = '×';

        checkboxDiv.appendChild(del);
        checkboxDiv.appendChild(checkbox)
        task.appendChild(title);
        task.appendChild(description);
        task.appendChild(date);
        task.appendChild(prio);
        task.appendChild(checkboxDiv);
        taskList.appendChild(task);

        del.addEventListener('click', function(e) {
          //delete task node
          e.target.parentElement.parentElement.remove();
          //delete task from project
          for (let project in projectsList) {
            for (let i = 0; i < projectsList[project].length; i++) {
              if (e.target.parentElement.parentElement.children[0].innerText === projectsList[project][i].title) {
                projectsList[project].splice(i, 1);
              }
            }
          }
          console.log(projectsList);
        })
      }
    }
  }
})



//attach event listener to render tasks due This Month
const navThisMonth = document.getElementById('navThisMonth');
navThisMonth.addEventListener('click', function() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  for (let project in projectsList) {
    for (let i = 0; i < projectsList[project].length; i++) {
      if (isThisMonth(parse(projectsList[project][i].dueDate, 'MMM do, yyyy', new Date()))) {

        const task = document.createElement('div');
        task.classList.add('task-list-task');

        const title = document.createElement('div');
        title.classList.add('task-title');
        title.textContent = projectsList[project][i].title;

        const description = document.createElement('div');
        description.classList.add('task-description');
        description.textContent = projectsList[project][i].description;

        const date = document.createElement('div');
        date.classList.add('task-due-date');
        date.textContent = projectsList[project][i].dueDate;

        const prio = document.createElement('div');
        prio.classList.add('task-priority');
        prio.textContent = projectsList[project][i].priority;

        const checkboxDiv = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = projectsList[project][i].checked;
        checkbox.classList.add('task-checkbox');
        checkboxDiv.classList.add('checkbox-div');

        const del = document.createElement('button');
        del.classList.add('delete-task-button');
        del.textContent = '×';

        checkboxDiv.appendChild(del);
        checkboxDiv.appendChild(checkbox)
        task.appendChild(title);
        task.appendChild(description);
        task.appendChild(date);
        task.appendChild(prio);
        task.appendChild(checkboxDiv);
        taskList.appendChild(task);

        del.addEventListener('click', function(e) {
          //delete task node
          e.target.parentElement.parentElement.remove();
          //delete task from project
          for (let project in projectsList) {
            for (let i = 0; i < projectsList[project].length; i++) {
              if (e.target.parentElement.parentElement.children[0].innerText === projectsList[project][i].title) {
                projectsList[project].splice(i, 1);
              }
            }
          }
          console.log(projectsList);
        })
      }
    }
  }
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
  let low = document.createElement('option');
  low.textContent = 'LOW';
  let med = document.createElement('option');
  med.textContent = 'MED';
  let high = document.createElement('option');
  high.textContent = 'HIGH';

  prio.appendChild(low);
  prio.appendChild(med);
  prio.appendChild(high);
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

    const taskPrio = document.createElement('div');
    taskPrio.classList.add('task-priority');
    taskPrio.textContent = prio.value;
    task.appendChild(taskPrio);

    const checkboxDiv = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkboxDiv.classList.add('checkbox-div');
    checkboxDiv.appendChild(checkbox);
    task.appendChild(checkboxDiv);

    const del = document.createElement('button');
    del.classList.add('delete-task-button');
    del.textContent = '×';
    checkboxDiv.appendChild(del)
    task.appendChild(checkboxDiv);


    del.addEventListener('click', function(e) {
      //delete task node
      e.target.parentElement.parentElement.remove();
      //delete task from project
      for (let project in projectsList) {
        for (let i = 0; i < projectsList[project].length; i++) {
          if (e.target.parentElement.parentElement.children[0].innerText === projectsList[project][i].title) {
            projectsList[project].splice(i, 1);
          }
        }
      }
      console.log(projectsList);
    })

    taskList.appendChild(task);

    //add task to project array
    let newTask = taskFactory(title.value, description.value, format(parseISO(duedate.value), 'MMM do, yyyy'), prio.value, false);

    addTaskToProject(newTask, projectNode.value);
    console.log(projectsList);
    title.value = '';
    description.value = '';

  });
})


//Testing
// newProject('Work');

// let myTask1 = taskFactory('Homework', 'Odin Project To Do List', format(new Date(2023, 2, 23), 'MMM do, yyyy'), 'HIGH', false);

// let myTask2 = taskFactory('Buy supplies', '', format(new Date(2023, 2, 25), 'MMM do, yyyy'), 'LOW', false);

// let myTask3 = taskFactory('Defeat Gammamon', 'Gather your power...', format(new Date(2023, 2, 30), 'MMM do, yyyy'), 'MED', true);

// let myTask4 = taskFactory('Venture to Peru', '', format(new Date(2023, 5, 20), 'MMM do, yyyy'), 'LOW', false );






//update projects display
renderPersonal();
renderProjects();
renderTasks();


export {projectsList};