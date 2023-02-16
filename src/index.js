import './assets/styles/style.css';
import './assets/styles/normalize.css';
import Icon from './assets/images/todolist.svg';
import { init } from './modules/taskFactory.js';

function addIcon() {
  const myIcon = new Image();
  myIcon.src = Icon;
  myIcon.classList.add('icon');

  const title = document.getElementById('title');
  header.insertBefore(myIcon, title);
}

function init() {
  addIcon();

}

init();