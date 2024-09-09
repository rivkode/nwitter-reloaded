import React, { useState } from 'react';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 20px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  width: 90vw; /* 가로 사이즈를 줄임 */
  max-width: 500px; /* 최대 가로 사이즈를 설정 */
  height: 80vh; /* 높이를 줄여서 화면에 맞춤 */
  background-color: #000; /* 배경을 검은색으로 설정 */
  position: relative; /* 필요 시 위치 조정 가능 */
  margin: 0 auto; /* 중앙 정렬 */
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 10px;
  background-color: #000; /* 배경을 검은색으로 설정 */
  border-radius: 10px;
  color: #fff; /* 글자색을 하얀색으로 설정 */
  flex: 1; /* 메시지 컨테이너가 공간을 채우도록 설정 */
`;

const Message = styled.div<{ isUser: boolean }>`
  max-width: 80%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 15px;
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  background-color: ${(props) => (props.isUser ? '#D3B7E0' : '#6D28D9')}; /* 연한 보라색과 보라색 */
  color: #fff; /* 글자색을 하얀색으로 설정 */
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  font-size: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 16px;
  color: #fff; /* 글자색을 하얀색으로 설정 */
  background-color: #333; /* 입력창 배경을 어두운 회색으로 설정 */
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #4caf50;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
`;

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput('');

    const botResponse = { sender: 'bot', text: `당신이 말한: "${input}"` };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Wrapper>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.sender === 'user'}>
            {msg.text}
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton onClick={handleSend}>전송</SendButton>
      </InputContainer>
    </Wrapper>
  );
};

export default Chatbot;
