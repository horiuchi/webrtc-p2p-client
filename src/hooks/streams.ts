import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const localStreamState = atom<MediaStream | null>({
    key: 'streams/localStream',
    default: null,
});
const remoteStreamState = atom<MediaStream | null>({
    key: 'streams/remoteStream',
    default: null,
});

export function useGetStreams() {
    const localStream = useRecoilValue(localStreamState);
    const remoteStream = useRecoilValue(remoteStreamState);
    return { localStream, remoteStream };
}

export function useSetLocalStream(stream: MediaStream | null): void {
    const setStream = useSetRecoilState(localStreamState);
    setStream(stream);
}

export function useSetRemoteStream(stream: MediaStream | null): void {
    const setStream = useSetRecoilState(remoteStreamState);
    setStream(stream);
}
