import { SelectChangeEvent } from '@mui/material';
import { useMemo } from 'react';

import { ProjectSelect } from 'modules/common/components/ProjectSelect';
import { useProjectSelect } from 'modules/common/components/ProjectSelect/hooks/useProjectSelect';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { Chain, ChainID, ChainSubType, ChainType } from 'modules/chains/types';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { ISelectOption } from 'uiKit/Select';
import { ProjectOption } from 'domains/enterprise/components/EnterpriseApiKeysSelect/useEnterpriseApiKeySelect';
import {
  ChainSubTypeItem,
  ChainTypeItem,
} from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainItem';

import { ChainSelector } from '../ChainSelector';
import { SubTypeSelector } from '../SubTypeSelector';
import { PrivateChainSelectedContent } from '../PrivateChainSelectedContent';
import { useDashboardStyles } from '../../useDashboardStyles';
import { usePrivateChainSelector } from '../../hooks/usePrivateChainSelector';
import { useSelectorVisibility } from '../ChainSelector/useSelectorVisibility';
import { useDashboardProjects } from '../../hooks/useDashboardProjects';

interface ISelectorContentProps {
  projectOptionsV2: ProjectOption[];
  handleSetOptionV2: (value: string) => void;
  selectOptionV2: string;
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
  projectOptionsV2,
  handleSetOptionV2,
  selectOptionV2,
  selectedChainId,
  handleChange,
  renderValue,
  chainSelectOptions,
  networksConfigurations,
  chainSubType,
  chainSubTypes,
  selectSubType,
  showAdditionalSelect,
  chainType,
  chainTypes,
  selectType,
  groups,
  groupID,
  selectGroup,
  isTestnetOnlyChainSelected,
}: ISelectorContentProps) => {
  const { classes } = useDashboardStyles();

  const { isEnterpriseClient } = useEnterpriseClientStatus();

  const { classNameMenuItem, menuProps } = usePrivateChainSelector();

  const selectProps = useSelectorVisibility();

  const { shouldShowTokenManager } = useDashboardProjects();

  const {
    options: projectOptionsV1,
    handleSetOption: handleSetOptionV1,
    selectedOption: selectedOptionV1,
  } = useProjectSelect();

  const projectSelectProps = useMemo(() => {
    if (isEnterpriseClient) {
      return {
        classNameMenuItem,
        menuProps,
        selectProps,
        options: projectOptionsV2,
        handleSetOption: handleSetOptionV2,
        selectedOption: selectOptionV2,
      };
    }

    return {
      classNameMenuItem,
      menuProps,
      selectProps,
      options: projectOptionsV1,
      handleSetOption: handleSetOptionV1,
      selectedOption: selectedOptionV1,
    };
  }, [
    classNameMenuItem,
    handleSetOptionV1,
    handleSetOptionV2,
    isEnterpriseClient,
    menuProps,
    projectOptionsV1,
    projectOptionsV2,
    selectOptionV2,
    selectProps,
    selectedOptionV1,
  ]);

  return (
    <div className={classes.selectorContent}>
      {shouldShowTokenManager && (
        <div className={classes.projectSelect}>
          <ProjectSelect {...projectSelectProps} />
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
