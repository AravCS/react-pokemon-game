import { useEffect, useState } from "react";
import '../styles/Cardstyles.css';


export default function Cards() {
    const [pokemonData, setPokemonData] = useState([])

    function handleClick(item) {
        item.clicked === false ? item.clicked = true : alert("Game over");         // call an actual GameOver function
                                                                                   // to reset State for a new round
    }

    const urls = [
        "https://pokeapi.co/api/v2/pokemon/pikachu",
        "https://pokeapi.co/api/v2/pokemon/bulbasaur",
        "https://pokeapi.co/api/v2/pokemon/gengar",
        "https://pokeapi.co/api/v2/pokemon/onix",
        "https://pokeapi.co/api/v2/pokemon/jigglypuff",
        "https://pokeapi.co/api/v2/pokemon/magikarp",
        "https://pokeapi.co/api/v2/pokemon/psyduck",
        "https://pokeapi.co/api/v2/pokemon/snorlax",
        "https://pokeapi.co/api/v2/pokemon/lapras"
    ]

     // useEffect to fetch data from PokeAPI
     useEffect(() => {
         // create fetch requests to fetch data from each url, essentially creating an array of fetch promises
         const fetchPromises = urls.map((url) => fetch(url))

         Promise.all(fetchPromises)  // use Promise.all to wait for all the data to fetch, it takes in an array of
                                     // Promises as argument
             .then(response => (
                 // then map over the resolved array to convert to js object
                 Promise.all(response.map((res) => res.json())))
             )
             .then(dataArray => {
                 // then filter the data according to what we need for the game (img src, unique id, clicked boolean),
                 // use curly braces for function body, use map() to get the new array of objects

                 const filterData = dataArray.map((pokemon) => ({
                     url: pokemon.sprites.front_default,
                     id: crypto.randomUUID(),
                     clicked: false
                 }))

                 setPokemonData(filterData); // setState to queue a new render only after we have all the data
             })
             .catch(error => console.log(error))
     }, []);

    return (
        <div className="card-container">
            {pokemonData.map((item) => (
                <button key={item.id} className="card" onClick={() => handleClick(item)}>
                    <img src={item.url} alt="pokemon card"/>
                </button>
            ))}
        </div>
    )
}