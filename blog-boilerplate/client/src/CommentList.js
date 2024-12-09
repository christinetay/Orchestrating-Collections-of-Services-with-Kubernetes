import React from 'react';
// import axios from 'axios';


function CommentList({postId, commentList}){
    // const [comments, setComments] = useState([]);

    // // async function fetchComments(postId){
    // //     const commentURL = process.env.REACT_APP_COMMENT_BACKEND_URL+ `/posts/${postId}/comments`;
    // //     const res = await axios.get(commentURL);
    // //     console.log("@@test fetchComments - commentURL:", commentURL);
    // //     console.log("@@test fetchComments - res:", res);
    // //     setComments(res.data);
    // // }

    // useEffect(()=>{
    //     // fetchComments(postId);
    //     setComments(commentList);
    // }, [commentList]);


    const renderedComments = Object.values(commentList).map(c=>{
        return(
            <li key={c.id}>
            {c.content} 
            {c.status === 'rejected' && 
            <span style={{color:"red"}}> ({c.status})</span>}
            </li>
        )
    })

    //////////////   Main Codes    /////////////////
    return(
        <>
            <ul> {renderedComments} </ul>
        </>
    )
}

export default CommentList;