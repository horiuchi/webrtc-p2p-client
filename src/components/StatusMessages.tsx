import React from 'react';
import styled from 'styled-components';
import { useGetMessages } from '../hooks/messages';

const StatusMessages: React.FC = () => {
    const messages = useGetMessages();

    return (
        <Frame>
            {messages.map((line, index) => (
                <Message key={index}>{line}</Message>
            ))}
        </Frame>
    );
};

const Frame = styled.div`
    margin: 1rem;
    padding: 0.5rem;
    border: solid 1px #333;
`;
const Message = styled.div`
    color: #333;
`;

export default StatusMessages;
