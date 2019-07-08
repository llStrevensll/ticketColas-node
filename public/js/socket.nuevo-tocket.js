// Comando para establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket'); //buscar en el DOM el id lblNuevoTicket

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(resp) {
    console.log(resp);

    label.text(resp.actual);
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) { //despues de realizar el emit, recibe en la funcion como paramatro el tikect para actualizar

        label.text(siguienteTicket);
    });
    //console.log('click');

});