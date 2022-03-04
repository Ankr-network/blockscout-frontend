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

export const mockWeb3 = {
  eth: { BatchRequest: MockBatchRequest },
} as unknown as Web3;
