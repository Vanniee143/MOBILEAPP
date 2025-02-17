import { useState } from "react";
import "./index.css";
import TodoList from "./components/TodoList";
import UserList from "./components/UserList";

function App() {
  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState([0]); // Initial input field
  const [result, setResult] = useState(0);

  // Counter Functions
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count > 0 ? count - 1 : 0);
  const handleReset = () => setCount(0);

  // Handle input changes
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = Number(value);
    setInputs(newInputs);
  };

  // Add new input field
  const addNewInput = () => {
    setInputs([...inputs, 0]); // Adds a new input field initialized to 0
  };

  // Remove the last input field (keep at least one)
  const undoLastInput = () => {
    if (inputs.length > 1) {
      setInputs(inputs.slice(0, -1));
    }
  };

  // Calculation functions
  const handleAddition = () => setResult(inputs.reduce((acc, curr) => acc + curr, 0));
  const handleSubtraction = () => setResult(inputs.reduce((acc, curr) => acc - curr));
  const handleMultiplication = () => setResult(inputs.reduce((acc, curr) => acc * curr, inputs.length ? 1 : 0));
  const handleDivision = () => {
    const divisionResult = inputs.reduce((acc, curr) => (curr !== 0 ? acc / curr : "Error"));
    setResult(divisionResult);
  };

  return (
    <div className="container">
      {/* Counter Section */}
      <div className="card counter">
        <h2>Tap Counter</h2>
        <p className="counter-value">{count}</p>
        <div className="btn-group">
          <button className="btn" onClick={handleIncrement}>Increment</button>
          <button className="btn" onClick={handleDecrement}>Decrement</button>
          <button className="btn reset" onClick={handleReset}>Reset</button>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="card calculator">
        <h2>Calculator</h2>
        <div className="btn-group">
          <button className="btn" onClick={addNewInput}>ADD NEW INPUT</button>
          <button className="btn undo" onClick={undoLastInput}>UNDO THE RECENT INPUT?</button>
        </div>

        <div className="input-group">
          {inputs.map((value, index) => (
            <input
              key={index}
              type="number"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Enter number ${index + 1}`}
            />
          ))}
        </div>

        <div className="btn-group">
          <button className="btn" onClick={handleAddition}>+</button>
          <button className="btn" onClick={handleSubtraction}>-</button>
          <button className="btn" onClick={handleMultiplication}>x</button>
          <button className="btn" onClick={handleDivision}>/</button>
        </div>

        <p className="result">Here's The Result: <span>{result}</span></p>
      </div>

      {/* Todo List */}
      <TodoList />
      <UserList />
    </div>
  );
}

export default App;
