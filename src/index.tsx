import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/index.tsx';

const root = document.getElementById('root');

if (!root) {
   throw new Error('rood if not defined');
}

const container = createRoot(root);

container.render(
   <StrictMode>
      <App />
   </StrictMode>,
);
