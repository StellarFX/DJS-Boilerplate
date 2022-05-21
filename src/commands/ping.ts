import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import { Command } from "./_Command";

export default class extends Command {

    constructor(client: Client) {
        const options = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Checks the ping of the bot")
        .setDefaultPermission(true)
        super(client, options, false);
    }

    execute(interaction: CommandInteraction, client: Client<boolean> = this.client): void {
        
        const embed = new MessageEmbed({
            "title": "Ping!",
            "description": `The bot's ping is ${Date.now() - interaction.createdTimestamp}ms.\nThe API's ping is ${client.ws.ping}ms.`,
            "color": "#e85046"
          })

        interaction.reply({ embeds: [ embed ]});

    }

}