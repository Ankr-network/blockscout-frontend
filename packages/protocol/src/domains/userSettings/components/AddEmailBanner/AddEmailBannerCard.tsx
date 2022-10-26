import { AddEmailBannerContent } from './components/AddEmailBannerContent';
import { ContainerCard } from './components/ContainerCard/ContainerCard';
import { IUseAddEmailBannerCardProps } from './types';
import { useAddEmailBanner } from './useAddEmailBanner';

export const AddEmailBannerCard = (props: IUseAddEmailBannerCardProps) => {
  const { title, contentProps } = useAddEmailBanner(props);

  return (
    <ContainerCard title={title}>
      <AddEmailBannerContent {...contentProps} />
    </ContainerCard>
  );
};
