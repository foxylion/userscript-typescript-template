import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '@mui/material';

export default function () {
  const root = document.createElement('div');
  root.style.position = 'absolute';
  root.style.left = '50%';
  root.style.top = '0';
  root.style.zIndex = '100000';
  document.body.appendChild(root);
  renderApp(root);
}

const renderApp = (element: Element) => {
  const reactRoot = createRoot(element);
  reactRoot.render(<App />);
};

export const App: React.FC = () => {
  return (
    <div>
      <Button onClick={() => window.alert('Success!')}>Hello World!</Button>
    </div>
  );
};
