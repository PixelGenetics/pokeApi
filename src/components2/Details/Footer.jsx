import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import './Footer.css'

const Footer = ({url}) => {

    const [pokemon,getPokemon] = useFetch();

    useEffect(() => {
        getPokemon(url);
    },[])

    return (
        <div >
            <article >
                <img src={pokemon?.sprites.versions['generation-v']['black-white'].animated.front_default} alt="" />
            </article>
        </div>
    )
}

export default Footer
