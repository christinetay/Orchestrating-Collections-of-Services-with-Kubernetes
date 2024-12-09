import React, { useState } from 'react';
import axios from 'axios';

function CommentCreate({postId}){
    const [content, setContent] = useState("");

    async function onSubmit(event){
        // const postURL = process.env.REACT_APP_EVENT_BUS_BACKEND_URL + `/events`;
        // await axios.post(postURL, {
        //     type: 'CommentCreated',
        //     data: {
        //         postId,
        //         content
        //     }
        // });

        try {
            //const commentURL = process.env.REACT_APP_COMMENT_BACKEND_URL + `/posts/${postId}/comments`;
            const commentURL = process.env.REACT_APP_WEB_PAGE_URL + `/posts/${postId}/comments`;
            const response = await axios.post(commentURL,{
                content
            });

            if (response.status === 200) {
                window.location.reload();
            }
        }
        catch (error) {
            console.error('Error during POST - commentCreated request:', error);
        }
        
        setContent("");
    }
    return(
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>New Comment</label>
                        <input 
                            value={content}
                            onChange={e=>setContent(e.target.value)}
                            className="form-control" />
                    </div>
                    <br/>
                    <button className="btn btn-secondary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default CommentCreate;