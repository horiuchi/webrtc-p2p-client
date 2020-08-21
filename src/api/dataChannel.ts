type SendData = {
    id: number;
    type: 'touch';
    data: TouchEventData[];
};

export interface TouchEventData {
    x: number;
    y: number;
    t: number;
}

export function sendTouchEvents(
    channel: RTCDataChannel | null,
    data: TouchEventData[],
): void {
    sendEvent(channel, {
        id: 0,
        type: 'touch',
        data,
    });
}

let id = 1;

function sendEvent(channel: RTCDataChannel | null, data: SendData) {
    if (channel == null) {
        console.warn(
            'Fail to send event. Because the data channel is null.',
            data,
        );
        return;
    }
    data.id = id++;
    channel.send(JSON.stringify(data));
}
