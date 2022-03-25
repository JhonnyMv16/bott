/*
⚠️⚠️ ATENÇÃO ⚠️⚠️
Essa versão de software é paga. Peço que não divulgue ela
*
Caso divulgue algum comando deixe os créditos, fazer ele foi desgaste. 
*
Agradeço pela compreensão. 

📝 NOTAS:
  * Algumas cases criada por Dark 
  * Total agradecimento e créditos a ele <3
*/

// API DO ZIP ZOP
require('./config')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const path = require('path')
const os = require('os')
const moment = require('moment-timezone')
const { JSDOM } = require('jsdom')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom } = require('./lib/myfunc')
const { testElement } = require('domutils')

// CARREGANDO DATABESES

// SISTEMA PREMIUM
let prem2 = ['556796005372', '5511920117861']
// BASTA IR ADICIONANDO OS NÚMEROS 

// SISTEMA GRUPO VIP
const vipGp = [`120363021968976096@g.us`] //pege a id no console ou no comando /chatid
// SÓ IR PONDO OS IDS DO GRUPO VIP


// ALGUMAS DEFINIÇÕES
module.exports = bat = async (bat, m, chatUpdate, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = global.prefa;
        const isCmd = body.startsWith(prefix)
        const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
        //const isCmd = body.startsWith(prefix) // COMANDOS SEM PREFIX
        //const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() // COMANDOS SEM PREFIX
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "Sem nome"
        const botNumber = await bat.decodeJid(bat.user.id)
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
	    const isMedia = /image|video|sticker|audio/.test(mime)
	
        // DEFINIÇÕES PARA GRUPO
        const groupMetadata = m.isGroup ? await bat.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    	const isPremium = isCreator || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
        const isPremium2 = isCreator || prem2.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
	    const premm2 = isPremium2 ? 's' : 'n' 
	    const isVipGp = m.isGroup ? vipGp.includes(m.chat) : true 
        const gpvipp = isVipGp ? 's' : 'n' 
	    const from = m.key.remoteJid
	
	
	try {
            let isNumber = x => typeof x === 'number' && !isNaN(x)
            let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
            let user = global.db.data.users[m.sender]
            if (typeof user !== 'object') global.db.data.users[m.sender] = {}
            if (user) {
                if (!isNumber(user.afkTime)) user.afkTime = -1
                if (!('afkReason' in user)) user.afkReason = ''
                if (!isNumber(user.limit)) user.limit = limitUser
            } else global.db.data.users[m.sender] = {
                afkTime: -1,
                afkReason: '',
                limit: limitUser,
            }
    
            let chats = global.db.data.chats[m.chat]
            if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
            if (chats) {
                if (!('mute' in chats)) chats.mute = false
                if (!('antilink' in chats)) chats.antilink = false
            } else global.db.data.chats[m.chat] = {
                mute: false,
                antilink: false,
            }
		
	    let setting = global.db.data.settings[botNumber]
            if (typeof setting !== 'object') global.db.data.settings[botNumber] = {}
	    if (setting) {
		if (!isNumber(setting.status)) setting.status = 0
		if (!('autobio' in setting)) setting.autobio = false
	    } else global.db.data.settings[botNumber] = {
		status: 0,
		autobio: false,
	    }
	    
        } catch (err) {
            console.error(err)
        }
	    
        // PÚBLICO E PRIVADO
        if (!bat.public) {
            if (!m.key.fromMe) return
        }

        // Enviar mensagem para console && leitura automática
        if (m.message) {
            bat.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(chalk.black(chalk.bgWhite('[ PESSOA ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Local'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> De'), chalk.green(m.isGroup ? pushname : 'Chat Privado', m.chat))
        }
	
	// ESCREVER NA DATABASE A CADA 1 MINUTO
	setInterval(() => {
            fs.writeFileSync('./src/database.json', JSON.stringify(global.db, null, 2))
        }, 60 * 1000)

	// RESETA O LIMITE A CADA 12 HORAS
        let cron = require('node-cron')
        cron.schedule('00 23 * * *', () => {
            let user = Object.keys(global.db.data.users)
            let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
            for (let jid of user) global.db.data.users[jid].limit = limitUser
            console.log('Limite resetado')
        }, {
            scheduled: true,
            timezone: "America/Sao_Paulo"
        })
        
	// AUTO DEFINIÇÃO NA BIO
	if (db.data.settings[botNumber].autobio) {
	    let setting = global.db.data.settings[botNumber]
	    if (new Date() * 1 - setting.status > 1000) {
		let uptime = await runtime(process.uptime())
		await bat.setStatus(`${bat.user.name} | Tempo iniciado : ${runtime(uptime)}`)
		setting.status = new Date() * 1
	    }
	}
	    
	  // ANTI LINK
        if (db.data.chats[m.chat].antilink) {
        if (budy.match(`chat.whatsapp.com`)) {
        if (!isBotAdmins) return m.reply(`não sou admin rlx T_T`)
        let gclink = (`https://chat.whatsapp.com/`+await bat.groupInviteCode(m.chat))
        let isLinkThisGc = new RegExp(gclink, 'i')
        let isgclink = isLinkThisGc.test(m.text)
        if (isgclink) return m.reply(`「 ANTI LINK 」\n\nrlx vc enviou um link do grupo, por conta disto eu não irei te banir.`)
        if (isAdmins) return //m.reply(`você é um administrador`)
        if (isCreator) return //m.reply(`você é o dono do meu bot`)
        bat.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }
        }
        
      // MUTAR CHATS
      if (db.data.chats[m.chat].mute && !isAdmins && !isCreator) {
      return
      }

        // RESPOSTA DO COMANDO COM MÍDIA 
        if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
        let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
        let { text, mentionedJid } = hash
        let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
            userJid: bat.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        })
        messages.key.fromMe = areJidsSameUser(m.sender, bat.user.id)
        messages.key.id = m.key.id
        messages.pushName = m.pushName
        if (m.isGroup) messages.participant = m.sender
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        }
        bat.ev.emit('messages.upsert', msg)
        }
	
	    
	    let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
	    for (let jid of mentionUser) {
            let user = global.db.data.users[jid]
            if (!user) continue
            let afkTime = user.afkTime
            if (!afkTime || afkTime < 0) continue
            let reason = user.afkReason || ''
            m.reply(`
Não o marque!
Ele está em AFK ${reason ? 'com razão ' + reason : 'sem razão kkk'}
No decorrer ${clockString(new Date - afkTime)}
`.trim())
        }

        if (db.data.users[m.sender].afkTime > -1) {
            let user = global.db.data.users[m.sender]
            m.reply(`
Você saiu do AFK${user.afkReason ? ' depois de ' + user.afkReason : ''}
No decorrer ${clockString(new Date - user.afkTime)}
`.trim())
            user.afkTime = -1
            user.afkReason = ''
        }
	    
        switch(command) {



            case 'sticker': case 's': case 'f': case 'sgif': {
               // if (!m.isGroup) throw `esse tipo de comando é exclusivo do grupo iris:\n\nhttps://chat.whatsapp.com/DUP9VTCuRin2NHFjYqYbZN`
                if (!quoted) throw `Marque um video ou imagem com o comando ${prefix + command}`
                m.reply(mess.wait)
                        if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await bat.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                    await fs.unlinkSync(encmedia)
                } else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) return m.reply('Marque um video de até 10 segundos!')
                    let media = await quoted.download()
                    let encmedia = await bat.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                    await fs.unlinkSync(encmedia)
                } else {
                    throw `Hmmm possivel erro, marque um video ou foto com o comando ${prefix + command}\nO video tem que durar 9 segundos`
                    }
                }
                break
              case 'renomear': {
               if (!isCreator) throw mess.owner
		      //if(!isPremium2) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
               if (!text) throw `Examplo de uso : ${prefix + command} packname|author`
          global.packname = text.split("|")[0]
          global.author = text.split("|")[1]
          m.reply(`Descrição foi alterada com sucesso para\n\n⭔ Packname : ${global.packname}\n⭔ Autor : ${global.author}`)
            }
            break
            case 'setplano': {
                if (!isCreator) throw mess.owner
                //if(!isPremium2) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
                if (!text) throw `Examplo de uso : ${prefix + command} 🟢 07 DIAS = R$ 10,00
🟢 30 DIAS = R$ 20,00 |🟢 07 DIAS = R$ 20,00
🟢 15 DIAS = R$ 30,00
🟢 30 DIAS = R$ 45,00`
           global.precopv = text.split("|")[0]
           global.precogrupo = text.split("|")[1]
           m.reply(`🛠 Descrição de preços foi alterada com sucesso:\n\n👤 Para privados : \n${global.precopv}\n👥 Para grupos : \n${global.precogrupo}`)
             }
             break
            case 'play': case 'ytplay': {
                //if (!m.isGroup) throw `esse tipo de comando é exclusivo do grupo iris:\n\nhttps://chat.whatsapp.com/DUP9VTCuRin2NHFjYqYbZN`
                if (!text) throw `Example : ${prefix + command} pablo vitar seu amor me pegou`
                let yts = require("yt-search")
                let search = await yts(text)
                let dow = search.videos[Math.floor(Math.random() * search.videos.length)]
                let buttons = [
                    {buttonId: `${prefix}ytmp3 ${dow.url}`, buttonText: {displayText: '♫ Audio'}, type: 1},
                    {buttonId: `${prefix}ytmp4 ${dow.url}`, buttonText: {displayText: '► Video'}, type: 1}
                ]
                let buttonMessage = {
                    image: { url: dow.thumbnail },
                    caption: `
            ✏️ Título: ${dow.title}
            ⌛ Duração: ${dow.timestamp}
            👁‍🗨 Visualizações : ${dow.views}
            📅 Data De Envio: ${dow.ago}
            🎭 Autor : ${dow.author.name}
            👤 Canal: ${dow.author.url}
            🎶 Descrição : ${dow.description}
            🔗 Url : ${dow.url}`,
                    footer: `🎶 Usuario: ${m.pushName}`,
                    buttons: buttons,
                    headerType: 4
                }
                bat.sendMessage(m.chat, buttonMessage, { quoted: m })
            }
            break
            case 'ytmp3': case 'ytaudio': {
                if (!m.isGroup) throw `esse tipo de comando é exclusivo do grupo iris:\n\nhttps://chat.whatsapp.com/D9VTCuRin2NHFjYqYbZN`
                let { yta } = require('./lib/y2mate')
                if (!text) throw `Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 128kbps`
                let quality = args[1] ? args[1] : '128kbps'
                let media = await yta(text, quality)
                if (media.filesize >= 100000) return m.reply('Arquivo acima do limite '+util.format(media))
                bat.sendImage(m.chat, media.thumb, `⭔ Titulo : ${media.title}\n⭔ File Size : ${media.filesizeF}\n⭔ Url : ${isUrl(text)}\n⭔ Ext : MP3\n⭔ Resolução : ${args[1] || '128kbps'}`, m)
                bat.sendMessage(m.chat, { audio: { url: media.dl_link }, mimetype: 'audio/mpeg', fileName: `${media.title}.mp3` }, { quoted: m })
            }
            break
            case 'ytmp4': case 'ytvideo': {
                if (!m.isGroup) throw `esse tipo de comando é exclusivo do grupo iris:\n\nhttps://chat.whatsapp.com/DUP9CuRin2NHFjYqYbZN`
                let { ytv } = require('./lib/y2mate')
                if (!text) throw `Exemplo : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 360p`
                let quality = args[1] ? args[1] : '360p'
                let media = await ytv(text, quality)
                if (media.filesize >= 100000) return m.reply('Arquivo acima do limite '+util.format(media))
                bat.sendMessage(m.chat, { video: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, caption: `⭔ Titulo : ${media.title}\n⭔ File Size : ${media.filesizeF}\n⭔ Url : ${isUrl(text)}\n⭔ Ext : MP3\n⭔ Resolução : ${args[1] || '360p'}` }, { quoted: m })
            }
            break
            
            
            //----------------------------- FIM ------------------------------\\
            
            
                    // menu2 de comandos extras
                            case 'menu2':
                            m.reply('┏━「🚀 *TODOS*」━┓\n*┃ •* /Planos\n*┃ •* /Afk\n*┃ •* /Listchat\n*┃ •* /Listgp\n*┃ •* /Check\n*┃ •* /Id\n*┃ •* /Wame\n*┃ •* /Chatid\n*┃ •* /Ping\n*┃ •* /Delete\n┗━━━━━━━━━━━━━━┛\n\n\n┏━「💬 *GRUPOS*」━┓\n*┃ •* /Marcar \n*┃ •* /Online \n*┃ •* /Leave \n*┃ •* /Antilink \n*┃ •* /Grupo \n*┃ •* /Anunciar \n*┃ •* /Ban \n*┃ •* /TempBan \n*┃ •* /Add \n*┃ •* /Promote \n*┃ •* /Demote \n┗━━━━━━━━━━━━━━┛\n\n\n┏━「🔎 *CONSULTAS*」━┓\n*┃ •* /Tel (1, 2 e 3)\n*┃ •* /Placa\n*┃ •* /Cnpj\n*┃ •* /Nome\n*┃ •* /Site\n*┃ •* /Cpf (1, 2, 3 e 4)\n*┃ •* /Cep\n*┃ •* /Bin\n*┃ •* /Ip\n┗━━━━━━━━━━━━━━┛\n\n\n┏━「👤 *DONO*」━┓\n*┃ •* /Privado\n*┃ •* /Send\n*┃ •* /Sendgp\n*┃ •* /Publico\n*┃ •* /Join\n*┃ •* /Unblock\n┗━━━━━━━━━━━━━━┛')
                            break
                        
                            case 'donate': case 'contratar': case 'criador': case 'owner': case '1234aaaaadonate': {
                                bat.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/DpfFKvt/IMG-20220213-WA0024.jpg' }, caption: `🔆 - *Olá ${m.pushName}*,\nDesde já obriado por querer me contratar!\n\n✅ - *Para contratar um dos meus planos fale com meu dono:*\n\nhttps://wa.me/5567996005372` }, { quoted: m })
                            }
                            break
                            case 'afk': {
                                let user = global.db.data.users[m.sender]
                                user.afkTime = + new Date
                                user.afkReason = text
                                m.reply(`${m.pushName} Entrou em modo afk${text ? ': ' + text : ''}`)
                            }
                            break	
                
                        
            //----------------------------- COMANDOS DE ADMNISTRAÇÃO ------------------------------\\

            
            case 'marcar': {    
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
let teks = `══✪〘 *👥 Marquei geral* 〙✪══
 
 ➲ *frase: ${q ? q : 'eu sou só um bot ;-;'}*\n\n`
                for (let mem of participants) {
                teks += `⭔ @${mem.id.split('@')[0]}\n`
                }
                bat.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
                }
                break
                case 'hide': case 'anunciar':{
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
            bat.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
            }
            break
            case 'tempban': {
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    let users4 = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await bat.groupParticipantsUpdate(m.chat, [users4], 'remove').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
           m.reply(`Pronto, em 5 minutos eu ja adiciono essa pessoa de volta ao grupo, isso se ela não tiver privado...`)
                await sleep(300000)
           await bat.groupParticipantsUpdate(m.chat, [users4], 'add').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
            }
            break


	case 'kick': case 'ban': {
        //if (!isCreator) throw 'comando exclusivo para meu dono'
		if (!m.isGroup) throw mess.group
        if (!isBotAdmins) throw ("como  vou fzr isso se eu nem sou adm?")
        if (!isAdmins) throw mess.admin
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		if (botNumber.includes(users)) return m.reply('Por quê está tentando me banir???')
        //if (ownerNumber.includes(users)) return m.reply('Banindo meu dono?')
        await bat.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
	}
	break

	case 'add': {
		if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
		let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await bat.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
	}
	break
	case 'promote': {
		if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins && !isCreator) throw mess.admin
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace('👮‍♂️ Mais um com poderes administrativos admnistrativos')
		await bat.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
	}
	break
	case 'demote': {
		if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await bat.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
	}
	break
        case 'unblock': {
		if (!isCreator) throw ("comando exclusivo para meu dono")
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await bat.updateBlockStatus(users, 'unblock').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
	}
	break
	case 'delete': case 'del': case 'd': case 'apagar': {
                if (!m.quoted) throw false
                let { chat, fromMe, id, isBaileys } = m.quoted
                if (!isBaileys) throw 'Mencione uma mensagem do bot para ser deletada!'
                bat.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
            }
            break
			
	

            case 'antilink': {
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                if (args[0] === "on") {
                if (db.data.chats[m.chat].antilink) return m.reply(`já está ativo`)
                db.data.chats[m.chat].antilink = true
                m.reply(`Antilink ativo !`)
                } else if (args[0] === "off") {
                if (!db.data.chats[m.chat].antilink) return m.reply(`já está desativado`)
                db.data.chats[m.chat].antilink = false
                m.reply(`Antilink inativo!`)
                } else {
                 let buttons = [
                        { buttonId: `${prefix}antilink on`, buttonText: { displayText: 'ATIVAR ✅' }, type: 1 },
                        { buttonId: `${prefix}antilink off`, buttonText: { displayText: 'DESATIVAR ✅' }, type: 1 }
                    ]
                    await bat.sendButtonText(m.chat, buttons, `Modo Antilink`, bat.user.name, m)
                }
             }
             break
             case 'mute': {
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                if (args[0] === "on") {
                if (db.data.chats[m.chat].mute) return m.reply(`já está ativo`)
                db.data.chats[m.chat].mute = true
                m.reply(`${bat.user.name} foi silenciado neste grupo!`)
                } else if (args[0] === "off") {
                if (!db.data.chats[m.chat].mute) return m.reply(`já está desativado`)
                db.data.chats[m.chat].mute = false
                m.reply(`${bat.user.name} foi ativado neste grupo!`)
                } else {
                 let buttons = [
                        { buttonId: `${prefix}mute on`, buttonText: { displayText: 'ATIVAR ✅' }, type: 1 },
                        { buttonId: `${prefix}mute off`, buttonText: { displayText: 'DESATIVAR ✅' }, type: 1 }
                    ]
                    await bat.sendButtonText(m.chat, buttons, `Mutar o Bot no grupo`, bat.user.name, m)
                }
             }
             break
            case 'group': case 'grupo': {
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                if (args[0] === 'close'){
                    await bat.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(`Grupo fechado com sucesso 🥱`)).catch((err) => m.reply(jsonformat(err)))
                } else if (args[0] === 'open'){
                    await bat.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(`grupo aberto com sucesso 🚀`)).catch((err) => m.reply(jsonformat(err)))
                } else {
                let buttons = [
                        { buttonId: `${prefix}group open`, buttonText: { displayText: 'ABRIR ✅' }, type: 1 },
                        { buttonId: `${prefix}group close`, buttonText: { displayText: 'FECHAR ✅' }, type: 1 }
                    ]
                    await bat.sendButtonText(m.chat, buttons, `Mode Group`, bat.user.name, m)

             }
            }
            break

            case 'linkgp': case 'link': {
                if (!m.isGroup) throw mess.group
                let response = await bat.groupInviteCode(m.chat)
                bat.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
            }
            break

            case 'delete': case 'del': case 'd': case 'apagar': {
                if (!m.quoted) throw false
                let { chat, fromMe, id, isBaileys } = m.quoted
                if (!isBaileys) throw 'Mencione uma mensagem do bot para ser deletada!'
                bat.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
            }
            break
			
            
            case 'join': {
                if (!isCreator) throw 'comando exclusivo para meu dono'
                if (!text) throw 'falta o link do grupo!'
                if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalido!'
                m.reply('espere meu nobre')
                let result = args[0].split('https://chat.whatsapp.com/')[1]
                await bat.groupAcceptInvite(result).then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
            }
            break


            case 'bcgc': case 'sendgp': {
                if (!isCreator) throw mess.owner
                if (!text) throw `Cadê o testo? kkkk\n\nExemplo : ${prefix + command} adm está com fimose ainda😢`
                let getGroups = await bat.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                let maw = groups.map(v => v.id)
                m.reply(`Enviando transmissão para ${maw.length} Chat\nTempo de conclusão ${maw.length} segundos`)
                for (let i of maw) {
                    await sleep(1500)
                    let btn = [{
                        urlButton: {
                            displayText: 'Meu grupo 🔆',
                            url: 'https://chat.whatsapp.com/FeBFBymIjuj39NWD94i5Ob'
                        }
                    }, {
                        quickReplyButton: {
                            displayText: 'CONSULTAS 🔎',
                            id: `${prefix}consultas`
                        }
                    }]
                      let txt = `「 TRANSMISSÃO - HIDRA 」\n\n${text}`
                      bat.send5ButImg(i, txt, bat.user.name, global.thumb, btn)
                    }
                m.reply(`Transmissão enviada para o grupo ${maw.length}`)
            }
            break
            case 'bc': case 'transmitir': case 'send': {
                if (!isCreator) throw mess.owner
                if (!text) throw `Cadê o testo? kkkk\n\nExemplo : ${prefix + command} adm está com fimose ainda😢`
                let maw = await store.chats.all().map(v => v.id)
               m.reply(`Enviando transmissão para ${maw.length} Chat\nTempo de conclusão ${maw.length} segundos`)

		for (let yoi of maw) {
		    await sleep(1500)
		    let btn = [{
                    urlButton: {
                        displayText: 'Meu grupo 🔆',
                        url: 'https://chat.whatsapp.com/FeBFBymIjuj39NWD94i5Ob'
                    }
                }, {
                    quickReplyButton: {
                        displayText: 'CONSULTAS 🔎',
                        id: `${prefix}consultas`
                    }
                }]
                      let txt = `「 TRANSMISSÃO - HIDRA 」\n\n${text}`
                      bat.send5ButImg(yoi, txt, bat.user.name, global.thumb, btn)
		}
		m.reply('BroadCast concluida🥱')
            }
            break

            case 'leave': {
                if (!isCreator) throw mess.owner
                await bat.groupLeave(m.chat).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
            }
            break
            
            
            case 'listchat': {
                 let maw = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
                 let teks = `⬣ *LISTA DE PRIVADOS*\n\nTotal Chat : ${maw.length} Chat\n\n`
                 for (let i of maw) {
                     let nama = store.messages[i].array[0].pushName
                     teks += `⬡ *Nome :* ${nama}\n⬡ *Criador :* @${i.split('@')[0]}\n⬡ *Chat :* https://wa.me/${i.split('@')[0]}\n\n────────────────────────\n\n`
                 }
                 bat.sendTextWithMentions(m.chat, teks, m)
             }
             break
                case 'listgp': {
                 let maw = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
                 let teks = `⬣ *LISTA DE GRUPOS*\n\nTotal de Grupos : ${maw.length} Grupo\n\n`
                 for (let i of maw) {
                     let metadata = await bat.groupMetadata(i)
                     teks += `⬡ *Nome :* ${metadata.subject}\n⬡ *Criador :* @${metadata.owner.split('@')[0]}\n⬡ *ID :* ${metadata.id}\n⬡ *Faz :* ${moment(metadata.creation * 1000).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')}\n⬡ *Membro :* ${metadata.participants.length}\n\n────────────────────────\n\n`
                 }
                 bat.sendTextWithMentions(m.chat, teks, m)
             }
             break

             case 'check':
                if(!isPremium2) {
                  m.reply(`Não, você não está na lista de usuários premium.`)
                } else {
                    m.reply(`Sim, você está na lista de usuários premium!`)
                }
                break
                case 'onlines': case 'liston': case 'online': {
                    let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
                    let online = [...Object.keys(store.presences[id]), botNumber]
                    bat.sendText(m.chat, 'Lista de Onlines:\n\n' + online.map(v => '⭔ @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
             }
             break
            case 'publico': {
                if (!isCreator) throw mess.owner
                bat.public = true
                m.reply('Mudança bem-sucedida para uso público - todos podem me usar')
            }
            break
            case 'privado': {
                if (!isCreator) throw mess.owner
                bat.public = false
                m.reply('Mudança bem-sucedida para uso privado - apenas meu dono pode me usar')
            }
            break
			

	    case 'wame':
                m.reply(`wa.me/${m.sender.split('@')[0]} - *${pushname}*`)
                break

           case 'id':
                m.reply(m.sender)
                break
           case 'chatid':
                m.reply(m.chat)
                break
            

//----------------------------- CONSULTAS E MENU's ------------------------------\\
case 'consultas':
const sections = [
    {
	title: "CONSULTAS DE TELFONE:",
	rows: [
	    {title: "Tel", rowId: `${prefix}tel`, description: "Puxada de telefone basica ☕"},
	    {title: "Tel2", rowId: `${prefix}tel2`, description: "Puxada mais detalhada 🔥"},
        {title: "Tel3", rowId: `${prefix}tel3`, description: "Puxada por marcação 🆕"}
	]
    },
   {
	title: "CONSULTAS DIVERSAS",
	rows: [
	    {title: "Cnpj", rowId: `${prefix}cnpj`, description: "Puxada completa de cnpj 🚀"},
	    {title: "Placa", rowId: `${prefix}placa`, description: "Puxada completa de placas 🔥"},
	    {title: "Nome", rowId: `${prefix}nome`, description: "Puxada simples de nome 👤"}
	]
    },
   {
	title: "CONSULTAS DE CPF:",
	rows: [
	    {title: "Cpf1", rowId: `${prefix}cpf1`, description: "Puxada de cpf comum ☕"},
	    {title: "Cpf2", rowId: `${prefix}cpf2`, description: "puxada de cpf detalhada 🔎"},
	    {title: "Cpf3", rowId: `${prefix}cpf3`, description: "puxada de cpf avançada com score 🔥"},
	    {title: "Cpf4", rowId: `${prefix}cpf3`, description: "puxada de cpf full 🆕"}
	]
    },
    {
	title: "CONSULTAS GRÁTIS:",
	rows: [
	    {title: "Cep", rowId: `${prefix}cep`, description: "Puxada de cep 🏡"},
	    {title: "Site", rowId: `${prefix}site`, description: "Puxada de ip - site 🔗"},
	    {title: "Ip", rowId: `${prefix}ip`, description: "Puxada de ip ℹ"},
	    {title: "Bin", rowId: `${prefix}bin`, description: "Puxada de bin 💳"}
	]
    },
]

const listMessage = {
  text: "Esse é o menu em lista feito para facilitar a sua vida!\nPara o comando funcionar, selecione e envie o menu que quer abrir!",
  footer: "_*© By: Hidra*_",
  title: "CLIQUE NO MENU E SELECIONE SUA CONSULTA 🚀",
  buttonText: "ᴄᴏɴꜱᴜʟᴛᴀꜱ ᴅɪꜱᴘᴏɴɪᴠᴇɪꜱ",
  sections
}

const sendMsg = await bat.sendMessage(m.chat, listMessage)
break
            case 'plano': case 'planos': {
                let buttonse = [
                    {buttonId: `${prefix}contratar`, buttonText: {displayText: 'CONTRATAR PLANOS 💲'}, type: 1}
                ]
                let buttonMessagee = {
                    text: `☑️ 𝗣𝗟𝗔𝗡𝗢𝗦 𝗘 𝗩𝗔𝗟𝗢𝗥𝗘𝗦

(✅) Estou equipado com checkers
(✅) Consultas
(✅) Comandos para grupos
(✅) E conversões

🔘 Escolha um plano e selecione uma forma de pagamento abaixo.

👤 PLANOS  INDIVIDUAIS

${global.precopv}

👥 PLANOS PARA GRUPOS

${global.precogrupo}

💰 FORMAS DE PAGAMENTO

🟢 MERCADO PAGO
🟢 BOLETO
🟢 PIX`,
                    footer: '~ Bot by Hidra',
                    buttons: buttonse,
                    headerType: 2
                }
                bat.sendMessage(m.chat, buttonMessagee)
            }
            break

    
       case 'placa':
    case 'plac':
    if(!isVipGp) throw (`❌ ESTE GRUPO NÃO É VIP\n\n🟢 Para comprar VIP para este grupo, digite:\n\n/planos\n/contratar`)
    if(!isPremium2) throw ("👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar")
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
    if(!text) throw (`Digite uma placa. | Exemplo: /placa JYE9708`)
    var query = text
    if(query.length < 7 || query.length > 11) return m.reply('ERRO\nA placa deve conter 7 dígitos!\nUso: /placa JYE9708');
    m.reply(`Opa ${pushname}, já estou consutando, aguarde...`)
    xx = await fetchJson(`https://k-a.herokuapp.com/api/consultas/placa?texto=${encodeURIComponent(query)}&apikey=${apiConsulta}`)
if (xx.Placa != undefined) {
retorno = `═════════════════════\n🕵️  CONSULTA REALIZADA  🕵️\n═════════════════════\n\n• PLACA: ${xx.Placa}\n• SITUAÇÃO: ${xx.Situação}\n\n• MARCA: ${xx.MarcaModelo}\n• COR: ${xx.Cor}\n• DATA DE FABRICAÇÃO: ${xx.AnoFabricação}\n\n• MUNICIPIO: ${xx.Cor}\n• ESTADO: ${xx.Cor}\n• CHASSI: ${xx.Chassi}\n\n• RENAVAM: ${xx.Renavam}\n• UF FATURADO: ${xx.UfFaturado}\n\n• TIPO VEICULO: ${xx.TipoVeiculo}\n• ESPECIE: ${xx.Especie}\n• CATEGORIA: ${xx.Categoria}\n• COMBUSTIVEL: ${xx.Combustivel}\n\n• POTENCIA: ${xx.Potencia}\n• CILINDRADAS: ${xx.Cilindradas}\n• NACIONALIDADE: ${xx.Nacionalidade}\n• CAPACIDADE MAXIMA: ${xx.QuantidadeDePassageiros}\n• QUANTIDADE EIXOS: ${xx.QuantidadeEixos}\n\n• ATUALIZAÇÃO: ${xx.AtualizaçãoVeiculo}\n• ROUBO/FURTO: ${xx.RouboFurto}\n• REMARCAÇÃO CHASSI: ${xx.RemarcaçãoChassi}\n\n• LICENCIAMENTO: ${xx.Licenciamento}\n• EMISSÃO CRV: ${xx.EmissãoUltimoCrv}\n\n• NOME: ${xx.Nome}\n• CPF/CNPJ: ${xx.CpfCnpj}\n\n• Usuario: ${pushname}\n\n🔛 BY: ${nBot}\n\n━━━━━━━━━━━━━━━━━━`
m.reply(retorno)
} else {
m.reply(`⚠️ PLACA NÃO ENCONTRADA!`)
}
break

    case 'nome':
case 'puxarnome':
if(!isVipGp) throw (`❌ ESTE GRUPO NÃO É VIP\n\n🟢 Para comprar VIP para este grupo, digite:\n\n/planos\n/contratar`)
if(!isPremium2) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
    if(args.length < 1) return m.reply('✅ Para usar esse comando use /nome + o nome da pessoa.');
    m.reply(`Opa ${pushname}, já estou consutando, aguarde...\nCaso não retorne nada, nao foi encontrado.`);
if (!q) bat.sendMessage(from, {text: `Qual o nome da pessoa?`}, {quoted: mek})
bat.sendMessage(from, {text: `🔍 Consultando, aguarde...`}, {quoted: mek})
await axios.get(`https://api.i-find.dev/?token=b4ded580-a8a6-4d66-9f03-93a26426391d&nome=${encodeURIComponent(q)}`).then(anu => {

sexo = `═════════════════════
🔍  *CONSULTA REALIZADA*  🔎
═════════════════════\n`

for(let i of anu.data)
sexo += `
NOME: ${i.Nome}
CPF: ${i.Cpf}
GÊNERO: ${i.Genero}
DATA DE NASCIMENTO: ${i.Nascimento}

═════════════════════════\n\n`;
sexo += `👤 Usuário: ${pushname}

🔛 BY: ${nBot}`;
bat.sendMessage(from, {text: sexo}, {quoted: mek});
}).catch(err => {
m.reply(`_* ❗Comando com problemas, tente novamente ou contate meu criador ❗*_`);
console.log('Error : %s', color(err, 'red'))
})
break
                    /*case 'nome':
                    
   		            if(!isPremium2) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
                    if(args.length < 1) return m.reply('✅ Para usar esse comando use /nome + o nome da pessoa.');
		    m.reply(`Opa ${pushname}, já estou consutando, aguarde...\nCaso não retorne nada, nao foi encontrado.`);
                    xx = await fetchJson(`https://k-a.herokuapp.com/api/consultas/nome/${text}/hidra`)
                    if (xx.Cpf != undefined) {
                        consulta = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════

INFORMAÇÕES:
                    
• NOME: ${xx.Nome}
• CPF: ${xx.Cpf} 
• SEXO: ${xx.Sexo} 
• NASCIMENTO: ${xx.Nascimento} 

_(somente 1 resultado pois estou em manutenção)_

para apagar esta consulta digite /d
━━━━━━━━━━━━━━━━━━`
                    m.reply(consulta)
} else {
    m.reply(`⚠️ NOME NÃO ENCONTRADO!`)
}
                      break*/


// O COMANDO DE CNPJ ESTÁ ASSIM POIS FIQUEI COM PREGUIÇA DE CODAR, CASO QUEIRA ME AJUDAR, CODA ELE E ME MANDA, IREI COLOCAR OS CRÉDITOS <3
case 'cnpj':
if(!isVipGp) throw (`❌ ESTE GRUPO NÃO É VIP\n\n🟢 Para comprar VIP para este grupo, digite:\n\n/planos\n/contratar`)
if(!isPremium2 && !m.isGroup) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
    if(!text) return m.reply (`por favor digite um cnpj`)
                var query = text
                .split('+').join('')
                .split('-').join('')
                .split(' ').join('')
                .split('(').join('')
                .split(')').join('');
                m.reply(`Aguarde ${pushname}, estou consultando os dados...`)
                if(query.length < 11) return m.reply('Isso não é um cnpj válido;-;');
    res = await axios(`https://www.receitaws.com.br/v1/cnpj/${encodeURIComponent(query)}`);
keys = Object.keys(res.data);
a = '═════════════════════\n🔍 *CONSULTA DE CNPJ* 🔍\n═════════════════════\n\n';
keys.map(function (i) {
	a += `${i}: ${typeof res.data[i] === 'object' ? '' : res.data[i]}\n`;
});
m.reply(a + `\n👤 *Usuario:* ${pushname}

🔛 BY: ${nBot}

━━━━━━━━━━━━━━━━━━`);
                break


            
                case 'site':
                if(args.length < 1) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗦𝗜𝗧𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta a url de um SITE, obtém dados do site, como qual \né o ip, ip reverso, provedor, país, estado, cidade e as\ncoordenadas de onde ele está localizado.\n\nFormato:\nhttp://google.com\nou\ngoogle.com\n\n/site google.com\n\n━━━━━━━━━━━━━━━━━━━━━');
                var query = q
                .split('http://').join('')
                .split('https://').join('')
                .split(' ').join('');
                m.reply(`*Opa ${pushname}, já estou consutando, aguarde...`)
                hehe = await fetchJson(`http://ip-api.com/json/${encodeURIComponent(query)}`)
 
        if (hehe.country != undefined) {
    consulta = `═════════════════════
🔍 *CONSULTA DE SITE* 🔍
═════════════════════

• *País:* ${hehe.country}
• *Sigla:* ${hehe.countryCode}
• *Região:* ${hehe.regionName}
• *Sigla Região:* ${hehe.regionName}
• *Cidade:* ${hehe.city}
• *Cep:* ${hehe.zip}
• *Lat:* ${hehe.lat}
• *Lon:* ${hehe.lon}
• *Fuso Horário:* ${hehe.timezone}
• *Net:* ${hehe.isp}

👤 *Usuario:* ${pushname}

🔛 BY: ${nBot}

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
await sleep(800)
await bat.sendMessage(m.chat, { location: { degreesLatitude: hehe.lat, degreesLongitude: hehe.lon }, })
} else {
    m.reply(`⚠️ SITE NÃO ENCONTRADO`)
}

  break


                           case 'ip':
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗜𝗣\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta o número de IP, obtém dados do IP, como qual é o provedor, ip reverso, país, estado, cidade e as coordenadas de onde ele está localizado.\n\nFormato:\n204.152.203.157\n\n/ip 204.152.203.157\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 6) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗜𝗣\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta o número de IP, obtém dados do IP, como qual é o provedor, ip reverso, país, estado, cidade e as coordenadas de onde ele está localizado.\n\nFormato:\n204.152.203.157\n\n/ip 204.152.203.157\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗜𝗣\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta o número de IP, obtém dados do IP, como qual é o provedor, ip reverso, país, estado, cidade e as coordenadas de onde ele está localizado.\n\nFormato:\n204.152.203.157\n\n/ip 204.152.203.157\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Opa ${pushname}, já estou consutando, aguarde...\nCaso não retorne nada, nao foi encontrado.`)
                hehe = await fetchJson(`http://ip-api.com/json/${text}`)
 
        if (hehe.country != undefined) {
    consulta = `═════════════════════
🔍 *CONSULTA DE IP* 🔍
═════════════════════

• *País:* ${hehe.country}
• *Sigla:* ${hehe.countryCode}
• *Região:* ${hehe.regionName}
• *Sigla Região:* ${hehe.regionName}
• *Cidade:* ${hehe.city}
• *Cep:* ${hehe.zip}
• *Lat:* ${hehe.lat}
• *Lon:* ${hehe.lon}
• *Fuso Horário:* ${hehe.timezone}
• *Net:* ${hehe.isp}

👤 *Usuario:* ${pushname}

🔛 BY: ${nBot}

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
await sleep(1500)
await bat.sendMessage(m.chat, { location: { degreesLatitude: hehe.lat, degreesLongitude: hehe.lon }, })
} else {
    m.reply(`⚠️ IP NÃO ENCONTRADO`)
}

  break

     case 'cep':
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗘𝗣\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta de CEP, obtém informações sobre os logradouros (como nome de rua, avenida, alameda, beco, travessa, praça etc), nome de bairro, cidade e estado onde ele está localizado.\n\nFormato:\n70040010\nou\n70040-010\n\n/cep 70040010\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 4 || query.length > 11) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗘𝗣\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta de CEP, obtém informações sobre os logradouros (como nome de rua, avenida, alameda, beco, travessa, praça etc), nome de bairro, cidade e estado onde ele está localizado.\n\nFormato:\n70040010\nou\n70040-010\n\n/cep 70040010\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗘𝗣\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta de CEP, obtém informações sobre os logradouros (como nome de rua, avenida, alameda, beco, travessa, praça etc), nome de bairro, cidade e estado onde ele está localizado.\n\nFormato:\n70040010\nou\n70040-010\n\n/cep 70040010\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Opa ${pushname}, já estou consutando, aguarde...\nCaso não retorne nada, nao foi encontrado.`)
                hehee = await fetchJson(`https://cep.awesomeapi.com.br/json/${encodeURIComponent(query)}`)
 
if (hehee.cep != undefined) {
    consulta = `═════════════════════
🔍 *CONSULTA DE CEP* 🔍
═════════════════════

• *Cep:* ${hehee.cep}
• *DDD:* ${hehee.ddd}
• *Estado:* ${hehee.state}
• *Tipo de logradouro:* ${hehee.address_type}
• *Nome do logradouro:* ${hehee.address_name}
• *Rua:* ${hehee.address}
• *Bairro:* ${hehee.district}
• *Cidade:* ${hehee.city}
• *Latitude:* ${hehee.lat} 
• *Longitude:* ${hehee.lng} 

👤 *Usuario:* ${pushname}

🔛 BY: ${nBot}

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
await sleep(2000)
await bat.sendMessage(m.chat, { location: { degreesLatitude: hehee.lat, degreesLongitude: hehee.lng }, })
} else {
    m.reply(`⚠️ CEP NÃO ENCONTRADO`)
}
  break

  break

  case 'bin':
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗕𝗜𝗡\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta de BIN, obtém os detalhes do emissor (como qual banco ou instituição financeira emitiu o cartão e onde ele está localizado), o tipo, a bandeira e a categoria do cartão.\n\nFormato:\n498408\n\n/bin 498408\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 5 || query.length > 11) return m.reply(`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗕𝗜𝗡\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta de BIN, obtém os detalhes do emissor (como qual banco ou instituição financeira emitiu o cartão e onde ele está localizado), o tipo, a bandeira e a categoria do cartão.\n\nFormato:\n498408\n\n/bin 498408\n\n━━━━━━━━━━━━━━━━━━━━━`);
    if(isNaN(query)) return m.reply(`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗕𝗜𝗡\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta de BIN, obtém os detalhes do emissor (como qual banco ou instituição financeira emitiu o cartão e onde ele está localizado), o tipo, a bandeira e a categoria do cartão.\n\nFormato:\n498408\n\n/bin 498408\n\n━━━━━━━━━━━━━━━━━━━━━`);
   m.reply(`Aguarde ${pushname}, estou consultando os dados...`)
 xx = await fetchJson(`https://bin-check-dr4g.herokuapp.com/api/${encodeURIComponent(query)}`)
 if (xx.data.bin != undefined) {
consulta = `═════════════════════
🕵️  *CONSULTA REALIZADA*  🕵️
═════════════════════

*INFORMAÇÕES:*
• *BIN:* ${xx.data.bin}
• *ESQUEMA:* ${xx.data.vendor}
• *TIPO:* ${xx.data.type} 
• *LEVEL:* ${xx.data.level}
• *BANCO:* ${xx.data.bank}

*PÁIS:*
• *NOME:* ${xx.data.countryInfo.name} ${xx.data.countryInfo.emoji}
• *CODIGO:* ${xx.data.countryInfo.code}
• *DDI:* ${xx.data.countryInfo.dialCode}

• Usuario: ${pushname}

🔛 BY: ${nBot}

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
} else {
    m.reply(`⚠️ BIN NÃO ENCONTRADA`)
}
 break

                      case 'cpf4':
     if(!isVipGp) throw (`❌ ESTE GRUPO NÃO É VIP\n\n🟢 Para comprar VIP para este grupo, digite:\n\n/planos\n/contratar`)
    // if(!Puxada) throw (`⚠ - Puxadas foram desativadas pelo meu dono ou estou em manutenção.`)
    if(!isPremium2 && !m.isGroup) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 4\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf1 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 11 || query.length > 11) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟭\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf1 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟭\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf1 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Opa ${pushname}, já estou consutando, aguarde...\nCaso não retorne nada, nao foi encontrado.`)
                await sleep(10)
                apii = await fetchJson(`https://k-a.herokuapp.com/api/consultas/cpf1/${encodeURIComponent(query)}/&apikey=${apiConsulta}`)
 
if (apii.Rg != undefined) {
    consulta = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════

 INFORMAÇÕES DO CPF (base 1):    

• CPF: ${apii.Cpf}
• RG: ${apii.Rg}

• CNS: ${apii.Cns}

• NOME: ${apii.Nome}
• DATA DE NASCIMENTO: ${apii.Nascimento}
• IDADE: ${apii.Idade}
• SIGNO: ${apii.Signo}
• SEXO: ${apii.Sexo}
• COR: ${apii.Cor}
• TIPO SANGUÍNEO: ${apii.TipoSanguíneo}

• MÃE: ${apii.Mãe}
• PAI: ${apii.Pai}

• NACIONALIDADE: ${apii.Nacionalidade}
• CIDADE DE NASCIMENTO: ${apii.CidadeDeNascimento}
• ESTADO DE NASCIMENTO: ${apii.EstadoDeNascimento}

*ENDEREÇO:*

• TIPO DE LOGRADOURO: ${apii.TipoDeLogradouro}
• RUA: ${apii.Logradouro}
• NÚMERO: ${apii.Número}
• COMPLEMENTO: ${apii.Complemento}
• BAIRRO: ${apii.Bairro}
• CIDADE: ${apii.Cidade}
• ESTADO: ${apii.Estado}
• PAÍS: ${apii.País}
• CEP: ${apii.Cep}

• EMAIL: ${apii.Email}
• TELEFONE: ${apii.Telefone}
• TIPO: ${apii.Tipo}


• Usuario: ${pushname}

🔛 BY: ${nBot}

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
} else {
    
    m.reply(`⚠️ CPF NÃO ENCONTRADO!`)
}
  break


case 'cpf3':
    if(!isVipGp) throw (`❌ ESTE GRUPO NÃO É VIP\n\n🟢 Para comprar VIP para este grupo, digite:\n\n/planos\n/contratar`)
    if(!isPremium2) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 3\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de CPF, retorna os dados do portador. Incluindo dados Tipo 1 + número de RG, nome do pai e local de nascimento.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf2 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 11 || query.length > 11) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟮\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de CPF, retorna os dados do portador. Incluindo dados Tipo 1 + número de RG, nome do pai e local de nascimento.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf2 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟮\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de CPF, retorna os dados do portador. Incluindo dados Tipo 1 + número de RG, nome do pai e local de nascimento.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf2 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Opa ${pushname}, já estou consutando, aguarde...\nCaso não retorne nada, nao foi encontrado.`)
                await sleep(10)
                apii = await fetchJson(`https://k-a.herokuapp.com/api/consultas/cpf2/${encodeURIComponent(query)}/&apikey=${apiConsulta}`)
 
              if (apii.Cpf != undefined) {
    consulta = `═════════════════════\n🕵️  CONSULTA REALIZADA  🕵️\n═════════════════════\n\n INFORMAÇÕES DO CPF (base 2): \n\n • *CPF:* ${apii.Cpf}\n • *CNS:* ${apii.Cns}\n • *RG:* ${apii.Rg}\n • *DATA DE EXPEDIÇÃO:* ${apii.DataDeExpedição}\n • *ORGÃO EXPEDIDOR:* ${apii.OrgãoExpedidor}\n • *UF - RG:* ${apii. UfRg}\n\n • *TÍTULO ELEITORAL:* ${apii. TítuloEleitoral}\n\n • *NOME:* ${apii.Nome}\n • *DATA DE NASCIMENTO:* ${apii.Nascimento}\n • *IDADE:* ${apii.Idade}\n • *SIGNO:* ${apii.Signo}\n\n • *SEXO:* ${apii.Sexo}\n • *COR:* ${apii.Cor}\n • *TIPO SANGUÍNEO:* ${apii.TipoSanguíneo}\n\n • *MÃE:* ${apii.Mãe}\n • *PAI:* ${apii.Pai}\n\n • *PAÍS DE NASCIMENTO:* ${apii.PaísDeNascimento}\n • *CIDADE DE NASCIMENTO:* ${apii.CidadeDeNascimento}\n • *ESTADO DE NASCIMENTO:* ${apii.EstadoDeNascimento}\n\n • *LOGRADOURO:* ${apii.Logradouro}\n • *NÚMERO:* ${apii.Número}\n • *COMPLEMENTO:* ${apii.Complemento}\n • *BAIRRO:* ${apii.Bairro}\n • *CIDADE:* ${apii.Cidade}\n • *ESTADO:* ${apii.Estado}\n • *PAÍS:* ${apii.País}\n • *CEP:* ${apii.Cep}\n\n • *E-MAIL:* ${apii.Email}\n\n • *TELEFONE:* ${apii.Telefone}\n\n\n 👤 *Usuario:* ${pushname}\n\n🔛 BY: ${nBot}\n\n━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
} else {
    m.reply(`⚠️ CPF NÃO ENCONTRADO!`)
}
  break

    case 'cpf2':
    if(!isPremium2) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟯\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf3 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 11 || query.length > 11) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟯\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf3 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟯\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf3 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Opa ${pushname}, já estou consutando, aguarde...\nCaso não retorne nada, nao foi encontrado.`)
                await sleep(10)
                apii = await fetchJson(`https://apido.herokuapp.com/cpf3/${encodeURIComponent(query)}/&apikey=${apiConsulta}`)
 
if (apii.consulta != undefined) {
    consulta = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════

${apii.consulta}

 • Usuario: ${pushname}

🔛 BY: ${nBot}

 ━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
} else {
    m.reply(`TEMPO ESGOTADO NA API, TENTE REPETIR`)
}
                break
			
			
    case 'cpf1':
    case 'cpf':
    if(!isVipGp) throw (`❌ ESTE GRUPO NÃO É VIP\n\n🟢 Para comprar VIP para este grupo, digite:\n\n/planos\n/contratar`)
    if(!isPremium2) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf4 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 11 || query.length > 11) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf4 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf4 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Opa ${pushname}, já estou consutando, aguarde...\nCaso não retorne nada, nao foi encontrado.`)
                await sleep(10)
                apii = await fetchJson(`https://apido.herokuapp.com/cpf4/${encodeURIComponent(query)}/${apiConsulta}`)
 
if (apii.consulta != undefined) {
    consulta = `${apii.consulta}

 • Usuario: ${pushname}

🔛 BY: ${nBot}`
m.reply(consulta)
} else {
    m.reply(`TEMPO ESGOTADO NA API, TENTE REPETIR`)
}
                break


    case 'tel':

case 'telefone':
if(!isVipGp) throw (`❌ ESTE GRUPO NÃO É VIP\n\n🟢 Para comprar VIP para este grupo, digite:\n\n/planos\n/contratar`)
if(!isPremium && !m.isGroup) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━`)

var query = text

.split('+').join('')

.split('-').join('')

.split(' ').join('')

.split('(').join('')

.split(')').join('');

if(query.length < 10) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');

if(query.length == 10) {

var resultado3 = query.replace(/(\d{2})/, "$19")

return m.reply(`Identifiquei que esse número marcado tem um 9 a menos tente colocar mais ou menos assim:\n\n❌ - ERRADO: ${encodeURIComponent(query)}\n✅ - CERTO (ou não): ${resultado3}\n\n Caso eu tenha configurado errado, ajuste manualmente e puxe usando o /tel`);

}

if(query.length > 11) return m.reply('❌ - Isso é um telefone ou um cpf?');

if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');

m.reply(`*Ei ${pushname} já estou consultando...*`)

await fetchJson(`https://k-a.herokuapp.com/api/consultas/telefone/${encodeURIComponent(query)}/&apikey=${apiConsulta}`).then(async(xx) => {

 

// Botão

let buttons6 = [{buttonId: `${prefix}tel1 ${encodeURIComponent(query)}`, buttonText: {displayText: 'consulta comum 🚀'}, type: 1}, {buttonId: `${prefix}tel2 ${encodeURIComponent(query)}`, buttonText: {displayText: 'consulta completa 👑'}, type: 1},]

let buttonMessage6 = {text: `🔍 ${pushname}, Este número foi encontrado\n\nNúmero: _~${text}~_\nNome da pessoa: _~${xx.Nome ? xx.Nome : "Erro, Nome não encontrado."}~_`, footer: 'escolha abaixo qual o tipo de consulta você deseja:', buttons: buttons6, headerType: 2}

bat.sendMessage(m.chat, buttonMessage6)



// Erro

}).catch((err) => {

m.reply(`⚠️ TELEFONE NÃO ENCONTRADO`)

console.log(err)

})

