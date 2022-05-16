import { Client } from 'discord.js';

export class Event {
    client: Client;
    name: string;
    once?: boolean;

    constructor(client: Client, name: string, once: boolean = false) {
        this.client = client;
        this.name = name;
        this.once = once;
    }

    execute(client = this.client, ...params: any[]) {
        throw new Error("You must implement this method.");
    }

}