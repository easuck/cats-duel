import { useEffect, useState } from "react";
import CatCard from "./components/CatCard/CatCard";

const App = () => {
    const [cats, setCats] = useState<any[]>([]);
    const [chosenCats, setChosenCats] = useState<any[]>([]);
    const headers = new Headers({
        'x-api-key': 'live_dXgE9ReJ2Il4WhFoBdCDZm9N2VhY5EsER6tENwMDvHW3jtl7lmMkk6JoEB1hc4lP'
    });
    const options = {
        headers: headers
    }
    const getCats = () => {
        fetch('https://api.thecatapi.com/v1/images/search?limit=2', options)
        .then(response => response.json())
        .then(data => {
            setCats([data[0], data[1]]);
        })
    }
    useEffect(() => {
        getCats();
    }, [])
    return(
        <div>
            <CatCard 
                info={cats[0]}
                chosenCats={chosenCats}
                setChosenCats={setChosenCats}
                getCats={getCats}
            />
            <CatCard 
                info={cats[1]}
                chosenCats={chosenCats}
                setChosenCats={setChosenCats}
                getCats={getCats}
            />
        </div>
        
    )    
}

export default App;