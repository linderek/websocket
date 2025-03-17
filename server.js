const WebSocket = require("ws");

// 創建 WebSocket 服務器，監聽端口 8080
const wss = new WebSocket.Server({ port: 8080 });
// 每當有新的客戶端連接時觸發
wss.on("connection", function connection(ws) {
    console.log("客戶端已連接");
    // 當收到客戶端消息時觸發
    /*
    ws.on("message", function incoming(message) {
        ws.send(`ws： ${message}`);
    });
    */
    ws.on("message", function incoming(message) {
        //取得所有連接中的 client
        let clients = wss.clients

        //做迴圈，發送訊息至每個 client
        clients.forEach(client => {
            client.send(`${message}`)
        })
    })
    // 當客戶端斷開連接時觸發
    ws.on("close", function close() {
        console.log("客戶端已斷開連接");
    });
});
// 定時每 10 秒廣播當前連接的客戶端數量
setInterval(() => {
    const numClients = wss.clients.size; // 當前連接的客戶端數量
    // 向每個已連接的客戶端發送當前連接數量
    console.log("當前連接的客戶端數量:", numClients);
}, 10000);

console.log("WebSocket 服務器運行在 ws://localhost:8080");