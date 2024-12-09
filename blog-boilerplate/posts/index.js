const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
 
app.get('/posts', (req,res) =>{
    console.log("Get posts beginning");
    console.log("Get posts req:", req , " and res:", res);
    res.send(posts);
    console.log("Get posts ended");

});

app.post('/posts/create', async(req, res) =>{
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, 
        title
    };

    // **Add event calling
    await axios.post('http://event-bus-srv:4005/events',{
        type: 'PostCreated',
        data: {
            id, 
            title
        }
    });
    // **End of event calling

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res)=>{
    console.log("Event received:", req.body.type);
    
    res.send({});
});

// app.post('/events', (req, res)=>{
//     const { type, data } = req.body;
//     console.log("Event received:", type);
    
//     const { id, title } = data;

//     posts[id] = {
//         id, 
//         title
//     };
    
//     res.status(201).send(posts[id]);
// });

app.listen(4000, ()=>{
    console.log('v55');
    console.log('Listening on port 4000');
})