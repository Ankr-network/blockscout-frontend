import { SelectChangeEvent } from '@mui/material';
import { Chain, ChainID, ChainSubType, ChainType } from '@ankr.com/chains-list';

import {
  ProjectSelect,
  SelectOption,
} from 'modules/common/components/ProjectSelect';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { ISelectOption } from 'uiKit/Select';
import {
  ChainSubTypeItem,
  ChainTypeItem,
} from 'domains/chains/screens/ChainPage/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainItem';
import { useHeaderBannerHeight } from 'modules/layout/components/HeaderBanner/useHeaderBannerHeight';

import { ChainSelector } from '../ChainSelector';
import { SubTypeSelector } from '../SubTypeSelector';
import { PrivateChainSelectedContent } from '../PrivateChainSelectedContent';
import { useDashboardStyles } from '../../useDashboardStyles';
import { usePrivateChainSelector } from '../../v1/hooks/usePrivateChainSelector';
import { useSelectorVisibility } from '../ChainSelector/useSelectorVisibility';
import { useDashboardProjects } from '../../v1/hooks/useDashboardProjects';

interface ISelectorContentProps {
  projectOptions: SelectOption[];
  handleSetOption: (value: string) => void;
  selectedOption: string;
  selectedChainId: ChainID;
  handleChange: (event: SelectChangeEvent<ChainID>) => void;
  renderValue: (value: ChainID) => JSX.Element;
  chainSelectOptions: ISelectOption[];
  networksConfigurations: Chain[];
  chainSubType?: ChainSubType;
  chainSubTypes: ChainSubTypeItem[];
  selectSubType: (id: ChainSubType) => void;
  showAdditionalSelect: boolean;
  chainType: ChainType;
  chainTypes: ChainTypeItem[];
  selectType: (id: ChainType) => void;
  groups: EndpointGroup[];
  groupID: ChainGroupID;
  selectGroup: (group: ChainGroupID) => void;
  isTestnetOnlyChainSelected: boolean;
}

export const SelectorsContent = ({
  chainSelectOptions,
  chainSubType,
  chainSubTypes,
  chainType,
  chainTypes,
  groupID,
  groups,
  handleChange,
  handleSetOption,
  isTestnetOnlyChainSelected,
  networksConfigurations,
  projectOptions,
  renderValue,
  selectGroup,
  selectSubType,
  selectType,
  selectedChainId,
  selectedOption,
  showAdditionalSelect,
}: ISelectorContentProps) => {
  const bannerHeight = useHeaderBannerHeight();
  const { classes } = useDashboardStyles(bannerHeight);

  const { classNameMenuItem, menuProps } = usePrivateChainSelector();

  const selectProps = useSelectorVisibility();

  const { shouldShowTokenManager } = useDashboardProjects();

  return (
    <div className={classes.selectorContent}>
      {shouldShowTokenManager && (
        <div className={classes.projectSelect}>
          <ProjectSelect
            classNameMenuItem={classNameMenuItem}
            menuProps={menuProps}
            selectProps={selectProps}
            options={projectOptions}
            handleSetOption={handleSetOption}
            selectedOption={selectedOption}
          />
        </div>
      )}
      <ChainSelector
        selectedChainId={selectedChainId}
        handleChange={handleChange}
        renderValue={renderValue}
        options={chainSelectOptions}
        classNameMenuItem={classNameMenuItem}
        menuProps={menuProps}
        chains={networksConfigurations}
      />
      {chainSubType && (
        <SubTypeSelector
          chainSubType={chainSubType}
          chainSubTypes={chainSubTypes}
          onSubTypeSelect={selectSubType}
          menuProps={menuProps}
          classNameMenuItem={classNameMenuItem}
        />
      )}
      {showAdditionalSelect && (
        <PrivateChainSelectedContent
          chainType={chainType}
          chainTypes={chainTypes}
          selectType={selectType}
          groups={groups}
          groupID={groupID}
          selectGroup={selectGroup}
          isTestnetOnlyChain={isTestnetOnlyChainSelected}
          classNameMenuItem={classNameMenuItem}
          menuProps={menuProps}
        />
      )}
    </div>
  );
};
