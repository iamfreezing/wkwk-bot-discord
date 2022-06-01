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

const channels = ["854190665687760909", "939298335796379648"];

client.on("message", (msg) => {
  if (msg.author.bot) return;

  if (channels.includes(msg.channelId)) {
    keywords.every((keyword) => {
      if (msg.content.toLowerCase().includes(keyword)) {
        msg.reply("wkwk");
        return false;
      }
    });
  }

  if (
    msg.author.username === "BleedBlue" &&
    msg.author.discriminator === "5754"
  ) {
    msg.reply("bacot ji ah wkwk");
  }
});

client.login(process.env.BOT_TOKEN);

http
  .createServer((_req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("OK");
    res.end();
  })
  .listen(process.env.PORT || 8080);
