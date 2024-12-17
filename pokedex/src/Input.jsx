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
                <input type="text" id="todo" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    name="todo" placeholder="Type a new todo"></input><br></br>
                <button onClick={handleAddTodos}>Add Todo</button>
            </div>
    )
}

export default SearchInput