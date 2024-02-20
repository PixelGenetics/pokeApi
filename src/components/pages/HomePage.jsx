
import React, {useEffect, useRef, useState} from "react"
import {useNavigate } from "react-router-dom"
import { setTrainerName } from "../../store/slices/trainerName.slice";
import { useDispatch, useSelector } from "react-redux";
import pokebola from '../../assets/pokebola-cerrada.png';
import pokebola_sound from '../../assets/Vídeo sin título ‐ Hecho con Clipchamp.mp4'
import pokebola_abierta from '../../assets/pokebola-abierta.png'
import '../Style/HomePage.css'
import useFetch from "../../hooks/useFetch";
import Footer from "../../components2/Details/Footer";

const HomePage = () => {

    const dispatch = useDispatch();
    // const trainerName = useSelector((store) => store.trainerName);

    const textInput = useRef();
    const navigate = useNavigate();
    const [pokebolaImage, setPokebolaImage] = useState(pokebola);
    const pokemonName = useSelector(store => store.pokemonName);
    const [pokemons, getPokemons, getPerType] = useFetch();


    useEffect(() => {
            const url = 'https://pokeapi.co/api/v2/pokemon/?limit=30';
            getPokemons(url);
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        // dispatch(setTrainerName(textInput.current.value.trim()));
        // navigate('/pokedex');
        const trainerName = textInput.current.value.trim();
        if (trainerName) {
            dispatch(setTrainerName(trainerName));
            setPokebolaImage(pokebola_abierta);
            setTimeout(() => {
                navigate('/pokedex');
            }, 3000);
        } else {
            alert('Por favor ingrese su nombre');
        }
    };

    const cbFilter = () => {
        return pokemons?.results
    }

    cbFilter();


    return(
        <>
        <div className="flex flex-col items-center ">
            <img src={pokebolaImage} alt="" className="w-[320px] mt-44"/>
            <h1 className="text-red-700 text-[50px]">¡Hola entrenador!</h1>
            <h2 className=" text-[26px]"> Para poder comenzar, dame tu nombre</h2>
            <form action="" onSubmit={handleSubmit} className="">
                <input type="text" ref={textInput} placeholder="Tu nombre..." className="w-[300px] h-[50px] rounded-l-md text-[14px] mt-10 border-2 "/>
                <button className="bg-red-600 w-[100px] h-[50px] rounded-r-md">Comenzar</button>
                {pokebolaImage === pokebola_abierta && <audio src={pokebola_sound} autoPlay />}
            </form>
        <div className="flex flex-row absolute bottom-0">
        {
            cbFilter()?.map(poke => (
                <div key={poke.url}>
                    <Footer url={poke.url}/>
                </div>
            ))
        }
        </div>
        </div>
        </>
    )
}

export default HomePage