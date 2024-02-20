const { Events } = require("discord.js");
module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    let colours = ["red", "blue"];

    //Function removeRoles() removes all oft the colour roles on the member the interaction was used by
    function removeRoles() {
      for (let i = 0; i < colours.length; i++) {
        let colour = colours[i];
        let colourRole = interaction.guild.roles.cache.find(
          (role) => role.name == colour
        );
        interaction.member.roles.remove(colourRole);
      }
    }
    //Checks if the interaction was a slash command
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
      //Checks if the interaction was a button
    } else if (interaction.isButton()) {
      const button = interaction.customId;

      try {
        switch (button) {
          case "colour1":
            removeRoles();
            interaction.member.roles.add(
              interaction.guild.roles.cache.find((role) => role.name == "red")
            );

            await nteraction.reply({
              content: "Your colour has been changed",
              ephemeral: true,
            });
            break;
          case "colour2":
            removeRoles();
            interaction.member.roles.add(
              interaction.guild.roles.cache.find((role) => role.name == "blue")
            );

            await interaction.reply({
              content: "Your colour has been changed",
              ephemeral: true,
            });
            break;
          case "clear":
            removeRoles();
            await interaction.reply({
              content: "Your colours have been cleared",
              ephemeral: true,
            });
            break;
        }
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
    } else return;
  },
};
