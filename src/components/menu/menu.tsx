import './menu.css'
import { GAME_DIFFICULTY, GAME_STATE } from '../../common/constants';
import { useState } from 'react';

function Menu(props: any): JSX.Element {

    const [showDifficultySelections, setDifficultySelection] = useState(false);

    function handleStart(){
        setDifficultySelection(true)
    }

    function renderer(props: any) {

        if (!showDifficultySelections){
            if (props.gameStatus == GAME_STATE.END){
                return (
                    <span>
                        <div className='game-over-container'> Game Over</div>
                        <div className='main'>
                            <button className='menu-button' onClick={handleStart}>
                                <span>New Game</span>
                            </button>
                        </div>
                    </span>
                );
            }
            return (
                <button className='menu-button' onClick={handleStart}>
                    <span>Start</span>
                </button>
            );
        }

        return (
            <span>
                <button className='menu-button' onClick={() => startGame(props, GAME_DIFFICULTY.EASY)}>
                    <span>Easy</span>
                </button>
                <button className='menu-button' onClick={() => startGame(props, GAME_DIFFICULTY.NORMAL)}>
                    <span>Normal</span>
                </button>
                <button className='menu-button' onClick={() => startGame(props, GAME_DIFFICULTY.IMPOSSIBLE)}>
                    <span>Impossible!</span>
                </button>
            </span>
        );
    }

    return (
        <div className='menu-container'>
            <div className='main'>
                {renderer(props)}
            </div>
        </div>
    );
}

function startGame(props: any, gameDifficulty: string): void {
    props.onChange(GAME_STATE.START, gameDifficulty);
}


export default Menu;