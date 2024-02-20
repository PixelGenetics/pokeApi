import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonName } from "../../store/slices/pokemonName.slice";
import useFetch from "../../hooks/useFetch";
import PokeCard from "../../components2/pokedexPage/PokeCard";
import SelectType from "../../components2/pokedexPage/SelectType";
import imagen from '../../assets/logo-pokedex-6f1fd44625c52ccd693ca4e39b23cc9f.png'

const PokedexPage = () => {
    const [selectValue, setSelectValue] = useState('allPokemons');
    const trainerName = useSelector(store => store.trainerName);
    const pokemonName = useSelector(store => store.pokemonName);
    const dispatch = useDispatch();
    const [pokemons, getPokemons, getPerType] = useFetch();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12; // Número de elementos por página

    useEffect(() => {
        if(selectValue === 'allPokemons'){
            const url = 'https://pokeapi.co/api/v2/pokemon/?limit=1302';
            getPokemons(url);
        } else {
            getPerType(selectValue)
        }
    }, [selectValue])

    const textInput = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setPokemonName(textInput.current.value.trim().toLowerCase()));
        textInput.current.value = '';
    }

    const cbFilter = () => {
        if(pokemonName){
            return pokemons?.results.filter(element => element.name.includes(pokemonName))
        } else {
            return pokemons?.results
        }
    }

    // Calcular el total de páginas
    const totalPages = Math.ceil((cbFilter()?.length || 0) / pageSize);

    // Obtener los elementos de la página actual
    const visiblePokemons = cbFilter()?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return(
        <div>
        <section className="flex flex-col items-center justify-center ml-28 mr-28">
            <div className="flex flex-col w-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 ">
                    <img src={imagen} alt="" />
                    <h3 className="text-[20px]">Welcome <span className="text-red-600">{trainerName}</span></h3>
                </div>
                <form action="" onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center mt-4 gap-8 ">
                    <div className="flex flex-row items-center">
                        <input type="text" ref={textInput} className="border-2 text-black w-[200px] h-[30px] rounded-l-md md:mb-0"/>
                        <button className="w-[75px] h-[30px] rounded-md bg-red-600">Buscar</button>
                    </div>
                    <SelectType setSelectValue={setSelectValue}/>
                </form>
            </div>
        </section>

            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                {
                    visiblePokemons?.map(poke => (
                        <PokeCard 
                            key={poke.url}
                            url={poke.url}
                        />
                    ))
                }
                </div>
            </section>
                <div className='mt-6 mb-6 flex justify-center'>
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='w-32 bg-green-400 cursor-pointer'>Previous</button>
                    <span className='text-green-700'>{`Page ${currentPage} of ${totalPages}`}</span>
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className='w-32 bg-green-400 cursor-pointer'>Next</button>
                </div>
        </div>
    )
}

export default PokedexPage;
