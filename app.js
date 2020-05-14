const WebSocket = require("ws");

const activeChatConnections = [];

// Setup server to listen
const wsServer = new WebSocket.Server({
  port: 8081,
});

// Setup on event processing for WebSocket
wsServer.on("connection", (ws) => {
  // Add this connection into our list of active connections
  activeChatConnections.push({ ws: ws, referenceId: "" });

  // Each time we get a new connection, listen for new messages
  ws.on("message", (data) => {
    try {
      console.log(data);

      let msg = JSON.parse(data);
      console.log("Received: " + msg.msgType);

      if (msg.msgType === "Init") {
        activeChatConnections.forEach((connection) => {
          if (connection.ws === ws && connection.referenceId === "") {
            connection.referenceId = msg.referenceId;
            console.log("Set connection referenceId: " + msg.referenceId);
          }
        });
      }

      if (msg.msgType === "Message") {
        console.log("Processing Message");
        let destinationConnections = activeChatConnections.filter(
          (connection) => {
            return connection.referenceId === msg.toReferenceId;
          }
        );

        // Send message to all connections for thie referenceId
        // You CAN have multiple connections with a referenceId
        if (destinationConnections.length > 0) {
          console.log("Sending Message");
          destinationConnections.forEach((connection) => {
            connection.ws.send(JSON.stringify(msg));
          });
        }
      }
      //  broadcast(data);
    } catch (exception) {
      console.log("Exception: " + exception);
    }
  });

  ws.send(JSON.stringify({ msgType: "Welcome" }));
});
