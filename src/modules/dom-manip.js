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
    });

    current.appendChild(deleteBtn);
    navProjects.appendChild(current);
    console.log('Current projects in Projects List: ', projectsList);
  }
}

export {renderPersonal, renderProjects};