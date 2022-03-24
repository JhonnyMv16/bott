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
let prem2 = [`559491423691`, `556599081355`, `556198415661`, `553288987903`, `556499096509`]

// GRUPOS VIPS
const vipGp = [`120363022980336151@g.us`] //pege a id no console ou no comando /chatid
// BASTA IR ADICIONANDO OS NÚMEROS 

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
         
        //Antifake:

  
    
	
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
                antilink: true,
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

	// RESETA O LIMITE A CADA 2 SEGUDOS PARA EVITAR FLOOD
        let cron = require('node-cron')
        cron.schedule('0-59/2 * * * * *', () => {
            let user = Object.keys(global.db.data.users)
            let limitUser = isPremium2 ? global.limitawal.premium : global.limitawal.free
            for (let jid of user) global.db.data.users[jid].limit = limitUser
            //console.log('Limite resetado')
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
        //m.reply(`「 ANTI LINK 」\n\nUm novo link foi detectado!`)
        if (!isBotAdmins) return //m.reply(`não sou admin rlx T_T`)
        let gclink = (`https://chat.whatsapp.com/`+await bat.groupInviteCode(m.chat))
        let isLinkThisGc = new RegExp(gclink, 'i')
        let isgclink = isLinkThisGc.test(m.text)
        if (isgclink) return //m.reply(`「 ANTI LINK 」\n\nrlx vc enviou um link do grupo, por conta disto eu não irei te banir.`)
        if (isAdmins) return //m.reply(`você é um administrador`)
        if (isCreator) return //m.reply(`você é o dono do meu bot`)
        bat.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        m.reply(`🏃‍♂️ Link de outro grupo detectado...`)
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

// CASES DO MARKOS CUIDADO NÃO VAZE 😶

case 'gtoken':
    if (!isCreator) throw mess.owner
    //if(args.length < 1) return m.reply('✅ Para usar esse comando use /nome + o nome da pessoa.');	  
    m.reply(`gerando seu token...`);
    await sleep(50)
    api = await fetchJson(`https://apitestekarma.herokuapp.com/privmarkosofc/generate-token`)
    //if (api.token != undefined) {api = await fetchJson(`https://apitestekarma.herokuapp.com/privmarkosofc/add/${text}`)
    await sleep(50)
    if (api.token != undefined) {
    apii = await fetchJson(`https://apido.herokuapp.com/privmarkosofc/add/${api.token}`)
retorno = `📎 UM NOVO TOKEN FOI GERADO!
 
🟣 Telefone: https://apitestekarma.herokuapp.com/telefone/17992440185/${api.token}

🟣 Placa: https://apitestekarma.herokuapp.com/placa/JYE9708/${api.token}

🟣 Cpf: https://apido.herokuapp.com/cpf/06344210427/${apii.token}

🟣 Cpf2: https://apitestekarma.herokuapp.com/cpf2/06344210427/${api.token}

🟣 Cpf3: https://apido.herokuapp.com/cpf3/06344210427/${apii.token}

🟣 Cpf4: https://apido.herokuapp.com/cpf4/06344210427/${apii.token}

🟣 Nome: https://apido.herokuapp.com/nome/jair%20messias%20bolsonaro/${apii.token}


SEU TOKEN DE TESTE: *${api.token}*`
m.reply(retorno)
bat.sendMessage(`559491423691@s.whatsapp.net`, {text: `/dtoken ${apii.token}`}, m)
} else {
m.reply(`OBTIVE PROBLEMAS NA API, PEÇO QUE VERIFIQUE`)
}          
break

case 'addtoken':
    if (!isCreator) throw mess.owner
    if(!text) return m.reply('✅ Para usar esse comando use /addtoken + o token da pessoa.');	  
    m.reply(`gerando seu token...`);
    await sleep(50)
    api = await fetchJson(`https://apitestekarma.herokuapp.com/privmarkosofc/add/${text}`)
    await sleep(50)
    if (api.token != undefined) {
    apii = await fetchJson(`https://apido.herokuapp.com/privmarkosofc/add/${text}`)
retorno = `📎 UM NOVO TOKEN FOI ADICIONADO!
 
🟣 Telefone: https://apitestekarma.herokuapp.com/telefone/17992440185/${api.token}

🟣 Placa: https://apitestekarma.herokuapp.com/placa/JYE9708/${api.token}

🟣 Cpf: https://apido.herokuapp.com/cpf/06344210427/${apii.token}

🟣 Cpf2: https://apitestekarma.herokuapp.com/cpf2/06344210427/${api.token}

🟣 Cpf3: https://apido.herokuapp.com/cpf3/06344210427/${apii.token}

🟣 Cpf4: https://apido.herokuapp.com/cpf4/06344210427/${apii.token}

🟣 Nome: https://apido.herokuapp.com/nome/jair%20messias%20bolsonaro/${apii.token}


SEU TOKEN DE TESTE: *${api.token}*

PARA APAGAR O TOKEN DIGITE ⤵`
m.reply(retorno)
await sleep(80)
m.reply(`/dtoken ${apii.token}`)
} else {
m.reply(`OBTIVE PROBLEMAS NA API, PEÇO QUE VERIFIQUE`)
}          

break

case 'dtoken':

    if (!isCreator) throw mess.owner
    if(!text) return m.reply('faltou inserir o token');	  
    m.reply(`deletando seu token...`);
    await sleep(50)
    api = await fetchJson(`https://apitestekarma.herokuapp.com/privmarkosofc/delete-token/${text}`)
    await sleep(50)
    apii = await fetchJson(`https://apido.herokuapp.com/privmarkosofc/delete-token/${text}`)
    //if (tokenDeleted != undefined) {
retorno = `O token *${api.tokenDeleted}/${apii.tokenDeleted}* foi deletado com sucesso!

meus tokens
API 1 *${api.yourTokens}*
https://apitestekarma.herokuapp.com


API 2 *${apii.yourTokens}*
https://apido.herokuapp.com`
bat.sendMessage(`559491423691@s.whatsapp.net`, {text: retorno}, m)
/*} else {
m.reply(`este token não existe`)
} */        
break


case 'tokens':

    if (!isCreator) throw mess.owner
    //if(!text) return m.reply('faltou inserir o token');	  
    m.reply(`aguarde vou verificar seus tokens...`);
    api = await fetchJson(`https://apitestekarma.herokuapp.com/privmarkosofc/delete-token/gSPiTABub9UqOyzDEHtH`)
    await sleep(50)
    if (api.tokens != undefined) {
    apii = await fetchJson(`https://apido.herokuapp.com/privmarkosofc/delete-token/gSPiTABub9UqOyzDEHtH`)
retorno = `meus tokens
API 1 *${api.tokens}*
https://apitestekarma.herokuapp.com


API 2 *${apii.tokens}*
https://apido.herokuapp.com`
//m.reply(retorno)
bat.sendMessage(`559491423691@s.whatsapp.net`, {text: retorno}, m)
} else {
m.reply(`este token não existe`)
}         
break
// FIM FAS CASES

            
            case 'attp':
                try{ 
                if (!text) return m.reply(`preciso do text krl`)
                url = encodeURI(`https://api.xteam.xyz/attp?file&text=${text}`)
                attp2 = await getBuffer(url)
                bat.sendMessage(m.chat, {sticker: attp2}, {quoted: m}, { packname: global.packname, author: global.author })
                } catch(e) {
                console.log(e)
                m.reply('Deu erro, tente novamente.')
                }
                break
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
		      // if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
               if (!text) throw `Examplo de uso : ${prefix + command} packname|author`
          global.packname = text.split("|")[0]
          global.author = text.split("|")[1]
          m.reply(`Descrição foi alterada com sucesso para\n\n⭔ Packname : ${global.packname}\n⭔ Autor : ${global.author}`)
            }
            break

            case 'setplano': {
                if (!isCreator) throw mess.owner
                // if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
                if (!text) throw `Examplo de uso : ${prefix + command} 🟢 07 DIAS = R$ 10,00
🟢 30 DIAS = R$ 20,00 |🟢 07 DIAS = R$ 20,00
🟢 15 DIAS = R$ 30,00
🟢 30 DIAS = R$ 45,00`
           global.precopv = text.split("|")[0]
           global.precogrupo = text.split("|")[1]
           m.reply(`🛠 Descrição de preços foi alterada com sucesso:\n\n👤 Para privados : \n${global.precopv}\n👥 Para grupos : \n${global.precogrupo}`)
             }
             break
		case 'atualizar': {
                if (!isPremium) throw mess.owner
                // if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
                if (!text) throw `Examplo de uso : ${prefix + command} sua tabela`
           global.tabela = text
           m.reply(`tabela atualizada digite ${prefix}tabela`)
             }
             break
		case 'tabela':
		m.reply(global.tabela)
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
                if (!m.isGroup) throw `esse tipo de comando é exclusivo do grupo iris:\n\nhttps://chat.whatsapp.com/DUP9VTCuRin2NHFjYqYbZN`
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
                if (!m.isGroup) throw `esse tipo de comando é exclusivo do grupo iris:\n\nhttps://chat.whatsapp.com/DUP9VTCuRin2NHFjYqYbZN`
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
                            m.reply('┏━「🚀 *TODOS*」━┓\n*┃ •* /Perguntar\n*┃ •* /Planos\n*┃ •* /Afk\n*┃ •* /Listchat\n*┃ •* /Listgp\n*┃ •* /Check\n*┃ •* /Id\n*┃ •* /Wame\n*┃ •* /Chatid\n*┃ •* /Ping\n*┃ •* /Delete\n┗━━━━━━━━━━━━━━┛\n\n\n┏━「💬 *GRUPOS*」━┓\n*┃ •* /Marcar \n*┃ •* /Online \n*┃ •* /Leave \n*┃ •* /Antilink \n*┃ •* /Grupo \n*┃ •* /Anunciar \n*┃ •* /Ban \n*┃ •* /TempBan \n*┃ •* /Add \n*┃ •* /Promote \n*┃ •* /Demote \n┗━━━━━━━━━━━━━━┛\n\n\n┏━「🔎 *CONSULTAS*」━┓\n*┃ •* /Tel (1, 2 e 3)\n*┃ •* /Placa\n*┃ •* /Cnpj\n*┃ •* /Nome\n*┃ •* /Site\n*┃ •* /Cpf (1, 2, 3 e 4)\n*┃ •* /Cep\n*┃ •* /Bin\n*┃ •* /Ip\n┗━━━━━━━━━━━━━━┛\n\n\n┏━「👤 *DONO*」━┓\n*┃ •* /Privado\n*┃ •* /Send\n*┃ •* /Sendgp\n*┃ •* /Publico\n*┃ •* /Join\n*┃ •* /Unblock\n┗━━━━━━━━━━━━━━┛')
                            break
                        
                            case 'donate': case 'contratar': case 'criador': case 'owner': case '1234aaaaadonate': {
                                bat.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/39f83106b3cfe2125c39a.jpg' }, caption: `🔆 - *Olá ${m.pushName}*,\nDesde já obriado por querer me contratar!\n\n✅ - *Para contratar um dos meus planos fale com meu dono:*\n\nhttps://wa.me/${global.owner[0]}` }, { quoted: m })
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
                      let txt = `「 TRANSMISSÃO - KARMA 」\n\n${text}`
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
                      let txt = `「 TRANSMISSÃO - KARMA 」\n\n${text}`
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
	    {title: "Nome", rowId: `${prefix}nome`, description: "Puxada simples - em manutenção 🛠"}
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
  footer: "_*© By: Markos*_",
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
🟢 PAYPAL
🟢 PIC PAY
🟢 PIX`,
                    footer: '~ Bot by Markos',
                    buttons: buttonse,
                    headerType: 2
                }
                bat.sendMessage(m.chat, buttonMessagee)
            }
            break

    
       case 'placa':
    case 'plac':
     
    if(!isPremium2 && !isVipGp) throw ("👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar")
    if(!text) throw (`Digite uma placa. | Exemplo: /placa JYE9708`)
    var query = text
    if(query.length < 7 || query.length > 11) return m.reply('ERRO\nA placa deve conter 7 dígitos!\nUso: /placa JYE9708');
    m.reply(`Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕`)
    xx = await fetchJson(`${global.apidados}/api/consultas/placa?texto=${query}&apikey=${global.apiToken}`)
if (xx.Nome != undefined) {



retorno = `═════════════════════\n🕵️  CONSULTA REALIZADA  🕵️\n═════════════════════\n\n• PLACA: ${xx.Placa}\n• SITUAÇÃO: ${xx.Situação}\n• RESTRIÇÃO 1: ${xx.Restrição1}\n• RESTRIÇÃO 2: ${xx.Restrição2}\n• RESTRIÇÃO 3: ${xx.Restrição3}\n• RESTRIÇÃO 4: ${xx.Restrição4}\n\n• MARCA: ${xx.MarcaModelo}\n• COR: ${xx.Cor}\n• DATA DE FABRICAÇÃO: ${xx.AnoFabricação}\n• DATA DO MODELO: ${xx.AnoModelo}\n\n• MUNICIPIO: ${xx.Municipio}\n• ESTADO: ${xx.Estado}\n• CHASSI: ${xx.Chassi}\n\n• RENAVAM: ${xx.Renavam}\n• UF FATURADO: ${xx.UfFaturado}\n\n• TIPO VEICULO: ${xx.TipoVeiculo}\n• ESPECIE: ${xx.Especie}\n• CATEGORIA: ${xx.Categoria}\n• COMBUSTIVEL: ${xx.Combustivel}\n\n• POTENCIA: ${xx.Potencia}\n• CILINDRADAS: ${xx.Cilindradas}\n• NACIONALIDADE: ${xx.Nacionalidade}\n• CAPACIDADE MAXIMA: ${xx.QuantidadeDePassageiros}\n• QUANTIDADE EIXOS: ${xx.QuantidadeEixos}\n\n• ATUALIZAÇÃO: ${xx.AtualizaçãoVeiculo}\n• ROUBO/FURTO: ${xx.RouboFurto}\n• REMARCAÇÃO CHASSI: ${xx.RemarcaçãoChassi}\n\n• LICENCIAMENTO: ${xx.Licenciamento}\n• EMISSÃO CRV: ${xx.EmissãoUltimoCrv}\n\n• NOME: ${xx.Nome}\n• CPF/CNPJ: ${xx.CpfCnpj}\n\n• Usuario: ${pushname}\n\n🔛 BY: KARMA BOT\n\n━━━━━━━━━━━━━━━━━━`

m.reply(retorno)

} else {

m.reply(`⚠️ PLACA NÃO ENCONTRADA!`)
}
break
case 'nome':
    
     if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
    if(args.length < 1) return m.reply('✅ Para usar esse comando use /nome + o nome da pessoa.');
		  
    m.reply(`Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`);
    api = await fetchJson(`${global.apidados}/api/consultas/nome?texto=${q}&apikey=${global.apiToken}`)

    if (api.consulta != undefined) {
retorno = api.consulta
    
m.reply(retorno)
} else {
m.reply(`ESTOU COM POSSIVEIS PROBLEMAS NA API OU O NOME É MUITO PEQUENO`)
}          
break
                    /*case 'nome':
                    
   		             if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
                    if(args.length < 1) return m.reply('✅ Para usar esse comando use /nome + o nome da pessoa.');
		    m.reply(`Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`);
                    xx = await fetchJson(`${global.apidados}/nome/${text}/${global.apiToken}`)
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
    if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
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
    res = await axios(`https://www.receitaws.com.br/v1/cnpj/${query}`);
keys = Object.keys(res.data);
a = '═════════════════════\n🔍 *CONSULTA DE CNPJ* 🔍\n═════════════════════\n\n';
keys.map(function (i) {
	a += `${i}: ${typeof res.data[i] === 'object' ? '' : res.data[i]}\n`;
});
m.reply(a + `\n• *Usuario:* ${pushname}

🔛 BY: KARMA BOT

━━━━━━━━━━━━━━━━━━`);
                break


            
                case 'site':
                if(args.length < 1) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗦𝗜𝗧𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta a url de um SITE, obtém dados do site, como qual \né o ip, ip reverso, provedor, país, estado, cidade e as\ncoordenadas de onde ele está localizado.\n\nFormato:\nhttp://google.com\nou\ngoogle.com\n\n/site google.com\n\n━━━━━━━━━━━━━━━━━━━━━');
                var query = q
                .split('http://').join('')
                .split('https://').join('')
                .split(' ').join('');
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕`)
                hehe = await fetchJson(`http://ip-api.com/json/${query}`)
 
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

• *Usuario:* ${pushname}

🔛 BY: KARMA BOT

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
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
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

• *Usuario:* ${pushname}

🔛 BY: KARMA BOT

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
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                hehee = await fetchJson(`https://cep.awesomeapi.com.br/json/${query}`)
 
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

• *Usuario:* ${pushname}

🔛 BY: KARMA BOT

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
 xx = await fetchJson(`https://bin-check-dr4g.herokuapp.com/api/${query}`)
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

🔛 BY: KARMA BOT

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
} else {
    m.reply(`⚠️ BIN NÃO ENCONTRADA`)
}
 break

                      case 'cpf':
                      case 'cpf1':
    // if(!Puxada) throw (`⚠ - Puxadas foram desativadas pelo meu dono ou estou em manutenção.`)
    if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟭\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf1 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 11 || query.length > 11) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟭\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf1 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟭\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf1 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                await sleep(10)
                apii = await fetchJson(`${global.apidados}/api/consultas/cpf?texto=${query}&apikey=${global.apiToken}`)
 
