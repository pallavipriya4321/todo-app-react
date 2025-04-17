import { useEffect, useState } from "react";
import { Todo } from "./types";
const API_URL = "http://localhost:8080/api/v1";
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchTodos = async () => {
    setLoading(true);
    const todosResponse = await fetch(API_URL + "/todos");
    if (todosResponse.status === 200) {
      const todosJson = await todosResponse.json();

      setTodos(todosJson.data as Todo[]);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  console.log(todos);
  return (
    <>
      <div>
        {loading
          ? "Loading..."
          : todos.length > 0
          ? todos.map((todo) => {
              return <li key={todo._id}>{todo.title}</li>;
            })
          : "No Todos"}
      </div>
    </>
  );
}

export default App;
