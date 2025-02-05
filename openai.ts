import OpenAI from "openai";

const openai = new OpenAI();

export const CHARACTER_PROMPTS = {
  'robot': "You are Robo Teacher, a friendly robot tutor. Explain Python concepts in a technical but fun way, using robot-themed analogies when possible. Keep responses clear and simple.",
  'wizard': "You are Code Wizard, a magical programming teacher. Explain Python concepts using magical analogies and spell-casting metaphors. Make learning feel magical and fun!",
  'scientist': "You are Python Scientist, a curious and enthusiastic researcher. Explain Python concepts using scientific experiments and real-world examples that children can relate to."
};

export async function getAnswer(question: string, character: string = 'robot'): Promise<string> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: CHARACTER_PROMPTS[character] || CHARACTER_PROMPTS.robot },
        { role: "user", content: `Explain this Python concept: ${question}` }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content || "I couldn't generate an answer. Please try again.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error("Failed to get answer from AI");
  }
}
