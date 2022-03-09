import { AnyAction, Action } from 'redux';

export type KnownModal =
  | typeof DIALOG_PRESENTATION
  | typeof DIALOG_GOVERNANCE_RULES_OF_PROPOSAL
  | typeof DIALOG_GOVERNANCE_PROJECT_CREATED
  | typeof DIALOG_GOVERNANCE_HOW_IT_WORKS
  | typeof DIALOG_ANKR_INSTRUCTIONS_VIDEO
  | typeof DIALOG_CREATE_NODE
  | typeof DIALOG_POLKADOT_EXTENSION
  | typeof DIALOG_ALERT;

export const DIALOG_PRESENTATION = 'DIALOG_PRESENTATION';
export const DIALOG_GOVERNANCE_RULES_OF_PROPOSAL =
  'DIALOG_GOVERNANCE_RULES_OF_PROPOSAL';
export const DIALOG_GOVERNANCE_PROJECT_CREATED =
  'DIALOG_GOVERNANCE_PROJECT_CREATED';
export const DIALOG_GOVERNANCE_HOW_IT_WORKS = 'DIALOG_GOVERNANCE_HOW_IT_WORKS';
export const DIALOG_ANKR_INSTRUCTIONS_VIDEO = 'DIALOG_ANKR_INSTRUCTIONS_VIDEO';
export const DIALOG_CREATE_NODE = 'DIALOG_CREATE_NODE';
export const DIALOG_POLKADOT_EXTENSION = 'DIALOG_POLKADOT_EXTENSION';
export const DIALOG_ALERT = 'DIALOG_ALERT';

export const OPEN_MODAL_ACTION = 'modal/OPEN';
export const CLOSE_MODAL_ACTION = 'modal/CLOSE';
export const RESET_STORE = 'reset/all';

export const openModalAction = (
  name: KnownModal,
  context?: unknown,
): AnyAction => ({
  type: OPEN_MODAL_ACTION,
  payload: { name, context },
});

export const closeModalAction = (): Action<string> => ({
  type: CLOSE_MODAL_ACTION,
});

export const openPresentationModal = (): AnyAction =>
  openModalAction(DIALOG_PRESENTATION);

export const openGovernanceRulesOfProposalModal = (): AnyAction =>
  openModalAction(DIALOG_GOVERNANCE_RULES_OF_PROPOSAL);

export const openGovernanceProjectCreatedModal = (): AnyAction =>
  openModalAction(DIALOG_GOVERNANCE_PROJECT_CREATED);
