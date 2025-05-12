"use server"

import OpenAI from "openai"

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export default async function submitToOpenAI(_prev: any, formData: FormData) {
  const prompt = formData.get("prompt")?.toString() || ""

  const response = await client.responses.create({
    model: "gpt-4.1",
    tools: [
      {
        type: "file_search",
        vector_store_ids: [process.env.VECTOR_STORE_ID!],
        max_num_results: 20,
      },
    ],
    input: prompt,
  })
  const message = response.output.find((x) => x.type == "message")!

  return message.content
}
