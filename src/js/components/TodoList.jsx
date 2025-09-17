
const TodoList = () => {
    return(
        <>
        <h1 className="text-center">todos</h1>
        <div className="list">
            <form>
                <input type="text" placeholder="What needs to be done?"/>
                <ul>
                    <li>Wola</li>
                    <li>Wola</li>
                    <li>Wola</li>
                    <li>Wola</li>
                </ul>
                <div className="footer">5 item left</div>
            </form>
        </div>
        </>
    );
};

export default TodoList;