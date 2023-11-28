function TodoItem({ todo, startEditing, deleteTodo, toggleTodo }) {
  return (
    <li key={todo.id} className='todo-item'>
      <span
        className={todo.completed ? 'todo-text completed' : 'todo-text'}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      <div className='todo-actions'>
        <button className='edit-btn' onClick={() => startEditing(todo.id, todo.text)}>
          編集する
        </button>
        <button className='delete-btn' onClick={() => deleteTodo(todo.id)}>
          削除する
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
