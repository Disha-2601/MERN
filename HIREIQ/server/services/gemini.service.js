import axios from "axios"

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite"
const GEMINI_TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS || 45000)

const toGeminiPayload = (messages) => {
    const systemText = messages
        .filter((message) => message.role === "system")
        .map((message) => message.content)
        .join("\n\n")
        .trim()

    const contents = messages
        .filter((message) => message.role !== "system")
        .map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [{ text: String(message.content || "") }]
        }))
        .filter((message) => message.parts[0].text.trim())

    return {
        ...(systemText && {
            systemInstruction: {
                parts: [{ text: systemText }]
            }
        }),
        contents
    }
}

export const askAi = async (messages) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is missing.")
        }

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Messages array is empty.")
        }

        const payload = toGeminiPayload(messages)

        if (!payload.contents.length) {
            throw new Error("Gemini request has no user content.")
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
            payload,
            {
                timeout: GEMINI_TIMEOUT_MS,
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY
                }
            }
        )

        const content = response?.data?.candidates?.[0]?.content?.parts
            ?.map((part) => part.text || "")
            .join("")
            .trim()

        if (!content) {
            throw new Error("AI returned empty response.")
        }

        return content
    } catch (error) {
        console.error("Gemini Error:", error.response?.data || error.message)
        if (error.code === "ECONNABORTED") {
            throw new Error("Gemini request timed out. Try again in a moment.")
        }
        throw new Error("Gemini API Error")
    }
}
