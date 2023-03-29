import {projectsList} from '../index.js';

function renderPersonal() {
  const navProjects = document.getElementById('navProjects');
  let pers = document.createElement('div');
  pers.textContent = 'Personal';
  pers.setAttribute('id', 'navPersonal');
  pers.classList.add('project-personal');
  navProjects.appendChild(pers);

  pers.addEventListener('click', function() {
    let tasks = projectsList.Personal;
    //remove rendered tasks
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    //render each task in Personal project to display
    tasks.forEach(function(todo) {
      const task = document.createElement('div');
      task.classList.add('task-list-task');

      const title = document.createElement('div');
      title.classList.add('task-title');
      title.textContent = todo.title;

      const description = document.createElement('div');
      description.classList.add('task-description');
      description.textContent = todo.description;

      const date = document.createElement('div');
      date.classList.add('task-due-date');
      date.textContent = todo.dueDate;

      const prio = document.createElement('div');
      prio.classList.add('task-priority');
      prio.textContent = todo.priority;

      const checkboxDiv = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.checked;
      checkbox.classList.add('task-checkbox');
      checkboxDiv.classList.add('checkbox-div');

      const del = document.createElement('button');
      const delDiv = document.createElement('div');
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
        localStorage.setItem('items', JSON.stringify(projectsList));
        console.log(projectsList);
      })
    })
  });
}

//render projects to projects navlist display
function renderProjects() {
  //remove already listed projects
  let oldNodes = document.querySelectorAll('.project-list-project');
  oldNodes.forEach((e) => {e.remove()});
  let projects = Object.keys(projectsList);

  //add projects to list with delete buttons
  for (let i = 1; i < projects.length; i++) {
    const navProjects = document.getElementById('navProjects');

    let current = document.createElement('div');
    current.textContent = projects[i];
    current.classList.add('project-list-project');
    current.addEventListener('click', renderSpecificProject)

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-button');
    deleteBtn.innerText = '×';

    deleteBtn.addEventListener('click', function(e) {
      //remove project node
      e.target.parentElement.remove();
      //delete project from projectsList object
      delete projectsList[e.target.parentElement.innerText.slice(0, e.target.parentElement.innerText.length-1)];
      //remove from storage
      localStorage.setItem('items', JSON.stringify(projectsList));
      console.log(projectsList);
      renderTasks();
      e.stopPropagation();
    });

    current.appendChild(deleteBtn);
    navProjects.appendChild(current);
    console.log('Current projects in Projects List: ', projectsList);
  }
}


//render tasks to display
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  //iterate through tasks of each project in project list
  for (let project in projectsList) {
    for (let i = 0; i < projectsList[project].length; i++) {
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
        localStorage.setItem('items', JSON.stringify(projectsList));
        console.log(projectsList);
      })
    }
  }
}

//Render project-specific tasks
function renderSpecificProject(e) {
  let current = e.target.innerText.slice(0,e.target.innerText.length-2);
  //clear tasks
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  projectsList[current].forEach(function(todo) {
    const task = document.createElement('div');
    task.classList.add('task-list-task');

    const title = document.createElement('div');
    title.classList.add('task-title');
    title.textContent = todo.title;

    const description = document.createElement('div');
    description.classList.add('task-description');
    description.textContent = todo.description;

    const date = document.createElement('div');
    date.classList.add('task-due-date');
    date.textContent = todo.dueDate;

    const prio = document.createElement('div');
    prio.classList.add('task-priority');
    prio.textContent = todo.priority;

    const checkboxDiv = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.checked;
    checkbox.classList.add('task-checkbox');
    checkboxDiv.classList.add('checkbox-div');

    const del = document.createElement('button');
    const delDiv = document.createElement('div');
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
  })
  e.stopPropagation();
}













export {renderPersonal, renderProjects, renderTasks};