var todoList = {
	todos: [],
	displayTodos:	function() {
		for (var i = 0; i < this.todos.length; i++) {
			console.log(this.todos[i].todoText + " " + this.todos[i].time);
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
	changeTodo: function(position, todoText) {
		this.todos[position].todoText = todoText;
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
		var todo = this.todos[position];
		todo.completed = !todo.completed;
		this.displayTodos();
	}
};
//# sourceMappingURL=app.js.map
