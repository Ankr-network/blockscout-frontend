import loadable from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';

export const RequestComposer = loadable(
  async () =>
    import('./RequestComposer').then(module => module.RequestComposer),
  { fallback: <OverlaySpinner /> },
);
