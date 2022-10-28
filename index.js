const { Client, Events, GatewayIntentBits } = require('discord.js');
const axios = require("axios");

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

    if(message.content.toLowerCase().startsWith("amor")){

      var primerSplit = message.content.split("-")
      var primeraPersona = primerSplit[1].split(" ")[0]
      var segundaPersona = primerSplit[2].split(" ")[0]

      sendLoveRequest(primeraPersona, segundaPersona, message)
    }
});

function sendLoveRequest(p1, p2, message){
  const options = {
    method: 'GET',
    url: 'https://love-calculator.p.rapidapi.com/getPercentage',
    params: {fname: p1, sname: p2},
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    message.channel.send(`Entre **${response.data.fname}** y **${response.data.sname}** se podría decir que hay un **${response.data.percentage}%** de amor. Resultado: **${response.data.result}** Que viva el amor!`)
  }).catch(function (error) {
    message.channel.send(`Hubo un error con lo solicitado. Perdón :(`)
  });
}

client.login(process.env.BOT_TOKEN);
