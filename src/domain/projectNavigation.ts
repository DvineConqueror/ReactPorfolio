export function projectIdFromHash(hash: string): string | null {
  if (!hash.startsWith("#project-")) return null;
  try { return decodeURIComponent(hash.slice(9)) || null; } catch { return null; }
}

export const projectHash = (id: string) => `#project-${encodeURIComponent(id)}`;
