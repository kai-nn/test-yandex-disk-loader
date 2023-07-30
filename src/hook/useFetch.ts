import { useState } from "react";

const useFetch = ({props}) => {
    const {
        path, 
        method, 
        headers, 
        payload
    } = props
    const [data, setData] = useState(null)
    
    // const fetch = async (path: any, p: { headers: any; method: any; body: any }) => {
    //     // const {
    //     //     path, 
    //     //     method, 
    //     //     headers, 
    //     //     payload
    //     // } = props
    //    
    //     const response = await fetch(path, {
    //         method: method,
    //         headers: headers,
    //         body: payload,
    //     })
    //     const data = await response.json()
    // }
    
        
    
    fetch(path, {
        method: method,
        headers: headers,
        body: payload,
    })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setData(result)
        })
        .catch(e => {
            console.log(e)
        })
    
    return {data}
}