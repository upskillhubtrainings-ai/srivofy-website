import { llmsFullTxt } from "@/lib/llms";

export const dynamic = "force-static";

/*
 * Markdown version of the homepage. .htaccess serves it for "/" when an AI
 * agent asks for Accept: text/markdown; browsers still get the HTML page.
 */
export function GET() {
  return new Response(llmsFullTxt(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
