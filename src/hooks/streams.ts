import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const localStreamState = atom<MediaStream | null>({
    key: 'streams/localStream',
    default: null,
});
const remoteStreamState = atom<MediaStream | null>({
    key: 'streams/remoteStream',
    default: null,
});
const dataChannelState = atom<RTCDataChannel | null>({
    key: 'streams/dataChannel',
    default: null,
});

export function useGetStreams() {
    const localStream = useRecoilValue(localStreamState);
    const remoteStream = useRecoilValue(remoteStreamState);
    const dataChannel = useRecoilValue(dataChannelState);
    return { localStream, remoteStream, dataChannel };
}

export function useSetLocalStream() {
    return useSetRecoilState(localStreamState);
}

export function useSetRemoteStream() {
    return useSetRecoilState(remoteStreamState);
}

export function useSetDataChannel() {
    return useSetRecoilState(dataChannelState);
}
