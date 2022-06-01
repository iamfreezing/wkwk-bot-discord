const dotenv = require("dotenv");
const { Client, Intents } = require("discord.js");
const http = require("http");

dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const keywords = [
  "kuy",
  "skuy",
  "sekuy",
  "skut",
  "sekut",
  "pinjem id",
  "rede",
  "ayo",
  "-",
  "gow",
  "mari",
  "gas",
  "gaz",
  "login",
  "in game",
  "maleman",
  "hayu",
  "masa",
  "ngakak",
  "wk",
  "@",
  "main",
  "mainkan",
  "maen",
  "buru",
];

const channels = ["854190665687760909", "981668691940884540"];

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return; // Ignore bots

  //#region Check if message is in a channel
  if (channels.includes(msg.channelId)) {
    //#region Check if message contains a keyword
    for (const keyword of keywords) {
      if (msg.content.toLowerCase().includes(keyword)) {
        msg.reply("wkwk");
        break;
      }
    }
    //#endregion
    return; // Exit the callback function
  }
  //#endregion

  //#region Special case
  if (
    msg.author.username === "BleedBlue" &&
    msg.author.discriminator === "5754"
  ) {
    msg.reply("bacot ji ah wkwk");
    return; // Exit the callback function
  }
  //#endregion
});

client.login(process.env.BOT_TOKEN);

http
  .createServer((_req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("OK");
    res.end();
  })
  .listen(process.env.PORT || 8080);
