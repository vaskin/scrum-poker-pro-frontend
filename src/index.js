import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import HttpService from './services/HttpService';
import UserService from './services/UserService';

Sentry.init({
  dsn: 'https://c653e93f5c4e446c842be01eec07dd38@o1125778.ingest.sentry.io/6167703',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const renderApp = () =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(<App />, document.getElementById('app'));

UserService.initKeycloak(renderApp);
HttpService.configure();
