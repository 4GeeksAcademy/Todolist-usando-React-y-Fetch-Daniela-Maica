import { useState, useEffect } from "react";

const inicialEstadoTareas = {
    label: "",
    is_done: false,
};

const URL_BASE_TODO = "https://playground.4geeks.com/todo";
const USERNAME = "DanielaM";

const TodoList = () => {

    const [tareas, setTareas] = useState(inicialEstadoTareas);
    const [nuevaTarea, setNuevaTarea] = useState([]);


    const crearUsuario = async () => {
        try {
            const resp = await fetch(`${URL_BASE_TODO}/users/${USERNAME}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([])
            });

            if (!resp.ok && resp.status !== 400) {
                throw new Error("Error creando el usuario");
            }
        } catch (error) {
            console.error("Error creando usuario:", error);
        }
    };

    const getAllTasks = async () => {
        try {
            const resp = await fetch(`${URL_BASE_TODO}/users/${USERNAME}`, {
                method: "GET",
            });
            if (resp.ok) {
                const data = await resp.json();
                setNuevaTarea(data.todos);
            } else if (resp.status === 404) {
                await crearUsuario();
            }
        } catch (error) {
            console.error("Error obteniendo tareas:", error);
        }
    };


    const agregarTarea = async (label) => {
        const nueva = { label, is_done: false };
        try {
            const resp = await fetch(`${URL_BASE_TODO}/todos/${USERNAME}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nueva)
            });

            if (resp.ok) {
                await getAllTasks();
            }
        } catch (error) {
            console.error("Error agregando Tareas:", error);
        }
    };

    const eliminarTarea = async (id) => {
        try {
            const resp = await fetch(`${URL_BASE_TODO}/todos/${id}`, {
                method: "DELETE"
            });

            if (resp.ok) {
                await getAllTasks();
            }
        } catch (error) {
            console.error("Error eliminando tarea:", error);
        }
    };

   const eliminarTodasLasTareas = async () => {
    try {
        if (!nuevaTarea || nuevaTarea.length === 0) return;

        for (const eliminate of nuevaTarea) {
            const resp = await fetch(`${URL_BASE_TODO}/todos/${eliminate.id}`, {
                method: "DELETE"
            });

            if (!resp.ok) {
                console.error(`No se pudo eliminar tarea con id ${eliminate.id}`);
            }
        }

        await getAllTasks();
    } catch (error) {
        console.error("Error eliminando tareas una por una:", error);
    }
};

    useEffect(() => {
        getAllTasks();
    }, []);

    const handleChange = (e) => {
        setTareas({
            ...tareas,
            label: e.target.value
        })
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && tareas.label.trim() !== "") {
            agregarTarea(tareas.label.trim());
            setTareas(inicialEstadoTareas);
            e.preventDefault();
        }
    };

    return (
        <>
            <h1 className="text-center">todos</h1>
            <div className="list">
                <form
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="text"
                        name="label"
                        value={tareas.label}
                        onKeyDown={handleKeyDown}
                        placeholder="What needs to be done?"
                        onChange={handleChange}
                    />
                    <ul>
                        {nuevaTarea.length === 0 ? (
                            <li>No tasks, add tasks</li>
                        ) : (
                            nuevaTarea.map((item, index) => (
                                <li key={index}>
                                    {item.label}
                                    <span onClick={() => eliminarTarea(item.id)}>
                                        <i className="fa-duotone fa-regular fa-x icon"></i>
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>
                    <div className="footer">{nuevaTarea.length} {nuevaTarea.length === 1 ? "item" : "items"} left</div>
                </form>
            </div>
            <div className="text-center my-5">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={eliminarTodasLasTareas}
                >
                    Delete all Tasks
                </button>
            </div>
        </>
    );
};

export default TodoList;