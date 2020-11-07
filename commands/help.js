const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("**__Bot Commands__**")
    .setDescription("**Here is the list of commands which shows all the possible commands this bot has.**")
    .setColor("0x00ffff")
    .addField("**Botinfo**", "Shows the information about bot.\nUsage `mbotinfo`")
    .addField("**RPS**", "Play Rock/paper/scissor with bot.\nUsage `mrps`")
    .addField("**Server Info**", "Gives Information about server.\n Usage `mserverinfo`")
    .addField("**User Info**", "Gives infomation about user.\nUsage `muserinfo`")
    .addField("**Say**", "Repeats user text\nusage `msay ( text )`")
    .addField("**Stats**", "Shows bots statistics\nusage `mstats`");
  
    message.channel.send(botembed);
}

exports.help = {
  name: "botinfo",
  category: "General",
  description: "Bot information.",
  usage: ",botinfo"
};
