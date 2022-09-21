const fs = require('fs');

fs.readFile('./nodejs-threads.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});

setImmediate(() => {
  console.log('This runs while file is being read');
});
