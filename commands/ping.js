const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {   
  let embed = new Discord.RichEmbed()
    .setTitle("Ping?")
    .setColor(0x00ffff);

  message.channel.send(embed).then(m => {
  	embed
     	.setTitle("Pong!")
  		.setDescription("Latency is " + (m.createdTimestamp - message.createdTimestamp) + "ms. API latency is " + Math.round(client.ping) + "ms.");

      m.edit(embed);
  });
};

exports.help = {
  name: "ping",
  category: "General",
  description: "Pong! Check my latency.",
  usage: ",ping"
};
