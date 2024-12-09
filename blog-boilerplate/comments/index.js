const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res)=>{
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res)=>{
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ 
        id: commentId,
        content,
        status: 'pending'
    });

    commentsByPostId[req.params.id] = comments;

     // **Add event calling
     await axios.post('http://event-bus-srv:4005/events',{
        type: 'CommentCreated',
        data: {
            id: commentId, 
            content,
            postId: req.params.id,
            status: 'pending'
        }
    });
    // **End of event calling

    res.status(201).send(comments);
});
 
app.post('/events', async(req, res)=>{
    console.log("Event received:", req.body.type);

    const { type, data } = req.body;

    if(type === 'CommentModerated'){
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment =>{
            return comment.id === id;
        });

        comment.status = status;

        await axios.post("http://event-bus-srv:4005/events",{
            type: 'CommentUpdated',
            data: {
                id, 
                status,
                postId,
                content
            }
        });
    }
    
    res.send({});
});

// app.post('/events', (req, res)=>{
//     const { type, data } = req.body;
//     console.log("Event received:", type);

//     const { id, content, postId } = data;
//     const comments = commentsByPostId[postId] || [];
//     comments.push({ 
//         id: id,
//         content
//     });

//     commentsByPostId[postId] = comments;

    
//     res.status(201).send(comments);
// });

app.listen(4001, ()=>{
    console.log("Listening on 4001");
});