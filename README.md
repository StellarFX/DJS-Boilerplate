# DJS-Boilerplate

A simple, automatic discord.js boilerplate, made with TypeScript.
It was created by me, myself and I in order to keep a clean structure for my projects.

## Features

- Handles slash commands
- Handles events
- Database system using [sequelize](https://www.npmjs.com/package/sequelize) & [sqlite](https://www.npmjs.com/package/sqlite)

## Supports

This boilerplate supports both TypeScript and JavaScript.
TypeScript also supports JavaScript natively, so no trouble if you don't know TypeScript!

## Installation

Just clone the repository in your environment using the command below.

```bash
git clone https://github.com/StellarFX/djs-boilerplate.git
```

## Usage/Examples

### Creating a command

In order to create a command, simply create a file with the name of the command, e.g `ping.js` and use the code below!

```typescript
export default class extends Command {

    constructor(client: Client) {
        // Check out 
        // https://discordjs.guide/popular-topics/builders.html#slash-command-builders
        // to manage the structure of the command.
        
        const struct = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Checks the ping of the bot")
        .setDefaultPermission(true)
        super(client, struct, false);
        // Respectively :
        // The bot's instance ; the structure of the command ; if the command is available by default (For eventual permissions purposes)
    }

    execute(interaction: CommandInteraction, client = this.client): void {
        
        interaction.reply("Ping !")
        // Your code here...

    }

}
```

### Creating an event

Creating an event is almost the same structure as a command.

```typescript
export default class extends Event {

    constructor(client: Client) {
        super(client, "foo", false);
        // Respectively :
        // The bot's instance ; the name of the event ; if the event should be executed only once
    }

    async execute(/* Your event's params*/, client = this.client): Promise<void> {
        
        // Your code here...

    }

}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
