import { SquareState } from "../types/square";

export const determineEndOfGame = (squares: SquareState[]) => {
    for (const combination of endOfGameCombinations) {
        const first = squares[combination[0]]
        const second = squares[combination[1]]
        const third = squares[combination[2]]

        const notEmpty = first && second && third
        const areTheSame = first === second && second === third

        if (notEmpty && areTheSame) {
            return { isEnd: true, winner: first }
        }
    }

    return {isEnd: false}
}

const endOfGameCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 8],
    [0, 4, 8],
    [2, 4, 6],
]
