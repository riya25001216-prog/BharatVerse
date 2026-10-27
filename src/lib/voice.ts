/**
 * ElevenLabs voice agent ("Tara") used by the Talk tab of the guide.
 *
 * The agent is public (no auth), so only its ID is needed in the browser; no
 * API key ever ships to the client. Override it with VITE_ELEVENLABS_AGENT_ID
 * in .env.local to point the site at a different agent.
 */
export const ELEVENLABS_AGENT_ID =
  import.meta.env.VITE_ELEVENLABS_AGENT_ID || 'agent_9401m5kxed3ve9zrrn5easwq4m00';
