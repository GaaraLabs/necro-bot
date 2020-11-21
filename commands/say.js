const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  message.delete();
    let owners = process.env.OWNER.split(',');
  
  if (!owners.includes(message.author.id))  {
    embed
      .setTitle("Permission Denied")
      .setDescription("You do not have permission to use this command. It's for owners only.");
    
    return message.channel.send(embed);
  }
  let botmessage = args.join(" ");
  message.channel.send(botmessage);
}

exports.help = {
  name: "say",
  category: "General",
  description: "Make the bot say anything you want.",
  usage: ",say"
};
