import React, { useState } from 'react'
import '../assets/Card.css'

const Card = ({ data }) => {
  // Sorting articles by publishedAt date in descending order (most recent first)
  const sortedArticles = [...data].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  const fewarticle = sortedArticles.slice(0, 25);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="cardcntr">
      {fewarticle.map((currItem, index) => {
        if (!currItem.urlToImage) {
          return null
        }
        else {
          return (
            <div key={index} className="card">
              <img src={currItem.urlToImage} alt="img not uploded" />
              <div className="cardcnt">
                <a href={currItem.url}>{currItem.title}</a>
                <p>{currItem.description}</p>
                <p className='publishdate'>Publish On:{formatDate(currItem.publishedAt)}</p>
                <button onClick={() => window.open(currItem.url)}>Read More</button>

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