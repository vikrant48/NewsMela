import React, { useEffect, useState } from 'react'

function useCurrencyInfo(from) {
    const  [data, setData] = useState({})

    const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY

    useEffect(()=>{
        fetch(`https://apilayer.net/api/live?access_key=${API_KEY}&source=${from}`)
        .then((resp)=> resp.json())
        .then((resp)=> setData(resp.quotes))
        // .then((resp)=>{
        //     if (type === "live") {
        //         setData(resp.quotes);
        //     } 
        //     else if (type === "list") {
        //         setData(resp.currencies);
        //     }
        // })
        .catch((error) => console.error("Error fetching data:", error));
    },[from])
    console.log(data)
    return data
}

export default useCurrencyInfo