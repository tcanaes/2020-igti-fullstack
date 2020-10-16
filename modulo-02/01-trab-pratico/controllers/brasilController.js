const Brasil = require('../models/Brasil');

const brasil = new Brasil();

exports.getAllCities = (req, res, next) => {
  const allCities = brasil.getAllCities();
  if (allCities) {
    res.status(200).json({
      status: 'success',
      results: allCities.length,
      data: {
        cidades: allCities
      }
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'There was an error retrieving the data.'
    });
  }
}

exports.getStateCities = (req, res, next) => {
  const {
    uf
  } = req.params;

  const stateCities = brasil.getStateCities(uf);
  if (stateCities) {
    res.status(200).json({
      status: 'success',
      results: stateCities.cidades.length,
      data: {
        estado: stateCities.estado,
        uf: stateCities.uf,
        cidades: stateCities.cidades
      }
    });
  } else {
    res.status(400).json({
      status: 'fail',
      message: `No cities found for "${uf}"`
    });
  }
}

exports.getTopStatesNumCities = (req, res, next) => {
  const qtd = (req.params.qtd) ? parseInt(req.params.qtd, 10) : 5;
  const topEstadosMais = brasil.getTopStatesNumCities(qtd, 'more');
  const topEstadosMenos = brasil.getTopStatesNumCities(qtd, 'less');
  if (!topEstadosMais || !topEstadosMenos) {
    res.status(500).json({
      status: 'error',
      message: 'There was an error retrieving the data.'
    });
  }
  res.status(200).json({
    status: 'success',
    maisResults: topEstadosMais.length,
    menosResults: topEstadosMenos.length,
    data: {
      mais: topEstadosMais,
      menos: topEstadosMenos
    }
  });
}

exports.getTopCitiesNameSize = (req, res, next) => {
  const cities = brasil.getTopCitiesNameSize();
  if (!cities) {
    res.status(500).json({
      status: 'error',
      message: 'There was an error retrieving the data.'
    });
  }
  res.status(200).json({
    status: 'success',
    cidades: cities.topCidades,
    estados: cities.estados
  });
}