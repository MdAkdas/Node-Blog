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
// to access the post body
app.use(express.urlencoded( {extended: true} ))

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});



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
});

app.post('/add-blog', (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
});

app.delete('/blog/:id', (req,res)=> {
    const id = req.params.id;
    console.log('in delte', id);
    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/blogs'})
    })
    .catch(err => {
        console.log(err);
    });
});

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