import axios from "axios"
import { useState,useEffect } from "react"

const Pokemon = () => {
    
    const [mostrarPokemon,setMostrarPokemon] = useState([]);
    const [inside,setInside] = useState([]); 
    axios.get('https://pokeapi.co/api/v2/').then(
        resp => {
            setMostrarPokemon(resp.data.pokemon)
        }
    )

    useEffect(() => {
        if (mostrarPokemon.length > 0) {
            axios.get(mostrarPokemon)
                .then(resp => {
                    console.log(resp.data.results);
                    setInside(resp.data.results);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [mostrarPokemon]); // Este efecto se ejecutará cada vez que mostrarPokemon cambie


    return(
        <>
            {   
                inside.map((item) => (
                    <div key={item.name}>
                        <p>Nombre: {item.name}</p>
                    </div>
                ))
            }
        </>
    )
}

export default Pokemon