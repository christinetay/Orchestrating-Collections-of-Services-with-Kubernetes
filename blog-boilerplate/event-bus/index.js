const express = require('express');
const bodyParser = require('body-parser');
// const { randomBytes } = require('crypto');
const axios = require('axios');
// const cors = require('cors');

const app = express();
app.use(bodyParser.json());
// app.use(cors());

const events = [];

app.post('/events', (req, res)=>{
    console.log("Event bus is called");
    const event = req.body;

    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event).catch((err)=>{
        console.log(err.message);
    });
    axios.post('http://comments-srv:4001/events', event).catch((err)=>{
        console.log(err.message);
    });
    axios.post('http://query-srv:4002/events', event).catch((err)=>{
        console.log(err.message);
    });
    axios.post('http://moderation-srv:4003/events', event).catch((err)=>{
        console.log(err.message);
    });


    res.send({status: 'OK'});
});

app.get("/events", (req, res)=>{
    res.send(events);
})


// app.post('/events', async (req, res)=>{
//     console.log("Event bus is called");
//     var event = req.body;
    
//     if(event.type === "PostCreated"){
//         const postId = randomBytes(4).toString('hex');

//         event = {
//             type: 'PostCreated',
//             data: {
//                 id: postId, 
//                 title: event.data.title
//             }
//         };

//         await axios.post('http://localhost:4000/events', event).catch((err)=>{
//             console.log(err.message);
//         });
//     }
    
//     if(event.type === "CommentCreated"){
//         const commentId = randomBytes(4).toString('hex');

//         event = {
//             type: 'CommentCreated',
//             data: {
//                 id: commentId, 
//                 content: event.data.content,
//                 postId: event.data.postId
//             }
//         };

//         axios.post('http://localhost:4001/events', event).catch((err)=>{
//             console.log(err.message);
//         });
//     }

//     axios.post('http://localhost:4002/events', event).catch((err)=>{
//         console.log(err.message);
//     });


//     res.send({status: 'OK'});
// });


app.listen(4005, ()=>{
    console.log("Listening to port 4005");
});