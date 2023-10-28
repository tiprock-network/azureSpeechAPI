const dotenv = require('dotenv')
dotenv.config()
const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const getSpeechText = async (req,res) =>{
    
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.API_KEY_SPEECH, process.env.API_SPEECH_REGION);
    speechConfig.speechRecognitionLanguage = "en-KE";
    
    let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync("./speech_files/fastfoodNairobi.wav"));
    let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    const result = await new Promise((resolve, reject) => {speechRecognizer.recognizeOnceAsync(resolve, reject);});
    let myspeech = ''

    if(result.reason == sdk.ResultReason.RecognizedSpeech) res.status(200).json({text:`${result.text}`});  
    else if(result.reason !== sdk.ResultReason.RecognizedSpeech) res.status(400).json({text:`Sorry but couldn't get what you said.`});
    speechRecognizer.close();  
}

module.exports = getSpeechText