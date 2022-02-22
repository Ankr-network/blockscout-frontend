const fs = require('fs');

function copy({ input, output, find, replace }) {
  if (!input || !output) {
    return console.log('Input or output is empty');
  }

  fs.readFile(input, 'utf8', (readError, data) => {
    if (readError) return console.log(readError);

    const result =
      find && replace ? data.replace(new RegExp(find, 'g'), replace) : data;

    fs.writeFile(output, result, 'utf8', writeError => {
      if (writeError) return console.log(writeError);
    });
  });
}

module.exports = copy;
