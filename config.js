/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
⚠️⚠️ ATENÇÃO ⚠️⚠️
Essa versão de software é paga. Peço que não divulgue ela
*
Caso divulgue algum comando deixe os créditos, fazer ele foi desgaste. 
*
Agradeço pela compreensão. 
*/

const fs = require('fs')
const chalk = require('chalk')

// Outros
global.owner = ['559491423691','559491423691','559491423691','559491423691','559491423691']
global.sessionName = 'batSession'

// Aqui você configura o prefix
global.prefa = ['/'] 

// Edite apenas o nescessário:
// Edições na desc da fig:
global.packname = 'Karma buscas'
global.author = '\n\n\n\n\n\n\n\n\n'

// Api que eu te mandei (coloque com o https:// mas sem o / no final)
global.apidados = 'https://myapisecretkarma.herokuapp.com'; // Compre sua api com o markos: wa.me/559491423691
global.apiToken = 'coloque seu token aqui'; // Compre seu token com o markos: wa.me/559491423691


// Website Api
global.APIs = {
	zenz: 'https://zenzapi.xyz',
}

// Apikey Website Api
global.APIKeys = {
	'https://zenzapi.xyz': 'Your Key',
}

// TABELA DE PREÇOS PARA PV
global.precopv = `🟢 07 DIAS = R$ 10,00
🟢 30 DIAS = R$ 20,00`

// TABELA DE PREÇOS PARA GRUPO
global.precogrupo = `🟢 07 DIAS = R$ 20,00
🟢 15 DIAS = R$ 30,00
🟢 30 DIAS = R$ 45,00`
// Other
global.premium = ['559491423691'] // não é o sistema de premium


global.sp = '⭔'
global.mess = {
    success: '✓ Sucesso',
    admin: 'Recursos especiais do administrador de grupo!',
    botAdmin: 'Bot deve ser administrador primeiro!',
    owner: 'Recursos especiais do proprietário do bot',
    group: 'Recurso usado apenas para grupos!',
    private: 'Recursos usados apenas para bate-papo privado!',
    bot: 'Recursos especiais do usuário do número do bot',
    wait: 'Aguarde...',
    endLimit: 'Seu limite diário expirou, o limite será redefinido a cada 12 horas',
}

global.limitawal = {
    premium: "Infinity",
    free: 100
}
global.thumb = fs.readFileSync('./lib/bat.jpg')

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
