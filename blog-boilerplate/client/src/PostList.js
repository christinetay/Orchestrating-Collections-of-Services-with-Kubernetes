import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
//import React from 'react';

const PostList = () =>{
    const [posts, setPosts] = useState([]);

    // async function fetchPosts(){
    //     const postURL = process.env.REACT_APP_POST_BACKEND_URL + '/posts';
    //     const res = await axios.get(postURL);
    //     console.log("@@test fetchPost - postURL:", postURL);
    //     console.log("@@test fetchPost - res:", res);
    //     setPosts(res.data);
    // }

    async function fetchPosts(){
        // const postURL = process.env.REACT_APP_QUERY_BACKEND_URL + '/posts';
        const postURL = process.env.REACT_APP_WEB_PAGE_URL + '/posts';
        const res = await axios.get(postURL);
        console.log("@@test fetchPost - postURL:", postURL);
        console.log("@@test fetchPost - res:", res);
        setPosts(res.data);
    }

    useEffect(()=>{
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map(p=>{
            return(
                <div 
                    className="card"
                    style={{ width: '30%', marginBottom: '20px'}}
                    key={p.id}>
                    <div className="card-body">
                        <h3>{p.title}</h3>
                        <CommentList postId={p.id} commentList={p.comments} />
                        <CommentCreate postId={p.id}/>
                    </div>
                </div>
            )
        })
        
    



    //////////////// Main Codes below //////////////////
    return(
        <>
            <div className="d-flex flex-row flex-wrap justify-content-between">
                {renderedPosts}
            </div>
        </>
    )
}

export default PostList;