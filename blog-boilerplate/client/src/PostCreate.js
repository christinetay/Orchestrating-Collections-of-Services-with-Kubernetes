import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
    const [title, setTitle] = useState("");

    const onSubmit = async(event) =>{

        // const postURL = process.env.REACT_APP_EVENT_BUS_BACKEND_URL + `/events`;
        // await axios.post(postURL, {
        //     type: 'PostCreated',
        //     data: {
        //         title
        //     }
        // });

        try {
           //event.preventDefault();
            //const postURL = process.env.REACT_APP_POST_BACKEND_URL + `/posts/create`;
            const postURL = process.env.REACT_APP_WEB_PAGE_URL + `/posts/create`;
            const response = await axios.post(postURL, {
                title
            });

            if(response.status === 200) {
                window.location.reload();
            }
        }
        catch (error) {
            console.error('Error during POST - postCreated request:', error);
        }
        

        setTitle("");
    }

    return(
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input 
                            value={title}
                            onChange={e=>setTitle(e.target.value)}
                            className="form-control" />
                    </div>
                    <br/>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>    
        </>
    )
}

export default PostCreate;

