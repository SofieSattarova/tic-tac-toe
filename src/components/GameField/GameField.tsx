import React, { useCallback, useMemo, useState, useEffect } from "react"
import {RxCross1} from "react-icons/rx";
import { BsCircle } from "react-icons/bs";

import { SquareFilling, SquareState } from "../../types/square";
import { determineEndOfGame } from "../../helpers/determineEndOfGame";

import './GameField.css'

export const GameField = () => {
    const [squares, setSquaresState] = useState<SquareState[]>([
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ]);

    const [isGameOver, setGameState] = useState<boolean>(false)
    const [winnerZeroOrCross, setWinner] = useState<SquareState | undefined>(undefined);

    useEffect(() => {
      const { isEnd, winner } = determineEndOfGame(squares);
      setGameState(isEnd);
      setWinner(winner);
    }, [squares, setGameState, setWinner]);

    const onSquareClick = useCallback(
      async (state: SquareState, idx: number) => {
        const whereToPutZeroIdx = (newState: SquareState[]) => {
          return newState.findIndex((item) => item === null);
        };

        if (!state) {
            const newState = squares.slice();
            newState.splice(idx, 1, SquareFilling.Cross);
            newState.splice(whereToPutZeroIdx(newState), 1, SquareFilling.Zero);
            setSquaresState(newState);
        }
      },
      [setSquaresState, squares]
    );

    const field = useMemo(() => {
        return squares.map((item, idx) => {
            return (
                <Square
                key={idx}
                state={item}
                onClick={() => {
                    onSquareClick(item, idx);
                }}
                />
            );
        });
    }, [squares, onSquareClick]);


    return (
      <div>
        <div className="game-field">{field}</div>
        {isGameOver && winnerZeroOrCross && (
          <div>
            <div className={"game-field__winner"}>
              <span>Победитель: </span>
              <span style={{ marginLeft: 5 }}>
                {mapFillingToWord.get(winnerZeroOrCross)}
              </span>
            </div>
            <div
              className={"game-field__again-button"}
              onClick={() => {
                setSquaresState([
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                ]);
              }}
            >
              Сыграть ещё
            </div>
          </div>
        )}
      </div>
    );
}


export const Square = ({state, onClick}: {state: SquareState, onClick: () => void}) => {

    return (
      <div className={"game-field__square"} onClick={onClick}>
        <div className={"game-field__square-content"}>{mapFillingToWord.get(state)}</div>
      </div>
    );
}

export const mapFillingToWord = new Map<SquareFilling | null, any>([
  [SquareFilling.Cross, <RxCross1 size={30} />],
  [SquareFilling.Zero, <BsCircle size={30} />],
  [null, ""],
]);
