import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const baseUrl = process.env.CONFLUENCE_BASE_URL;
const pat = process.env.CONFLUENCE_PAT;

if (!baseUrl || !pat) {
  throw new Error("Missing CONFLUENCE_BASE_URL or CONFLUENCE_PAT");
}

async function confluenceFetch(path: string): Promise<any> {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Confluence API error ${response.status}: ${text}`);
  }

  return response.json();
}

function stripHtml(html: string): string {
  return html
    .replace(/<ac:structured-macro[\s\S]*?<\/ac:structured-macro>/g, " ")
    .replace(/<ri:[^>]+>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n")
    .replace(/<li>/gi, "- ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n\s+\n/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const server = new Server(
  {
    name: "confluence-mcp",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "confluence_search",
        description:
          "Search Confluence pages using CQL. Useful to find pages by keyword, title, or topic.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Free text query, for example: Kafka Genesis"
            },
            limit: {
              type: "number",
              description: "Maximum number of results to return",
              default: 5
            },
            spaceKey: {
              type: "string",
              description: "Optional Confluence space key"
            }
          },
          required: ["query"]
        }
      },
      {
        name: "confluence_get_page",
        description:
          "Get a Confluence page by page ID and return cleaned readable text.",
        inputSchema: {
          type: "object",
          properties: {
            pageId: {
              type: "string",
              description: "The Confluence page/content ID"
            }
          },
          required: ["pageId"]
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  const args = request.params.arguments ?? {};

  if (toolName === "confluence_search") {
    const schema = z.object({
      query: z.string().min(1),
      limit: z.number().int().min(1).max(20).optional().default(5),
      spaceKey: z.string().optional()
    });

    const { query, limit, spaceKey } = schema.parse(args);

    const safeQuery = query.replace(/"/g, '\\"');

    const cql = spaceKey
      ? `type = "page" AND space = "${spaceKey}" AND text ~ "${safeQuery}"`
      : `type = "page" AND text ~ "${safeQuery}"`;

    const data = await confluenceFetch(
      `/rest/api/search?cql=${encodeURIComponent(cql)}&limit=${limit}`
    );

    const results = (data.results ?? []).map((item: any) => {
      const content = item.content ?? {};
      const links = content._links ?? {};
      const webui = links.webui ? `${baseUrl}${links.webui}` : null;

      return {
        pageId: content.id,
        title: content.title,
        type: content.type,
        url: webui,
        excerpt: item.excerpt ?? ""
      };
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(results, null, 2)
        }
      ]
    };
  }

  if (toolName === "confluence_get_page") {
    const schema = z.object({
      pageId: z.string().min(1)
    });

    const { pageId } = schema.parse(args);

    const data = await confluenceFetch(
      `/rest/api/content/${pageId}?expand=body.storage,space,version`
    );

    const html = data?.body?.storage?.value ?? "";
    const text = stripHtml(html);

    const result = {
      pageId: data.id,
      title: data.title,
      space: data?.space?.name ?? "",
      version: data?.version?.number ?? null,
      url: `${baseUrl}${data?._links?.webui ?? ""}`,
      text: text.slice(0, 40000)
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  throw new Error(`Unknown tool: ${toolName}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Failed to start MCP server:", error);
  process.exit(1);
});
