// Dev Task Tracker - app.js
// NOTE: このファイルには意図的なバグが3つ含まれています

let tasks = [];
let nextId = 1;

function addTask() {
    const input = document.getElementById('task-input');
    const priority = document.getElementById('priority-select').value;
    const text = input.value.trim();

    if (!text) return;

    tasks.push({
        id: nextId++,
        text: text,
        priority: priority,
        completed: false,
        createdAt: new Date(),
    });

    // Bug 1: 入力欄がクリアされない（input.value = '' が抜けている）

    renderTasks();
    updateStats();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
    }
    renderTasks();
    // Bug 2: updateStats() の呼び出しが抜けているため、完了数カウンターが更新されない
}

function deleteTask(id) {
    // Bug 3: id + 1 というオフバイワンエラーにより、別のタスクが削除される
    const index = tasks.findIndex(t => t.id === id + 1);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
    renderTasks();
    updateStats();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;

    document.getElementById('total-count').textContent = total;
    document.getElementById('active-count').textContent = active;
    document.getElementById('done-count').textContent = completed;
}

function renderTasks() {
    const list = document.getElementById('task-list');

    if (tasks.length === 0) {
        list.innerHTML = '<div class="empty">タスクがありません<br><small style="font-size:0.8125rem;margin-top:0.5rem;display:block">上のフォームからタスクを追加してみましょう</small></div>';
        return;
    }

    list.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''} priority-${task.priority}">
            <div class="task-content">
                <span class="priority-badge priority-${task.priority}">${getPriorityLabel(task.priority)}</span>
                <span class="task-text">${escapeHtml(task.text)}</span>
            </div>
            <div class="task-actions">
                <button class="btn-complete" onclick="toggleComplete(${task.id})">
                    ${task.completed ? '↩ 戻す' : '✓ 完了'}
                </button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">✕ 削除</button>
            </div>
        </div>
    `).join('');
}

function getPriorityLabel(priority) {
    return { low: '低', medium: '中', high: '高' }[priority] ?? priority;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    renderTasks();
    updateStats();
}

// Event listeners
document.getElementById('add-btn').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
});
document.getElementById('clear-completed').addEventListener('click', clearCompleted);

// 初期表示
renderTasks();
updateStats();
