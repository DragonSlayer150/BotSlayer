const { Events, GuildMemberRoleManager, GuildManager } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member, client) {
        const role = member.guild.roles.cache.find(role => role.name == "The Slayers");
        member.roles.add(role);
    },
};