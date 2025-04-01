
import React, { useState,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Input, Button,message ,Space, Spin, Typography} from 'antd';
import { OpenAIOutlined } from '@ant-design/icons';

// 假設這些是 Ant Design X 自定義組件
import { Welcome, Conversations, Bubble,Sender } from '@ant-design/x';

const App8= () => {

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messageList, setMessageList] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  //const [sendValue, setsendValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  useEffect(()=>{
  if (loading) {
    const timer = setTimeout(() => {
      setLoading(false);
      setInputValue('');
      message.success('Send message successfully!');
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }
  }
,[loading])
const list=[
  { key: 1, label: 'Alice', message: 'Hello'},
  { key: 2, label: 'Bob', message: 'How are you?'},
  { key: 3, label: 'Derek', message: 'How are you?'},
]
  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessageList([
      ...messageList,
      { sender: 'me', text: inputValue, timestamp: new Date().toISOString() },
    ]);
    setInputValue('');
  };

  return (
    <PageContainer>
      <Welcome title="歡迎來到客服對話系統" subTitle="請選擇一位使用者開始對話" />

      <div style={{ display: 'flex', marginTop: 24 }}>
        {/* Conversations List */}
        <Card title="會話列表" style={{ width: 250, marginRight: 16 }}>
          <Conversations
            items={list}
            
            onActiveChange={(user: any) => {
              setSelectedUser(list[user-1]);
              setMessageList([
                { sender: 'Alice', text: 'Hi! 有什麼我可以幫忙的嗎？', timestamp: '2025-03-28T09:00:00Z' },
              ]);
            }}
          />
        </Card>

        {/* Chat Area */}
        <Card
          title={selectedUser ? `與 ${selectedUser.label} 的對話` : '請選擇一個會話'}
          style={{ flex: 1 }}
        >
          <div style={{ minHeight: 300, padding: 12 }}>
            {messageList.map((msg, index) => (
              <Bubble
                key={index}
                content={msg.text}
                timestamp={msg.timestamp}
                placement={msg.sender === 'me' ? 'end' : 'start'}
              />
            ))}
          </div>

          {selectedUser && (
            <Sender
            submitType="shiftEnter"
            value={inputValue}
            loading={loading}
            onChange={setInputValue}
            onSubmit={() => {
              handleSend()
              setLoading(true);
            }}
            onCancel={() => {
              setLoading(false);
            }}
            actions={(_, info) => {
              const { SendButton, LoadingButton, ClearButton, SpeechButton } = info.components;
      
              return (
                <Space size="small">
                  <Typography.Text type="secondary">
                    <small>`Shift + Enter` to submit</small>
                  </Typography.Text>
                  <ClearButton />
                  <SpeechButton />
                  {loading ? (
                    <LoadingButton type="default" icon={<Spin size="small" />} disabled />
                  ) : (
                    <SendButton type="primary" icon={<OpenAIOutlined />} disabled={false} />
                  )}
                </Space>
              );
            }}
          />
          )}
        </Card>
      </div>
    </PageContainer>
  );
};

export default App8