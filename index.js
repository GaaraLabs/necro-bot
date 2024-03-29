const fs = require("fs");
const http = require("http");

const db = require("./Pokemons.json");
const imghash = require("imghash");
const Jimp = require("jimp");
const request = require("request").defaults({ encoding: null });

const Discord = require("discord.js");
const client = new Discord.Client();

const express = require("express");
const app = express();

if (Number(process.version.slice(1).split(".")[0]) < 8)
  throw new Error(
    "Node 8.0.0 or higher is required. Update Node on your system."
  );

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.commands = new Discord.Collection();
client.cmdhelp = new Discord.Collection();

client.loadCommands = () => {
  fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");

    console.log(`LOG Loading a total of ${jsFiles.length} commands.`);

    jsFiles.forEach((f, i) => {
      delete require.cache[require.resolve(`./commands/${f}`)];
      let props = require(`./commands/${f}`);
      console.log("LOG Loading command: " + f);
      client.commands.set(f, props);
      client.cmdhelp.set(props.help.name, props.help);
    });
  });
};

client.loadCommands();

client.on("ready", () => {
  console.log(
    `READY Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );
  client.log(
    `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`,
    "Ready",
    "event"
  );
  client.user.setActivity(`With Micky`);
});

client.on("error", error => {
  console.log(`ERROR ${error}`);
  client.log(error, "Error", "error");
});

client.on("guildCreate", guild => {
  console.log(`GUILD JOIN ${guild.name} (${guild.id})`);
  client.log(`${guild.name} (${guild.id})`, "Guild Join", "joinleave");
});

client.on("guildDelete", guild => {
  console.log(`GUILD LEAVE ${guild.name} (${guild.id})`);
  client.log(`${guild.name} (${guild.id})`, "Guild Leave", "joinleave");
});

client.on("message", message => {
  try {
    let embed = new Discord.RichEmbed().setColor(0x5b7bd6);

    if (
      message.guild &&
      !message.channel.memberPermissions(client.user).has("SEND_MESSAGES")
    )
      return;

    if (
      message.guild &&
      !message.channel.memberPermissions(client.user).has("EMBED_LINKS")
    ) {
      return message.channel.send(
        "I need the `Embed Links` permission. Please contact an administrator on this server."
      );
    }

    if (message.author.id == "705016654341472327") {
      message.embeds.forEach(e => {
        if (
          e.description !== undefined &&
          e.description.startsWith("Guess the pokémon аnd type")
        ) {
          if (e.image) {
            let url = e.image.url;

            request(url, async function(err, res, body) {
              if (err !== null) return;

              imghash.hash(body).then(hash => {
                let result = db[hash];

                if (result === undefined) {
                  embed
                    .setTitle("Pokemon Not Found")
                    .setDescription(
                      "Please contact the owner to add this Pokemon to the database."
                    );
                  return message.channel.send(embed);
                }

                embed
                  .setTitle("Possible Pokemon: " + result)
                  .setFooter(
                    "Want this bot in your server? Do @" +
                      client.user.tag +
                      " info."
                  );
                message.channel.send("This Pokemon is : " + result);

                console.log(
                  "[" +
                    message.guild.name +
                    "/#" +
                    message.channel.name +
                    "] " +
                    result
                );
              });
            });
          }
        }
      });
    }

    if (message.author.bot) return;

    let prefix = true;
    let args = message.content;
    let command = "m";

    if (message.content.startsWith("m")) {
      prefix = "m";
    } else if (message.content.startsWith("m")) {
      prefix = "m";
    } else {
      return;
    }

    args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    command = args.shift().toLowerCase();

    let cmd = client.commands.get(command + ".js");

    if (cmd) {
      cmd.run(client, message, args);
      console.log(
        `[${message.guild.name}/#${message.channel.name}] ${message.author.tag} (${message.author.id}): ${cmd.help.name}`
      );
    }
  } catch (error3) {
    console.log("ERROR at Message: " + error3);
    client.log(error3, "Error at Message", "error");
  }
});

client.clean = async text => {
  if (text && text.constructor.name == "Promise") text = await text;

  if (typeof evaled !== "string")
    text = require("util").inspect(text, { depth: 1 });

  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
    .replace(process.env.TOKEN, "--NO--TOKEN--");

  return text;
};

client.log = async (content, title, type) => {
  let embed = new Discord.RichEmbed()
    .setTitle(title)
    .setDescription(content.toString().substr(0, 2048))
    .setColor(0x5b7bd6)
    .setTimestamp();

  if (type === "event") {
    client.channels.get(process.env.EVENTCHANNEL).send(embed);
  } else if (type === "error") {
    client.channels.get(process.env.ERRORCHANNEL).send(embed);
  } else if (type === "joinleave") {
    client.channels.get(process.env.JOINLEAVECHANNEL).send(embed);
  }
};

client.login(process.env.TOKEN);
