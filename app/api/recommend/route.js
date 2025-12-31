import OpenAI from "openai";
import clientPromise from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("REQUEST BODY:", body);

    const { user_input } = body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `Suggest 3 to 5 movies based on this preference:\n${user_input}`,
    });

    console.log("OPENAI RAW RESPONSE:", response);

    const text =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text ||
      "";

    const movies = text
      .split("\n")
      .map(m => m.replace(/^\d+\.|\*\*/g, "").trim())
      .filter(Boolean);

    console.log("PARSED MOVIES:", movies);

    return Response.json({ recommended_movies: movies });

  } catch (err) {
    console.error("API ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
