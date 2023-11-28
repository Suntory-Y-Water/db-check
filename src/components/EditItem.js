function EditItem({ todo, editTodo, setEditingId, setEditingText, editingText }) {
  return (
    <li key={todo.id} className='edit-item'>
      <input
        className='edit-input'
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
      />
      <div className='edit-actions'>
        <button className='save-btn' onClick={editTodo}>
          更新する
        </button>
        <button className='cancel-btn' onClick={() => setEditingId(null)}>
          キャンセルする
        </button>
      </div>
    </li>
  );
}

export default EditItem;
