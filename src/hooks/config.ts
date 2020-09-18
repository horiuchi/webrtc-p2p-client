import { atom, useRecoilValue, useRecoilState, RecoilState } from 'recoil';
import { useCallback } from 'react';
import { randomString } from '../utils';

const DefaultWsUrl =
    'wss://0j1sxcggc0.execute-api.ap-northeast-1.amazonaws.com/Dev';

const receiveOnlyState = atom({
    key: 'config/receiveOnly',
    default: true,
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
export function useGetConfigValues(): Config {
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
