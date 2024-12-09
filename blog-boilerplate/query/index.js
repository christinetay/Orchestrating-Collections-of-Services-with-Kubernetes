const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const posts = {};

const handleEvent = (type, data) => {
    if(type === "PostCreated"){
        const { id, title } = data;
        posts[id] = { id, title, comments: []};

    }

    if(type === "CommentCreated"){
        const { id, content, postId, status } = data;

        console.log("@@post1: ", posts[postId]);

        const post = posts[postId];
        console.log("@@post2: ", post);

        post.comments.push({
            id, content, status
        });
        console.log("@@post3: ", post);
        
    }

    if(type === "CommentUpdated"){
        const { id, content, postId, status } = data;
        const post = posts[postId];

        const comment = post.comments.find( c =>{
            return c.id === id;
        });

        comment.status = status;
        comment.content = content;
    }

    console.log(posts);
    console.log(posts.comments);

}

app.get('/posts', (req,res) =>{
    res.send(posts);
});

app.post('/events', (req, res) =>{
    const { type, data } = req.body;

    handleEvent(type, data);

    console.log("@@event type: ", type);
    console.log("@@event data: ", data);

    res.send({});
    
});


app.listen(4002, async()=>{
    console.log('Listening on port 4002');

    try{
        const res = await axios.get('http://event-bus-srv:4005/events');
        for(let event of res.data){
            console.log("Processing event:", event.type);
            handleEvent(event.type, event.data);
        }
    }
    catch(e){
        console.log("Query service" + e);
    }
   
})