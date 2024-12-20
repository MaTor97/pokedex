import { useState } from "react";

function SearchInput(props){  
    let todos = props.todos;
    const addTodos = props.addTodos;
    const [inputValue, setInputValue] = useState("")

    function handleAddTodos(){
        addTodos(inputValue);
        setInputValue("");
    }
    return(
            <div className="input-div">
                <h1>Pokemon</h1>
                <div id='search'>
                    <input type="text" id="todo" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        name="todo" placeholder="gotta catch em all.."></input><br></br>
                    <button onClick={handleAddTodos}>catch him!</button>
                </div>
            </div>
    )
}

export default SearchInput