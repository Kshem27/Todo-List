$(document).ready(function() {
	$.getJSON('/api/todos').then(addTodos).catch((err) => console.log(err));

	$('#todoInput').keypress((event) => {
		if (event.which == 13 && $('#todoInput').val() !== '') {
			createTodo($('#todoInput').val());
		}
	});
	$('.list').on('click', 'span', function(e) {
		e.stopPropagation();
		removeTodo($(this).parent());
	});
	$('.list').on('click', 'li', function() {
		updateTodo($(this));
	});
});
function addTodos(todos) {
	//add todos to page
	todos.forEach((todo) => {
		addTodo(todo);
	});
}
function addTodo(todo) {
	var newTodo = $('<li class = "task">' + todo.name + '<span>X</span></li>');
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
	if (todo.completed) newTodo.addClass('done');
	$('.list').append(newTodo);
}
function createTodo(userInput) {
	var obj = { name: userInput };
	console.log(obj.name);
	$.post('/api/todos', obj)
		.then((newTodo) => {
			console.log(newTodo);
			$('#todoInput').val('');
			addTodo(newTodo);
		})
		.catch((err) => console.log(err));
}
function removeTodo(todo) {
	let deleteURL = '/api/todos/' + todo.data('id');
	console.log(todo.data('id'));
	$.ajax({
		method: 'delete',
		url: deleteURL
	})
		.then(function(data) {
			todo.remove();
		})
		.catch((err) => console.log(err));
}
function updateTodo(todo) {
	let updateURL = '/api/todos/' + todo.data('id');
	let isDone = !todo.data('completed');
	let updateData = { completed: isDone };
	$.ajax({
		method: 'PUT',
		url: updateURL,
		data: updateData
	}).then(function(updatedTodo) {
		todo.toggleClass('done');
		todo.data('completed', isDone);
	});
}
