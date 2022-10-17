import { SolanaMethod } from 'domains/requestComposer/constants/solana';

export interface CodeSampleParams {
  method: SolanaMethod;
  params?: string[];
  url: string;
  imports: Import[];
}

export interface Import {
  items: string[];
  library: string;
}

export const getCodeSample = ({
  imports,
  method,
  params = [],
  url,
}: CodeSampleParams) => `
${imports.map(
  ({ items, library }) => `import { ${items.join(', ')} } from '${library}';`,
)}

(async () => {
  const provider = new Connection('${url}');

  const result = await provider.${method}${
  params
    ? `(
    ${params.join(',\n    ')}
  );`
    : '();'
}

  console.log(result);
})();
`;
