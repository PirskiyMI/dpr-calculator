import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '../store';

export const withStore = (component: () => ReactNode) => () => {
   return <Provider store={setupStore()}>{component()}</Provider>;
};
