export const addCommaToArg = (arg = ' ') =>
  arg[arg.length - 1] === '\n' ? `${arg.slice(0, -1)}, ` : `${arg},`;
