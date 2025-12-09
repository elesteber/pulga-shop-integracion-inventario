// I wanted to include this in handlers.ts, but import.meta.env is undefined.
// So I created a new file for it.

export default function inventoryApi(path: string): string {
  return import.meta.env.VITE_API_URL + path;
}