if (apii.Cpf != undefined) {
    consulta = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════

 INFORMAÇÕES DO CPF (base 1):    

• CPF: ${apii.Cpf}
• NOME: ${apii.Nome}
• DATA DE NASCIMENTO: ${apii.Nascimento}
• IDADE: ${apii.Idade}
• SIGNO: ${apii.Signo}
• SEXO: ${apii.Sexo}

• Usuario: ${pushname}

🔛 BY: KARMA BOT

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
} else {
    
    m.reply(`⚠️ CPF NÃO ENCONTRADO!`)
}
  break


case 'cpf2':
     if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟮\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de CPF, retorna os dados do portador. Incluindo dados Tipo 1 + número de RG, nome do pai e local de nascimento.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf2 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 11 || query.length > 11) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟮\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de CPF, retorna os dados do portador. Incluindo dados Tipo 1 + número de RG, nome do pai e local de nascimento.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf2 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟮\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de CPF, retorna os dados do portador. Incluindo dados Tipo 1 + número de RG, nome do pai e local de nascimento.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf2 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                await sleep(10)
                apii = await fetchJson(`${global.apidados}/api/consultas/cpf?texto=${query}&apikey=${global.apiToken}`)
 
              if (apii.Cpf != undefined) {
    consulta = `═════════════════════\n🕵️  CONSULTA REALIZADA  🕵️\n═════════════════════\n\n INFORMAÇÕES DO CPF (base 2): \n\n • *CPF:* ${apii.Cpf}\n • *CNS:* ${apii.Cns}\n • *RG:* ${apii.Rg}\n • *DATA DE EXPEDIÇÃO:* ${apii.DataDeExpedição}\n • *ORGÃO EXPEDIDOR:* ${apii.OrgãoExpedidor}\n • *UF - RG:* ${apii. UfRg}\n\n • *TÍTULO ELEITORAL:* ${apii. TítuloEleitoral}\n\n • *NOME:* ${apii.Nome}\n • *DATA DE NASCIMENTO:* ${apii.Nascimento}\n • *IDADE:* ${apii.Idade}\n • *SIGNO:* ${apii.Signo}\n\n • *SEXO:* ${apii.Sexo}\n • *COR:* ${apii.Cor}\n • *TIPO SANGUÍNEO:* ${apii.TipoSanguíneo}\n\n • *MÃE:* ${apii.Mãe}\n • *PAI:* ${apii.Pai}\n\n • *PAÍS DE NASCIMENTO:* ${apii.PaísDeNascimento}\n • *CIDADE DE NASCIMENTO:* ${apii.CidadeDeNascimento}\n • *ESTADO DE NASCIMENTO:* ${apii.EstadoDeNascimento}\n\n • *LOGRADOURO:* ${apii.Logradouro}\n • *NÚMERO:* ${apii.Número}\n • *COMPLEMENTO:* ${apii.Complemento}\n • *BAIRRO:* ${apii.Bairro}\n • *CIDADE:* ${apii.Cidade}\n • *ESTADO:* ${apii.Estado}\n • *PAÍS:* ${apii.País}\n • *CEP:* ${apii.Cep}\n\n • *E-MAIL:* ${apii.Email}\n\n • *TELEFONE:* ${apii.Telefone}\n\n\n • *Usuario:* ${pushname}\n\n🔛 BY: KARMA BOT\n\n━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
} else {
    m.reply(`⚠️ CPF NÃO ENCONTRADO!`)
}
  break

    case 'cpf3':
    if(!isCreator) throw ("esse comando está indisponivel por falhas técnicas, tente usar o /cpf4")
     if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟯\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf3 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 11 || query.length > 11) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟯\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf3 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟯\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf3 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                await sleep(10)
                apii.data = await axios.get(`${global.apidados}/api/consultas/cpf2?texto=${query}&apikey=${global.apiToken}`)
 
if (apii.grauQualidade != undefined) {

    consulta = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════

${apii.grauQualidade}
${apii.numeroCns}
${apii.nome}
${apii.nomeSocial}
${apii.nomePai}
${apii.nomeMae}
${apii.vivo}
${apii.sexo}
${apii.sexoDescricao}
${apii[0].telefone.numero ? apii[0].telefone.numero: "SEM INFORMAÇÕES"}


 • Usuario: ${pushname}

🔛 BY: KARMA BOT

 ━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
} else {
    m.reply(`TEMPO ESGOTADO NA API, TENTE REPETIR`)
}
                break
			
			
    case 'cpf4':
     if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf4 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 11 || query.length > 11) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf4 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf4 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                await sleep(10)
                apii = await fetchJson(`${global.apidados}/api/consultas/cpf3?texto=${query}&apikey=${global.apiToken}`)
 
if (apii.consulta != undefined) {
    consulta = `${apii.consulta}

 • Usuario: ${pushname}

🔛 BY: KARMA BOT`
m.reply(consulta)
} else {
    m.reply(`TEMPO ESGOTADO NA API, TENTE REPETIR`)
}
                break


    /*case 'tel':
    case 'telefone':
    
    if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
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
         return m.reply(`Identifiquei que esse número marcado tem um 9 a menos tente colocar mais ou menos assim:\n\n❌ - ERRADO: ${query}\n✅ - CERTO (ou não): ${resultado3}\n\n Caso eu tenha configurado errado, ajuste manualmente e puxe usando o /tel`);
     }
    if(query.length > 11) return m.reply('❌ - Isso é um telefone ou um cpf?');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...*`)
                xx = await fetchJson(`${global.apidados}/telefone/${query}/${global.apiToken}`)
 
