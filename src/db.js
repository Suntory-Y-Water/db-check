import Dexie from 'dexie';

const db = new Dexie('TodoDB');

db.version(1).stores({
  // オートインクリメントを削除し、'id'フィールドを通常のフィールドとして定義
  todos: 'id, text, completed',
});

export default db;
