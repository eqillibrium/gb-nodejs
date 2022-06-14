import { Server } from 'socket.io'
import { App } from '../5/App.js'

const connections: number[] = []

export async function bootstrap () {

    const socket = new Server(App)

    socket.on('connection',  (socket): void => {
        const UID = Math.random() * 1000
        connections.push(UID)
        console.log(`New connection of user with ${UID} UID` );
        socket.emit('SERVER_MSG', {
            connections: connections.length
        });
        socket.on('disconnect', () => {
            let el = connections.find(el => el === UID)
            if(el) {
                connections.splice(connections.indexOf(el))
                console.log('disconnect of ' + UID)
            }
            socket.emit('SERVER_MSG', {
                connections: connections.length
            });
        })
    });

    App.listen(3000, 'localhost');

}
