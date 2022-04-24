import {useState, useEffect} from 'react'
export const useFetch = (url) => {
    const [data,setData] = useState([]);
    const [loading, setLoading]  = useState(false);
    const [err, setErr] = useState(null);

    const getApi = async (apiUrl) => {
        try{
            setLoading(true);
            const fetchApi = await fetch(apiUrl);
            const data = await fetchApi.json();
            setData(data);
        }catch(err){
            setErr(err.message);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getApi(url);
    }, [url]);

    return {loading, err, data, setData};
}
