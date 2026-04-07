function TodoSection({
  todoTitle,
  onTodoTitleChange,
  onCreateTodo,
  todos,
  onToggleCompleted,
  onDeleteTodo,
}) {
  return (
    <>
      <section className="card">
        <h2>Add todo</h2>
        <form onSubmit={onCreateTodo} className="row">
          <input
            value={todoTitle}
            onChange={(event) => onTodoTitleChange(event.target.value)}
            placeholder="Todo title"
          />
          <button type="submit">Add todo</button>
        </form>
      </section>

      <section className="card">
        <h2>Todos</h2>
        {todos.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <label>
                  <input
                    type="checkbox"
                    checked={Boolean(todo.completed)}
                    onChange={() => onToggleCompleted(todo)}
                  />
                  <span className={todo.completed ? "done" : ""}>
                    {todo.title}
                  </span>
                </label>
                <button type="button" onClick={() => onDeleteTodo(todo.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default TodoSection;
