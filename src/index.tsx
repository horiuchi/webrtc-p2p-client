import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainFrame from 'components/MainFrame';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <MainFrame />
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root'),
);
