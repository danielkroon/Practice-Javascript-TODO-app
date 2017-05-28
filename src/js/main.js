var todoList = {
	todos: [],
	addTodo: function(todoText, time) {
		this.todos.push({
			todoText: todoText,
			completed: false,
			time: time
		});
	},
	changeTodo: function(position, todoText, time) {
		this.todos[position].todoText = todoText;
		this.todos[position].time = time;
	},
	changeTime: function(position, time) {
		this.todos[position].time = time;
	},
	deleteTodo: function(position) {
		this.todos.splice(position, 1);
	},
	toggleCompleted: function(position) {
		var todo = this.todos[position];
		todo.completed = !todo.completed;
	},
	toggleAll: function() {
		var totalTodos = this.todos.length;
		var completedTodos = 0;
		
		// Get number of compeleted todos
		for (var i = 0; i < totalTodos; i++) {
			if (this.todos[i].completed === true) {
				completedTodos++;
			}
		}
		
		// Case 1: If everything's true, make everything false.
		if (completedTodos === totalTodos) {
			// Make everything false
			for (var i = 0; i < totalTodos; i++) {
				this.todos[i].completed = false;
			}
		// Case 2: Otherwise, make everything true.	
		} else {
			for (var i = 0; i < totalTodos; i++) {
				this.todos[i].completed = true;
			}
		}
	}
};

var handlers = {
	addTodo: function() {
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		var addTodoTime = document.getElementById('addTodoTime');
		todoList.addTodo(addTodoTextInput.value, addTodoTime.value);
		addTodoTextInput.value = '';
		addTodoTime.value = '';
		view.displayTodos();
	},
	changeTodo: function() {
		var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
		var changeTodoTextInput = document.getElementById('changeTodoTextInput');
		var changeTodoTimeInput = document.getElementById('changeTodoTimeInput');
		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value, changeTodoTimeInput.valueAsNumber);
		changeTodoPositionInput.value = '';
		changeTodoTextInput.value = '';
		changeTodoTimeInput.value = '';
		view.displayTodos();
	},
	deleteTodo: function(position) {
		todoList.deleteTodo(position);
		deleteTodoPositionInput.value = '';
		view.displayTodos();
	},
	toggleCompleted: function() {
		var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
		todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
		toggleCompletedPositionInput.value = '';
		view.displayTodos();
	},
	toggleAll: function() {
		todoList.toggleAll();
		view.displayTodos();
	}
};

var view = {
	displayTodos: function() {
		var todosUl = document.querySelector('ul');
		todosUl.innerHTML = ''; 
		
		for (var i = 0; i < todoList.todos.length; i++) {
			var todoLi = document.createElement('li');
			var todo = todoList.todos[i];
			var todoTextWithCompletion = '';
			
			if (todo.completed === true) {
				todoTextWithCompletion = '(X) ' + todo.todoText + todo.time;
			} else {
				todoTextWithCompletion = '( ) ' + todo.todoText + todo.time;
			}
			
			todoLi.id = i;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteButton());
			todosUl.appendChild(todoLi);
		}
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	},
	setUpEventListeners: function() {
		var todosUl = document.querySelector('ul');

		todosUl.addEventListener('click', function(event) {
			// Get the element that was clicked on.
			var elementClicked = event.target;
			
			// Check if elementClicked is a delete button.
			if (elementClicked.className === 'deleteButton') {
				handlers.deleteTodo(parseInt(elementClicked.parentNode.id));		
			}
		});
	}
};

view.setUpEventListeners();

