interface Window {
  turnstile?: { render(container: HTMLElement, options: { sitekey: string; theme: "dark" | "light" | "auto"; size: "normal" | "compact" | "flexible"; callback(token: string): void; "expired-callback"(): void; "error-callback"(): void }): string; remove(widgetId: string): void };
}
