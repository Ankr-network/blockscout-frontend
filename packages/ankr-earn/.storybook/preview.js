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
            opacity: 0.5;
          }
        `,
      }}
    />
    <pre className="story-path">{ctx.parameters.fileName}</pre>
    <hr />
    <br />
    {story()}
  </AppShell>
));
