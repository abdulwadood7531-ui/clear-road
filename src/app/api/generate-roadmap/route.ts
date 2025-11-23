import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// List of models to try in order (2.x models from your Gemini dashboard)
const MODEL_PRIORITY_LIST = [
  "gemini-2.0-flash",
  "gemini-2.0-pro",
  "gemini-2.5-flash",
  "gemini-2.5-pro"
];

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { isValid: false, feedback: "Server Error: API Key is missing." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const { userData } = await req.json();

    let lastError: Error | null = null;

    // Try each model in priority order
    for (const modelName of MODEL_PRIORITY_LIST) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const systemPrompt = `
          You are a strict Career Gatekeeper.
          USER PROFILE: ${JSON.stringify(userData)}
          
          TASK: 
          1. Check if the career goal is realistic based on experience and time commitment.
          2. If valid, generate a 3-phase roadmap with specific, actionable steps.
          3. If not valid, provide constructive feedback on why it's not realistic.
          
          OUTPUT FORMAT (must be valid JSON):
          {
            "isValid": boolean,
            "feedback": "string",
            "roadmap": [
              {
                "phaseTitle": "string",
                "duration": "string",
                "description": "string",
                "topics": ["string"],
                "resources": [
                  {
                    "name": "string",
                    "url": "string",
                    "type": "Video" | "Article" | "Course"
                  }
                ]
              }
            ]
          }
        `;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        let text = response.text();
        
        // Clean up the response
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        // Parse and validate the response
        const data = JSON.parse(text);
        
        if (!data.isValid && !data.roadmap) {
          throw new Error('Invalid response format from AI');
        }
        
        console.log(`✅ Successfully used model: ${modelName}`);
        return NextResponse.json(data);
        
      } catch (error: any) {
        console.error(`❌ Error with model ${modelName}:`, error.message);
        lastError = error;
        // Continue to the next model
        continue;
      }
    }

    // If we get here, all models failed
    throw lastError || new Error('All model attempts failed');

  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { 
        isValid: false, 
        feedback: "We're having trouble connecting to our AI service. Please try again later.",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}