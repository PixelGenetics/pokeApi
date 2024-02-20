import axios from "axios";
import React, { useState } from "react";

const useFetch = () => {
    const [apiData, setApiData] = useState();

    const getApi = (url) => {
        axios.get(url)
        .then(res => setApiData(res.data))
        .catch(error => console.log(error))
    }
    const getApiType = (url) => {
        axios.get(url)
        .then(res => {
            setApiData({results: res.data.pokemon.map(poke => poke.pokemon)})
        })
        .catch(error => console.log(error))
    }
    return [apiData,getApi, getApiType];
}

export default useFetch;