const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}


class TicketControl { //ECMAScript 6
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; //Arreglo de tickets pendientes
        this.ultimos4 = []; //Ultimos tickets que se mostraran en la interfaz

        let data = require('../data/data.json'); //leer de json

        //Cada vez que incia un nuevo dia reiniciar el proceso de tickets
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket); //agregar nuevo ticket al arreglo de tickets


        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //eliminar primer elemento del arreglo para que no se acumulen 

        let atenderTicket = new Ticket(numeroTicket, escritorio); //romper relacion js donde todo objeto es pasado por referencia

        this.ultimos4.unshift(atenderTicket); //agrega uno o más elementos al inicio del array

        //let numeroEscritorios = 4;
        /**Eliminar tickets que sean mayor al numero de escritorios que se mostraran */
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1) //borrar ultimo elemento
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();
        return atenderTicket;


    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('inicializado sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = { // valores declarados en el constructor
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData); //convertir a string

        fs.writeFileSync('./server/data/data.json', jsonDataString) //grabar en json


    }


}


module.exports = {
    TicketControl
}