import { useEffect, useState } from "react";
import CatCard from "./components/CatCard/CatCard";
import { IRoundInfo } from "./models/IRoundInfo";

const App = () => {
    const [pairAmount, setPairAmount] = useState<64 | 32 | 16 | 4>(4);
    const [currentCats, setCurrentCats] = useState<any[]>([]);
    const [roundInfo, setRoundInfo] = useState<IRoundInfo>({
        winCats: [],
        cats: [],
        currentPair: 1,
        pairAmount: pairAmount,
        currentRound: 1,
    });
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
            setCurrentCats([data[0], data[1]]);
        })
    }

    const getWinCats = () => {
        setCurrentCats([roundInfo.cats[0], roundInfo.cats[1]]);
    }

    useEffect(() => {
        console.log(roundInfo.cats);
        if (roundInfo.currentRound != 1){
            getWinCats();
        }
        else{
            getCats();
        }
    }, [roundInfo])

    return(
        <div>
            <h1>Раунд {roundInfo.currentPair} из {roundInfo.pairAmount}</h1>
            <CatCard 
                setRoundInfo={setRoundInfo}
                pairAmount={roundInfo.pairAmount}
                catInfo={currentCats[0]}
            />
            <CatCard 
                setRoundInfo={setRoundInfo}
                pairAmount={roundInfo.pairAmount}
                catInfo={currentCats[1]}
            />
        </div>
        
    )    
}

export default App;