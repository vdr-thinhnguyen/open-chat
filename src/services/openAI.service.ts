import { Configuration, OpenAIApi } from "openai";
import { OpenAIRequest } from "@/types";

export const getResults = async ({
  prompt,
  onError,
  onSuccess,
  model = process.env.NEXT_PUBLIC_OPEN_AI_API_MODEL!,
}: OpenAIRequest) => {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const result = await openai.createCompletion({
      model: model,
      prompt: prompt,
    });
    console.log("[getResults] - RESPONSE", result.data.choices[0].text);
    onSuccess(result.data.choices?.[0]?.text || "");
  } catch (err) {
    console.log(err);
    onError();
  }
};
