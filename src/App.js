import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './components/TodoItem';
import EditItem from './components/EditItem';
import db from './db';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // startEditingメソッド：編集を開始する
  // id: 編集するtodoのID, text: 編集するテキスト
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // editTodoメソッド：todoを編集して保存する
  // 編集テキストが空白でない場合にのみ処理を行う
  const editTodo = async () => {
    if (editingText.trim().length) {
      await db.todos.update(editingId, { text: editingText });
      const updatedTodos = await db.todos.toArray();
      setTodos(updatedTodos);
      console.log(`Todoを編集しました：${editingText}`);
      setEditingId(null);
      setEditingText('');
    }
  };

  useEffect(() => {
    // loadTodosメソッド：データベースから全てのtodoをロードして状態にセットする
    const loadTodos = async () => {
      const allTodos = await db.todos.toArray();
      setTodos(allTodos);
      console.log('Todoを読み込みました');
      console.log(allTodos);
    };

    loadTodos();
  }, []);

  // addTodoメソッド：新しいtodoを追加する
  // タスクテキストが空白でない場合にのみ処理を行う
  const addTodo = async () => {
    if (task.trim().length) {
      // 新しいTodoアイテムのためのUUIDを生成
      const newId = uuidv4();

      await db.todos.add({ id: newId, text: task, completed: false });
      setTask('');
      const updatedTodos = await db.todos.toArray();
      setTodos(updatedTodos);
      console.log(`Todoを追加しました：${task}`);
    }
  };

  // deleteTodoメソッド：指定されたIDのtodoを削除する
  // id: 削除するtodoのID
  const deleteTodo = async (id) => {
    await db.todos.delete(id);
    const updatedTodos = await db.todos.toArray();
    setTodos(updatedTodos);
    console.log(`Todoを削除しました：${id}`);
  };

  // toggleTodoメソッド：指定されたIDのtodoの完了状態を切り替える
  // id: 完了状態を切り替えるtodoのID
  const toggleTodo = async (id) => {
    const todo = await db.todos.get(id);
    await db.todos.update(id, { completed: !todo.completed });
    const updatedTodos = await db.todos.toArray();
    setTodos(updatedTodos);
    console.log(`完了状態に変更しました：${todo.text}`);
  };

  return (
    <div className='App'>
      <div className='input-container'>
        <input
          className='task-input'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder='新しいタスクを入力してください'
        />
        <button className='task-btn' onClick={addTodo}>
          タスクを追加する
        </button>
      </div>

      <ul>
        {todos.map((todo) =>
          editingId === todo.id ? (
            <EditItem
              key={todo.id}
              todo={todo}
              editTodo={editTodo}
              setEditingId={setEditingId}
              setEditingText={setEditingText}
              editingText={editingText}
            />
          ) : (
            <TodoItem
              key={todo.id}
              todo={todo}
              startEditing={startEditing}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
            />
          ),
        )}
      </ul>
    </div>
  );
}

export default App;
