import { remove, update } from "firebase/database";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";
import {ref} from 'firebase/database'
import { db } from './firebase'


function PokemonDetail(){
    const context = useLocation()
    const stop = 0;
    const [pokemonDetails, setpokemonDetails]= useState([]);
    const [bg, setBg] = useState("")

    useEffect(()=>{
        setpokemonDetails(context.state.pokemon)
        },[stop])

    useEffect(()=>{
        try{setBg(pokemonDetails.type.split(',')[0])} 
        catch(e){
            console.log("Error in Rendering Bg color ")
        }
        },[pokemonDetails])

    function deletePoke(){
        remove(ref(db, `pokemons/${pokemonDetails.id}`));
        alert(`${pokemonDetails.name} has been deleted`)
    }

    function updatePoke(){
        const updatedName = prompt("Pokemon name: ",pokemonDetails.name);
        const updatedType = prompt("Type: ", pokemonDetails.type);
        const updatedImage = prompt("Image URL: ",pokemonDetails.image);
        const updatedId = prompt("ID Number: ",pokemonDetails.id);
        update(ref(db, `pokemons/${pokemonDetails.id}`),{
            name: updatedName,
            type: updatedType,
            image: updatedImage,
            id: updatedId,    
        })
        alert(`Pokemon No.${pokemonDetails.id} has been updated`)
    }

    return(
        <>
        <center>
         <br></br>
         <Link to={`/`}><button className="searchButton fl"><i className="fa fa-arrow-left"></i></button> </Link>
         <Link to={`/`}><button onClick={deletePoke} className="searchButton fll">&#x2716;</button></Link>
         <Link to={`/`}> <button onClick={updatePoke} className="searchButton fll">&#x270D;</button></Link>
         <br></br><br></br>
         <div className={`img-details-container ${bg.toLowerCase()}`} >
             <img className="img-size-d" src={pokemonDetails.image} alt="loading..."></img>
         </div>
         <div className="secondary-container">
            <div className="secondary-txt">
                <p className="big-con">Pokedex ID: <b className="tier-text">{pokemonDetails.id}</b></p>
                <p className="big-con">Name: <b className="tier-text">{pokemonDetails.name}</b></p>
                <p className="big-con">Type: <b className="tier-text">{pokemonDetails.type}</b></p>
                <p className="mid-con">&nbsp;</p>
                <p className="small-con">Height: <b className="tier-text">{pokemonDetails.height} "</b></p>
                <p className="small-con">Weight: <b className="tier-text">{pokemonDetails.weight} lbs</b></p>
                <p className="small-con">Base XP: <b className="tier-text">{pokemonDetails.base_xp}</b></p>
            </div>
         </div>
         </center>
        </>
     )
}
export default PokemonDetail