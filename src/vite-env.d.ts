/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Set to "true" in .env.local to let the typed guide use a local Ollama model. */
  readonly VITE_ENABLE_OLLAMA?: string;
  /** ElevenLabs Conversational AI agent used by the voice guide. */
  readonly VITE_ELEVENLABS_AGENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
