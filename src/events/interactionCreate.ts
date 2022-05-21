import { Interaction } from "discord.js";
import { commands } from "../init/init";
import { Event } from "./_Event";
import bl from '../util/BoxLog'
import { red } from "colors/safe";

export default class extends Event {

    constructor(client) {
        super(client, "interactionCreate", false)
    }

    async execute(interaction: Interaction, client = this.client): Promise<void> {
        
        if(interaction.isCommand()) {
                const command = commands.default.get(interaction.commandName);
                if(!command) return

                try {
                    command.execute(interaction);
                } catch (err) {
                    bl(`Can't execute ${red("interaction")}!\n> ${err}`, true, { borderColor: "red" });
                    return interaction.reply({ content: "> Une erreur est survenue.", ephemeral: true});
                }
        }

    }

}