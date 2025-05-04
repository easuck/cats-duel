import { useEffect, useState } from "react";
import CatCard from "./components/CatCard/CatCard";
import { IRoundInfo } from "./models/IRoundInfo";
import WinScreen from "./components/WinScreen/WinSCreen";
import './App.scss';
import StartScreen from "./components/StartScreen/StartScreen";

const App = () => {
    const [pairAmount, setPairAmount] = useState<64 | 32 | 16 | 4>(4);
    const [currentCats, setCurrentCats] = useState<any[]>([]);
    const [isFinish, setIsFinish] = useState<boolean>(false);
    const [isStart, setIsStart] = useState<boolean>(true);
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
        if (roundInfo.currentRound != 1){
            if (roundInfo.cats.length == 1){
                setIsFinish(true);
                return;
            }
            getWinCats();
        }
        else{
            !isStart && getCats();
        }
    }, [roundInfo])

    if(isStart){
        return(
            <StartScreen 
                setPairAmount={setPairAmount} 
                setRoundInfo={setRoundInfo}
                pairAmount={pairAmount}
                setStart={setIsStart}
            />
        ) 
    }

    if(isFinish){
        return(
            <WinScreen 
                catInfo={roundInfo.cats[0]}
            />
        )  
    }

    return(
        <div className='App'>
            <h1>Раунд {roundInfo.currentPair} из {roundInfo.pairAmount}</h1>
            <div className='App_catsDuel'>
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
        </div>
    )    
    
}

export default App;