if (xx[0].Nome != undefined) {
    let buttons6 = [
        {buttonId: `${prefix}tel1 ${query}`, buttonText: {displayText: 'consulta comum 🚀'}, type: 1},
        {buttonId: `${prefix}tel2 ${query}`, buttonText: {displayText: 'consulta completa 👑'}, type: 1},
        ]
    let buttonMessage6 = {
        text: `Ebaa ${pushname}, Este número foi encontrado 🥳\n\nNúmero: _~${text}~_\nNome da pessoa: _~${xx[0].Nome}~_`,
        footer: 'escolha abaixo qual o tipo de consulta você deseja:',
        buttons: buttons6,
        headerType: 2
    }
    bat.sendMessage(m.chat, buttonMessage6)
} else {
    
    m.reply(`⚠️ TELEFONE NÃO ENCONTRADO!`)
}

                break*/
case 'a':
 case 'flood':
    if (premm2!= 'n') {

    if(!text) return m.reply (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone3 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('+').join('')
    .split('-').join('')
    .split(' ').join('')
    .split('(').join('')
    .split(')').join('');
    if(query.length < 10) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone3 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(query.length == 10) {
        var resultado3 = query.replace(/(\d{2})/, "$19")
         return m.reply(`Identifiquei que esse número marcado tem um 9 a menos tente colocar mais ou menos assim:\n\n❌ - ERRADO: ${text}\n✅ - CERTO (ou não): ${resultado3}\n\n Caso eu tenha configurado errado, ajuste manualmente e puxe usando o /tel`);
     }
    if(query.length > 11) return m.reply('❌ - Isso é um telefone ou um cpf?');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone3 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`Ei ${pushname} já estou consultando... Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                await sleep(10)
                cj = await fetchJson(`${global.apidados}/api/consultas/telefone?numero=${query}&apikey=${global.apiToken}`)//.then(cj => {
                    let teks = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════\n\n*RESULTADOS:*\n\n`
if (teks != undefined) {
for(let i of cj){

    teks += `• TELEFONE: ${query}\n\n`
    teks += `• NOME: ${i[0].Nome ? i[0].Nome : "SEM INFORMAÇÕES"}\n`
    teks += `• CPF:   ${i[0].CPF ? i[0].CPF : "SEM INFORMAÇÕES"}\n\n`
    teks += `• ENDEREÇO: ${i[0].Endereco ? i[0].Endereco : "SEM INFORMAÇÕES"}\n`
    teks += `• NUMERO: ${i[0].Numero ? i[0].Numero : "SEM INFORMAÇÕES"}\n`
    teks += `• COMPLEMENTO: ${i[0].Complemento ? i[0].Complemento : "SEM INFORMAÇÕES"}\n`
    teks += `• BAIRRO: ${i[0].Bairro ? i[0].Bairro : "SEM INFORMAÇÕES"}\n`
    teks += `• CEP: ${i[0].CEP ? i[0].CEP : "SEM INFORMAÇÕES"}\n\n`
    teks += `━━━━━━━━━━━━━━━━━━\n\n`
    //if (teks != undefined) return ("NÃO ENCONTRADO")
    console.log(teks)
    }
}
} 

            //if (premm2!= 's') {

                break
   
case 'tel':
 case 'telefone':
    if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
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
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                await sleep(10)
                cj = await fetchJson(`${global.apidados}/api/consultas/telefone?numero=${query}&apikey=${global.apiToken}`)//.then(cj => {

               if (cj[1].Nome) throw ("mais de um esoltado foi encontrado")

  // if (cj[0].Nome != undefined) {
   // if (cj[1].Nome) throw ("mais de um esoltado foi encontrado")
    consulta = `═════════════════════
🔍 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗗𝗘 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘
═════════════════════
    
INFORMAÇÕES:
    
• TELEFONE: ${query}
    
• NOME: ${cj[0].Nome ? cj[0].Nome : "SEM INFORMAÇÕES"}
• CPF: ${cj[0].CPF ? cj[0].CPF : "SEM INFORMAÇÕES"}
• ENDEREÇO: ${cj[0].Endereco ? cj[0].Endereco : "SEM INFORMAÇÕES"}
• NUMERO: ${cj[0].Numero ? cj[0].Numero : "SEM INFORMAÇÕES"}
• COMPLEMENTO: ${cj[0].Complemento ? cj[0].Complemento : "SEM INFORMAÇÕES"}
• BAIRRO: ${cj[0].Bairro ? cj[0].Bairro : "SEM INFORMAÇÕES"}
• CEP: ${cj[0].CEP ? cj[0].CEP : "SEM INFORMAÇÕES"}
• OPERADORA: ${cj[0].Operadora ? cj[0].Operadora : "SEM INFORMAÇÕES"}
👤 Usuário: ${pushname}
🔛 BY: Karma Buscas`
m.reply(consulta)
   //)
                
                break

    case 'tel2':
     if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/tel2 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('+').join('')
    .split('-').join('')
    .split(' ').join('')
    .split('(').join('')
    .split(')').join('');
    if(query.length < 9) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/tel2 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(query.length == 10) {
        var resultado3 = query.replace(/(\d{2})/, "$19")
         return m.reply(`Identifiquei que esse número marcado tem um 9 a menos tente colocar mais ou menos assim:\n\n❌ - ERRADO: ${query}\n✅ - CERTO (ou não): ${resultado3}\n\n Caso eu tenha configurado errado, ajuste manualmente e puxe usando o /tel`);
     }
    if(query.length > 11) return m.reply('❌ - Isso é um telefone ou um cpf?');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/tel2 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                await sleep(10)
                xx = await fetchJson(`${global.apidados}/api/telefone?numero=${query}&apikey=${global.apiToken}`)
                
                if(xx[0].CPF.length > 11) return m.reply(`O cpf localizado neste númrto era maior que 11 logo n vou conseguir encontrar (suspeito q seja um cnpj)\n\nPara descobrirque empresa é essa digite: ${prefix}cnpj ${xx.CPF}`);
                if (xx[0].CPF != undefined) {
                apii = await fetchJson(`${global.apidados}/api/consultas/cpf3?texto=${xx[0].CPF}&apikey=${global.apiToken}`)

                  consulta = 
    consulta = `${apii.consulta}

 • Usuario: ${pushname}

🔛 BY: KARMA BOT`
m.reply(consulta)
} else {
    m.reply(`⚠️ TELEFONE NÃO ENCONTRADO!`)
}
                break

    case 'tel3': case 'telefone3':
     if(!isPremium2 && !isVipGp) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // Mensagem do antiflood
    db.data.users[m.sender].limit -= 1  // parada do antiflood tbm
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\nmarque uma mensagem ou marque uma pessoa\n\n/tel3 @usuáro\n\n━━━━━━━━━━━━━━━━━━━━━`)
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+''
    var resultado = users.replace("@s.whatsapp.net", "");
    var resultado2 = resultado.replace(/(\d{2})/, "");
    if(resultado2.length == 10) {
        var resultado3 = resultado2.replace(/(\d{2})/, "$19")
        m.reply(`Estou consultando, mas nota-se que seu numero só tem *10 digitos*, então fiz uma pequena mudança *adicionando* um 9.\n\nEra assim: ${resultado2}\nDeixei assim: ${resultado3}\n\n Caso eu tenha configurado errado, ajuste manualmente e puxe usando o /tel`);
        xxa = await fetchJson(`${global.apidados}/api/telefone?numero=${resultado3}&apikey=${global.apiToken}`)
        if (xxa.Nome != undefined) {
        consultaa = `═════════════════════\n🕵️  CONSULTA REALIZADA  🕵️\n═════════════════════\n\nINFORMAÇÕES:\n\n • *NOME:* ${xxa.Nome}\n • *CPF:* ${xxa.CpfCnpj} \n\nENDEREÇO:\n\n • *ESTADO:* ${xxa.Estado}\n • *CIDADE:* ${xxa.Cidade}\n • *BAIRRO:* ${xxa.Bairro}\n • *COMPLEMENTO:* ${xxa.Complemento}\n • *RUA:* ${xxa.Logradouro}\n • *NUMERO:* ${xxa.Número}\n\n • *Usuario:* ${pushname}\n\n🔛 BY: KARMA BOT\n\n━━━━━━━━━━━━━━━━━━`
        m.reply(consultaa) 
    } else {
    
            m.reply(`⚠️ TELEFONE NÃO ENCONTRADO!`)
        }
    }

    if(resultado2.length == 11) {
                m.reply(`Aguarde ${pushname}, estou consultando os dados dessa pessoa...`)
        cj = await fetchJson(`${global.apidados}/api/telefone?numero=${resultado2}&apikey=${global.apiToken}`)//.then(cj => {

let teks = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════

• RESULTADOS:`
                for(let i of cj){ 

   if (teks != undefined) {

    teks += `\n• TELEFONE: ${query}\n\n`;
    teks += `• NOME: ${i.Nome ? i.Nome : "SEM INFORMAÇÕES"}\n`;
    teks += `• CPF:   ${i.CPF ? i.CPF : "SEM INFORMAÇÕES"}\n\n`;
    teks += `• ENDEREÇO: ${i.Endereco ? i.Endereco : "SEM INFORMAÇÕES"}\n`;
    teks += `• NUMERO: ${i.Numero ? i.Numero : "SEM INFORMAÇÕES"}\n`;
    teks += `• COMPLEMENTO: ${i.Complemento ? i.Complemento : "SEM INFORMAÇÕES"}\n`;
    teks += `• BAIRRO: ${i.Bairro ? i.Bairro : "SEM INFORMAÇÕES"}\n`;
    teks += `• CEP: ${i.CEP ? i.CEP : "SEM INFORMAÇÕES"}\n\n`
    teks += `━━━━━━━━━━━━━━━━━━`
m.reply(teks)
   } else {
    m.reply(`⚠️ TELEFONE NÃO ENCONTRADO!`)
}
}
    } 
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

            
			case 'perguntar':
                if(!q) throw (`digite um texto ou avaliação, exemplo:\n\n${prefix + command} como fazer sticker?`)
                bat.sendMessage(`${global.owner[0]}@s.whatsapp.net`, {text: `📝 PERGUNTA DE:\nwa.me/${m.sender.split('@')[0]} - *${pushname}*\n\nMensagem: _*${q}*_\n\nPara responder digite:`}, m)
    await sleep(80)
    bat.sendMessage(`${global.owner[0]}@s.whatsapp.net`, {text: `!sendr ${m.sender.split('@')[0]}|Em resposta a sua pergunta:  _*${q}*_\n\n.`}, m)
                m.reply(`✍ Você mandou esta mensagem para o suporte: _*${q}*_\n⏳ aguarde já já meu suporte irá te responder ~ou não~.`)
                break
