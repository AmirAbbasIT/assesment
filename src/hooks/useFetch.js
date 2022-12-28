import { useEffect, useState } from 'react'

const useFetch = (endPoint) => {

    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const result=await fetch(endPoint);
                    const data=await result.json()
                    setData(data)
                }catch(error){
                    setError(error)
                }finally{
                    setLoading(false)
                }
            }
        )();
    }, [endPoint])

    return { data, error, loading }
}

export {useFetch}