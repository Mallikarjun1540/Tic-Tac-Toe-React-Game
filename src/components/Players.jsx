import { useState } from "react";

export default function Players({initialName, symbol, isActive,onNameChange}){
    const [playerName,setPlayerName]=useState(initialName);
    const [isEditing,setIsEditing]=useState(false);
    function handleClick(){
        // setIsEditing(isEditing?false:true);
        setIsEditing(editable=>!editable)
        if(isEditing){
            onNameChange(symbol,playerName);
        }
    }
    function handleChange(event)
    {
        // console.log(event)
        setPlayerName(event.target.value)
    }
    let editableplayerName=<span className="player-name"> {playerName}</span>;
    if(isEditing===true)
        {
            editableplayerName= <input type="text" required value={playerName} onChange={handleChange}/>;
        }
    return(
        <li className={isActive?'active':undefined}>
      <span className="player">
      {editableplayerName}
      <span className="player-symbol">{symbol}</span>  
      </span>  
      <button onClick={handleClick}>{isEditing?"Save":"Edit"}</button>
    </li>
    );
}