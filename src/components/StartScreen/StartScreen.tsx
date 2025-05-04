import { useState } from 'react';
import './styles.scss';
import { IRoundInfo } from "../../models/IRoundInfo";


type Props = {
    setPairAmount: any;
    pairAmount: number;
    setRoundInfo: React.Dispatch<React.SetStateAction<IRoundInfo>>;
    setStart: any;
    setCurrentCats: any;
}

const StartScreen = ({setPairAmount, setRoundInfo, setStart, pairAmount, setCurrentCats}: Props) => {
    const options = [4, 8, 16];
    const [activeOption, setActiveOption] = useState<any>();

    const headers = new Headers({
        'x-api-key': 'live_dXgE9ReJ2Il4WhFoBdCDZm9N2VhY5EsER6tENwMDvHW3jtl7lmMkk6JoEB1hc4lP'
    });
    const requestOptions = {
        headers: headers
    }
    const getCats = () => {
        fetch(`https://api.thecatapi.com/v1/images/search?limit=${pairAmount * 2}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            setCurrentCats([data[0], data[1]]);
            setRoundInfo(prev => ({
                ...prev,
                cats: data,
                pairAmount: pairAmount
            }))
        })
    }
    const handleStart = () => {
        getCats();
        setStart(false);
    }
    const handleOptionClick = (option: number) => {
        setActiveOption(option);
        setPairAmount(option);
    }

    return(
        <div className='StartDuel'>
            <h1>Кошачья дуэль!</h1>
            <h2>Выберите количество котов-участников</h2>
            <div className='StartDuel_selectRounds'>
                {
                    options.map(option => {
                        return <div onClick={() => handleOptionClick(option)} 
                        className={`${option == activeOption ? 'StartDuel_selectRounds_option active' :
                            'StartDuel_selectRounds_option'}`}>{option}</div>
                    })
                }
            </div>
            <button className='StartDuel_startButton' onClick={handleStart}>Начать</button>
        </div>
    )
}

export default StartScreen;