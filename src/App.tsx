import { useEffect, useState } from "react";
import { Todo } from "./types";
const API_URL = "http://localhost:8080/api/v1";
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fetchTodos = async (refresh: boolean = true) => {
    refresh ? setRefreshing(true) : setLoading(true);
    const todosResponse = await fetch(API_URL + "/todos");
    if (todosResponse.status === 200) {
      const todosJson = await todosResponse.json();
      (todosJson.data as Todo[]).sort((t1, t2) => {
        return (
          new Date(t1.createdAt).getTime() - new Date(t2.createdAt).getTime()
        );
      });
      setTodos(todosJson.data as Todo[]);
    }
    refresh ? setRefreshing(false) : setLoading(false);
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
              return (
                <li key={todo._id}>
                  {" "}
                  <input
                    type="checkbox"
                    onChange={async () => {
                      await fetch(
                        API_URL + `/todos/toggle/status/${todo._id}`,
                        {
                          method: "PATCH",
                        }
                      );
                      fetchTodos();
                    }}
                    checked={todo.isComplete}
                  />{" "}
                  {todo.title}
                </li>
              );
            })
          : "No Todos"}
      </div>
    </>
  );
}

export default App;
