import { addDecorator } from '@storybook/react';
import React from 'react';
import 'regenerator-runtime';
import { AppShell } from './componets/AppShell';

addDecorator((story, ctx) => (
  <AppShell>
    <style
      dangerouslySetInnerHTML={{
        __html: `
          html, body {
            background: #F2F5FA;
            height: 100%;
          }
          #root {
            height: 100%;
            width: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .story-path {
            overflow-y: auto;
            opacity: 0.5;
          }

          * {
            box-sizing: border-box;
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
