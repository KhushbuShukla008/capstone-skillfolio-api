import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateDescription = async (req, res) => {
    // const { repoName } = req.body;

    // if (!repoName) {
    //     return res.status(400).json({ error: 'Repository name is required' });
    // }

    try {
        const completion = await client.chat.completions.create({
            model: 'gpt-4',
            messages: [{
                role: 'user',
                content: `Provide a brief description for a GitHub repository named "${repoName}".`,
            }],
            max_tokens: 100,
        });

        if (completion.choices && completion.choices.length > 0) {
            const description = completion.choices[0].message.content.trim();
            res.json({ description: description });
    }   else {
        throw new Error("No valid description returned.");
        }
        } catch (err) {
        console.error('Error generating description:', err);
        res.status(500).json({ error: 'Failed to generate description', details: err.message || err });
    }
};
