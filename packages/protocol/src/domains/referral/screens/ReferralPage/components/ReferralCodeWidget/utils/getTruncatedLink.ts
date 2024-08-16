export interface IGetTruncatedLinkParams {
  code: string;
  link: string;
}

export const getTruncatedLink = ({ code, link }: IGetTruncatedLinkParams) => {
  if (!link) {
    return link;
  }

  const url = new URL(link);

  return `${url.origin}/...${code}`;
};
