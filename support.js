"use strict";

const MODEL = "gemini-2.5-flash";

const SYSTEM_INSTRUCTION = [
  "You write short replies for the Safe Step app.",
  "You are not a therapist, doctor, or clinician.",
  "Sound like a calm human being who is really listening.",
  "Do not sound robotic, corporate, or repetitive.",
  "Use exactly three short paragraphs separated by blank lines.",
  "Paragraph 1: grounded reflection tied to the user's message.",
  "Paragraph 2: a gentle invitation to continue.",
  "Paragraph 3: one safe next step.",
  "If the message suggests suicide, self-harm, or immediate danger, acknowledge the seriousness and encourage urgent real-world support now.",
  "Do not provide methods, instructions, or encouragement for self-harm or suicide.",
  "Keep the wording short, natural, and warm.",
].join("\n");

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  };
}

function extractReply(data) {
  const candidate = data && data.candidates && data.candidates[0];
  const parts = candidate && candidate.content && candidate.content.parts;

  if (!parts || !parts.length) {
    throw new Error("No reply text in the API response.");
  }

  let text = "";
  for (let i = 0; i < parts.length; i += 1) {
    if (parts[i].text) {
      text += parts[i].text;
    }
  }

  text = text.trim();

  if (!text) {
    throw new Error("No reply text in the API response.");
  }

  return text;
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return json(500, { error: "GEMINI_API_KEY is not configured." });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return json(400, { error: "Invalid JSON body." });
  }

  const message = (payload.message || "").trim();
  if (!message) {
    return json(400, { error: "Message is required." });
  }

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    MODEL +
    ":generateContent?key=" +
    encodeURIComponent(apiKey);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 700,
        },
      }),
    });

    const data = await response.json().catch(function () {
      return {};
    });

    if (!response.ok) {
      return json(response.status, {
        error: (data.error && data.error.message) || "Gemini request failed.",
      });
    }

    return json(200, { reply: extractReply(data) });
  } catch (error) {
    return json(500, {
      error: error && error.message ? error.message : "Unexpected server error.",
    });
  }
};
