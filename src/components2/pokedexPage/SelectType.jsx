import React, { useEffect, useRef } from 'react'
import useFetch from '../../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { setPokemonName } from '../../store/slices/pokemonName.slice';

const SelectType = ({setSelectValue}) => {
    
    const [ types, getTypes] = useFetch()
    const dispatch = useDispatch();

    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/type';
        getTypes(url);
    },[])
    
    const textSelect = useRef()

    const handleChange = () => {
        setSelectValue(textSelect.current.value)
        dispatch(setPokemonName(''));
    }

    return (
        <div className=''>
        <select onChange={handleChange} ref={textSelect} className='block w-[300px] border-2 shadow-lg'>
            <option value="allPokemons" className='text-white'>All Pokemons</option>
            {
                types?.results.map(type => (
                    <option key={type.url} value={type.url}>{type.name}</option>
                ))
            }
        </select>
        </div>
    )
}

export default SelectType