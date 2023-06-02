<script lang="ts">
  type Todo = {
    id: number;
    text: string;
    completed: boolean;
  };
  export let todos: Todo[] = [];
  let todotext="";
  const addTodo = () => {
    todos = [...todos, {id: todos.length, text: todotext, completed: false}];
    todotext="";

  }
  let message: string = null;
    let count = 1;
    const increment = () => (count += 1);
    const decrement = () => (count -= 1);
    
  const handleSave = () => {
    chrome.storage.sync.set({todos}).then(() => {
        message = 'Updated!';
        setTimeout(() => {
          message = null;
        }, 2000);
      });
  };
</script>
<div class=" bg-amber-50 min-w-[20rem] p-4 flex flex-col gap-4">
  <p class="text-amber-800 text-xl font-extrabold">
    Task list
  </p>
  <!-- text input with checkbox  -->
  <div class="flex gap-2">
    <input bind:value={todotext} type="text" class="border-2 border-amber-800 bg-white rounded-md p-2 text-slate-800" />
    <button on:click = {addTodo}>Add</button>
  </div>
  <!-- svelte list of todos -->
  {#each todos as todo}
    <div class="flex gap-2">
      {#if todo.completed}
        <button class="text-amber-800" on:click={() => todo.completed = false}>✅</button>
      {:else}
        <button class="text-amber-800" on:click={() => todo.completed = true}>❌</button>
      {/if}
      <span class="text-slate-800 font-bold">{todo.text}</span>
      <button class="text-amber-800" on:click={() => todos = todos.filter(t => t.id !== todo.id)}>🗑️</button>

    </div>
  {/each}
  <!-- buttons -->
  <div class="flex gap-2">
    <button class="ml-auto" on:click={handleSave}>Save</button>
    {#if message}<span class="font-bold text-amber-800">{message}</span>{/if}
  </div>
</div>
