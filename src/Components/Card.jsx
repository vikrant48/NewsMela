import React, { useState } from 'react'

const Card = ({data}) => {
    console.log(data);

    // const [comments, setComments] = useState({});

    // const submitComment = (index) => {
    //     const commentInput = document.getElementById(`commentInput-${index}`).value;
    //     if (commentInput.trim()) {
    //       const newComments = { ...comments };
    //       if (newComments[index]) {
    //         newComments[index].push(commentInput);
    //       } else {
    //         newComments[index] = [commentInput];
    //       }
    //       setComments(newComments);
    //       document.getElementById(`commentInput-${index}`).value = ''; // Clear the input after submitting
    //     }
    //   };

    // const readMore = (url)=>{
    //     window.open(url);

    // }
  return (
    <div className="cardcntr">
        {data.map((currItem, index)=>{
            return(
                <div key={index} className="card">
                    <img src={currItem.urlToImage} alt="img not uploded" />
                    <div className="cardcnt">
                        <a href={currItem.url}>{currItem.title}</a>
                        <p>{currItem.description}</p>
                        <button onClick={()=>window.open(currItem.url)}>Read More</button>

                        {/* <div className='comments-section'>
                            <h4>Comments</h4>
                            <textarea id={`commentInput-${index}`} placeholder='Add a comment...'></textarea>
                            <button onClick={() => submitComment(index)}>Post Comment</button>
                            <div className='comment-list'>
                              {comments[index]?.map((comment, commentIndex) => (
                                <p key={commentIndex}>{comment}</p>
                              ))}
                            </div>
                        </div> */}
                    </div>
                </div>
            )

        })}
    </div>
  )
}

export default Card