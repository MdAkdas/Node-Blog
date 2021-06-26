// const greet = (name)=>{
//     console.log(`name, ${name}`);
// }

// greet('mario');
// greet('akdas');

// console.log(global);

// setTimeout(() => {
//     console.log("in timeout");
// }, 3000);

// setInterval(() => {
//     console.log('in set interval');
// }, 1000);

// console.log(__dirname);
// console.log(__filename);

// const {peeple, age} = require('./people')

// console.log(peeple, age);
// const os = require('os');
// console.log(os.platform(), os.homedir());

// file handling
const fs = require('fs');

// reading files

// fs.readFile('./text.txt', (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(data.toString());
// });
// console.log('last line')

// write file

// fs.writeFile('./text2.txt', "hello world", () => {
//     console.log('file was written');
// });

//write file replace content

// fs.writeFile('./text2.txt', "akdas ahmad", () => {
//     console.log('file was written');
// });

// mkdir
// fs.mkdir('./assets ', (err) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log('folder created');
// });

// if (fs.existsSync('./assets')) {
//     console.log("yes exist");
// } else
//     console.log("not exist");

//light cyan bg
// h rgb(47, 240, 182);

// mongoose is ODM object document mapping library