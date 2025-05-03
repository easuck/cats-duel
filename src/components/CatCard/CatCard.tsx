import './styles.scss';

type Props = {
    info: any;
    chosenCats: any[];
    setChosenCats: React.Dispatch<React.SetStateAction<any[]>>;
    getCats: any;
}

const CatCard = ({info, chosenCats, setChosenCats, getCats}: Props) => {
    const handleClick = () => {
        setChosenCats([...chosenCats, info]);
        getCats();
    }
    return(
        <img 
            className='CatCard'
            src={info?.url} 
            alt='catDuelist'
            onClick={handleClick}
        />
    )
}

export default CatCard;