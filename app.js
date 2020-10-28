//Selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterList = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterList.addEventListener("click",filterTodo);

//Funciones

//Esta funcion crea un caja donde se almacena el valor del input

function addTodo(event){

    //Evita que el formulario se envie
    event.preventDefault();

    { //Aqui crearemos elementos que almacenaran nuestras cards

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        const todoLi = document.createElement("li");
        todoLi.classList.add("todo-item");
        //Se asigno el valor de entrada de nuestro input al cnt de Li
        todoLi.innerHTML= todoInput.value;
        todoDiv.appendChild(todoLi);
    
        //Guardar cada uso del buscador
        saveLocalTodos(todoInput.value);
    
        //Agregamos dos botones a el Div creado anteriormente
        const completedButton = document.createElement("button");
        completedButton.classList.add("complete-btn");
        completedButton.innerHTML= '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completedButton);
    
        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML='<i class="fas fa-trash" ></i>';
        todoDiv.appendChild(trashButton);
        
        //Llevamos nuestros elementos creados a el padre "clas=todo-list"
        todoList.appendChild(todoDiv);
    }
    //Limpiar el buscador despues de agregar un valor
    todoInput.value="";
}

function deleteCheck(e){
    //Selecciona elemento y lo trae
    const item = e.target;
    if(item.classList[0] === "trash-btn"){
        const deleteTarget = item.parentElement; //en este caso es class ="todo"
        //Animation
        deleteTarget.classList.add("fall");

        //Borramos del localstorage
        removeLocalTodos(deleteTarget);

        //Borramos del html
        deleteTarget.addEventListener("transitionend", function(){ 
            deleteTarget.remove();
        });
    }
    //Checking green
    if(item.classList[0] === "complete-btn"){
        const cadaCelda = item.parentElement;
        cadaCelda.classList.toggle("complete");
    }
}

function filterTodo(e){
    const filtrandoLista = todoList.childNodes;
    filtrandoLista.forEach(function(todo){ //Es posible llamar a nuestro Div todo, porque anteriormente fue creado por la funcion anterior.
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "complete":
                if(todo.classList.contains("complete")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
                break;
            case "incompleto":
                if(!todo.classList.contains("complete")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
                break;         
        }
    });
}

function saveLocalTodos(todo){
    let todos; 
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo){
    let todos; 
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){ 
    //div = todo ln(23)"html"
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")

    //Create li en Div = todo
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-item");
    todoLi.innerHTML= todo;
    todoDiv.appendChild(todoLi);

    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML= '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML='<i class="fas fa-trash" ></i>';
    todoDiv.appendChild(trashButton);

    //Vamos a llevar todo esto a todo-list class

    todoList.appendChild(todoDiv);

    });
}

function removeLocalTodos(todo){
    let todos; 
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }


    const indexTrashRemove = todo.children[0].innerText;
    todos.splice(todos.indexOf(indexTrashRemove), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
