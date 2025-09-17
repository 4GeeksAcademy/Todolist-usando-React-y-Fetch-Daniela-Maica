
const TodoList = () => {
    return(
        <>
        <h1 className="text-center">todos</h1>
        <div className="list">
            <form>
                <input type="text" placeholder="What needs to be done?"/>
                <ul>
                    <li>
                        hola 
                        <i class="fa-duotone fa-regular fa-x icon"></i>
                    </li>
                    <li>
                        Wola
                        <i class="fa-duotone fa-regular fa-x icon"></i>
                    </li>
                    <li>
                        Wola
                        <i class="fa-duotone fa-regular fa-x icon"></i>
                    </li> 
                    <li>
                        Wola
                        <i class="fa-duotone fa-regular fa-x icon"></i>
                    </li>
                </ul>
                <div className="footer">5 item left</div>
            </form>
        </div>
        </>
    );
};

export default TodoList;