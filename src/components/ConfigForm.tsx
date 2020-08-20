import React from 'react';
import styled from 'styled-components';
import { useConnectWsUrlState, useConnectRoomIdState } from 'hooks/config';

const ConfigForm: React.FC = () => {
    const [wsUrl, onChangeWsUrl] = useConnectWsUrlState();
    const [roomId, onChangeRoomId] = useConnectRoomIdState();
    // const [receiveOnly, onChangeReceiveOnly] = useConnectReceiveOnlyState();

    return (
        <Inputs>
            <InputRow>
                <label htmlFor="url">シグナリングサーバのURL:</label>
                <TextBox
                    id="url"
                    type="text"
                    onChange={onChangeWsUrl}
                    value={wsUrl}
                />
            </InputRow>
            <InputRow>
                <label htmlFor="roomId">部屋のID:</label>
                <TextBox
                    id="roomId"
                    type="text"
                    onChange={onChangeRoomId}
                    value={roomId}
                />
            </InputRow>
            {/* <InputRow>
                <label htmlFor="receive-only">受信Only:</label>
                <CheckBox
                    id="receive-only"
                    type="checkbox"
                    onChange={onChangeReceiveOnly}
                    checked={receiveOnly}
                />
            </InputRow> */}
        </Inputs>
    );
};

const Inputs = styled.form`
    margin: 0 2rem;
`;
const InputRow = styled.div`
    margin: 1rem;
`;

const TextBox = styled.input`
    width: 12rem;
    margin: 0 0.2rem;
`;
// const CheckBox = styled.input`
//     margin: 0 0.2rem;
// `;

export default ConfigForm;
