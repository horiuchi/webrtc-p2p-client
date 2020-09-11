type SendData =
    | {
          id: number;
          type: 'config';
          data: ConfigEventData;
      }
    | {
          id: number;
          type: 'touch';
          data: TouchEventData[];
      };

export interface ConfigEventData {
    height: number;
    width: number;
}

export interface TouchEventData {
    x: number;
    y: number;
    t: number;
}

export function sendConfigEvent(
    channel: RTCDataChannel | null,
    data: ConfigEventData,
): void {
    sendEvent(channel, {
        id: 0,
        type: 'config',
        data,
    });
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
    if (channel == null || channel.readyState !== 'open') {
        console.warn(
            'Fail to send event. Because the data channel is null or not opened.',
            data,
        );
        return;
    }
    data.id = id++;
    channel.send(JSON.stringify(data));
}
