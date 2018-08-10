var net = require('net');

var client = net.connect({port: 3333}, () => {
	client.write('GET / HTTP/1.0\r\n\r\n');
	console.log(1)
});

client.on('data', (data) => {
	console.log(data.toString());
});
