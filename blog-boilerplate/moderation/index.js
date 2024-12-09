const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req,res)=>{
    const { type, data } = req.body;

    if(type === "CommentCreated"){
        console.log("@@ Moderation - data.content:", data.content);
        const status = data.content.toLowerCase().includes('orange')? 'rejected': 'approved';

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data:{
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    }else{
        console.log("@@ 2nd Moderation - type:", type);
        console.log("@@ 2nd Moderation - data:", data);
    }

    res.send({});
});

app.listen(4003,()=>{
    console.log("Listening on port 4003");
});