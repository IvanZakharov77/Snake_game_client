import { React, useCallback, useEffect, useState } from "react";
import { SendIdGamerPoint, TopGamer } from "./DataApi";
import Snake from "./Snake";
import Food from "./Food";
import { useDispatch, useSelector } from "react-redux";

const WorkSnake = () => {
  const randomCords = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
  };

  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);

  const dispatch = useDispatch();
  const gamerId = useSelector((state) => state.loginReduser.res[0].id);
  const stateTopGamer = useSelector(
    (state) => state.topGamerReduser.resTopGamer[0]
  );

  const [foodDot, setFoodDot] = useState(randomCords);
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(200);
  const [pause, setPause] = useState(true);
  const [reservedBillForFiftyPlus, setReservedBillForFiftyPlus] = useState(50);
  const [point, setPoint] = useState(0);

  const onKeyDown = (e) => {
    e = e || window.event;

    // eslint-disable-next-line default-case
    switch (e.keyCode) {
      case 38:
        setDirection("UP");
        break;
      case 40:
        setDirection("DOWN");
        break;
      case 37:
        setDirection("LEFT");
        break;
      case 39:
        setDirection("RIGHT");
        break;
    }
  };

  const moveSnake = () => {
    let dots = [...snakeDots];

    let head = dots[dots.length - 1];

    // console.log("-------------------", head);
    // eslint-disable-next-line default-case
    switch (direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);

    dots.shift();

    setSnakeDots(dots);
  };
  const heandlePause = () => {
    setPause(true);
    if (pause) {
      setPause(false);
    }
  };

  useEffect(() => {
    if (pause) {
      setPoint(snakeDots.length - 2);
      const intervalId = setInterval(moveSnake, speed);
      document.onkeydown = onKeyDown;
      return () => clearInterval(intervalId);
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveSnake]);

  const firstScores = () => {
    if (point === 1) {
      return <div className="firctScores">{point} балл</div>;
    } else if (point === 5) {
      return <div className="firctScores">{point} балл</div>;
    } else if (point === 10) {
      return <div className="firctScores">{point} балл</div>;
    }
    return <div></div>;
  };

  const checkItOutOfBorder = useCallback(() => {
    let head = snakeDots[snakeDots.length - 1];
    // console.log(head);
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snakeDots]);

  const onEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    let food = foodDot;
    if (head[0] === food[0] && head[1] === food[1]) {
      setFoodDot(randomCords);
      enlargeSnake();
    }
  };
  const enlargeSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };
  const increaseSpeed = () => {
    if (snakeDots.length - 2 > reservedBillForFiftyPlus) {
      setSpeed(speed - 30);
      setReservedBillForFiftyPlus(reservedBillForFiftyPlus + 50);
    }
  };

  const onGameOver = () => {
    SendIdGamerPoint(gamerId, point);

    alert(`Ты набрал всего: ${snakeDots.length - 2}`);

    setDirection("RIGHT");
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
    setSpeed(200);
  };
  useEffect(() => {
    dispatch(TopGamer());
    checkItOutOfBorder();
    onEat();
    increaseSpeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkItOutOfBorder]);
  return (
    <div className="page-game">
      <div>
        {firstScores()}
        <div>
          {stateTopGamer ? (
            <ul className="list-top-gamer">
              <h3>List Top Gamers</h3>
              {stateTopGamer.map((a) => {
                return (
                  <li key={a.id}>
                    <p>
                      {a.name}: <span> {a.points}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <></>
          )}
        </div>
        <button className="btn-pause" onClick={heandlePause}>Pause</button>
      </div>

      <div className="game-area">
        <Snake snakeDots={snakeDots} />
        <Food foodDot={foodDot} />
      </div>
    </div>
  );
};
export default WorkSnake;
