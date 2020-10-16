import timestamp from './timestamp.js';

const clickArray = [];

function render() {
  const lista = document.getElementById('clickList');
  lista.innerHTML = '';

  clickArray.forEach((el) => {
    lista.innerHTML += `<li>${el}</li>`;
  });

  document.title = clickArray.length;
}

function handleClick(evt) {
  if (evt.target.id === 'limpa') {
    clickArray.splice(0, clickArray.length);
  } else {
    clickArray.push(timestamp.getNewTimestamp());
  }
  render();
}

function start() {
  const butao = document.getElementById('butao');
  if (butao) butao.addEventListener('click', handleClick);

  const limpa = document.getElementById('limpa');
  if (limpa) limpa.addEventListener('click', handleClick);
}

window.addEventListener('load', start);
