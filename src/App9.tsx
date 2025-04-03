import React, { useRef, useState } from 'react';
import { ProTable, ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-components';
import { Button, message } from 'antd';

// 模擬資料
const mockData = [
  { id: 1, name: 'iPhone 15', price: 38900 },
  { id: 2, name: 'MacBook Pro', price: 89900 },
];

const App9= () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const actionRef = useRef<any>();

  const columns = [
    {
      title: '商品名稱',
      dataIndex: 'name',
    },
    {
      title: '價格',
      dataIndex: 'price',
      valueType: 'money',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_: any, record: any) => [
        <a key="edit" onClick={() => {
          setEditingRecord(record);
          setModalVisible(true);
        }}>
          編輯
        </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable
        headerTitle="商品清單"
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              setEditingRecord(null);
              setModalVisible(true);
            }}
          >
            新增商品
          </Button>,
        ]}
        request={async () => ({
          data: mockData,
          success: true,
        })}
      />

      <ModalForm
        title={editingRecord ? '編輯商品' : '新增商品'}
        open={modalVisible}
        initialValues={editingRecord || { name: '', price: 0 }}
        onOpenChange={setModalVisible}
        onFinish={async (values) => {
          console.log('表單送出：', values);
          message.success('儲存成功');
          setModalVisible(false);
          return true;
        }}
      >
        <ProFormText
          name="name"
          label="商品名稱"
          placeholder="請輸入商品名稱"
          rules={[{ required: true, message: '必填' }]}
        />
        <ProFormDigit
          name="price"
          label="價格"
          placeholder="請輸入價格"
          min={0}
          rules={[{ required: true, message: '必填' }]}
        />
      </ModalForm>
    </>
  )};

export default App9