break

    case 'tel2':
    case 'telefone2':
    if(!isVipGp) throw (`❌ ESTE GRUPO NÃO É VIP\n\n🟢 Para comprar VIP para este grupo, digite:\n\n/planos\n/contratar`)
    if(!isPremium2 && !m.isGroup) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
   if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
 if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('+').join('')
    .split('-').join('')
    .split(' ').join('')
    .split('(').join('')
    .split(')').join('');
    if(query.length < 10) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(query.length == 10) {
        var resultado3 = query.replace(/(\d{2})/, "$19")
         return m.reply(`Identifiquei que esse número marcado tem um 9 a menos tente colocar mais ou menos assim:\n\n❌ - ERRADO: ${text}\n✅ - CERTO (ou não): ${resultado3}\n\n Caso eu tenha configurado errado, ajuste manualmente e puxe usando o /tel`);
     }
    if(query.length > 11) return m.reply('❌ - Isso é um telefone ou um cpf?');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Opa ${pushname}, já estou consutando, aguarde...\nCaso não retorne nada, nao foi encontrado.`)
                await sleep(10)
                cj = await fetchJson(`https://k-a.herokuapp.com/api/consultas/telefone?numero=${encodeURIComponent(query)}&apikey=${apiConsulta}`)
if (cj[0].Nome != undefined) {
    consulta = `═════════════════════
🔍 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗗𝗘 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘
═════════════════════
    
*INFORMAÇÕES:*
    
• *TELEFONE:* ${cj[0].Telefone ? cj[0].Telefone : "SEM INFORMAÇÕES"}
• *OPERADORA:* ${cj[0].Operadora ? cj[0].Operadora : "SEM INFORMAÇÕES"}
    
• *NOME:* ${cj[0].Nome ? cj[0].Nome : "SEM INFORMAÇÕES"}
• *CPF/CNPJ:* ${cj[0].CPF ? cj[0].CPF : "SEM INFORMAÇÕES"}
    
 *ENDEREÇO:*
    
• *UF:* ${cj[0].UF ? cj[0].UF : "SEM INFORMAÇÕES"}
• *RUA:* ${cj[0].Endereco ? cj[0].Endereco : "SEM INFORMAÇÕES"}
• *BAIRRO:* ${cj[0].Bairro ? cj[0].Bairro : "SEM INFORMAÇÕES"}
• *NÚMERO:* ${cj[0].Numero ? cj[0].Numero : "SEM INFORMAÇÕES"}
• *COMPLEMENTO:* ${cj[0].Complemento ? cj[0].Complemento : "SEM INFORMAÇÕES"}
• *CEP:* ${cj[0].CEP ? cj[0].CEP : "SEM INFORMAÇÕES"}


👤 Usuário: ${pushname}
🔛 BY: ${nBot}`
m.reply(consulta)
} else {
    
    m.reply(`⚠️ TELEFONE NÃO ENCONTRADO!`)
}

                break

