const url = "https://launcher.gvmp.de:5004/server";
const { Client, Intents, Message, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
const config = require("./config.json");

var ServerList = [
    "user",
    "donator",
    "team",
    "dev"
]

function convertBooleanToEmoji(bool)
{
    if(bool = false)
    {
        return ":white_check_mark:";
    }
    else if(bool = true)
    {
        return ":x:"
    }
    return;
}

if(config.token == "hier token eintragen")
{
	console.log('Du hast vergessen dein Token einzufügen bei der config.json!');
	return;
}

client.once('ready', () => 
{
    const guild = client.guilds.cache.get("940656639848099840");
    setInterval(() => {
        client.user.setStatus('dnd');
    }, 1000);
    console.log("Bot wurde hochgefahren!");
});

client.on('messageCreate', message => 
{
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    // !status
    if(command == "status")
    {
        if(!args.length) { return message.reply(":x: Du musst mir noch ein Server nennen! Hier sind alle Server die du abfragen kannst: ```!status user\n!status donator\n!status team\n!status dev```") }

        // onyxia.gvmp.de
        if(args == "user")
        {
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    console.log(json);
                    console.log(" ")
                   let ip = json[0].ip;
                   let name = json[0].name;
                   let max_slots = json[0].max_slots;
                   let used_slots = json[0].used_slots;
                   let locked = convertBooleanToEmoji(json[0].locked);

                   const onyxiaEmbed = new MessageEmbed()
                   .setColor('GREEN')
                   .setTitle('Server Status - Onyxia')
                   .setDescription(`Server-IP: ${ip}\nServer-Name: ${name}\nSlots: ${used_slots}/${max_slots}\nGeschlossen: ${locked}`)
       
                   message.channel.send({ embeds: [onyxiaEmbed] });
                }
            };
            xhr.send();
        }
	// icc.gvmp.de
        else if(args == "donator")
        {
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    console.log(json);
                    console.log(" ")
                   let ip = json[1].ip;
                   let name = json[1].name;
                   let max_slots = json[1].max_slots;
                   let used_slots = json[1].used_slots;
                   let locked = convertBooleanToEmoji(json[1].locked);

                   const onyxiaEmbed = new MessageEmbed()
                   .setColor('GREEN')
                   .setTitle('Server Status - Donator')
                   .setDescription(`Server-IP: ${ip}\nServer-Name: ${name}\nSlots: ${used_slots}/${max_slots}\nGeschlossen: ${locked}`)
       
                   message.channel.send({ embeds: [onyxiaEmbed] });
                }
            };
            xhr.send();
        }
	// shadowlands.gvmp.de
        else if(args == "team")
        {
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    console.log(json);
                    console.log(" ")
                   let ip = json[2].ip;
                   let name = json[2].name;
                   let max_slots = json[2].max_slots;
                   let used_slots = json[2].used_slots;
                   let locked = convertBooleanToEmoji(json[2].locked);

                   const onyxiaEmbed = new MessageEmbed()
                   .setColor('GREEN')
                   .setTitle('Server Status - Team')
                   .setDescription(`Server-IP: ${ip}\nServer-Name: ${name}\nSlots: ${used_slots}/${max_slots}\nGeschlossen: ${locked}`)
       
                   message.channel.send({ embeds: [onyxiaEmbed] });
                }
            };
            xhr.send();
        }
        // hyjal.gvmp.de
        else if(args == "dev")
        {
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    console.log(json);
                    console.log(" ")
                   let ip = json[3].ip;
                   let name = json[3].name;
                   let max_slots = json[3].max_slots;
                   let used_slots = json[3].used_slots;
                   let locked = convertBooleanToEmoji(json[3].locked);

                   const onyxiaEmbed = new MessageEmbed()
                   .setColor('GREEN')
                   .setTitle('Server Status - Development')
                   .setDescription(`Server-IP: ${ip}\nServer-Name: ${name}\nSlots: ${used_slots}/${max_slots}\nGeschlossen: ${locked}`)
       
                   message.channel.send({ embeds: [onyxiaEmbed] });
                }
            };
            xhr.send();
        }
        else
        {
            return message.reply(":x: Ungültiger Server Name! Hier sind alle Server die du abfragen kannst: ```!status user\n!status donator\n!status team\n!status dev```")
        }
    }
        // !playeronline [Forum ID]
        // Check if an Player is online or not.
        else if(command == "playeronline")
        {
            if(!args.length) { return message.reply(":x: Du musst mir noch eine Forum ID nennen! Beispiel: ```!playeronline [Forum ID]```") }

            xhr.open("GET", "https://launcher.gvmp.de:5004/player/online/" + args, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    console.log(" ")
                    console.log(json);
                   console.log(JSON.stringify(json));
                   let online = json.Online;
                   let status = json.status;
                   if(status == 400)
                   {
                       return message.reply(":x: Du hast eine ungültige Forum ID angegeben!")
                   }
                   else
                   {
                    if(online == true)
                    {
                     const onlineEmbed = new MessageEmbed()
                     .setColor('GREEN')
                     .setTitle('Status - Online')
                     .setDescription(`**${args}** ist derzeit auf GVMP online!`)
                     message.channel.send({ embeds: [onlineEmbed] });
                    }
                    else
                    {
                     const offlineEmbed = new MessageEmbed()
                     .setColor('RED')
                     .setTitle('Status - Offline')
                     .setDescription(`**${args}** ist derzeit nicht auf GVMP online!`)
                     message.channel.send({ embeds: [offlineEmbed] });
                    }
                   }
                }
            };
            xhr.send();
        }
        // !playerwhitelist [Forum ID]
        // Check if an Player is whitelisted or not. (Shield on Forum)
        else if(command == "playerwhitelist")
        {
            if(!args.length) { return message.reply(":x: Du musst mir noch eine Forum ID nennen! Beispiel: ```!playerwhitelist [Forum ID]```") }

                xhr.open("GET", "https://launcher.gvmp.de:5004/whitelist/ip/validate/" + args, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var json = JSON.parse(xhr.responseText);
                        console.log(" ")
                        console.log(json);
                       console.log(JSON.stringify(json));
                       let online = json.whitelisted;
                       let status = json.status;
                       if(status == 400)
                       {
                           return message.reply(":x: Du hast eine ungültige Forum ID angegeben!")
                       }
                       else
                       {
                        if(online == true)
                       {
                        const onlineEmbed = new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Status - Gewhitelistet')
                        .setDescription(`**${username}** (**${forumidd}**) ist derzeit auf GVMP gewhitelistet per Shield!`)
                        message.channel.send({ embeds: [onlineEmbed] });
                       }
                       else
                       {
                        const offlineEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('Status - Nicht gewhitelistet')
                        .setDescription(`**${username}** (**${forumidd}**) ist derzeit nicht auf GVMP gewhitelistet!`)
                        message.channel.send({ embeds: [offlineEmbed] });
                       }
                       }
                    }
                };
                xhr.send(); 

        }
});

client.on('guildMemberAdd', (member) => 
{
    member.guild.channels.cache.get('949027698217480215').send(`wad up @${member.user.username.toString()}`)
});

client.login(config.token);
