import { useState } from "react";
import submitBall from '../asset/submitBall.png';
import submitBallHover from '../asset/submitBallHover.png';
import pokheader from '../asset/pokheader.png'

function SearchInput(props) {  
    let todos = props.todos;
    const addTodos = props.addTodos;
    const [inputValue, setInputValue] = useState("");
    const [buttonImage, setButtonImage] = useState(submitBall);  // L'état pour gérer l'image du bouton

    function handleAddTodos() {
        addTodos(inputValue);
        setInputValue("");  // Vide le champ de texte après ajout
    }

    // Gère l'événement de survol de l'image
    function handleMouseEnter() {
        setButtonImage(submitBallHover);  // Change l'image au survol
    }

    // Gère l'événement de sortie du survol
    function handleMouseLeave() {
        setButtonImage(submitBall);  // Restaure l'image originale
    }

    return (
        <div className="input-div">
            <div id="left">
                
            </div>
            <div id="middle">
                <h1>Pokemon</h1>
                <div id="search">
                    <input 
                        type="text" 
                        id="todo" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} 
                        name="todo" 
                        placeholder="Gotta catch 'em all..." 
                    />
                    <br />
                    <button 
                        onClick={handleAddTodos} 
                        onMouseEnter={handleMouseEnter}  // Applique le survol
                        onMouseLeave={handleMouseLeave}  // Applique la sortie du survol
                    >
                        <img src={buttonImage} alt="Submit" />
                    </button>
                </div>
            </div>
            <div id="right">
                <img src={pokheader} />
            </div>
        </div>
    );
}

export default SearchInput;