case 'tel1':
    case 'telefone1':
    if(!isVipGp) throw (`❌ ESTE GRUPO NÃO É VIP\n\n🟢 Para comprar VIP para este grupo, digite:\n\n/planos\n/contratar`)
    if(!isPremium2 && !m.isGroup) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('+').join('')
    .split('-').join('')
    .split(' ').join('')
    .split('(').join('')
    .split(')').join('');
    if(query.length < 10) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(query.length == 10) {
        var resultado3 = query.replace(/(\d{2})/, "$19")
         return m.reply(`Identifiquei que esse número marcado tem um 9 a menos tente colocar mais ou menos assim:\n\n❌ - ERRADO: ${text}\n✅ - CERTO (ou não): ${resultado3}\n\n Caso eu tenha configurado errado, ajuste manualmente e puxe usando o /tel`);
     }
    if(query.length > 11) return m.reply('❌ - Isso é um telefone ou um cpf?');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Opa ${pushname}, já estou consutando, aguarde...\nCaso não retorne nada, nao foi encontrado.`)
                await sleep(10)
                cj = await fetchJson(`https://k-a.herokuapp.com/api/consultas/telefone2?numero=${encodeURIComponent(query)}&apikey=${apiConsulta}`)
    consulta = `═════════════════════
🔍 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗗𝗘 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘
═════════════════════
    
*INFORMAÇÕES:*
    
• *TELEFONE:* ${encodeURIComponent(query)}
    
• *NOME:* ${cj[0].Nome ? cj[0].Nome : "SEM INFORMAÇÕES"}
• *CPF/CNPJ:* ${cj[0].CPF ? cj[0].CPF : "SEM INFORMAÇÕES"}
• *NASCIMENTO:* ${cj[0].Nasc ? cj[0].Nasc : "SEM INFORMAÇÕES"}

• *MÃE:* ${cj[0].Mae ? cj[0].Mae : "SEM INFORMAÇÕES"}
• *PAI:* ${cj[0].Pai ? cj[0].Pai : "SEM INFORMAÇÕES"}


👤 Usuário: ${pushname}
🔛 BY: ${nBot}`
m.reply(consulta)
                break

