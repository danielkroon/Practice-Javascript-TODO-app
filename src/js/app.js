var todoRef = firebase.database().ref('todos');

var todoList = {
	todos: [],
	addTodo: function(todoText, time) {
		var data = 	{
			todoText: todoText,
			completed: false,
			time: time
		};
		
		 // Get a key for a new Todo.
		var newTodoKey = firebase.database().ref().child('todos').push().key;
		
		// Write the new todo data simultaneously in the todo list.
		var updates = {};
		updates['/todos/' + newTodoKey] = data;
		
		return firebase.database().ref().update(updates);	
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
		var todo = this.todos[position];
		
		todoRef.remove();
	},
	toggleCompleted: function(position) {
		var todo = this.todos[position];
		todo.completed = !todo.completed;
	},
	toggleAll: function() {
		var totalTodos = this.todos.length;
		var completedTodos = 0;
		
		// Get number of compeleted todos
		this.todos.forEach(function(todo) {
			if (todo.completed === true) {
				completedTodos++;
			}
		});

		this.todos.forEach(function(todo) {
			// Case 1: If everything's true, make everything false.
			if (completedTodos === totalTodos) {
				todo.completed = false;
			// Case 2: Otherwise, make everything true.
			} else {
				todo.completed = true;
			}	
		});
	}
};

var handlers = {
	addTodo: function() {
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		var addTodoTime = document.getElementById('addTodoTime');
		todoList.addTodo(addTodoTextInput.value, addTodoTime.value);
		addTodoTextInput.value = '';
		addTodoTime.value = '';
		// view.displayTodos();
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
		
		// this inside the forEach callback refers to the view object 
		todoList.todos.forEach(function(todo, position,) {
			var todoLi = document.createElement('li');
			var todoTextWithCompletion = '';
			
			if (todo.completed === true) {
				todoTextWithCompletion = '(X) ' + todo.todoText + todo.time;
			} else {
				todoTextWithCompletion = '( ) ' + todo.todoText + todo.time;
			}
			
			todoLi.id = position;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteButton());
			todosUl.appendChild(todoLi);
		}, this);
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

todoRef.on('child_added', function(data) {
	todoList.todos.push(data.val());
	view.displayTodos();
});

todoRef.on('child_removed', function(data) {
	console.log('todo removed', data.val());
});

view.setUpEventListeners();


//# sourceMappingURL=app.js.map