case 'responder': case 'sendr':
    if (!isCreator) throw 'comando exclusivo para meu dono'
    if(!text) throw (`digite um texto para resposta, exemplo:\n\n${prefix + command} 5594988888888|olá`)
    bat.sendMessage(`${text.split("|")[0]}` + '@s.whatsapp.net', {text: `✅ DE: _*${pushname}*_\n\nMensagem: ${text.split("|")[1]}`}, m)
    m.reply(`Enviei ✅`)
    break

            case 'start': case 'menu': case 'iniciar': case 'help':
	const templateButtons = [
    {index: 1, urlButton: {displayText: '🔆 Meu grupo', url: 'https://chat.whatsapp.com/FeBFBymIjuj39NWD94i5Ob'}},
    {index: 2, urlButton: {displayText: '👨‍💻 Meu criador', url: `https://wa.me/${global.owner[0]}`}},
    //{index: 6, urlButton: {displayText: '📼 Canal do meu dono', url: 'https://www.youtube.com/MawyDev'}},
    {index: 3, quickReplyButton: {displayText: '🔎 BUSCAS', id: `${prefix}consultas`}},
    {index: 4, quickReplyButton: {displayText: '💰 PLANOS', id: `${prefix}planos`}},
    {index: 6, quickReplyButton: {displayText: '🟣 MENU COMPLETO', id: `${prefix}menu2`}},
]

const templateMessage = {
    text: `*MENU*\nOLÁ ${pushname}!!\nSOU UM BOT DE CONSULTAS!\n\nCaso queira tirar dúvidas com meu suporte digite:\n/perguntar`,
    footer: 'SELECIONE UMA OPÇÃO:',
    templateButtons: templateButtons
}

const sendMsg1 = await bat.sendMessage(m.chat, templateMessage)
break
            default:
                if (budy.startsWith('exc')) {
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

                if (budy.startsWith('exe')) {
                    if (!isCreator) return m.reply(mess.owner)
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await m.reply(evaled)
                    } catch (err) {
                        await m.reply(String(err))
                    }
                }

                if (budy.startsWith('exec')) {
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
