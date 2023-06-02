import '../app.css';
import Todo from "../components/Todo.svelte";

const target = document.getElementById('app');

async function render() {
  const {todos} = await chrome.storage.sync.get({todos: []});

  new Todo({target, props: {todos}});
}

document.addEventListener('DOMContentLoaded', render);