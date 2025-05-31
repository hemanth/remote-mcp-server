import { McpClient, McpClientOptions } from "@modelcontextprotocol/sdk"; // Attempting common import path
// Original attempt: import { McpClient, McpClientOptions } from "@modelcontextprotocol/sdk/client";

// Define an interface for the client constructor options
interface MyMcpClientOptions {
    serverUrl: string;
    // We'll need OAuth related options, let's define placeholders
    clientId: string;
    clientSecret: string; // This is sensitive, should be handled carefully
    tokenUrl: string; // Usually an endpoint like /token on the auth server
}

export class MyMcpClient {
    private client: McpClient;
    private options: MyMcpClientOptions;

    constructor(options: MyMcpClientOptions) {
        this.options = options;

        // Placeholder for OAuth token acquisition
        // const accessToken = this.getAccessToken(); // This method will need implementation
        // We will call getAccessToken and instantiate client in an async connect() method

        // const clientOptions: McpClientOptions = {
        //     remote: options.serverUrl,
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        // Any other options required by McpClient from the SDK
        // };
        // The actual McpClient might be instantiated differently, e.g. McpClient.connect(options)
        // This is a common pattern:
        // this.client = new McpClient(clientOptions);
        // Or it might be asynchronous:
        // this.client = await McpClient.connect(clientOptions);
        // For now, let's assume a synchronous constructor for the skeleton.
        // We will refine this after inspecting the SDK.
        // console.log("MCP Client options:", clientOptions) // Temporary log
        // this.client = new McpClient(clientOptions); // This line will likely cause an error if McpClient is not found or used incorrectly.
                                                    // We'll comment it out until we confirm the SDK usage.
        console.log("MyMcpClient initialized. Call connect() to establish connection and instantiate SDK client.");
    }

    private async getAccessToken(): Promise<string> {
        console.log("Attempting to get OAuth token...");
        console.log("Client ID:", this.options.clientId);
        console.log("Token URL:", this.options.tokenUrl);

        const body = new URLSearchParams();
        body.append("client_id", this.options.clientId);
        body.append("client_secret", this.options.clientSecret);
        body.append("grant_type", "client_credentials");

        try {
            const response = await fetch(this.options.tokenUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: body,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to get access token: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const tokenData = await response.json();
            if (!tokenData.access_token) {
                throw new Error("Access token not found in response");
            }
            console.log("OAuth token obtained.");
            return tokenData.access_token;
        } catch (error) {
            console.error("Error obtaining access token:", error);
            throw error;
        }
    }

    // Method to connect (if client instantiation is async or needs explicit connect)
    public async connect() {
        const accessToken = await this.getAccessToken();
        const clientOptions: McpClientOptions = {
            remote: this.options.serverUrl,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            // Any other options required by McpClient from the SDK
        };
        console.log("Connect method called. SDK McpClient options:", clientOptions);
        // Instantiate the actual client here if it's async
        // TODO: Verify McpClient constructor or connect method from SDK
        // Example: this.client = new McpClient(clientOptions);
        // Or: this.client = await McpClient.connect(clientOptions);
        console.log("Actual SDK client should be instantiated here. (Commented out for now)");
    }

    // Example method to call a tool
    public async callTool(toolName: string, params: any): Promise<any> {
        if (!this.client) {
            // Fallback: try to connect if not connected.
            // Alternatively, throw new Error("MCP Client not connected. Call connect() first.");
            console.log("Client not yet instantiated, attempting to connect first...");
            await this.connect();
            if (!this.client) {
                throw new Error("MCP Client not properly initialized even after connect(). Cannot call tool.");
            }
        }
        console.log(`Calling tool: ${toolName} with params:`, params);
        // This is a placeholder for the actual tool call method from the SDK
        // TODO: Verify tool calling mechanism from SDK
        // e.g., return this.client.tool(toolName).call(params);
        // or this.client.call(toolName, params);
        // or this.client.tools[toolName].call(params)
        return { message: `Called ${toolName} (SDK call placeholder)`, params };
    }
}

// Example usage (for testing within this file if needed, will be moved to run-client.ts)
/*
async function main() {
    const client = new MyMcpClient({
        serverUrl: "http://localhost:8787/sse", // Default Wrangler dev port
        clientId: "test-client",
        clientSecret: "test-secret", // Be cautious with secrets in client-side code if this were browser-based
        tokenUrl: "http://localhost:8787/token", // Default token endpoint
    });

    try {
        await client.connect(); // Call connect to perform async setup

        const sumResult = await client.callTool("add", { a: 5, b: 7 });
        console.log("Sum result:", sumResult);

        // const xkcdResult = await client.callTool("xkcd", {});
        // console.log("XKCD result:", xkcdResult);
    } catch (error) {
        console.error("Error during client operation:", error);
    }
}

// To run this for testing:
// 1. Ensure your MCP server with OAuth is running (e.g., using `npm run dev` for the template)
// 2. If running this file directly with ts-node or similar:
//    - You might need to install `node-fetch` if not in a Node.js v18+ environment (`npm install node-fetch`)
//    - And potentially import it: `import fetch from 'node-fetch';` at the top.
// main();
*/
