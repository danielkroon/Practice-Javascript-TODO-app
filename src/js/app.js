var todoList = {
	todos: [],
	displayTodos:	function() {
		if (this.todos.length === 0) {
			console.log('Your todo list is empty');
		} else {
			for (var i = 0; i < this.todos.length; i++) {
				if (this.todos[i].completed === true) {
					console.log("(X)", this.todos[i].todoText, this.todos[i].time);
				} else {
					console.log("( )", this.todos[i].todoText, this.todos[i].time);
				}
			}
		}
	},
	addTodo: function(todoText, time) {
		this.todos.push({
			todoText: todoText,
			completed: false,
			time: time
		});
		this.displayTodos();
	},
	changeTodo: function(position, todoText, time) {
		this.todos[position].todoText = todoText;
		this.todos[position].time = time;
		this.displayTodos();
	},
	changeTime: function(position, time) {
		this.todos[position].time = time;
		this.displayTodos();
	},
	deleteTodo: function(position) {
		this.todos.splice(position, 1);
		this.displayTodos();
	},
	toggleCompleted: function(position) {
		debugger;
		var todo = this.todos[position];
		todo.completed = !todo.completed;
		this.displayTodos();
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
		
		this.displayTodos();
	}
};

var handlers = {
	displayTodos: function() {
		todoList.displayTodos();
	},
	toggleAll: function() {
		todoList.toggleAll();
	},
	addTodo: function() {
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		var addTodoTime = document.getElementById('addTodoTime');
		todoList.addTodo(addTodoTextInput.value, addTodoTime.value);
		addTodoTextInput.value = '';
		addTodoTime.value = '';

	},
	changeTodo: function() {
		debugger;
		var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
		var changeTodoTextInput = document.getElementById('changeTodoTextInput');
		var changeTodoTimeInput = document.getElementById('changeTodoTimeInput');
		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value, changeTodoTimeInput.valueAsNumber);
		changeTodoPositionInput.value = '';
		changeTodoTextInput.value = '';
		changeTodoTimeInput.value = '';
	},
	deleteTodo: function() {
		var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
		todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
		deleteTodoPositionInput.value = '';
	},
	toggleCompleted: function() {
		var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
		todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
		toggleCompletedPositionInput.value = '';
	}
};
//# sourceMappingURL=app.js.map
