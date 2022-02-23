import Web3 from 'web3';

export class MockBatchRequest {
  private requests: (() => number)[] = [];

  public add(request: () => number): void {
    this.requests.push(request);
  }

  public execute(): void {
    this.requests = [];
  }
}

// @ts-ignore
Web3.providers = {
  HttpProvider: jest.fn(),
};

export const mockWeb3 = {
  eth: { BatchRequest: MockBatchRequest },
  setProvider: jest.fn(),
} as unknown as Web3;
