export const GAME_STATE = {
    START: "START",
    NOT_STARTED: "NOT STARTED",
    END: "END"
}

export const DIRECTIONS = {
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    UP: "UP",
    DOWN: "DOWN"
}

export const SYMBOLS = {

    PACMAN: <span className="cell">.
                <span className="pacman">
                    <div className="pacman-eye"></div>
                    <div className="pacman-mouth"></div>
                </span>
            </span>,
    ENEMY: <span className="cell">.
                <span className="ghost">
                    <div className="ghost-eye-right"></div>
                    <div className="ghost-eye-left"></div>
                    <div className="ghost-mouth"></div>
                </span>
            </span>
}

export const GAME_DIFFICULTY = {
    EASY: "EASY",
    NORMAL: "NORMAL",
    IMPOSSIBLE: "IMPOSSIBLE"
}