const dotenv = require('dotenv')
dotenv.config()
const OpenAI = require('openai')
const request = require('request')
const openai = new OpenAI({apiKey: process.env.API_KEY_OPENAI,   });


const chatcompletion = async (req,res) =>{
    request('http://localhost:5001/api/voicespeech',async (error,response,body)=>{
        const prompt=JSON.parse(body).text

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content:`${prompt}` }],
            model: 'gpt-3.5-turbo',
        });
        res.status(200).json({ response: chatCompletion.choices[0].message.content});
    })
       
    
}

module.exports = chatcompletion