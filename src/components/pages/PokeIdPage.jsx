import React, { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch";
import { useParams, useSearchParams } from "react-router-dom";


    const PokeIdPage = () => {

        
    const [ pokeData, getPokeData] = useFetch()
    const param = useParams();
    const [pokemonCry, setPokemonCry] = useState("");
    
    useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${param.id}`;
    getPokeData(url);
    },[])

    useEffect(() => {
        if (pokeData && pokeData.cries && pokeData.cries.latest) {
            setPokemonCry(pokeData.cries.latest);
        }
    }, [pokeData]);
    
    useEffect(() => {
        if (pokemonCry) {
            playPokemonCry();
        }
    }, [pokemonCry]);

    


    const playPokemonCry = () => {
            const audio = new Audio(pokemonCry);
            audio.volume = 0.1;
            audio.play();
    };


    function getColorForType(typeName) {
        switch (typeName) {
            case 'grass':
                return 'bg-green-600 text-black';
            case 'fire':
                return 'bg-red-500 text-white';
            case 'water':
                return 'bg-blue-500 text-white';
            case 'poison':
                return 'bg-purple-600'
            case 'flying':
                return 'bg-gray-300'
            case 'bug':
                return 'bg-green-600'
            case 'ground':
                return 'bg-amber-950 text-white'
            // Agrega más casos para otros tipos según sea necesario
            default:
                return 'bg-gray-400 text-black'; // Color predeterminado
        }
    }

    return (
        <>
            <div className="">
                <article className="flex flex-col justify-center items-center">
                    <div className="bg-gradient-to-r from-green-500 via-green-300 to-green-700 h-20 w-[320px] flex justify-center mt-10 rounded-2xl mb-5 " onClick={playPokemonCry}>
                        <img className="w-[80px]" src={pokeData?.sprites.versions['generation-v']['black-white'].animated.front_default} alt="pokemon photo" />
                    </div>
                    <h2 className="text-green-500 text-2xl border-[1px] w-[120px] text-center">#{pokeData?.id}</h2>
                    <h3>{pokeData?.name.charAt(0).toUpperCase() + pokeData?.name.slice(1)}</h3>
                    <div className="flex flex-row gap-10 mb-10 mt-10">
                            <h2>Weight</h2>
                            <span>{pokeData?.weight}</span>
                            <h2>Height</h2>
                            <span>{pokeData?.height}</span>
                    </div>
                    <div className="flex flex-row gap-10">
                        <div className="flex-col">
                        <h3 className=" text-center ">Tipo</h3>
                            <div className="flex flex-row gap-4 mt-4">
                            {
                                pokeData?.types.map(type => 
                                    <li key={type.type.name} className={`list-none ${getColorForType(type.type.name)} rounded-md w-24 py-1 text-center`}>
                                    {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                                </li>
                                )
                            }
                            </div>
                        
                        </div>
                        <div className="flex-col">
                        <h3 className=" text-center">Habilidades</h3>
                            <div className="flex flex-row gap-4 mt-5">
                            {
                                pokeData?.abilities.map(ability => 
                                <li className="list-none border-[1px] w-32 text-center flex justify-center items-center" key={ability.ability.name}>
                                    {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)} 
                                </li>
                                )
                            }
                            </div>
                        </div>
                    </div>

                    <div id="range-container" className="mt-12">
                        <h3>Stats</h3>
                        <h4>HP: {pokeData?.stats[0].base_stat}/150</h4>
                        <progress type="range" value={pokeData?.stats[0].base_stat} max="150" id="range-input" className="w-[300px]"/>
                        <h4>Ataque: {pokeData?.stats[1].base_stat}/150</h4>
                        <progress className="w-[300px]" type="range" value={pokeData?.stats[1].base_stat} min="0" max="150"/>
                        <h4>Defensa: {pokeData?.stats[2].base_stat}/150</h4>
                        <progress className="w-[300px]" type="range" value={pokeData?.stats[2].base_stat} min="0" max="150"/>
                        <h4>Velocidad: {pokeData?.stats[5].base_stat}/150</h4>
                        <progress className="w-[300px]" type="range" value={pokeData?.stats[5].base_stat} min="0" max="150"/>
                    </div>

                    <div className="flex flex-col text-center mt-10">
                        <h4 className="mb-5">Movimientos</h4>
                        <ul className="grid grid-cols-5 gap-3 text-center">
                            {pokeData?.moves.map(move => (
                                <div className="border-2 border-gray-500 rounded-3xl bg-gray-500" key={move.move.name}>
                                    <li className="text-white" >{move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)}</li>
                                </div>
                            ))}
                        </ul>
                    </div>
                </article>
            </div>
        </>
    );
    }

export default PokeIdPage