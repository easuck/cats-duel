import { IRoundInfo } from '../../models/IRoundInfo';
import './styles.scss';

type Props = {
    setRoundInfo: React.Dispatch<React.SetStateAction<IRoundInfo>>;
    pairAmount: number;
    catInfo: any;
}

const CatCard = ({setRoundInfo, pairAmount, catInfo}: Props) => {
    const handleClick = () => {
        setRoundInfo(prev => ({
            ...prev,
            winCats: prev.currentPair == pairAmount ? [] : [...prev.winCats, catInfo],
            cats: prev.currentPair == pairAmount ? [...prev.winCats, catInfo] : [...prev.cats.slice(2)],
            currentPair: prev.currentPair == pairAmount ? 1 : prev.currentPair + 1,
            currentRound: prev.currentPair == pairAmount ? prev.currentRound + 1 : prev.currentRound, 
            pairAmount: prev.currentPair == pairAmount ? pairAmount / 2 : pairAmount
        }));
    }
    return(
        <img 
            className='CatCard'
            src={catInfo?.url} 
            alt='catDuelist'
            onClick={handleClick}
        />
    )
}

export default CatCard;