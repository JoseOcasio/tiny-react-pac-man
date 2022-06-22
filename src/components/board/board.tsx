import { useEffect, useState } from 'react';
import { DIRECTIONS, GAME_DIFFICULTY, GAME_STATE, SYMBOLS } from '../../common/constants';
import './board.css';

interface Character {
    x: number;
    y: number;
}


function Board(props: any): JSX.Element {

    const [pacman, setPacman] = useState<Character>({
        x: 2, y: 3
    });
    const [enemy, setEnemy] = useState<Character>({
        x: 0, y: 0
    });

    const [lastEnemyCellState, setlastEnemyCellState] = useState("cell");

    const [score, setScore] = useState(0)

    const [board, setBoard] = useState(createBoard());

    const [displayTutorial, setDisplayTutorial] = useState(true);

    const displayBoard = board.map((cell) => {
        return (
            <div>
                <span className='row'>{cell}</span>
            </div>
        );
    });

    let maxScore = 0;
    board.forEach(row => {
        maxScore = maxScore + row.length;
    });

    if (score == maxScore - 1){
        props.onChange(GAME_STATE.END);
    }

    function keyDownEvent(event: any): void{
        let direction = "";
        switch (event.key) {
            case "ArrowLeft":
                direction = DIRECTIONS.LEFT;
                break;
            case "ArrowUp":
                direction = DIRECTIONS.UP;
                break;
            case "ArrowRight":
                direction = DIRECTIONS.RIGHT;
                break;
            case "ArrowDown":
                direction = DIRECTIONS.DOWN;
                break;
        }
        handleMovements(direction);
    }

    function calculateGameDifficulty(): number {
        if (props.difficulty == GAME_DIFFICULTY.EASY){
            return 1;
        }
        else if (props.difficulty == GAME_DIFFICULTY.NORMAL){
            return 2;
        }
        else if (props.difficulty == GAME_DIFFICULTY.IMPOSSIBLE){
            return 3;
        }
        return 0;
    }

    function handleMovements(pacmanDirection: string): void {
        //pacman movement
        move(pacmanDirection, pacman, setPacman, SYMBOLS.PACMAN);

        //enemy movement with some randomness
        const randomNumber: number = Math.ceil(Math.random() * 3); //3 is the amount of difficulty settings
        let enemyDirection: string;

        if (randomNumber <= calculateGameDifficulty() ){
            enemyDirection = calculateEnemiesMovement(pacman, enemy);
        }
        else {
            const randomDirection = Math.ceil(Math.random() * 4);
            const directionMap = new Map()
            directionMap.set(1, DIRECTIONS.UP);
            directionMap.set(2, DIRECTIONS.DOWN);
            directionMap.set(3, DIRECTIONS.LEFT);
            directionMap.set(4, DIRECTIONS.RIGHT);
        
            enemyDirection = directionMap.get(randomDirection);
        }

        move(enemyDirection, enemy, setEnemy, SYMBOLS.ENEMY);

    }

    function move(direction: string, target: Character, setState: any, characterRepresentation: JSX.Element): void{
        
        let newCoordinate = {
            x: 0,
            y: 0
        };

        let newBoard = [...board];

        if (direction === DIRECTIONS.LEFT){
            newCoordinate.x = target.x;
            newCoordinate.y = target.y - 1;
        }
        else if (direction === DIRECTIONS.RIGHT){
            newCoordinate.x = target.x;
            newCoordinate.y = target.y + 1;
        }
        else if (direction === DIRECTIONS.DOWN){
            newCoordinate.x = target.x + 1;
            newCoordinate.y = target.y;
        }
        else if (direction === DIRECTIONS.UP){
            newCoordinate.x = target.x - 1;
            newCoordinate.y = target.y;
        }

        if (isInBounds(newCoordinate.x, newCoordinate.y) == false){
            return;
        }

        setState({x: newCoordinate.x, y: newCoordinate.y});

        if (characterRepresentation == SYMBOLS.PACMAN){
            checkEndGame(newCoordinate, enemy, pacman);
            newBoard[target.x][target.y] = SYMBOLS.ATE_CELL;

            if (newBoard[newCoordinate.x][newCoordinate.y].props.className == "cell"){
                setScore(prevScore => prevScore + 1);
            }
        }

        if (characterRepresentation == SYMBOLS.ENEMY){
            setlastEnemyCellState(newBoard[newCoordinate.x][newCoordinate.y].props.className);

            if (lastEnemyCellState == "ate-cell"){
                newBoard[target.x][target.y] = SYMBOLS.ATE_CELL;
            }
            else if (lastEnemyCellState == "cell"){
                newBoard[target.x][target.y] = SYMBOLS.NORMAL_CELL; 
            }
        }

        newBoard[newCoordinate.x][newCoordinate.y] = characterRepresentation;
        setBoard(newBoard);
    }

    function isInBounds(x: number, y: number): boolean {
        if (x < board.length && x >= 0){
            if (y < board[x].length && y >= 0){
                return true;
            }
        }
        return false;
    }

    function checkEndGame(newCoordinate: Character, enemy: Character, pacman: Character): void {
        if (JSON.stringify(newCoordinate) === JSON.stringify(enemy) || JSON.stringify(newCoordinate) === JSON.stringify(pacman)){
            props.onChange(GAME_STATE.END);
        }
    }

    function calculateEnemiesMovement(target: Character, enemy: Character): string{
        //isInBounds that movement is allowed
        let distance: number = 0;
        let direction: string = "";
        
        distance = Math.abs(target.x-enemy.x) + Math.abs(target.y-enemy.y);

        //find min distance
        let minDistance = 0;
        minDistance = Math.abs(target.x - enemy.x - 1) + Math.abs(target.y-enemy.y); //down
        if (minDistance <= distance){
            distance = minDistance
            direction = DIRECTIONS.DOWN;
        }
        minDistance = Math.abs(target.x - enemy.x + 1) + Math.abs(target.y-enemy.y); //up
        if (minDistance <= distance){
            distance = minDistance;
            direction = DIRECTIONS.UP;
        }
        minDistance = Math.abs(target.x - enemy.x) + Math.abs(target.y-enemy.y - 1); //right
        if (minDistance <= distance){
            distance = minDistance;
            direction = DIRECTIONS.RIGHT;
        }
        minDistance = Math.abs(target.x - 1 - enemy.x) + Math.abs(target.y-enemy.y + 1); //left
        if (minDistance <= distance){
            distance = minDistance;
            direction = DIRECTIONS.LEFT;
        }

        return direction;
    }

    function createBoard():  Array<Array<any>> {
        const newBoard: Array<Array<any>> = [
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "." ],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "." ],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "." ],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "." ],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "." ],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "." ],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "." ],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "." ],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "." ],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "." ]
        ];

        newBoard.forEach(row => row.fill(<span className='cell'>.</span>));
        newBoard[pacman.x][pacman.y] = SYMBOLS.PACMAN;
        newBoard[enemy.x][enemy.y] = SYMBOLS.ENEMY;

        return newBoard;
    }

    function renderTutorial() {
        if (displayTutorial){
            return (
                <div className='tutorial-container'>Click anywhere to use Directional Arrows</div>
            )
        }
    }

    return(
        <div className="board-container" onClick={() => setDisplayTutorial(false)} onKeyDown={keyDownEvent} tabIndex={-1}>
            {displayBoard}                
            {renderTutorial()}
            <div className='score-container'>
                Score: {score}
            </div>
        </div>
    );
};


export default Board;