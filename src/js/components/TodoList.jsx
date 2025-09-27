import React, { useState } from "react";

const TodoList = () => {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && nuevaTarea.trim() !== "") {
            setTareas([...tareas, nuevaTarea.trim()]);
            setNuevaTarea("");
             e.preventDefault();
        }
    };

    const eliminarTarea = (index) => {
        setTareas(tareas.filter((_, i) => i !== index));
    };


    return (
        <>
            <h1 className="text-center">todos</h1>
            <div className="list">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type="text" value={nuevaTarea}
                        onChange={(e) => setNuevaTarea(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="What needs to be done?" />
                    <ul>
                        {tareas.length === 0 ? (
                            <li className="no-tareas">No hay tareas, añadir tareas</li>
                        ) : (
                            tareas.map((tarea, index) => (
                                <li key={index} className="tarea">
                                    {tarea}
                                    <span
                                        className="eliminar"
                                        onClick={() => eliminarTarea(index)}
                                    >
                                         <i className="fa-duotone fa-regular fa-x icon"></i>
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>
                    <div className="footer">{tareas.length} {tareas.length === 1 ? "item" : "items"} left</div>
                </form>
            </div>
        </>
    );
};

export default TodoList;