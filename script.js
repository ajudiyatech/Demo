let tasks = [
  { id: 1, text: 'Buy groceries', done: false },
  { id: 2, text: 'Read a book', done: true }
];

let filter = 'all';
let nextId = 3;

function render() {
  const list = document.getElementById('todoList');

  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );

  if (filtered.length === 0) {
    list.innerHTML = '<div class="empty">No tasks here!</div>';
  } else {
    list.innerHTML = filtered.map(t => `
      <div class="todo-item${t.done ? ' done' : ''}">
        <input type="checkbox" class="todo-check" ${t.done ? 'checked' : ''} onchange="toggle(${t.id})" />
        <span class="todo-text">${t.text}</span>
        <button class="del-btn" onclick="del(${t.id})">×</button>
      </div>
    `).join('');
  }

  const left = tasks.filter(t => !t.done).length;
  document.getElementById('counter').textContent =
    left + ' task' + (left !== 1 ? 's' : '') + ' remaining';
}

function addTask() {
  const inp = document.getElementById('taskInput');
  const text = inp.value.trim();
  if (!text) return;
  tasks.unshift({ id: nextId++, text, done: false });
  inp.value = '';
  render();
}

function toggle(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  render();
}

function del(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

function clearDone() {
  tasks = tasks.filter(t => !t.done);
  render();
}

function setFilter(f, btn) {
  filter = f;
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

document.getElementById('taskInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});

render();