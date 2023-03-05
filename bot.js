import { WechatyBuilder } from 'wechaty'
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey: "KEY"
});

const openai = new OpenAIApi(configuration);


async function onMessage (message) {
    if (await message.mentionSelf()) {
        const text = message.text().replace('@' + UEST_NAME,'').trim()
        console.info(text)
        const data = text 
        const room = message.room()
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: data,
          temperature: 0.6,
          max_tokens : 2048
        });
        const reply_msg = completion.data.choices[0].text
        await room.say`${reply_msg}`
    }
}


const wechaty = WechatyBuilder.build() // get a Wechaty instance
wechaty
  .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
  .on('login',            user => console.log(`User ${user} logged in`))
  .on('message',       message => onMessage(message))
wechaty.start()