try {
  const handler = require('./index.js');
  module.exports = handler;
} catch (err) {
  console.error('[FATAL][API.JS] Erro ao importar handler:', err);
  module.exports = (req, res) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'Erro fatal ao importar handler',
      details: err.message,
      stack: err.stack,
    }));
  };
}
