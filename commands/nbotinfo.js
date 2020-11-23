const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("__**Information**__")
    .setColor(0x00ffff)
    .setThumbnail(bicon)
    .setDescription("**Basic Information About Bot**")
    .addField("**Bot Name**", bot.user.username)
    .addField("**Developer**", "<@612803327675334673> & <@573926228474593320>")
  message.channel.send(botembed);
};

exports.help = {
  name: "info",
  category: "General",
  description: "Get some information about me.",
  usage: ",info"
};
