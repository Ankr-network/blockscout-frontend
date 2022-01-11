declare module 'limit-concurrency-decorator' {
  // eslint-disable-next-line @typescript-eslint/ban-types
  export const limitConcurrency: (threads: number) => Function;
}
