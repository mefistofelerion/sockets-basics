var socket = io();

socket.on('connect', function(){
	console.log('connected to socket.io server');
});

socket.on('message', function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	console.log('New message:');
	console.log(message.text);

	jQuery('.messages').append('<p><strong>' + momentTimestamp.format('h:mm a') + '</strong> ' + message.text + '</p>');

});

var $form = jQuery('#message-form');

$form.on('submit', function(event){
	event.preventDefault();

	socket.emit('message', {
		text: $form.find('input[name=message]').val()
	});

	$form.find('input[name=message]').val('');
});