const completedDOM = document.querySelector("#js-completed");
const todoDOM = document.querySelector("#js-todos");
function init() {
  fetch("/todos", {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(body => body.json())
    // Call update with fetched todos
    .then(json => update(json.todos));
}
init();
function update(todos) {
  /*
    {
  "text": "is this awesome?",
  "created": 1582278954743,
  "key": "w0KNkzWohG",
  "table": "todos"
}
    */
  console.log(todos);
  todos.forEach(todo => {
    const item = document.createElement("li");
    item.textContent = todo.text;
    item.addEventListener("click", e => markCompleted(todo));
    if (todo.completed) {
      completedDOM.appendChild(item);
    } else {
      todoDOM.appendChild(item);
    }
  });
}

function markCompleted(item) {
  item.completed = false;
  fetch("/todos", {
    method: "post",
    body: JSON.stringify(item),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.status === 200) {
    } else {
      console.dir(res);
    }
  });
}
/*
(function() {
  // Kick off the app
  init();

  // GET all todos
  function init() {
    fetch("/todos", {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res)
      .then(body => body.json())
      // Call update with fetched todos
      .then(json => update(json.todos));
  }

  // Update the DOM with data
  function update(todos) {
    console.log(todos);
    let list = document.getElementById("js-todos");
    let completed = document.getElementById("js-completed");
    let message = document.getElementById("js-message");
    let current = todos.filter(t => !t.completed);
    let complete = todos.filter(t => t.completed);
    let doneTitle = document.getElementById("js-done-title");
    let done = complete.length && !current.length;
    let none = !complete.length && !current.length;
    if (none) {
      message.innerHTML = Message({
        src: "/_static/rocket.svg",
        text: "Let's get started!",
        alt: "Rocket"
      });
    } else if (done) {
      message.innerHTML = Message({
        src: "/_static/astronaut.svg",
        text: "You did it!",
        alt: "Astronaut"
      });
    }

    if (complete.length) {
      doneTitle.classList.toggle("display-none");
    }

    list && current.length
      ? (list.innerHTML = current.map(t => Todo(t)).join(""))
      : "";

    completed && complete.length
      ? (completed.innerHTML = complete.map(t => Todo(t)).join(""))
      : "";
  }

  function Message(props) {
    props = props || {};
    let src = props.src || "";
    let text = props.text || "";

    return `
<img class="max-width-100" src="${src}" alt=""/>
<h3 class="font-size-1 font-weight-normal">${text}</h3>
    `;
  }

  function Todo(props) {
    let text = props.text || "";
    let id = props.key || "";
    let created = props.created;
    let checked = props.completed ? 'checked="checked"' : "";

    return `
<li
id="${id}">
<form
action="/todos"
method="POST">
<input
  type="checkbox"
  name="completed"
  ${checked}
/>
<input
  type="text"
  name="text"
  value="${text}"
  />
<input type="hidden" name="key" value="${id}"/>
<input type="hidden" name="created" value="${created}"/>
<button>Save</button>
</form>
<form
action="/todos/delete"
method="POST"
>
<input type="hidden" name="key" value="${id}" />
<button>Delete</button>
</form>
</li>
    `;
  }
})();
*/
