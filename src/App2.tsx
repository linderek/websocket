import React from 'react';
import { Bubble,Sender,ConversationsProps,Conversations } from '@ant-design/x';
import { DeleteOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';
import {  type GetProp, theme,message } from 'antd';
const items: GetProp<ConversationsProps, 'items'> = Array.from({ length: 4 }).map((_, index) => ({
  key: `item${index + 1}`,
  label: `Conversation Item ${index + 1}`,
  disabled: index === 3,
}));

const Component = () => {
  const { token } = theme.useToken();
  const style = {
    width: 256,
    background: token.colorBgContainer,
    borderRadius: token.borderRadius,
  };
  const menuConfig: ConversationsProps['menu'] = (conversation) => ({
    items: [
      {
        label: 'Operation 1',
        key: 'operation1',
        icon: <EditOutlined />,
      },
      {
        label: 'Operation 2',
        key: 'operation2',
        icon: <StopOutlined />,
        disabled: true,
      },
      {
        label: 'Operation 3',
        key: 'operation3',
        icon: <DeleteOutlined />,
        danger: true,
      },
    ],
    onClick: (menuInfo) => {
      alert(`Click ${conversation.key} - ${menuInfo.key}`)
      message.info(`Click ${conversation.key} - ${menuInfo.key}`);
    },
  });
  return (

  
  <div className="App">
    <Conversations defaultActiveKey="item1" menu={menuConfig} items={items} style={style} />
  </div>
)};

export default Component;