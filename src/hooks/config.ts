import { atom, useRecoilValue, useRecoilState, RecoilState } from 'recoil';
import { useCallback } from 'react';
import { randomString } from '../utils';

const DefaultWsUrl = 'ws://127.0.0.1:3000/signaling';

const receiveOnlyState = atom({
    key: 'config/receiveOnly',
    default: false,
});
const wsUrlState = atom({
    key: 'config/wsUrl',
    default: DefaultWsUrl,
});
const roomIdState = atom({
    key: 'config/roomId',
    default: randomString(8),
});

export interface Config {
    wsUrl: string;
    roomId: string;
    receiveOnly: boolean;
}
export function useConfigValues(): Config {
    const wsUrl = useRecoilValue(wsUrlState);
    const roomId = useRecoilValue(roomIdState);
    const receiveOnly = useRecoilValue(receiveOnlyState);
    return { wsUrl, roomId, receiveOnly };
}

export function useConnectReceiveOnlyState(): [
    boolean,
    React.ChangeEventHandler<HTMLInputElement>,
] {
    const [value, setValue] = useRecoilState(receiveOnlyState);
    const onChangeValue = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.checked),
        [setValue],
    );
    return [value, onChangeValue];
}
export function useConnectWsUrlState(): [
    string,
    React.ChangeEventHandler<HTMLInputElement>,
] {
    return useConnectInputElement(wsUrlState);
}
export function useConnectRoomIdState(): [
    string,
    React.ChangeEventHandler<HTMLInputElement>,
] {
    return useConnectInputElement(roomIdState);
}

function useConnectInputElement(
    state: RecoilState<string>,
): [string, React.ChangeEventHandler<HTMLInputElement>] {
    const [value, setValue] = useRecoilState(state);
    const onChangeValue = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        [setValue],
    );
    return [value, onChangeValue];
}
