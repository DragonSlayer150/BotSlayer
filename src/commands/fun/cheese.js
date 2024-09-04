const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cheese")
    .setDescription("Replies with cheese!"),
  async execute(interaction) {
    await interaction.reply("Cheese");
  },
};
