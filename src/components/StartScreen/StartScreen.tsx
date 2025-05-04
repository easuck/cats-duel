import { useState } from 'react';
import './styles.scss';
import { IRoundInfo } from "../../models/IRoundInfo";


type Props = {
    setPairAmount: any;
    pairAmount: number;
    setRoundInfo: React.Dispatch<React.SetStateAction<IRoundInfo>>;
    setStart: any;
}

const StartScreen = ({setPairAmount, setRoundInfo, setStart, pairAmount}: Props) => {
    const options = [4, 8, 16];
    const [activeOption, setActiveOption] = useState<any>();
    const handleStart = () => {
        setRoundInfo(prev => ({
            ...prev,
            pairAmount: pairAmount
        }))
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