import OpenAI from 'openai';
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateDescription = async (req, res) => {
    const { repoName } = req.body;

    if (!repoName) {
        return res.status(400).json({ error: 'Repository name is required' });
    }

    try {
        const completion = await client.chat.completions.create({
            model: 'gpt-4o',
            messages: [{
                role: 'user',
                content: `Provide a brief description for a GitHub repository named "${repoName}".`,
            }],
        });

        
        res.json({ description: completion.choices[0].message.content.trim() });
    } catch (err) {
        console.error('Error generating description:', err);
        res.status(500).json({ error: 'Failed to generate description', details: err.message || err });
    }
};
