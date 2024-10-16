import React, { useState } from 'react'

const Card = ({data}) => {
    // console.log(data);

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

    // Sorting articles by publishedAt date in descending order (most recent first)
    const sortedArticles = [...data].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    const fewarticle = sortedArticles.slice(0,25);

    // Function to format the date from publishedAt
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0'); // Add leading 0 if necessary
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so +1
      const year = date.getFullYear();
      return `${day}-${month}-${year}`; // Return in DD-MM-YYYY format
    };


  // console.log(sortedArticles);
  return (
    <div className="cardcntr">
        {fewarticle.map((currItem, index)=>{
          if(!currItem.urlToImage){
            return null
          }
          else{
            return(
              <div key={index} className="card">
                  <img src={currItem.urlToImage} alt="img not uploded" />
                  <div className="cardcnt">
                      <a href={currItem.url}>{currItem.title}</a>
                      <p>{currItem.description}</p>
                      <p>Publish On:{formatDate(currItem.publishedAt)}</p>
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
          }

        })}
    </div>
  )
}

export default Card