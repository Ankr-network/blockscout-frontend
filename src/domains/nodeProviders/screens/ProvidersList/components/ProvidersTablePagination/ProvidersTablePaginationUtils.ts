export const VISIBLE_PAGES = 4;

export const getPageNumbers = (
  isMobile: boolean,
  pagesCount: number,
  pageIndex: number,
): number[] => {
  const start = Math.max(0, pageIndex - 2);
  const end = Math.min(start + VISIBLE_PAGES, pagesCount);

  const pageNumbers: number[] = [];

  if (!isMobile) {
    for (let i = 1; i <= pagesCount; i += 1) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }

  for (let i = start + 1; i <= end; i += 1) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};