case "consulta": {
        if (!groupAdmins) return enviar("Somente admins podem usar este comando");
        if (!isBotAdmins) return enviar("O bot precisa ser administrador.");
        if (args[0].toLowerCase() === 'on') {
        bat.groupUpdateSubject(from, `𝙃𝙄𝘿𝙍𝘼 𝙎𝙀𝘼𝙍𝘾𝙃 - 𝙊𝙉 🔎`)
        bat.groupSettingUpdate(from, 'not_announcement');
        bat.sendMessage(m.chat, { text : `✅ CONSULTAS ON` , mentions: participants.map(a => a.id)}, { quoted: m })
        } else if (args[0].toLowerCase() === 'off') {
        bat.groupUpdateSubject(from, `𝙃𝙄??𝙍𝘼 𝙎𝙀𝘼𝙍𝘾𝙃 - 𝙊𝙁?? 🔎`)
        bat.groupSettingUpdate(from, 'announcement')
        bat.sendMessage(m.chat, { text : `❌ CONSULTAS OFF` , mentions: participants.map(a => a.id)}, { quoted: m })
        }
        }
        break

case 'addprem': 
            if (!m.isGroup) return m.reply(mess.group)
            if (!isCreator) return  m.reply('Somente meu dono pode usar esse comando.')
            if (m.message.extendedTextMessage === undefined || m.message.extendedTextMessage === null) return 
                uers22v = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+''
          
                pru = '.\n'
            for (let _ of uers22v) {
            pru += `@${_.split('@')[0]}\n`
            }
        
            prem2.push(`${uers22v}`)
            fs.writeFileSync('./lib/premium.json', JSON.stringify(prem2))
            susp = `👑@${uers22v[0].split('@')[0]} foi adicionado à lista de usuários premium com sucesso👑`
            m.reply(`${susp}`)
            break
        
            case 'dellprem': 
            if (!m.isGroup) return m.reply(mess.group)
            if (!isCreator) return  m.reply('Somente meu dono pode usar esse comando.')
        if (m.message.extendedTextMessage === undefined || m.message.extendedTextMessage === null) return 
        uers22v = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+''
        pru = '.\n'
        for (let _ of uers22v) {
        pru += `@${_.split('@')[0]}\n`
        }
        let dellprem = body.slice(12)
        let positio = prem2.indexOf(dellprem)
        prem2.splice(positio, 1)
        fs.writeFileSync('./lib/premium.json', JSON.stringify(prem2))
        susp = `✖@${uers22v[0].split('@')[0]} foi removido da lista de usuários premium✖`
        m.reply(`${susp}`)   
        break

