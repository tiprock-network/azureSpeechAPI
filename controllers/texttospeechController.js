const dotenv = require('dotenv')
dotenv.config()
const sdk = require('microsoft-cognitiveservices-speech-sdk')
const request = require('request')
const audio_file='./public/synthesized/speechoutput.wav'

const getAudioResponse= async (req,res) =>{
     
     const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.API_KEY_SPEECH, process.env.API_SPEECH_REGION)
     const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audio_file)

     //voice in preferred dialect
     speechConfig.speechSynthesisVoiceName= 'en-KE-AsiliaNeural'
     const synthesizer = new sdk.SpeechSynthesizer(speechConfig,audioConfig)

    request('http://localhost:5001/api/completetext',async (error,response,body)=>{
        const prompt=JSON.parse(body).response
        //start synthesizer and await results
        synthesizer.speakTextAsync(`${prompt}`,(result)=>{
            if(result.reason == sdk.ResultReason.SynthesizingAudioCompleted) res.status(200).json({message:'Synthesis finished successfully'});
            else res.status(400).json({message:{Error:result.errorDetails}})

            synthesizer.close()
            synthesizer = null
        })
        console.log("Now synthesizing to: " + audio_file)
    })
}

module.exports = getAudioResponse