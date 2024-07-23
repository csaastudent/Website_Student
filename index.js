const express = require('express');
const app = express();
//
var http = require('http');

var bodyParser = require('body-parser') 
const fs = require('fs');


//let express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//let https = require('https');
app.set('port', 8080);

let server = http.createServer(app);

app.listen(8080);

//
//app.get('/', (req, res) => {
//  const name = process.env.NAME || 'World';
 // res.send(`Hello ${name}!`);
//});

//const port = parseInt(process.env.PORT) || 8080;
//app.listen(port, () => {
//  console.log(`helloworld: listening on port ${port}`);
//});

//var foobar = require('../config/dev/foobar.json');

console.log("Server running...")
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use('/static', express.static(path.join(__dirname, 'public')))
//console.log(__dirname)
app.use(express.static(path.join(__dirname, 'public'), { dotfiles: 'allow' }));
//app.use(express.static(path.resolve('./public')));
//app.use(express.static('public'));

app.get('/', async (req, res) => {
    html = fs.readFileSync('public/pages/homepage.html');
    res.writeHead(200);
    res.write(html);
    res.end();
});

app.get("/404", async (req, res, next) => {
    //res.send("four oh four")
    html = fs.readFileSync('public/404.html');
    res.write(html);
    res.status(404);
    res.end();
});

app.get('/:area', async (req, res, next) => {
    let area = req.params.area
    let path = `public/pages/area/${area}.html`
    try {
        console.log(path);
        html = fs.readFileSync(path);
        res.writeHead(200);
        res.write(html);
        res.end();
    } catch(err) {
        res.redirect('/404')
    }
})

app.get('/:area/:subject', async (req, res, next) => {
    let area = req.params.area
    let subject = req.params.subject
    let path = `templates/subject.html`
    try {
        console.log(path);
        html = fs.readFileSync(path);
        res.writeHead(200);
        res.write(html);
        res.end();
    } catch (err) {
        res.redirect('/404')
    }
})

app.get('/getpageinfo/:area/:subject', async (req, res, next) => {
    let area = req.params.area
    let subject = req.params.subject

    try {
        console.log("public/"+subject+"/")
        fs.readdir("public/"+subject, (err, files) => {
            console.log(files);
            if (files == undefined) {
                res.redirect('/404')
                return
            }
            res.send(files);
        });
    } catch (err) {
        res.redirect('/404')
    }
}) 

app.get('/:area/:subject/:level', async (req, res, next) => {
    let area = req.params.area
    let subject = req.params.subject
    let level = req.params.level
    let path = `templates/level.html`
    try {
        console.log(path);
        html = fs.readFileSync(path);
        res.writeHead(200);
        res.write(html);
        res.end();
    } catch (err) {
        res.redirect('/404')
    }
})

app.get('/getpageinfo/:area/:subject/:level', async (req, res, next) => {
    let area = req.params.area
    let subject = req.params.subject
    let level = req.params.level

    try {
        let ret = JSON.parse(fs.readFileSync('outline.json'));
        res.send(Object.keys(ret[subject][level]))
    } catch (err) {
        res.redirect('/404')
    }
}) 

app.get('/:area/:subject/:level/:milestone', async (req, res, next) => {
    let area = req.params.area
    let subject = req.params.subject
    let level = req.params.level
    let ms = req.params.milestone
    let path = `templates/milestoneVideo.html`
    try {
        console.log(path);
        html = fs.readFileSync(path);
        res.writeHead(200);
        res.write(html);
        res.end();
    } catch (err) {
        res.redirect('/404')
    }
})

app.get('/getpageinfo/:area/:subject/:level/:milestone', async (req, res, next) => {
    let area = req.params.area
    let subject = req.params.subject
    let level = req.params.level
    let ms = req.params.milestone

    try {
        fs.readdir(`public/${subject}/${level}/${ms}/`, (err, files) => {
            let ret = JSON.parse(fs.readFileSync('outline.json'))[subject][level][Object.keys(JSON.parse(fs.readFileSync('outline.json'))[subject][level])[parseInt(ms.substr(ms.length-1))-1]]; //this is so dumb
            console.log(files);
            if (files == undefined) {
                res.redirect('/404')
                return
            }
            res.send([{"files": files, "outline": ret}]);
        });
    } catch (err) {
        res.redirect('/404')
    }
}) 