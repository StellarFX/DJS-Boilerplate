# DJS-Boilerplate

A simple, automatic discord.js boilerplate, made with TypeScript.
It was created by me, myself and I in order to keep a clean structure for my projects.

## Features

- Handles slash commands
- Handles events
- Database system using sequelize & sqlite

## Supports

This boilerplate supports both TypeScript and JavaScript.
TypeScript also supports JavaScript natively, so no trouble if you don't know TypeScript!

## Installation

Just clone the repository in your environment using the command below.

```bash
git clone https://github.com/StellarFX/discordjs-boilerplate.git
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
    }

    execute(interaction: CommandInteraction, client = this.client): void {
        
        interaction.reply("Ping !")
        // Your code here...

    }

}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
