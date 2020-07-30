import React from 'react';
import styled from 'styled-components';
import ConfigForm from './ConfigForm';
import WebRTCConnector from './WebRTCConnector';
import StatusMessages from './StatusMessages';
import VideoContainer from './VideoContainer';

const MainFrame: React.FC = () => {
    return (
        <Main>
            <Title>WebRTC Test Client.</Title>
            <ConfigForm />
            <WebRTCConnector />
            <Spacer />
            <StatusMessages />

            <VideoContainer />
        </Main>
    );
};

const Main = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-items: center;
`;
const Title = styled.div`
    margin: 2rem;
    font-size: 2rem;
`;
const Spacer = styled.div`
    flex: 1;
`;

export default MainFrame;
