import { Client } from '../models/client.ts'
import { Guild } from '../structures/guild.ts'
import { GatewayIntents } from '../types/gatewayTypes.ts'
import { TOKEN } from './config.ts'
import * as cache from '../models/cache.ts'
import { Member } from '../structures/member.ts'

const bot = new Client()

bot.connect(TOKEN, [GatewayIntents.GUILD_MEMBERS, GatewayIntents.GUILD_PRESENCES, GatewayIntents.GUILD_MESSAGES])


const member = <Member> await Member.autoInit(bot, {
  cacheName: 'member',
  endpoint: 'GUILD_MEMBER',
  restURLfuncArgs: ['668753256419426314', '333432936390983680']
})
console.log('getted (cached) ' + member.nick)
setInterval(async () => {
  //refreshed check
  console.log('refreshed check: ' + member.nick)
  //cached
  console.log('cache: '+(<Member> cache.get('member', '668753256419426314:333432936390983680')).nick)
}, 10000)

setInterval(async() => {
  member.refresh(bot, {
    cacheName: 'member',
    endpoint: 'GUILD_MEMBER',
    restURLfuncArgs: ['668753256419426314', '333432936390983680']
  })
  //refreshed
  console.log('refreshed: ' + member.nick)
}, 20000)