import Icon from '../assets/images/todolist.svg';

function addIcon() {
  const myIcon = new Image();
  myIcon.src = Icon;
  myIcon.classList.add('icon');

  const title = document.getElementById('title');
  header.insertBefore(myIcon, title);
}



export { addIcon };