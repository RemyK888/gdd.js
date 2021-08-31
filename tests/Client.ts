import { Client } from '../src/index';

const client = new Client();

client.on('chatMessageCreated', async (message) => {
    if(message.content === 'ping') {
        return message.channel.send(`${client.ping}ms`)
    }
})

client.connect('Auth token');