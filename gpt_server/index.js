import { Configuration, OpenAIApi } from 'openai';


import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

// TEST CODE 2.0

if (!apiKey) {
    console.error("Error: No API key found in environment variables.");
    process.exit(1);
} else {
    console.log("api is fine");
}





// TEST CODE 2.0





const configuration = new Configuration({
    organization: "org-GbzEKTksmUzSaddU9GEtDz8L",
    apiKey: apiKey,      //ADD YOUR OpenAI API KEY HERE 
});
const openai = new OpenAIApi(configuration);





const callApi = async () => {

}

callApi();

// create a simple express api that calls the function above


const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post('/', async (req, res) => {
    const { message, currentModel } = req.body;
    console.log(message)
    const response = await openai.createCompletion({
        model: `${currentModel}`,    // "text-davinci-003"
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
    res.json({
        message: response.data.choices[0].text
    });

});

app.get('/models', async (req, res) => {

    const response = await openai.listEngines();

    console.log(response.data.data);
    res.json({
        models: response.data.data
    })
});

// TEST CODE 2.0

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// TEST CODE 2.0




