const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  message.delete();
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  let botmessage = args.join(" ");
  message.channel.send(botmessage);
}

exports.help = {
  name: "say",
  category: "General",
  description: "Make the bot say anything you want.",
  usage: ",say"
};