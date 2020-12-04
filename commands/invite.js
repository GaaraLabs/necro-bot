const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setColor('#0099ff')
      .setTitle('Click here to invite me to your server')
      .setURL('https://discord.com/oauth2/authorize?client_id=768058720621821954&scope=bot&permissions=2146827775')
  
    message.channel.send(botembed);
}

exports.help = {
  name: "invite",
  category: "General",
  description: "Gives bot invite link",
  usage: ",invite"
};
