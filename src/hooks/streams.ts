import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const localStreamState = atom<MediaStream | null>({
    key: 'streams/localStream',
    default: null,
});
const remoteStreamState = atom<MediaStream | null>({
    key: 'streams/remoteStream',
    default: null,
});
const remoteAudioStreamState = atom<MediaStream | null>({
    key: 'streams/remoteAudioStream',
    default: null,
});
const dataChannelState = atom<RTCDataChannel | null>({
    key: 'streams/dataChannel',
    default: null,
});

export function useGetStreams() {
    const localStream = useRecoilValue(localStreamState);
    const remoteStream = useRecoilValue(remoteStreamState);
    const remoteAudioStream = useRecoilValue(remoteAudioStreamState);
    const dataChannel = useRecoilValue(dataChannelState);
    return { localStream, remoteStream, remoteAudioStream, dataChannel };
}

export function useSetLocalStream() {
    return useSetRecoilState(localStreamState);
}

export function useSetRemoteStream() {
    return useSetRecoilState(remoteStreamState);
}

export function useSetAudioRemoteStream() {
    return useSetRecoilState(remoteAudioStreamState);
}

export function useSetDataChannel() {
    return useSetRecoilState(dataChannelState);
}
