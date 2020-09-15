import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { useGetConfigValues } from 'hooks/config';
import {
    connection as AyameConnection,
    defaultOptions,
} from '@open-ayame/ayame-web-sdk';
import Connection from '@open-ayame/ayame-web-sdk/dist/connection';
import {
    useGetStreams,
    useSetLocalStream,
    useSetRemoteStream,
    useSetAudioRemoteStream,
    useSetDataChannel,
} from 'hooks/streams';
import { useAppendMessage } from 'hooks/messages';

const DataChannelLabel = 'android-rc data';

const WebRTCConnector: React.FC = () => {
    const [canConnect, setCanConnect] = useState(true);
    const [canDisconnect, setCanDisconnect] = useState(false);

    const [connection, setConnection] = useState<Connection>();
    const config = useGetConfigValues();
    const { localStream } = useGetStreams();
    const setLocalStream = useSetLocalStream();
    const setRemoteStream = useSetRemoteStream();
    const setAudioRemoteStream = useSetAudioRemoteStream();
    const setDataChannel = useSetDataChannel();
    const log = useAppendMessage();

    const disconnected = useCallback(() => {
        if (localStream !== null) {
            localStream.getTracks().forEach((track) => track.stop());
        }
        setLocalStream(null);
        setCanConnect(true);
        setCanDisconnect(false);
    }, [localStream, setLocalStream]);

    const connect = useCallback(async () => {
        setCanConnect(false);

        let options = defaultOptions;
        if (config.receiveOnly) {
            options.audio.direction = 'recvonly';
            options.video.direction = 'recvonly';
        }
        // if (['H264', 'VP8', 'VP9'].includes(this.props.videoCodec)) {
        //   options.video.codec = this.props.videoCodec;
        // }
        const conn = AyameConnection(config.wsUrl, config.roomId, options);
        conn.on('disconnect', () => {
            setRemoteStream(null);
            setDataChannel(null);
            log('Disconnected.');
            disconnected();
        });
        conn.on('addstream', (e: RTCTrackEvent) => {
            console.log('addstream', e.track.kind);
            if (e.track.kind === 'audio') {
                setAudioRemoteStream(e.streams[0]);
                log('Connected to remote audio.');
            } else {
                setRemoteStream(e.streams[0]);
                log('Connected to remote client.');
            }
        });
        conn.on('open', () => {
            setConnection(conn);
            conn.createDataChannel(DataChannelLabel, { ordered: true }).then(
                (dc) => {
                    setDataChannel(dc);
                    log(`  Created Data Channel. ${dc != null}`);
                },
            );
            log('Connected to signaling server.');
            setCanDisconnect(true);
        });
        conn.on('connect', () => {
            log('  Connect P2P Channel.');
        });
        conn.on('datachannel', (dc: RTCDataChannel | null) => {
            setDataChannel(dc);
            log(`  Receive Data Channel. ${dc != null}`);
        });
        let localStream: MediaStream | null = null;
        if (!config.receiveOnly) {
            localStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
        }
        log(`Start a ${config.receiveOnly ? 'receive only ' : ''}connection.`);
        await conn.connect(localStream);
        setLocalStream(localStream);
    }, [
        config.receiveOnly,
        config.roomId,
        config.wsUrl,
        disconnected,
        log,
        setAudioRemoteStream,
        setDataChannel,
        setLocalStream,
        setRemoteStream,
    ]);

    const disconnect = useCallback(() => {
        if (connection != null) {
            connection.disconnect();
        }
        disconnected();
    }, [connection, disconnected]);

    return (
        <Buttons>
            <Button type="button" onClick={connect} disabled={!canConnect}>
                接続
            </Button>
            <Button
                type="button"
                onClick={disconnect}
                disabled={!canDisconnect}
            >
                切断
            </Button>
        </Buttons>
    );
};

const Buttons = styled.div`
    margin: 0 2rem;
`;
const Button = styled.button`
    height: 2.75em;
    width: 8em;
    margin: 0 5px 20px 5px;
    padding: 0.5em 0.7em 0.5em 0.7em;
    background-color: #4285f4;
    border: none;
    border-radius: 2px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 0.8em;
    cursor: pointer;
    ${(props) => props.disabled && disabledCss}
`;
const disabledCss = css`
    opacity: 0.5;
    cursor: default;
`;

export default WebRTCConnector;
