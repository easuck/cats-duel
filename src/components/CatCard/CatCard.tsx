import { IRoundInfo } from '../../models/IRoundInfo';
import './styles.scss';

type Props = {
    setRoundInfo: React.Dispatch<React.SetStateAction<IRoundInfo>>;
    pairAmount: number;
    catInfo: any;
    handleLoad: any;
    catsLoaded: any;
    setCatsLoaded: any;
    catId: string;
}

const CatCard = ({setRoundInfo, pairAmount, catInfo, handleLoad, catsLoaded, setCatsLoaded, catId}: Props) => {
    
    const handleClick = () => {
        setCatsLoaded({
            img1: true,
            img2: true
        })
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
        <>
            <img 
                className='CatCard'
                style={catsLoaded.img1 || catsLoaded.img2 ? {display: 'none'} : {display: 'block'}}
                src={catInfo?.url} 
                alt='catDuelist'
                onClick={handleClick}
                onLoad={() => handleLoad(catId)}
            /> 
        </>
    )
}

export default CatCard;