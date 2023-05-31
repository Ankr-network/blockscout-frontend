export enum EndpointType {
  Devnet = 'devnet',
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export enum MixpanelEvent {
  ADD_EMAIL = 'add-email',
  ADD_NETWORK_IN_MM = 'add_network_in_mm',
  CLICK_AAPI = 'click_aapi',
  ENTER_BILLING_FLOW = 'enter_billing_flow',
  ENTER_ENDPOINTS_FLOW = 'enter_endpoints_flow',
  ENTER_SETTINGS = 'enter_settings',
  READ_DOCS = 'read_docs',
  SELECT_CHAIN_TAB = 'select_chain_tab',
  SHOW_LAST_10_REQUESTS = 'show_last_10_requests',
  SIGN_OUT = 'sign_out',
  SIGN_UP_FAILIED = 'sign_up_failed',
  SIGN_UP_MODAL_CLOSED = 'sign_up_modal_closed',
  SIGN_UP_MODAL_OPENED = 'sign_up_modal_opened',
  SIGN_UP_SUCCEEDED = 'sign_up_succeeded',
  SOON_ENTERPRISE = 'soon_enterprise',
  TOP_UP_BALANCE_FLOW = 'top_up_balance_flow',
  UPGRADE_PLAN_MODAL_CLICKED = 'upgrade_plan_modal_clicked',
  UPGRADE_PLAN_MODAL_CLOSED = 'upgrade_plan_modal_closed',
  UPGRADE_PLAN_MODAL_OPENED = 'upgrade_plan_modal_opened',
}

export enum TopUpCurrnecy {
  ANKR = 'ANKR',
  USD = 'USD',
}
