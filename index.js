const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.GuildMembers
]});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', (message) => {
  if(message.content.startsWith("hola"))
    message.channel.send(`Hola, ${message.author}! Un gusto verte. Estoy vivo y andando perfecto!`)

    if(message.content.startsWith("vive"))
      message.channel.send(`Siempre he vivido. Dentro del corazón de cada uno de ustedes.`)

});
// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);
