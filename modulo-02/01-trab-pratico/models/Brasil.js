const fs = require('fs');
const JSZip = require('jszip');
const fileSaver = require('file-saver');

/* Carrega os arquivos e retorna uma string de objetos */
function readFile(filename) {
  const rawdata = fs.readFileSync(`${__dirname}/data/${filename}`, 'utf8');
  const data = JSON.parse(rawdata);
  return data;
}

class Brasil {
  constructor() {
    //Carrega lista de estados e Cidades
    this.estados = readFile('Estados.json');
    this.cidades = readFile('Cidades.json');

    //Cria um arquivo JSON para cada estado representado no arquivo
    // Estados.json, e o seu conteúdo terá um array das cidades pertencentes
    // àquele estado, de acordo com o arquivo Cidades.json.
    this.createStateFiles();
  }

  createStateFiles() {
    //Delete all files in temp folder
    let filenames = fs.readdirSync(`${__dirname}/../public/files/temp`);
    if (filenames.length > 0) {
      filenames.forEach((file) => {
        fs.unlinkSync(`${__dirname}/../public/files/temp/${file}`);
      });
      filenames = null;
    }

    //Delete all files in public/files
    filenames = fs.readdirSync(`${__dirname}/../public/files`);
    if (filenames.length > 0) {
      filenames.forEach((file) => {
        if (file !== 'temp')
          fs.unlinkSync(`${__dirname}/../public/files/${file}`);
      });
      filenames = null;
    }

    //Create a ZIP container
    const zip = new JSZip();

    //Create all State Files
    this.estados.forEach((estado) => {
      const cidades = this.getStateCities(estado.Sigla);
      const jsonData = JSON.stringify(cidades);

      //Add the cities to the ZIP container
      zip.file(`${cidades.uf}.json`, jsonData);

      //Create the State Files (just to have them, for the course exercise)
      fs.writeFileSync(
        `${__dirname}/../public/files/temp/${cidades.uf}.json`,
        jsonData,
        'utf8'
      );
    });

    //Create a ZIP file with all the States Files
    zip
      .generateNodeStream({
        type: 'nodebuffer',
        streamFiles: true
      })
      .pipe(fs.createWriteStream(`${__dirname}/../public/files/Estados.zip`))
      .on('finish', () => {
        console.log('Estados.zip written.');
      });
  }

  getAllCities() {
    const cidades = this.cidades.map((cidade) => {
      const estado = this.estados.find((estado) => {
        return cidade.Estado === estado.ID;
      });
      if (estado) {
        return {
          cidade: cidade.Nome,
          estado: estado.Nome,
          uf: estado.Sigla,
        };
      } else {
        return undefined;
      }
    });
    return cidades;
  }

  getAllStates() {
    return {
      estados: this.estados,
      results: this.estados.length,
    };
  }

  getStateCities(uf) {
    const estado = this.estados.find((estado) => {
      return estado.Sigla === uf;
    });
    if (!estado) return undefined;
    const cidades = this.cidades.reduce((accumulator, cidade) => {
      if (cidade.Estado === estado.ID) {
        accumulator.push({
          id: cidade.ID,
          nome: cidade.Nome,
        });
      }
      return accumulator;
    }, []);
    return {
      estado: estado.Nome,
      uf: estado.Sigla,
      cidades: cidades,
    };
  }

  getTopStatesNumCities(topN, option = 'more') {
    topN = topN > this.estados.length ? this.estados.length : topN;

    let estados = this.estados.map((estado) => {
      const stateCities = this.getStateCities(estado.Sigla);
      return {
        uf: estado.Sigla,
        estado: estado.Nome,
        qtdCidades: stateCities.cidades.length,
      };
    });
    estados = estados.sort((estadoA, estadoB) => {
      if (option === 'more') {
        if (estadoB.qtdCidades === estadoA.qtdCidades) {
          estadoB.estado > estadoA.estado ? 1 : -1;
        }
        return estadoB.qtdCidades - estadoA.qtdCidades;
      } else {
        if (estadoB.qtdCidades === estadoA.qtdCidades) {
          estadoA.estado > estadoB.estado ? 1 : -1;
        }
        return estadoA.qtdCidades - estadoB.qtdCidades;
      }
    });

    let topEstados = [];
    for (let i = 0; i < topN; i++) topEstados.push(estados[i]);
    return topEstados;
  }

  getTopCitiesNameSize() {
    const iniCidades = {
      maior: '',
      menor: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    };
    let topCidades = {
      maior: {
        cidade: '',
        estado: '',
        uf: '',
      },
      menor: {
        cidade: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        estado: '',
        uf: '',
      },
    };
    let topEstados = this.estados.map((estado) => {
      const allCities = this.getStateCities(estado.Sigla);
      const cities = allCities.cidades.reduce(
        (accumulator, city) => {
          if (city.nome.length > accumulator.maior.length)
            accumulator.maior = city.nome;
          if (city.nome.length < accumulator.menor.length)
            accumulator.menor = city.nome;
          return accumulator;
        }, {
          ...iniCidades,
        }
      );

      if (
        cities.maior.length > topCidades.maior.cidade.length ||
        (cities.maior.length === topCidades.maior.cidade.length &&
          cities.maior < topCidades.maior.cidade)
      ) {
        topCidades.maior.cidade = cities.maior;
        topCidades.maior.estado = estado.Nome;
        topCidades.maior.uf = estado.Sigla;
      }

      if (
        cities.menor.length < topCidades.menor.cidade.length ||
        (cities.menor.length === topCidades.menor.cidade.length &&
          cities.menor < topCidades.menor.cidade)
      ) {
        topCidades.menor.cidade = cities.menor;
        topCidades.menor.estado = estado.Nome;
        topCidades.menor.uf = estado.Sigla;
      }

      return {
        uf: estado.Sigla,
        estado: estado.Nome,
        cidadeMaior: cities.maior,
        cidadeMenor: cities.menor,
      };
    });
    return {
      topCidades,
      estados: topEstados,
    };
  }
}
module.exports = Brasil;