case 'ping': case 'botstatus': case 'statusbot': {
    const used = process.memoryUsage()
    const cpus = os.cpus().map(cpu => {
        cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
        return cpu
    })
    const cpu = cpus.reduce((last, cpu, _, { length }) => {
        last.total += cpu.total
        last.speed += cpu.speed / length
        last.times.user += cpu.times.user
        last.times.nice += cpu.times.nice
        last.times.sys += cpu.times.sys
        last.times.idle += cpu.times.idle
        last.times.irq += cpu.times.irq
        return last
    }, {
        speed: 0,
        total: 0,
        times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0,
            irq: 0
    }
    })
    let timestamp = speed()
    let latensi = speed() - timestamp
    neww = performance.now()
    oldd = performance.now()
    respon = `💻 Info do Bot\n\n🚀 Tempo de resposta ${latensi.toFixed(4)} _Segundos_ \n\n⏳ Tempo ativo : ${runtime(process.uptime())}`.trim()
    m.reply(respon)
}
break

		// caso queira um menu de template button com imagem, basta apagar o /* do começo e o */ do final do comando.
			
            /*case 'start': case 'menu': case 'iniciar': case 'help': {
                maw = `OLÁ!!\nIREI FACILITAR MUITO SUA VIDA FAZENDO CONSULTAS!\n\n_selecione uma opção_`
                let message = await prepareWAMessageMedia({ image: fs.readFileSync('./lib/bat.jpg') }, { upload: bat.waUploadToServer })
                const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    templateMessage: {
                        hydratedTemplate: {
                            imageMessage: message.imageMessage,
                            hydratedContentText: maw,
                            hydratedButtons: [{
                                urlButton: {
                                    displayText: 'Meu grupo 🔆',
                                    url: 'https://chat.whatsapp.com/FeBFBymIjuj39NWD94i5Ob'
                                }
                            }, {
                                callButton: {
                                    displayText: 'Meu criador 👨‍💻',
                                    phoneNumber: '+55 94 9142-4691'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'CONSULTAS 🔎',
                                    id: `${prefix}consultas`
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'PLANOS 💰',
                                    id: `${prefix}planos`
                                }  
                            }]
                        }
                    }
                }), { userJid: m.chat, quoted: m })
                bat.relayMessage(m.chat, template.message, { messageId: template.key.id })
                //bat.relayMessage(template.message)
            }
            break*/
            case 'start': case 'menu': case 'iniciar': case 'help':
	const templateButtons = [
    {index: 1, urlButton: {displayText: '🔆 Meu grupo', url: 'https://chat.whatsapp.com/FeBFBymIjuj39ND94i5Ob'}},
    {index: 2, urlButton: {displayText: '👨‍💻 Meu criador', url: 'https://wa.me/556796005372'}},
    {index: 3, quickReplyButton: {displayText: '🔎 BUSCAS', id: `${prefix}consultas`}},
    {index: 4, quickReplyButton: {displayText: '💰 PLANOS', id: `${prefix}planos`}},
    {index: 6, quickReplyButton: {displayText: '🟣 MENU COMPLETO', id: `${prefix}menu2`}},
]

