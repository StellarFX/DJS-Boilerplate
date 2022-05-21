import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';

export interface CommandFields {
    client: Client;
    data: any;
    admin_command?: boolean;
}

export class Command implements CommandFields {
    
    client: Client<boolean>;
    data: SlashCommandBuilder;
    admin_command?: boolean | undefined;

    constructor(client: Client, data: any, admin_command: boolean = false) {
        this.client = client;
        this.data = data;
        this.admin_command = admin_command;
    }

    execute(interaction: CommandInteraction, client = this.client) {
        throw new Error("You must implement this method.");
    }

}