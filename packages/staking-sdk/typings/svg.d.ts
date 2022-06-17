declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: (
    props: React.SVGProps<SVGSVGElement>,
  ) => React.ReactNode;
  const src: string;
  export default src;
}