const templateMessage = {
    text: `*𝙃𝙄𝘿𝙍𝘼 𝘾𝙊𝙉𝙎𝙐𝙇𝙏𝘼𝙎 🔎*\n\nOLÁ ${pushname}!!\nSOU UM BOT DE CONSULTAS!`,
    footer: 'SELECIONE UMA OPÇÃO:',
    templateButtons: templateButtons
}

const sendMsg1 = await bat.sendMessage(m.chat, templateMessage)
break
            default:
                if (budy.startsWith('=>')) {
                    if (!isCreator) return m.reply(mess.owner)
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                            if (sat == undefined) {
                                bang = util.format(sul)
                            }
                            return m.reply(bang)
                    }
                    try {
                        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        m.reply(String(e))
                    }
                }

                if (budy.startsWith('>')) {
                    if (!isCreator) return m.reply(mess.owner)
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await m.reply(evaled)
                    } catch (err) {
                        await m.reply(String(err))
                    }
                }

                if (budy.startsWith('$')) {
                    if (!isCreator) return m.reply(mess.owner)
                    exec(budy.slice(2), (err, stdout) => {
                        if(err) return m.reply(err)
                        if (stdout) return m.reply(stdout)
                    })
                }
			
		if (m.chat.endsWith('@s.whatsapp.net') && isCmd) {
                    this.anonymous = this.anonymous ? this.anonymous : {}
                    let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
                    if (room) {
                        if (/^.*(next|leave|start)/.test(m.text)) return
                        if (['.next', '.leave', '.stop', '.start', 'Cari Partner', 'Keluar', 'Lanjut', 'Stop'].includes(m.text)) return
                        let other = [room.a, room.b].find(user => user !== m.sender)
                        m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? {
                            contextInfo: {
                                ...m.msg.contextInfo,
                                forwardingScore: 0,
                                isForwarded: true,
                                participant: other
                            }
                        } : {})
                    }
                    return !0
                }
			
		if (isCmd && budy.toLowerCase() != undefined) {
		    if (m.chat.endsWith('broadcast')) return
		    if (m.isBaileys) return
		    let msgs = global.db.data.database
		    if (!(budy.toLowerCase() in msgs)) return
		    bat.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
		}
        }
        

    } catch (err) {
        m.reply(util.format(err))
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
