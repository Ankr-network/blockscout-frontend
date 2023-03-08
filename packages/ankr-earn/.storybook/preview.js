import { addDecorator } from '@storybook/react';
import React from 'react';
import 'regenerator-runtime';
import '../src/assets/fonts/style.css';
import { AppShell } from './componets/AppShell';

addDecorator((story, ctx) => (
  <AppShell>
    <style
      dangerouslySetInnerHTML={{
        __html: `
          body {
            background: #F2F5FA;
          }
          #root {
            height: 100%;
            width: 100%;
            font-family: 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .story-path {
            overflow-y: auto;
            position: fixed;
            bottom: 0;
            left: 0;
            max-width: 100vw;
            padding: 5px 5px;
            background: rgba(255, 255, 255, 0.4);
            color: gray;
            font-family: monospace;
            font-size: 12px;
          }
        `,
      }}
    />
    {story()}
    <div className="story-path">{ctx.parameters.fileName}</div>
  </AppShell>
));
