const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

// connection to mongo db
dotenv.config({path:'./config.env'});

const dbURI = process.env.DATABASE


// it is async task
mongoose.connect(dbURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useUnifiedTopology:true
 })
    .then((result) => {
        console.log('connected to the DB');
        //listen for requests
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });


// register view engine
app.set('view engine', 'ejs');
// app.set('view', 'myviews'); // by default above

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
// to access the post body
app.use(express.urlencoded( {extended: true} ))


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.use('/blogs', blogRoutes);


app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: "Ninja" });
});
