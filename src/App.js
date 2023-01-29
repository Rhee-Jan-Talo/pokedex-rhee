import { useState, useEffect } from "react";
import {Routes,Route, Link} from 'react-router-dom'
import { db } from './components/firebase'
import { uid } from 'uid'
import {set,ref, onValue} from 'firebase/database'


import axios from 'axios';
import PokemonDetail from './components/PokemonDetail'
import PokemonList from './components/PokemonList'
import "./App.css"



//const officialArt = "res['data']['sprites']['other']['official-artwork']['front_default']"
//const anotherArt = "res.data.sprites.other.dream_world.front_default"
//const goku = [{name: "Goku", type : "fighting", image: "https://i.ibb.co/LdTjLcX/pngwing-com.png", id: "5000"}]
const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/"

function App() {
  const [pokemons, setPokemons]= useState([]);
  const [isUpdated, setUpdate] = useState(false)
  let stopper = 0;

  const fetchPokemons =  async() => {
    for (let i = 1; i <= 150; i++) {
      const res = await axios.get(`${POKEMON_URL}${i}`);
      set(ref(db, `pokemons/${res.data.id}`),{
        name: `${res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1)}`,
        type: `${res.data.types.map((type) => type.type.name).join(', ').charAt(0).toUpperCase() + res.data.types.map((type) => type.type.name).join(', ').slice(1)}`,
        image: `${res['data']['sprites']['other']['official-artwork']['front_default']}`,
        id: `${res.data.id}`,
        height: `${res.data.height}`,
        weight: `${res.data.weight}`,
        base_xp: `${res.data.base_experience}`
      })
    }
    setUpdate(true)
  };
  
  useEffect(()=>{
    onValue(ref(db), snapshot =>{
      const data = snapshot.val();
      if(data !== null){
        Object.values(data).map(pokemons=>{
          setPokemons(pokemons);
        })
        setUpdate(true)
      }
      else{
        fetchPokemons();
      }
    })
  },[stopper])

  function addNewPokemon(){
    const Nname = prompt("Pokemon name: ");
    const Ntype = prompt("Type: ");
    const Nimg = prompt("Image URL: ");
    const Nheight = prompt("Height: ");
    const Nweight = prompt("Weight: ");
    const Nbase_xp = prompt("Base XP: ");
    set(ref(db, `pokemons/${ pokemons.length - 1}`),{
        name: Nname,
        type: Ntype,
        image: Nimg,
        id: pokemons.length - 1,
        height: Nheight,
        weight: Nweight,
        base_xp: Nbase_xp
      });
    alert("New Pokemon Added")
};

  console.log()
  return (
    <div className="App">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <p className="header-txt">Pokédéx<br></br><span className="semi-header-txt">Gotta catch 'em all!</span></p>
        
        {isUpdated?(
          <Routes>
          <Route path="/" element={
          <div>
            <div className="search-div">
              <button type="button" onClick={addNewPokemon} className="searchButton wb lb">Add Pokemon &nbsp; <span className="fa fa-plus"></span></button>
            </div><PokemonList pokemons={pokemons}/>
          </div>}
          />
          
          <Route path="pokemon/:id" element={<PokemonDetail/>}/>
          </Routes>
        ):(<p>Fetching data...</p>)}
    </div>
  );
}

export default App;
