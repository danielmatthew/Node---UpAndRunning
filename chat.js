var net = require('net');

var chatServer = net.createServer(),
	clientList = [];

chatServer.on('connection', function(client){
	client.name = client.remoteAddress + ':' + client.remotePort;
	client.write('Hi ' + client.name + '!\n');

	clientList.push(client);

	client.on('data', function(data){
		broadcast(data, client);
	});

	// Remove disconnecting client from array - end fire when socket disconnects
	client.on('end', function(){
		clientList.splice(clientList.indexOf(client), 1);
	});

	client.on('error', function(e){
		console.log(e);
	});
});

function broadcast(message, client) {
	var cleanup = [];

	for (var i = 0; i < clientList.length; i++) {
		if (client !== clientList[i]) {

			if(clientList[i].writable) {
				clientList[i].write(client.name + ' says ' + message);
			} else {
				cleanup.push(clientList[i]);
				clientList[i].destroy();
			}
			
		};
	};

	// Removes dead Nodes
	for (var i = 0; i < cleanup.length; i++) {
		clientList.splice(clientList.indexOf(cleanup[i]), 1);
	};
}

chatServer.listen(9000);