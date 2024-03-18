import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css'



function XoxGameComponent(){
  const [games, setGames]=useState([]);
  const [mark,setMark]=useState("X");
  const [message,setMessage]=useState("");
  const [isGameFinish,setIsGameFinish]=useState(false);
  const [isMultiplayer, setIsMultiplayer] = useState(false);

  useEffect(()=>{
    newGame();
  },[])
  const newGame=()=>{
    setGames([
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]);
    setIsGameFinish(false);
    setMark("X");
    setMessage(isMultiplayer ? ("Move Mark: X" ): ("Move Mark: " + mark));
    
  }

  const markGame = (index) => {
    if (!isGameFinish) {
      const newGames = [...games];
      if (newGames[index] === "") {
        newGames[index] = mark;
        setGames(newGames);
  
        let e = isMoveFinish(newGames);
        if (e) {
          setMessage("The Game Is Tied");
          setIsGameFinish(true);
          return;
        }
  
        let r = isGameOver(newGames);
        if (r) {
          setMessage("The Game Won By " + mark);
          setIsGameFinish(true);
          return;
        }
  
        if (!isMultiplayer) {
          setMark("O");
          setMessage("Move Mark: O");
          setTimeout(() => {
            computerMove(newGames);
            setMark("X");
            setMessage("Move Mark: X");
          }, 1000);
        } else {
          setMark(mark === "X" ? "O" : "X");
          setMessage("Move Mark: " + (mark === "X" ? "O" : "X"));
        }
      }
    }
  }
  const isGameOver=(newGames)=>{
    if(newGames[0] !="" && newGames[0]===newGames[1] && newGames[1]===newGames[2]){
      return true;
    }
    if(newGames[3] !="" && newGames[3]===newGames[4] && newGames[4]===newGames[5]){
      return true;
    }
    if(newGames[6] !="" && newGames[6]===newGames[7] && newGames[7]===newGames[8]){
      return true;
    }
    if(newGames[0] !="" && newGames[0]===newGames[3] && newGames[3]===newGames[6]){
      return true;
    }
    if(newGames[1] !="" && newGames[1]===newGames[4] && newGames[4]===newGames[7]){
      return true;
    }
    if(newGames[2] !="" && newGames[2]===newGames[5] && newGames[5]===newGames[8]){
      return true;
    }
    if(newGames[0] !="" && newGames[0]===newGames[4] && newGames[4]===newGames[8]){
      return true;
    }
    if(newGames[2] !="" && newGames[2]===newGames[4] && newGames[4]===newGames[6]){
      return true;
    }
    return false;
  }
function isMoveFinish(newGames){
  for (let i = 0; i < newGames.length; i++) {
    const element = newGames[i];
    if(element===""){
      return false;
    }
  }
  return true
}
const computerMove = (newGames) => {
  const number = getRandomNumber(0, 8);
  if (newGames[number] === "") {
    newGames[number] = mark === "X" ? "O" : "X";
    setGames(newGames);
    setMark(mark === "X" ? "O" : "X");
    setMessage("Move Mark: " + (mark === "X" ? "O" : "X"));
  } else {
    computerMove(newGames);
  }
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
return (
  <>
    <div className='container text-center'>
      <h1>XOX Game</h1>
      <h2 className='alert alert-warning'>
        {message}
      </h2>
      <div className="mb-2">
        <button className='btn btn-outline-primary me-2' onClick={() => { setIsMultiplayer(true); newGame(); }}>Multiplayer Game</button>
        <button className='btn btn-outline-primary' onClick={() => { setIsMultiplayer(false); newGame(); }}>Single Player Game</button>
      </div>
      <div className='row mt-2'>
        {games.map((game, index) => (
          <div key={index}
            className='col-md-4 box'
            onClick={() => markGame(index)}>
            {game}
          </div>
        ))}
      </div>
    </div>
  </>
)
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <XoxGameComponent/>
  </>
);

reportWebVitals();
