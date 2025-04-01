import React,{ useState } from "react";
import { Welcome,Bubble,Conversations,ThoughtChain } from "@ant-design/x";

const mockConversations = [
  {
    key: "1",
    label: "Alice",
    subtitle: "Hey, how's it going?",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "2",
    label: "Bob",
    subtitle: "Did you get the file?",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
];

const mockMessages = {
  "1": [
    { role: "user", content: "Hi Alice!" },
    { role: "assistant", content: "Hey! Great to hear from you." },
  ],
  "2": [
    { role: "user", content: "Hi Bob, I got the file." },
    { role: "assistant", content: "Awesome, let me know if you need help!" },
  ],
};

const mockThoughtChain = {
  items: [
    {
      title: "Understand the message",
      content: "Identify who the user is talking to and extract intent.",
    },
    {
      title: "Generate a friendly response",
      content: "Use a casual tone and relevant content to reply.",
    },
  ],
};

const App11= () => {
  const [selectedId, setSelectedId] = useState<string>('');

  const currentMessages = selectedId ? mockMessages?.[selectedId] : [];

  return (
    <div className="p-6 grid grid-cols-12 gap-4 h-screen bg-gray-50">
      <div className="col-span-3">
        <Welcome title="Welcome to the Chat Center" />
        <Conversations
          items={mockConversations}
          activeKey={selectedId}
          onActiveChange={(id) => {
            setSelectedId(id);}}
        />
      </div>

      <div className="col-span-6 bg-white rounded-2xl p-4 shadow">
        {selectedId ? (
          <div className="space-y-3 overflow-y-auto h-full">
            {currentMessages.map((msg, idx) => (
              <Bubble
                key={idx}
                type={msg.role === "user" ? "text" : "ai"}
                content={msg.content}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-center mt-10">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
======================================
      <div className="col-span-3">
        {selectedId && <ThoughtChain {...mockThoughtChain} />}
      </div>
    </div>
  );
}
export default App11;