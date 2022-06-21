import { useState } from 'react';
import './App.css';
import Board from './components/board/board';
import Menu from './components/menu/menu';
import { GAME_DIFFICULTY, GAME_STATE } from './common/constants';

function App() {

  const [gameStatus, setGameStatus] = useState(GAME_STATE.NOT_STARTED);
  const [gameDifficulty, setGameDifficulty] = useState(GAME_DIFFICULTY.EASY);

  function handleGameStatus(status: string, difficulty: string): void {
    setGameStatus(status);
    setGameDifficulty(difficulty);
  }

  function render(): JSX.Element {
    if (gameStatus == GAME_STATE.NOT_STARTED || gameStatus == GAME_STATE.END ){
      return <Menu onChange={handleGameStatus} gameStatus={gameStatus}/>
    }
    else if (gameStatus == GAME_STATE.START){
      return <Board onChange={handleGameStatus} difficulty={gameDifficulty}/>
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
