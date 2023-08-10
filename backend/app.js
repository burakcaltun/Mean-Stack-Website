const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://burak:PslJMYVAxtdykMia@cluster0.vzt01uk.mongodb.net/?retryWrites=true&w=majority";

const Post = require('./models/post');

const app = express();


//PslJMYVAxtdykMia
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept"
     );
     res.setHeader("Access-Control-Allow-Methods",
     "GET, POST, PATCH, DELETE, OPTIONS"
     );
    next();
});
   
app.post("/api/posts",(req,res,next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({
        message: 'Post added successfully'
    });
});


app.use('/api/posts',(req,res,next) => {
    const posts = [
    { 
        id: 'fad12421l', 
        title:'First server-side post', 
        content: 'This is coming from the server'
    },
    { 
        id: 'ksf21321k', 
        title:'First server-side post', 
        content: 'This is coming from the server!'
    },

    ];
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts: posts
    });
});

module.exports = app;