import { useEffect, useState } from "react";
import '../styles/gamestyles.css';

export default function Game() {
    const [pokemonData, setPokemonData] = useState([])
    const [clickCount, setClickCount] = useState(0)
    const [highScore, setHighScore] = useState(0)

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
                    name: pokemon.forms[0].name,
                    id: crypto.randomUUID(),
                    clicked: false
                }))

                setPokemonData(filterData); // setState to queue a new render only after we have all the data
            })

            .catch(error => console.log(error))
    }, []);

    function GameOver() {
        if (clickCount > highScore) {
            setHighScore(clickCount);
        }
        setClickCount(0);
        const newArr = pokemonData.map((pokemon) => {
            return {
                ...pokemon,
                clicked: false,
            }
        })
        setPokemonData(newArr);
    }

    function ShuffleCards(newArr) {
        // using the Fisher-Yates algorithm for shuffling the cards
        for (let i = newArr.length - 1; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = newArr[i];
            newArr[i] = newArr[j];
            newArr[j] = temp;
        }
    }

    function lose() {
        alert("You clicked the card twice, you lost")
        GameOver()
    }

    function win() {
        alert("You clicked each card once, you win!");
        GameOver();
    }

    function updateClickCount() {
        if (clickCount === 8) {
           win();
        }
        else {
            setClickCount(clickCount + 1);
        }
    }

    function handleClick(item) {
        if (!item.clicked) {
            const newArr = pokemonData.map((pokemon) => {
                // If this is not the Pokémon we want to update, return it unchanged
                if (pokemon.id !== item.id) {
                    return pokemon;
                }
                else {
                    return {
                        ...pokemon,   // create a shallow copy of this Pokémon's properties
                        clicked: true // update clicked to true for this one
                    }
                }
            })

            ShuffleCards(newArr);
            setPokemonData(newArr); // use setter with the newArr, because we do not want to mutate state directly
            updateClickCount() // update the score
        } else {
            lose()
        }
    }

    return (
        <div className="container">
            <div className="score-container">
                <div className="score"> Score: {clickCount} </div>
                <div className="high-score"> High Score: {highScore} </div>
            </div>
            <div className="card-container">
                {pokemonData.map((item) => (
                    <button key={item.id} className="card" onClick={() => handleClick(item)}>
                        <img src={item.url} alt="pokemon card"/>
                        <div className="pokemon-name"> {item.name.toUpperCase()} </div>
                    </button>
                ))}
            </div>
        </div>
    )
}