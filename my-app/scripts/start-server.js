const { exec } = require('child_process');
exec('npx json-server --watch db.json --port 3001', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error al iniciar json-server: ${err}`);
    return;
  }
  console.log(stdout);
});