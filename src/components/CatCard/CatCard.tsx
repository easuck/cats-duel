import { IRoundInfo } from '../../models/IRoundInfo';
import './styles.scss';

type Props = {
    setRoundInfo: React.Dispatch<React.SetStateAction<IRoundInfo>>;
    info: IRoundInfo;
    pairAmount: number;
    catInfo: any;
}

const CatCard = ({setRoundInfo, info, pairAmount, catInfo}: Props) => {
    const handleClick = () => {
        console.log(info.currentPair)
        setRoundInfo((prevInfo) => ({
            ...prevInfo,
            winCats: [...prevInfo.winCats, catInfo],
            currentPair: info.currentPair == pairAmount ? 1 : prevInfo.currentPair + 1,
            round: info.currentPair == pairAmount ? prevInfo.currentRound + 1 : prevInfo.currentRound, 
            pairAmount: info.currentPair == pairAmount ? pairAmount / 2 : pairAmount
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