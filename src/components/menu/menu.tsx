import './menu.css'
import { GAME_STATE } from '../../common/constants';

function Menu(props: any): JSX.Element {

    return (
        <div className='menu-container'>
            <div className='main'>
                <button className='menu-button' onClick={() => startGame(props)}>
                    <span>Start</span>
                </button>
            </div>
            
        </div>
    );
}

function startGame(props: any): void {
    props.onChange(GAME_STATE.START);
}


export default Menu;