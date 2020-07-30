import { atom, useRecoilValue, useRecoilCallback } from 'recoil';

const maxMessagesCount = 10;

const messagesState = atom<string[]>({
    key: 'messages',
    default: [],
});

export function useGetMessages(): string[] {
    return useRecoilValue(messagesState);
}

export function useAppendMessage() {
    return useRecoilCallback(({ snapshot, set }) => async (msg: string) => {
        const messages = await snapshot.getPromise(messagesState);
        const newMessages = Object.assign([], messages);
        newMessages.push(msg);
        while (newMessages.length > maxMessagesCount) {
            newMessages.shift();
        }
        set(messagesState, newMessages);
    });
}
