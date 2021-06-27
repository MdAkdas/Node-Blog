// test file

const http = require('http');
const fs = require('fs');
const _ = require('lodash');


const server = http.createServer((req, res) => {
    //loadash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log("hello");
    });
    greet();
    greet();

    // set header content type
    // res.setHeader('Content-Type', 'text/html');

    // res.write('<p>hello, ninjas</p>');
    // res.write('<p>hello again, ninjas</p>');
    // res.end();

    // send html file
    // fs.readFile('./views/index.html', (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         res.end();
    //     }
    //     //res.write(data);
    //     res.end(data);
    // });

    //   // routing
    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
    }

    // send html
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        //res.write(data);
        res.end(data);
    });


});

// localhost is the default value for 2nd argument
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});

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