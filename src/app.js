const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/contactDance',{useNewUrlParser: true,useUnifiedTopology: true});
const port = process.env.PORT|| 3001;

var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
});
var contact= mongoose.model('Contact',contactSchema)
// public static path 
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
    app.set('view engine','hbs');
    app.set('views',template_path);
    hbs.registerPartials(partials_path);

    app.use(express.static(static_path));

    // Routing
    app.get("/",(req, res)=>{
        res.render('index')
    })
    app.get("/services",(req, res)=>{
        res.render('services')
    })
    app.get("/about",(req, res)=>{
        res.render('about')
    })
    app.get("/class",(req, res)=>{
        res.render('class')
    })
    app.get("/contact",(req, res)=>{
        res.render('contact')
    })
    app.post("/contact",(req, res)=>{
        var myData = new contact(req.body);
        myData.save().then(()=>{
            res.render("contact")
        }).catch(()=>{
            res.status(400).send('Item was not saved to the database')
        })
    })
    app.get("/login",(req, res)=>{
        res.render('login')
    })
    app.get("/registration",(req, res)=>{
        res.render('registration')
    })

    app.get("*",(req, res)=>{
        res.render('404error',{
            errorMsg: 'Opps! Page Not Found'
        })
    })
    app.listen (port,()=>{
        console.log(`listening to the port at ${port}`);
    })


