const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
//express app
const app = express();

// connection to mongo db
const dbURI = 'mongodb+srv://netninja:admin1234@node-tut.gwk9i.mongodb.net/node-tut?retryWrites=true&w=majority'

// it is async task
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
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

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog2',
        snippet: 'about new blog2',
        body: 'body of the new blog2'
    });

    // async task. will take some to do
    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })

});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('60d7944694fa0752d03a929b')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})


app.get('/', (req, res) => {
    //res.send('<p> home page </p>');

    res.redirect('blogs');
    // const blogs = [{
    //         title: 'Yoshi finds eggs',
    //         snippet: 'Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur '
    //     }, { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    // ];

    // res.render('index', { title: "Ninja", blogs });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/about', (req, res) => {
    //res.send('<p> About page </p>');
    res.render('about', { title: "About" });
});



// redirect
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Ninja" });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: "Ninja" });
});

// some changes