const { EventEmitter } = require('events');

const myEmitter = new EventEmitter();

const birthdayEventListener = (name) => {
    console.log(`Happy birthday ${name}!`);
}

myEmitter.on('birthday', birthdayEventListener);

myEmitter.emit('birthday', 'raihan');

// TODO 3 : Tentukan birthdayEventListener sebagai aksi 
// ketika event ‘birthday’ dibangkitkan pada myEmitter.
// TODO 4 : Bangkitkanlah event ‘birthday’ pada myEmitter 
// dengan method emit() dan beri nilai argumen listener 
// dengan nama Anda.