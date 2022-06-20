import './menu.css';
import { GAME_STATE } from '../../common/constants';

function GameOverMenu(props: any) {
    return (
        <div className='menu-container'>
            <div className='game-over-container'> Game Over</div>
            <div className='main'>
                <button className='menu-button' onClick={() => startGame(props)}>
                    <span>New Game</span>
                </button>
            </div>
            
        </div>
    );

    function startGame(props: any): void {
        props.onChange(GAME_STATE.START);
    }
}



export default GameOverMenu;