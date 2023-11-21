import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

import welcome from './assets/welcome.png';

export type ProjectsWelcomeImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const ProjectsWellcomeImage = (props: ProjectsWelcomeImageProps) => (
  <img {...props} alt="welcome" src={welcome} />
);
