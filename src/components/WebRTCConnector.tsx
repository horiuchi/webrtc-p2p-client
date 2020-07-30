import React from 'react';
import styled from 'styled-components';

const WebRTCConnector: React.FC = () => {
    return (
        <Buttons>
            <Button type="button">接続</Button>
            <Button type="button">切断</Button>
        </Buttons>
    );
};

const Buttons = styled.div`
    margin: 0 2rem;
`;
const Button = styled.button`
    background-color: #4285f4;
    border: none;
    border-radius: 2px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 0.8em;
    height: 2.75em;
    margin: 0 5px 20px 5px;
    padding: 0.5em 0.7em 0.5em 0.7em;
    width: 8em;
`;

export default WebRTCConnector;
