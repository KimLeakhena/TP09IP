const express=require("express");
const app=express();
const bodyParser=require('body-parser')
var session = require('express-session')
var cors = require('cors')
require("./db/db")();


// 
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//apply the session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'kmy-secret',
  resave: false,
  saveUninitialized: true,
  name:'access_token',
  cookie: { 
    maxAge:1000 * 60 * 60 * 2,
    // sameSite:true,
    secure:false,
  }
}))
app.use(require('./routes'));
app.listen(port, () => console.log(`App on http://localhost:${port}`));