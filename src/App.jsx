import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TodoItem from "./components/TodoItem";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todoitem" element={<TodoItem />} />
    </Routes>
  );
}

export default App;
