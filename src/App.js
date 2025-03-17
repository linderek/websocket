import React, { useEffect, useState } from 'react';

function WebSocketComponent() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [serverMessage, setServerMessage] = useState([]);
  const [ws, setWs] = useState(null);
  useEffect(() => {
    // 建立 WebSocket 連接
    const ws = new WebSocket('ws://localhost:8080');
    // 當 WebSocket 連接成功時觸發
    ws.onopen = () => {
      console.log('WebSocket 連接成功');
      setWs(ws);
    };

    // 當從服務器收到消息時觸發
    ws.onmessage = (event) => {
      console.log('lineAt 20 收到服務器消息:', event.data);
      const temp=[...serverMessage,event.data]
      setServerMessage(temp)
      console.log('lineAt 24',serverMessage );
    };

    // 當 WebSocket 連接關閉時觸發
    ws.onclose = () => {
      console.log('WebSocket 連接關閉');
    };

    // 當 WebSocket 出現錯誤時觸發
    ws.onerror = (error) => {
      console.error('WebSocket 錯誤:', error);
    };

    // 在組件卸載時關閉 WebSocket 連接
    return () => {
      ws.close();
    };
  }, [serverMessage]);


  // 發送消息到服務器
  const sendMessage = () => {
    console.log(name+':'+message);
    ws.send(name+':'+message);
  };

  return (
    <div>
      <h1>WebSocket 測試</h1>
      <div>
      <span>名稱</span>：<input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}></input>
        </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}></input>&nbsp;
      <button  onClick={sendMessage}>發送消息</button>
      <div>聊天記錄</div>
      {serverMessage?.map((item,idx)=>(<div key={idx}>{item}</div>))}
    </div>
  );
}

export default WebSocketComponent;