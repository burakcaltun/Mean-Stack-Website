const express = require('express');

const app = express();

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
        message: 'Posts fetched succesfully',
        posts: posts
    });
});

module.exports = app;