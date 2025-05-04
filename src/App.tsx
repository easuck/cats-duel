import { useEffect, useRef, useState } from "react";
import CatCard from "./components/CatCard/CatCard";
import { IRoundInfo } from "./models/IRoundInfo";
import WinScreen from "./components/WinScreen/WinSCreen";
import './App.scss';
import StartScreen from "./components/StartScreen/StartScreen";
import { ColorRing } from 'react-loader-spinner'


const App = () => {
    const [pairAmount, setPairAmount] = useState<64 | 32 | 16 | 4>(4);
    const [currentCats, setCurrentCats] = useState<any[]>([]);
    const [isFinish, setIsFinish] = useState<boolean>(false);
    const [isStart, setIsStart] = useState<boolean>(true);
    const [catsLoaded, setCatsLoaded] = useState<any>({
        img1: true,
        img2: true
    });
    const [isSpinnerShown, setSpinerShown] = useState<boolean>(true);
    const [roundInfo, setRoundInfo] = useState<IRoundInfo>({
        winCats: [],
        cats: [],
        currentPair: 1,
        pairAmount: pairAmount,
        currentRound: 1,
    });
    const timer = useRef(undefined);


    const handleLoad = (id: string) => {
        setCatsLoaded((prev: any) => ({
            ...prev,
            [id]: false
        }));
        setSpinerShown(false);
        clearTimeout(timer.current);
    }
    
    const getWinCats = () => {
        setCurrentCats([roundInfo.cats[0], roundInfo.cats[1]]);
    }

    const getNextCats = () => {
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
            !isStart && getNextCats();
        }
    }, [roundInfo])

    if(isStart){
        return(
            <StartScreen 
                setPairAmount={setPairAmount} 
                setRoundInfo={setRoundInfo}
                pairAmount={pairAmount}
                setStart={setIsStart}
                setCurrentCats={setCurrentCats}
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
            <h1>{roundInfo.pairAmount == 1 ? 'Финал' : `Раунд ${roundInfo.currentPair} из ${roundInfo.pairAmount}`}</h1>
            <div className='App_catsDuel'>
                {
                    isSpinnerShown && 
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['red', 'red', 'red', 'red', 'red']}
                    /> 
                }
                <CatCard 
                    setRoundInfo={setRoundInfo}
                    pairAmount={roundInfo.pairAmount}
                    catInfo={currentCats[0]}
                    handleLoad={handleLoad}
                    catsLoaded={catsLoaded}
                    setCatsLoaded={setCatsLoaded}
                    catId='img1'
                    timer={timer}
                    setSpinnerShown={setSpinerShown}
                />
                <CatCard 
                    setRoundInfo={setRoundInfo}
                    pairAmount={roundInfo.pairAmount}
                    catInfo={currentCats[1]}
                    handleLoad={handleLoad}
                    catsLoaded={catsLoaded}
                    setCatsLoaded={setCatsLoaded}
                    catId='img2'
                    timer={timer}
                    setSpinnerShown={setSpinerShown}
                />
            </div>
        </div>
    )    
    
}

export default App;