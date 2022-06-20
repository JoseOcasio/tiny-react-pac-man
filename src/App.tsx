import { useState } from 'react';
import './App.css';
import Board from './components/board/board';
import Menu from './components/menu/menu';
import GameOverMenu from './components/menu/gameOverMenu';
import { GAME_STATE } from './common/constants';

function App() {

  const [gameStatus, setGameStatus] = useState(GAME_STATE.NOT_STARTED);

  function handleGameStatus(status: string): void {
    setGameStatus(status);
  }

  function render(): JSX.Element {
    if (gameStatus == GAME_STATE.NOT_STARTED){
      return <Menu onChange={handleGameStatus}/>
    }
    else if (gameStatus == GAME_STATE.START){
      return <Board onChange={handleGameStatus}/>
    }
    else if (gameStatus == GAME_STATE.END){
      return <GameOverMenu onChange={handleGameStatus}/>
    }

    return <div>Unknown Component to Render</div>
  }

  return (
    <div className="App">
      <header className="App-header">
       React Pac Man
      </header>
      {render()}
    </div>
  );
}

export default App;
