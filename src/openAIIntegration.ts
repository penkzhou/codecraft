import {  OpenAI } from 'openai';

//api doc:https://www.npmjs.com/package/openai

export async function processCodeWithOpenAI(apiKey: string, codeContent: string): Promise<string> {
    const openai = new OpenAI({ apiKey });

    // Example: Using OpenAI's model
    const response = await openai.chat.completions.create({
        model: "code-davinci-002",
        messages: [{ role: 'user', content: codeContent }],
        max_tokens: 150,
    });
    var result = response.choices[0]?.message?.content?? '';
    console.log(result);
    return result;
}