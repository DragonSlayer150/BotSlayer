const {
  ActionRowBuilder,
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("colours")
    .setDescription("Sends the colour selector message"),
  async execute(interaction) {
    if (interaction.user.id !== "384883731128778753") {
      interaction.reply({
        content: "You do not have permission to use this command",
        ephemeral: true,
      });
      return;
    }

    const clear = new ButtonBuilder()
      .setCustomId("clear")
      .setLabel("Clear")
      .setStyle(ButtonStyle.Danger);

    const colour1 = new ButtonBuilder()
      .setCustomId("colour1")
      .setEmoji("878144722818981940")
      .setStyle(ButtonStyle.Secondary);

    const colour2 = new ButtonBuilder()
      .setCustomId("colour2")
      .setEmoji("1176136543115694141")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(clear, colour1, colour2);

    await interaction.reply({
      content: "Pick your colour below:",
      components: [row],
    });
  },
};
