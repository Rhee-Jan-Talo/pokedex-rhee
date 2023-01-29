import {Link} from "react-router-dom";
import { useState, useEffect } from "react";

function PokemonList({pokemons}){
    console.log(pokemons)
    let stop = 0;
    const [isloaded, setIsloaded] = useState(false)
    const [search, setSearch] = useState('');
    const handleSearch = (event) => {
        setSearch(event.target.value);
      };
    
    const filteredPokemons = {
    nodes: pokemons.filter((item) =>
        item.name.includes(search) 
    ),
    };

    useEffect(()=>{
        if(pokemons.length !== 0){
            setIsloaded(true)
        }
        else{
            setIsloaded(false)
        }
    }, []);
    return (
        <>
            <label htmlFor="search">
                <div>
                    <input id="search" className="search-bar" type="text" placeholder="Search pokemon..." onChange={handleSearch} /> 
                    <button className="searchButton mr">&#x1F50D;</button>       
                </div>
            </label>
            <div className="main-container">
            {filteredPokemons.nodes.map((pokemon, index) => (
                <div key={index}className={`poke-containers ${pokemon.type.split(',')[0].toLowerCase()}`}>
                    <div className="image-div">
                        <img src={pokemon.image} alt="loading.."/>
                    </div>
                    <p>
                    <span className="main-txt"><Link to={`pokemon/${pokemon.id}`} state={{pokemon}}>{pokemon.name}</Link></span>
                    <br></br>
                    <span className="secondary-txt">00{pokemon.id}</span>
                    </p>
                </div>
                ))
            }
            </div>
        </>
    );
}

export default PokemonList;