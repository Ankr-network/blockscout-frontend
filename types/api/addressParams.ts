export interface AddressTag {
  label: string;
  display_name: string;
  address_hash: string;
}

export interface WatchlistName {
  label: string;
  display_name: string;
}

export interface AddressParam {
  hash: string;
  implementation_name: string | null;
  name: string | null;
  is_contract: boolean;
  is_verified: boolean | null;
  private_tags: Array<AddressTag> | null;
  watchlist_names: Array<WatchlistName> | null;
  public_tags: Array<AddressTag> | null;
}