const { GoogleGenerativeAI } = require("@google/generative-ai");

// Make sure to set this in your .env.local file
const API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY";

async function testModel(modelName) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });
    
    console.log(`\nTesting model: ${modelName}...`);
    const result = await model.generateContent("Hello, can you hear me?");
    const response = await result.response;
    const text = response.text();
    
    console.log(`✅ Success! Model works: ${modelName}`);
    console.log(`Response: ${text}`);
    return true;
  } catch (error) {
    console.log(`❌ Error with ${modelName}: ${error.message}`);
    return false;
  }
}

async function main() {
  if (!API_KEY || API_KEY === "YOUR_API_KEY") {
    console.error("❌ Please set GEMINI_API_KEY in your .env.local file");
    return;
  }

  const modelsToTest = [
    "gemini-1.0-pro",
    "gemini-pro",
    "gemini-1.5-pro-latest",
    "gemini-1.5-flash-latest",
    "models/gemini-pro",
    "models/text-bison-001"
  ];

  console.log("Testing available models...");
  
  for (const model of modelsToTest) {
    const success = await testModel(model);
    if (success) {
      console.log(`\n✅ Found working model: ${model}`);
      console.log(`Update your code to use: model: "${model}"`);
      return;
    }
  }
  
  console.log("\n❌ No working models found. Please check your API key and region settings.");
}

main().catch(console.error);
