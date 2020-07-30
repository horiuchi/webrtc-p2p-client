import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useConfigValues } from 'hooks/config';
import { useGetStreams } from 'hooks/streams';

const VideoContainer: React.FC = () => {
    const { receiveOnly } = useConfigValues();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const { localStream, remoteStream } = useGetStreams();

    useLayoutEffect(() => {
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);
    useLayoutEffect(() => {
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    return (
        <Videos>
            <RemoteVideo ref={remoteVideoRef} autoPlay />
            {!receiveOnly && <LocalVideo ref={localVideoRef} autoPlay muted />}
        </Videos>
    );
};

const Videos = styled.div`
    font-size: 0;
    pointer-events: none;
    position: absolute;
    transition: all 1s;
    height: 80%;
    width: 100%;
    display: block;
`;
const RemoteVideo = styled.video`
    height: 70%;
    width: 100%;
    max-height: 70%;
    max-width: 100%;
    object-fit: contain;
    transition: opacity 1s;
`;
const LocalVideo = styled.video`
    z-index: 2;
    position: absolute;
    border: 1px solid gray;
    bottom: 0px;
    right: 20px;
    max-height: 30%;
    max-width: 30%;
    transition: opacity 1s;
`;

export default VideoContainer;
