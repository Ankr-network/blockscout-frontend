import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';

ClassNameGenerator.configure(() =>
  typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap'
    ? 'snap'
    : 'jss',
);
