import { MyMcpClient } from "./client/mcp-client"; // Adjusted path

async function main() {
    console.log("MCP Client Example");
    console.log("------------------");

    // Configuration for the client
    // These would typically come from environment variables or a config file
    const serverBaseUrl = process.env.MCP_SERVER_URL || "http://localhost:8787";
    const clientId = process.env.MCP_CLIENT_ID || "test-client"; // Example client ID
    const clientSecret = process.env.MCP_CLIENT_SECRET || "test-secret"; // Example client secret (should be handled securely)

    const client = new MyMcpClient({
        serverUrl: `${serverBaseUrl}/sse`, // SSE endpoint as configured in server
        clientId: clientId,
        clientSecret: clientSecret,
        tokenUrl: `${serverBaseUrl}/token`, // Standard token endpoint
    });

    try {
        console.log("Attempting to connect and authenticate...");
        // The connect method now handles token acquisition and prepares options
        // The actual SDK client instantiation is still pending confirmation of SDK API
        await client.connect();
        console.log("Client connect() method finished.");

        // At this point, the actual McpClient from the SDK should be instantiated.
        // The following tool calls are placeholders and will only work
        // once the McpClient is correctly initialized in mcp-client.ts
        // and the callTool method uses the SDK's methods.

        console.log("\nCalling 'add' tool with { a: 5, b: 7 }...");
        const sumResult = await client.callTool("add", { a: 5, b: 7 });
        console.log("'add' tool result:", sumResult);

        // console.log("\nCalling 'xkcd' tool...");
        // const xkcdResult = await client.callTool("xkcd", {});
        // console.log("'xkcd' tool result:", xkcdResult);

        console.log("\nClient example finished.");

    } catch (error) {
        if (error instanceof Error) {
            console.error("\nError during client operation:", error.message);
            if (error.stack) {
                console.error("Stack trace:", error.stack);
            }
        } else {
            console.error("\nUnknown error during client operation:", error);
        }
    }
}

main().catch(error => {
    console.error("Unhandled error in main:", error);
});
