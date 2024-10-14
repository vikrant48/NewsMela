import React from 'react'

const Card = ({data}) => {
    console.log(data);

    const readMore = (url)=>{
        window.open(url);

    }
  return (
    <div className="cardcntr">
        {data.map((currItem, index)=>{
            return(
                <div className="card">
                    <img src={currItem.urlToImage} alt="img not uploded" />
                    <div className="cardcnt">
                        <a href={currItem.url}>{currItem.title}</a>
                        <p>{currItem.description}</p>
                        <button onClick={()=>window.open(currItem.url)}>Read More</button>
                    </div>
                </div>
            )

        })}
    </div>
  )
}

export default Card