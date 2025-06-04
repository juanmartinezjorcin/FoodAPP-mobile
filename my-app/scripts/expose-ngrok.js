const ngrok = require('ngrok');

(async function() {
  const url = await ngrok.connect({
    addr: 3001,
    authtoken: 'TU_NGROK_TOKEN'
  });
  console.log(`API disponible en: ${url}`);
})();