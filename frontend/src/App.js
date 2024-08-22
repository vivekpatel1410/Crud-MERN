import { useEffect, useState } from "react";
import ToDo from "./components/ ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleAddOrUpdate = () => {
    if (isUpdating) {
      updateToDo(toDoId, text, setToDo, setText, setIsUpdating);
      setAlert({ type: 'success', message: 'Todo updated successfully' });
    } else {
      addToDo(text, setText, setToDo);
      setAlert({ type: 'success', message: 'Todo added successfully' });
    }
  };

  const handleDelete = (id) => {
    deleteToDo(id, setToDo);
    setAlert({ type: 'danger', message: 'Todo deleted successfully' });
  };

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <h1 className="text-center mb-4">Todo App</h1>


        {alert && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}

        <div className="d-flex mb-4">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Add Todos.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className={`btn ${isUpdating ? 'btn-success' : 'btn-primary'}`}
            onClick={handleAddOrUpdate}
          >
            {isUpdating ? "Update" : "Add"}
          </button>
        </div>
        <div className="list">
          {Array.isArray(toDo) && toDo.length > 0 ? (
            toDo.map((item) => (
              <ToDo
                key={item._id}
                text={item.text}
                updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={() => handleDelete(item._id)}
              />
            ))
          ) : (
            <p className="text-center">No tasks available..</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
