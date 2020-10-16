import timestamp from './timestamp.js';

const clickArray = [];

function render(listItemText) {
  const lista = document.getElementById('clickList');
  const item = document.createElement('li');
  item.innerText = listItemText;
  lista.appendChild(item);
  document.title = clickArray.length;
}

function handleClick(evt) {
  if (evt.target.id === 'limpa') {
    clickArray.splice(0, clickArray.length);
    const lista = document.getElementById('clickList');
    lista.innerHTML = '';
    document.title = 'JS Performático';
  } else {
    const newTimestamp = timestamp.getNewTimestamp();
    clickArray.push(newTimestamp);
    render(newTimestamp);
  }
}

function start() {
  const butao = document.getElementById('butao');
  if (butao) butao.addEventListener('click', handleClick);

  const limpa = document.getElementById('limpa');
  if (limpa) limpa.addEventListener('click', handleClick);
}

window.addEventListener('load', start);
