const { Events } = require("discord.js");
module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    let colours = ["red", "blue"];

    function removeRoles() {
      for (let i = 0; i < colours.length; i++) {
        let colour = colours[i];
        let colourRole = interaction.guild.roles.cache.find(
          (role) => role.name == colour
        );
        interaction.member.roles.remove(colourRole);
      }
    }
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
    } else if (interaction.isButton()) {
      const button = interaction.customId;

      try {
        if (button == "colour1") {
          removeRoles();
          const colourRole = interaction.guild.roles.cache.find(
            (role) => role.name == "red"
          );
          await interaction.member.roles.add(colourRole);

          await interaction.reply({
            content: "Your colour has been changed",
            ephemeral: true,
          });
        } else if (button == "colour2") {
          removeRoles();
          const colourRole = interaction.guild.roles.cache.find(
            (role) => role.name == "blue"
          );
          await interaction.member.roles.add(colourRole);

          await interaction.reply({
            content: "Your colour has been changed",
            ephemeral: true,
          });
        } else if (button == "clear") {
          removeRoles();
          await interaction.reply({
            content: "Your colours have been cleared",
            ephemeral: true,
          });
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
