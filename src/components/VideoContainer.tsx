import React, { useRef, useLayoutEffect, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { useGetConfigValues } from 'hooks/config';
import { useGetStreams } from 'hooks/streams';
import { useArrayState } from '../utils';
import { sendTouchEvents, TouchEventData } from '../api/dataChannel';

const VideoContainer: React.FC = () => {
    const { receiveOnly } = useGetConfigValues();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const { localStream, remoteStream, dataChannel } = useGetStreams();

    const [isMousePressed, setMousePressed] = useState(false);
    const [events, appendEvent, clearEvents] = useArrayState<TouchEventData>();

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

    const handleTouchStart = useCallback(
        (event: TouchEventData) => {
            setMousePressed(true);
            appendEvent(event);
        },
        [appendEvent],
    );
    const handleTouchEnd = useCallback(
        (event: TouchEventData) => {
            const data = events.concat(event);
            console.log('  Send Touch Events', data);
            sendTouchEvents(dataChannel, data);

            setMousePressed(false);
            clearEvents();
        },
        [clearEvents, dataChannel, events],
    );

    const handleMouseDown = useCallback(
        (e: React.MouseEvent<HTMLVideoElement>) => {
            const event = getOffsetPosition(e);
            console.log('onMouseDown', e, event);
            handleTouchStart(event);
        },
        [handleTouchStart],
    );
    const handleMouseUp = useCallback(
        (e: React.MouseEvent<HTMLVideoElement>) => {
            if (isMousePressed) {
                const event = getOffsetPosition(e);
                console.log('onMouseUp', e, event);
                handleTouchEnd(event);
            }
        },
        [handleTouchEnd, isMousePressed],
    );
    const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLVideoElement>) => {
            if (isMousePressed) {
                const event = getOffsetPosition(e);
                console.log('onMouseLeave', e, event);
                handleTouchEnd(event);
            }
        },
        [handleTouchEnd, isMousePressed],
    );

    return (
        <Videos shown={remoteStream != null}>
            <RemoteVideo
                ref={remoteVideoRef}
                autoPlay
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            />
            {!receiveOnly && <LocalVideo ref={localVideoRef} autoPlay muted />}
        </Videos>
    );
};

function getOffsetPosition(
    e: React.MouseEvent<HTMLVideoElement>,
): TouchEventData {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        t: Math.floor(e.timeStamp),
    };
}

const Videos = styled.div<{ shown: boolean }>`
    font-size: 0;
    position: absolute;
    transition: all 1s;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${(props) =>
        props.shown
            ? css`
                  background: rgba(0, 0, 0, 0.6);
              `
            : css`
                  display: none;
              `}
`;
const RemoteVideo = styled.video`
    flex: 1;
    max-height: 90%;
    max-width: 90%;
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
