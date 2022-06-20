import { useState } from 'react';
import { DIRECTIONS, GAME_STATE, SYMBOLS } from '../../common/constants';
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

    const board: Array<Array<string>> = createBoard();

    //helps to detect game over collision
    let lastKnownPacmanPosition = pacman;

    const displayBoard = board.map((cell, index) => {
        return (
            <div key={index}>
                <span className='row'>{cell}</span>
            </div>
        );
    });

    function handleMovements(pacmanDirection: string, setState: any): void {
        //pacman movement
        move(pacmanDirection, pacman, setState, SYMBOLS.PACMAN);

        //enemy movement with some randomness
        const randomNumber: number = Math.ceil(Math.random() * 4);
        let enemyDirection: string;
        if (randomNumber <= 2 ){
            enemyDirection = calculateEnemiesMovement(pacman, enemy);
           
        }
        else {
            let directionMap = new Map()
            directionMap.set(1, DIRECTIONS.UP);
            directionMap.set(2, DIRECTIONS.DOWN);
            directionMap.set(3, DIRECTIONS.LEFT);
            directionMap.set(4, DIRECTIONS.RIGHT);
            
            const randomDirection = Math.ceil(Math.random() * 4);
            enemyDirection = directionMap.get(randomDirection);

        }
        move(enemyDirection, enemy, setEnemy, SYMBOLS.ENEMY);
    }

    function move(direction: string, target: Character, setState: any, characterRepresentation: any): void{
        let newCoordinate = {
            x: 0,
            y: 0
        }
        if (direction === DIRECTIONS.LEFT){
            if (checkBounds(target.x, target.y - 1) == false){
                return ;
            }
            board[target.x][target.y - 1] = characterRepresentation;
            newCoordinate.x = target.x;
            newCoordinate.y = target.y - 1;
            setState({x: target.x, y: target.y - 1});


        }
        else if (direction === DIRECTIONS.RIGHT){
            if (checkBounds(target.x, target.y + 1) == false){
                return ;
            }
            board[target.x][target.y + 1] = characterRepresentation;
            newCoordinate.x = target.x;
            newCoordinate.y = target.y + 1;
            setState({x: target.x, y: target.y + 1})

        }
        else if (direction === DIRECTIONS.DOWN){
            if (checkBounds(target.x + 1, target.y) == false){
                return ;
            }
            board[target.x + 1][target.y] = characterRepresentation;
            newCoordinate.x = target.x + 1;
            newCoordinate.y = target.y;
            setState({x: target.x + 1, y: target.y})
        }
        else if (direction === DIRECTIONS.UP){
            if (checkBounds(target.x - 1, target.y) == false){
                return ;
            }
            board[target.x - 1][target.y] = characterRepresentation;
            newCoordinate.x = target.x - 1;
            newCoordinate.y = target.y;
            setState({x: target.x - 1, y: target.y})
        }

        //an enemy is being moved
        if (characterRepresentation == SYMBOLS.ENEMY){
            checkEndGame(newCoordinate, lastKnownPacmanPosition);
        }
       
        board[target.x][target.y] = ".";

    }

    function checkBounds(x: number, y: number): boolean {
        if (x < board.length && x >= 0){
            if (y < board[x].length && y >= 0){
                return true;
            }
        }
        return false;
    }

    function checkEndGame(s: Character, t: Character): void {
        if (JSON.stringify(s) === JSON.stringify(t)){
            props.onChange(GAME_STATE.END);
        }
    }

    function calculateEnemiesMovement(target: Character, enemy: Character): string{
        //checkbounds that movement is allowed
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
        const board: Array<Array<any>> = [
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


        board.forEach(row => row.fill(<span className='cell'>.</span>));

        board[pacman.x][pacman.y] = SYMBOLS.PACMAN;

        board[enemy.x][enemy.y] = SYMBOLS.ENEMY;

        return board;
    }


    return(
        <div className="board-container">
            {displayBoard}
            <button onClick={() => handleMovements(DIRECTIONS.RIGHT, setPacman)}> Right </button>
            <button onClick={() => handleMovements(DIRECTIONS.LEFT, setPacman)}> Left </button>
            <button onClick={() => handleMovements(DIRECTIONS.UP, setPacman)}> UP </button>
            <button onClick={() => handleMovements(DIRECTIONS.DOWN, setPacman)}> DOWN </button>
        </div>
    );
};


export default Board;