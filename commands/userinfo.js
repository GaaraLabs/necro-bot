const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) =>{
  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setDescription("Information about this user.")
    .setColor("#4834d4")
    .addField("Full Username", message.author.username, true)
    .addField("ID", message.author.id, true)
    .addField("Created At", message.author.createdAt, true)
    .setThumbnail(message.author.avatarURL);

    message.channel.sendEmbed(embed);
}

module.exports.help = {
  name: "userinfo"
}
