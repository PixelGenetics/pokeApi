import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom';
import '../pokedexPage/PokeCard.css'

const PokeCard = ({url}) => {

    const [pokemon,getPokemon] = useFetch();

    const navigate = useNavigate()

    useEffect(() => {
        getPokemon(url);
    },[])

    const handleClick = () => {
        navigate(`/pokedex/${pokemon.id}`);
    }

    return (
        <div className='flex justify-center mt-10 mb-10 rounded-lg' id='contenedor'> 
            <article onClick={handleClick} className='flex flex-col items-center' id='tarjeta'>
                <img className='w-[80px] z-10' src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon photo" />
                <h3 className='text-white text-center z-10'>{pokemon?.name}</h3>
                {/* {console.log('lol',pokemon.stats)} */}
                <div className='grid grid-cols-2 text-center z-10'>
                    <p className='text-white'>Hp </p>
                    <span className='text-white'>{pokemon?.stats[0].base_stat}</span>
                    <p className='text-white'>Ataque </p>
                    <span className='text-white'>{pokemon?.stats[1].base_stat}</span>
                    <p className='text-white'>Defensa </p>
                    <span className='text-white'>{pokemon?.stats[2].base_stat}</span>
                    <p className='text-white'>Velocidad </p>
                    <span className='text-white'>{pokemon?.stats[5].base_stat}</span>
                </div>
            </article>
        </div>
    )
}

export default PokeCard
