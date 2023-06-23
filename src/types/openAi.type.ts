export interface OpenAIRequest {
  prompt: string;
  model?: string;
  onSuccess: (value: string) => void;
  onError: () => void;
}
