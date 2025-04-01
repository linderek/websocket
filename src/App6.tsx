import { OpenAIOutlined } from '@ant-design/icons';
import { Sender,Suggestion } from '@ant-design/x';
import { App, Space, Spin, Typography } from 'antd';
import React from 'react';
type SuggestionItems = Exclude<GetProp<typeof Suggestion, 'items'>, () => void>;
const App6= () => {
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState<string>('');
  const [value2, setValue2] = React.useState('');
  const { message } = App.useApp();

  const suggestions: SuggestionItems = [
    { label: 'Write a report', value: 'report' },
    { label: 'Draw a picture', value: 'draw' },
    {
      label: 'Check some knowledge',
      value: 'knowledge',
      extra: 'Extra Info',
    },
  ];
  React.useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        setValue('');
        message.success('Send message successfully!');
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [loading]);

  return (
    <div><div>
    <Sender
      submitType="shiftEnter"
      value={value}
      loading={loading}
      onChange={setValue}
      onSubmit={() => {
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
    /></div>
    <Suggestion
      items={suggestions}
      onSelect={(itemVal) => {
        setValue2(`[${itemVal}]:`);
      }}
      block
    >
      {({ onTrigger, onKeyDown }) => {
        return (
          <Sender
            value={value2}
            onChange={(nextVal) => {
              if (nextVal === '/') {
                onTrigger();
              } else if (!nextVal) {
                onTrigger(false);
              }
              setValue2(nextVal);
            }}
            onKeyDown={onKeyDown}
            placeholder="输入 / 获取建议"
          />
        );
      }}
    </Suggestion>
    
    </div>
  );
};

export default App6
;