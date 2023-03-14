import {projectsList} from '../index.js';

function renderPersonal() {
  const navProjects = document.getElementById('navProjects');
  let pers = document.createElement('div');
  pers.textContent = 'Personal';
  navProjects.appendChild(pers);
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

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-button');
    deleteBtn.innerText = '×';

    deleteBtn.addEventListener('click', function(e) {
      //remove project node
      e.target.parentElement.remove();
      //delete project from projectsList object
      delete projectsList[e.target.parentElement.innerText.slice(0, e.target.parentElement.innerText.length-1)];
      console.log(projectsList);
      renderTasks();
    });

    current.appendChild(deleteBtn);
    navProjects.appendChild(current);
    console.log('Current projects in Projects List: ', projectsList);
  }
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  //iterate through tasks of each project in project list
  for (let project in projectsList) {
    for (let i = 0; i < projectsList[project].length; i++) {
      console.log(projectsList[project][i]);

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
      checkboxDiv.appendChild(checkbox);

      task.appendChild(title);
      task.appendChild(description);
      task.appendChild(date);
      task.appendChild(prio);
      task.appendChild(checkboxDiv);
      taskList.appendChild(task);
    }
  }
}

export {renderPersonal, renderProjects, renderTasks};