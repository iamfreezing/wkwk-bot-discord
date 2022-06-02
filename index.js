require("dotenv").config();

const http = require("http");
const { Client, Intents } = require("discord.js");
const { ref, child, get } = require("firebase/database");
const { db } = require("./firebase");

//#region Get data from firebase
async function loadData() {
  const dbRef = ref(db, process.env.FIREBASE_DATABASE_CHILD);
  const keywords = await get(child(dbRef, "/keywords")).then((snapshot) => snapshot.val());
  const channels = await get(child(dbRef, "/channels")).then((snapshot) => snapshot.val());

  return { keywords, channels };
}

let keywords = [];
let channels = [];

loadData().then((data) => {
  keywords = data.keywords;
  channels = data.channels;
});
//#endregion

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//#region Discord.js event handlers
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

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
  if (msg.author.username === "BleedBlue" && msg.author.discriminator === "5754") {
    msg.reply("bacot ji ah wkwk");
    return; // Exit the callback function
  }
  //#endregion
});
//#endregion

client.login(process.env.BOT_TOKEN);

http
  .createServer((_req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("OK");
    res.end();
  })
  .listen(process.env.PORT || 8080);
