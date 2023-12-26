const { ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('colours')
        .setDescription('Sends the colour selector message'),
    async execute(interaction) {

        const colour1 = new ButtonBuilder()
            .setCustomId('colour1')
            .setEmoji('878144722818981940')
            .setStyle(ButtonStyle.Secondary);
        
        const row = new ActionRowBuilder()
            .addComponents(colour1);   

        const response = await interaction.reply({
            content: 'Pick your colour below:',
            components: [row],
        });

        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
            const choice = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            if (choice.customId === 'colour1') {
                const colourRole = choice.guild.roles.cache.find(role => role.name == 'red');
                await interaction.member.roles.add(colourRole);

                await choice.reply({
                    content: 'Your colour has been changed',
                    ephemeral: true,
                });
            } else {
                choice.reply({
                    content: 'Fuck u i guess',
                    ephemeral: true,
                });
            }

        } catch (e) {
            await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
        }
    },

};