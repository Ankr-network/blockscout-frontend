export interface ICheckInstantJwtParticipantResponse {
  is_participant: boolean;
}

export interface IGetOrCreateInstantJwt {
  jwt_data: string;
  is_encrypted: boolean;
}