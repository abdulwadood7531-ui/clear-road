const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'api', 'generate-roadmap', 'route.ts');

const newCode = `import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

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
    
    // FIX: Using "gemini-pro" (stable 1.0 model)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const { userData } = await req.json();

    const systemPrompt = \`
      You are a strict Career Gatekeeper.
      USER PROFILE:
      - Target: \${userData.profession}
      - Level: \${userData.experience}
      - Time: \${userData.hoursPerWeek}
      - Style: \${userData.learningStyle}
      - Budget: \${userData.budget}

      TASK:
      1. ANALYZE: Check if goals are realistic.
         - Rule: If "Beginner" AND "< 5 hours/week" AND Goal is "Job ASAP" -> REJECT.
      2. GENERATE: 
         - If valid, create a 3-phase roadmap.
         - If invalid, provide specific, encouraging feedback.

      OUTPUT FORMAT (Strict JSON):
      {
        "isValid": boolean,
        "feedback": "string",
        "roadmap": [
          {
            "phaseTitle": "string",
            "duration": "string",
            "topics": ["string", "string"],
            "resources": [{ "name": "string", "url": "string", "type": "Video/Article" }]
          }
        ]
      }
    \`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    let text = response.text();

    // CLEANUP: Remove any Markdown code blocks
    text = text.replace(/\\\`\\\`\\\`json/g, '').replace(/\\\`\\\`\\\`/g, '').trim();

    const jsonResponse = JSON.parse(text);

    return NextResponse.json(jsonResponse);

  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { 
        isValid: false, 
        feedback: "AI Connection Failed: " + (error.message || "Unknown Error") 
      },
      { status: 500 }
    );
  }
}`;

fs.writeFileSync(filePath, newCode, 'utf8');
console.log("✅ SUCCESS: File src/app/api/generate-roadmap/route.ts has been forced to use 'gemini-pro'.");