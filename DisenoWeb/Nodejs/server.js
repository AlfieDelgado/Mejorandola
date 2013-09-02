var express = require('express'),
	app		= express(),
	server	= require('http').createServer(app),
	io		= require('socket.io').listen(server),
	cons 	= require('consolidate');

server.listen(3000);

app.engine('.html', cons.jade);
app.set('view engine', 'html');

app.use(express.static('./public'));

app.get('/', function(req, res){
	res.render('index',{
		titulo: "Hola"
	});
});
// app.get('/mensajes/new/:mensaje', function (req, res){
// 	mensajes.push( req.params.mensaje );

// 	peticionesPendientes.forEach(function (res){
// 		res.send(mensajes + '<script>window.location.reload()</script>');	
// 	});

// 	res.send('Gracias por tu mensaje: ' + req.params.mensaje);
// });

// app.get('/mensajes/list', function (req,res){
// 	peticionesPendientes.push(res);
// });

io.sockets.on('connection', function (socket){
	socket.on('pintar', function (data){
		socket.broadcast.emit('pintar', data);
	});
});

console.log("Express server running at\n  => http://localhost:3000/\nCTRL + C to shutdown");