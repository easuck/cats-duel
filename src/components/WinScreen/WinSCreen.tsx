import './styles.scss';

type Props = {
    catInfo: any;
}

const WinScreen = ({catInfo}: Props) => {
    const handleClick = () => {
        document.location.reload();
    }
    return(
        <div className='WinnerContainer'>
            <h1>The winner!</h1>
            <img src={catInfo.url}/>
            <button onClick={handleClick}>Попробовать еще раз :3</button>
        </div>
    )
}

export default WinScreen;