const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')
join = 'WELCOME'
leave = '\`\`\`Sayonaraa\`\`\`'

teks = `${join}`
let setting = JSON.parse(fs.readFileSync('./setting.json'))

module.exports = welcome = async (ikyy, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await ikyy.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await ikyy.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add' && mem.includes(ikyy.user.jid)) {
            ikyy.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik .menu ya kak', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(ikyy.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await ikyy.groupMetadata(anu.jid)
           
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = ikyy.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
            buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome2?nama=${encodeURI(anu_user)}&descriminator=${memeg}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&gcicon=${pp_grup}&pp=${pp_user}&bg=https://bit.ly/walpamikel`)
        buttons = [

          { buttonId: `!selamatdatang`, buttonText: { displayText: "Welcome Kak" }, type: 1 },

        ];

        imageMsg = (

          await ikyy.prepareMessageMedia(buff, "imageMessage", {

            thumbnail: buff,

          })

        ).imageMessage;

        buttonsMessage = {

          contentText: `${teks}`,

          footerText: "Welcome Message By Fahri ",

          imageMessage: imageMsg,

          buttons: buttons,

          headerType: 4,

        };

        prep = await ikyy.prepareMessageFromContent(

          mdata.id,

          { buttonsMessage },

          {}

        );

        ikyy.relayWAMessage(prep);

      }

      if (anu.action == "remove" && !mem.includes(ikyy.user.jid)) {

        mdata = await ikyy.groupMetadata(anu.jid);

        num = anu.participants[0];

        let w = ikyy.contacts[num] || { notify: num.replace(/@.+/, "") };

        anu_user = w.vname || w.notify || num.split("@")[0];

        memeg = mdata.participants.length;

        out = `${leave}`;

        buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye2?nama=${encodeURI(anu_user)}&descriminator=${memeg}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&gcicon=${pp_grup}&pp=${pp_user}&bg=https://bit.ly/walpamikel`)
            
        buttons = [

          { buttonId: `!bay`, buttonText: { displayText: "Sayonara" }, type: 1 },];

        imageMsg = (

          await ikyy.prepareMessageMedia(buff, "imageMessage", {

            thumbnail: buff,

          })

        ).imageMessage;

        buttonsMessage = {

          contentText: `${out}`,

          footerText: "Leave Message By Fahri ",

          imageMessage: imageMsg,

          buttons: buttons,

          headerType: 4,

        };

        prep = await ikyy.prepareMessageFromContent(

          mdata.id,

          { buttonsMessage },

          {}

        );

        ikyy.relayWAMessage(prep);
        }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
