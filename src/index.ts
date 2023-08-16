// Custom type
type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
};

const getTodos = (): Todo[] => {
  const todosJSON = localStorage.getItem("TODOS");
  if (todosJSON == null) return [];
  return JSON.parse(todosJSON);
};

let todos: Todo[] = getTodos();

const saveTodo = () => {
  const todosJSON = JSON.stringify(todos);
  return localStorage.setItem("TODOS", todosJSON);
};

const generateId = (): string => {
  return `todo-${+new Date()}`;
};

const form = (document.querySelector("#todo-form") as HTMLFormElement) || null;
const input = document.querySelector<HTMLInputElement>("#todo-input");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTodo: Todo = {
    id: generateId(),
    title: input.value,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  };

  if (input.value == null || input.value == "") return;
  addTodo(newTodo);
  todos.push(newTodo);

  input.value = "";
  saveTodo();
});

const removeTodo = (id: string) => {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodo();
};

const addTodo = (todo: Todo) => {
  const list = document.querySelector<HTMLUListElement>("#todo-list");
  const li = document.createElement("li");
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "checkbox";
  const button = document.createElement("button");
  button.type = "button";
  button.innerText = "❎";

  input.addEventListener("change", () => {
    todo.isCompleted = input.checked;
    saveTodo();
  });

  button.addEventListener("click", () => {
    //   let datas: Todo[] = [...todos];
    //   datas = datas.filter((data) => data.id !== todo.id);
    //   todos = todos.filter((data) => data.id !== todo.id);
    //   console.log(datafilter);
    //   saveTodo();
    removeTodo(todo.id);
  });

  label.append(input, todo.title);
  li.append(label, button);
  list?.append(li);
};

todos.forEach(addTodo);
