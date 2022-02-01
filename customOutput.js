const chalk = require('chalk');
const fs = require('fs');
const util = require('util');

process.stdin.resume();
process.stdin.setEncoding('utf8');

const color = process.argv[2] || 'yellow';
const coloredChalk = chalk.keyword(color);

const {HOME} = process.env;
const folderName = `${HOME}/Desktop/__temp`

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
} catch (err) {
  console.error(err)
}

process.stdin.on('data', function (data) {
  if (/\*{3}/g.test(`${data}`)) {
    const newData = `${data}`.replace(/\*{3}/g, '')

    fs.writeFileSync(`${folderName}/${new Date().toLocaleTimeString()}.js`, newData, (err) => {
      if (err) {
        console.error(err);
      }
    })
    process.stdout.write(coloredChalk(`${newData}`));
  } else {
    process.stdout.write(data);
  }
});