import { Palette } from '@mui/material';

export function getGlobalStyles(palette: Palette): string {
  return `
    a {
      font-size: inherit;
      text-decoration: none;
      color: ${palette.primary.main};
    }

    a:hover {
      text-decoration: underline;
    }
  `;
}
