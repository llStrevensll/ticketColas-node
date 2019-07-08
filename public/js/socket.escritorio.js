// Comando para establecer la conexión
var socket = io();

/* socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
}); */

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) { //sino es 'escritorio' en url
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio'); //obtiene el numero del escritorio
//console.log(escritorio);
var label = $('small');

$('h1').text('Escritorio' + escritorio); //colocar en la interfaz

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket' + resp.numero);

    });
});