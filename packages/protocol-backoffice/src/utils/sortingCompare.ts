export const compareString =
  (key: string) => (a: Record<string, any>, b: Record<string, any>) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  };

export const compareNumber =
  (key: string) => (a: Record<string, any>, b: Record<string, any>) => {
    if (+a[key] < +b[key]) return -1;
    if (+a[key] > +b[key]) return 1;
    return 0;
  };
