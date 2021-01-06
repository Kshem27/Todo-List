var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var TodoRoutes = require('./routes/todo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile('index.html');
});
app.listen(PORT, () => {
	console.log(`Server has started at Port : ${PORT}`);
});
app.use('/api/todos', TodoRoutes);
