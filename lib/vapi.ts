import Vapi from "@vapi-ai/web";

const vapiPublicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "";

export const vapi = typeof window !== "undefined" ? new Vapi(vapiPublicKey) : null;

export type TranscriptEntry = {
  role: "user" | "assistant";
  text: string;
  id: string;
};

export interface VapiEvent {
  type: string;
  transcript?: string;
  role?: "user" | "assistant";
  latency?: number;
}
