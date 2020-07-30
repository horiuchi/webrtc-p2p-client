import { atom, useRecoilValue, useRecoilState } from 'recoil';

const maxMessagesCount = 10;

const messagesState = atom<string[]>({
    key: 'messages',
    default: [
        'test message',
        'second line',
        'very very very very very very long long message.',
    ],
});

export function useGetMessages(): string[] {
    return useRecoilValue(messagesState);
}

export function useAppendMessage(msg: string): void {
    const [messages, setMessages] = useRecoilState(messagesState);
    const newMessages = messages.concat(msg);
    while (newMessages.length > maxMessagesCount) {
        newMessages.shift();
    }
    setMessages(newMessages);
}
