let apiURI = 'http://localhost:3000/api/v1/brasil';

async function buscaCidadesDoEstado(uf) {
  /* limpar a area de exibicao */
  const resultsArea = document.getElementById('results-02');
  resultsArea.innerHTML = '';
  uf = uf.trim();
  if (uf.length === 0) return;

  /* Chama a API para buscar as cidades do estado */
  let markup = '';
  uf = uf.toUpperCase();
  const apiData = await fetch(apiURI + `/cidades/${uf}`);
  const ufData = await apiData.json();

  /* Monta área do HTML que irá exibir as informações */
  if (ufData.status === 'fail') {
    markup += `<span>Estado inválido</span>`
  } else {
    markup += `
  <ul>
    <li><strong>Estado:</strong> ${ufData.data.estado} - ${ufData.data.uf}</li>
    <li><strong>Quantidade de cidades:</strong> ${ufData.results}</li>
    <li>Mostrar cidades: <input type='checkbox'></li>
  </ul>
  <ul id='enun02-cities-list' class='enun-list'> `;

    for (let i = 0; i < ufData.data.cidades.length; i++)
      markup += `<li>${ufData.data.cidades[i].nome}</li>`;

    markup += `</ul>`;
  }
  resultsArea.innerHTML = markup;
}

async function toggleDisplayEnun02List(evt) {

  if (evt.target.type === 'checkbox') {
    const list = document.getElementById('enun02-cities-list');
    list.style.display = (evt.target.checked) ? 'block' : 'none';
  }
}

async function carregaDados03e04() {
  const apiData = await fetch(apiURI + `/top-num-cities/5`);
  const topUf = await apiData.json();
  const topMais = topUf.data.mais;
  const topMenos = topUf.data.menos;

  let markup = '';
  const topMaisList = document.querySelector('#results-03 .enun-list');
  topMaisList.innerHTML = '';
  topMais.forEach(el => {
    markup += `<li>${el.estado} - ${el.uf}, com ${el.qtdCidades} cidades</li>`;
  });
  topMaisList.innerHTML = markup;
  topMaisList.style.display = 'block';

  markup = '';
  const topMenosList = document.querySelector('#results-04 .enun-list');
  topMenosList.innerHTML = '';
  topMenos.forEach(el => {
    markup += `<li>${el.estado} - ${el.uf}, com ${el.qtdCidades} cidades</li>`;
  });
  topMenosList.innerHTML = markup;
  topMenosList.style.display = 'block';
}

async function carregaDados050607e08() {
  const apiData = await fetch(apiURI + `/top-city-name-size`);
  const data = await apiData.json();
  let markup = '';

  //05 - Cidades de maior nome de cada estado  
  const topMaior = document.querySelector('#results-05 .enun-list');
  topMaior.innerHTML = '';
  data.estados.forEach(cidade => {
    markup += `<li><strong>${cidade.uf} - ${cidade.estado}:</strong> ${cidade.cidadeMaior}</li>`;
  })
  topMaior.innerHTML = markup;
  topMaior.style.display = 'block';
  markup = '';

  //06 - Cidades de menor nome de cada estado
  const topMenor = document.querySelector('#results-06 .enun-list');
  topMenor.innerHTML = '';
  data.estados.forEach(cidade => {
    markup += `<li><strong>${cidade.uf} - ${cidade.estado}:</strong> ${cidade.cidadeMenor}</li>`;
  })
  topMenor.innerHTML = markup;
  topMenor.style.display = 'block';
  markup = '';

  //07 - Cidade de Maior nome
  const maior = document.querySelector('#results-07 .enun-list');
  maior.innerHTML = '';
  markup = `<li><strong>${data.cidades.maior.cidade}</strong> de ${data.cidades.maior.estado}, ${data.cidades.maior.uf}`
  maior.innerHTML = markup;
  maior.style.display = 'block';
  markup = '';

  //08 - Cidade de Maior nome
  const menor = document.querySelector('#results-08 .enun-list');
  menor.innerHTML = '';
  markup = `<li><strong>${data.cidades.menor.cidade}</strong> de ${data.cidades.menor.estado}, ${data.cidades.menor.uf}`
  menor.innerHTML = markup;
  menor.style.display = 'block';
  markup = '';
}

// Adiciona os eventos aos elementos
window.addEventListener('load', () => {

  /* Enunciado 02 */
  const enum02_form = document.getElementById('form-02');
  enum02_form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    buscaCidadesDoEstado(evt.target[0].value);
  });

  const enun02_results = document.getElementById('results-02');
  enun02_results.addEventListener('click', (evt) => {
    toggleDisplayEnun02List(evt);
  });

  /* Enunciado 03 e 04*/
  carregaDados03e04();

  /* Enunciado 05, 06, 07 e 08*/
  carregaDados050607e08();

})