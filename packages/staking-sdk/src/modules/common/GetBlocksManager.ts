import Web3 from 'web3';
import { BlockTransactionObject } from 'web3-eth';

type TWeb3BatchCallback<T> = (err: Error | null, data: T) => void;
type TWeb3Call<T> = (callback: TWeb3BatchCallback<T>) => T;

/**
 * Limit of cached blocks. If we have more than this limit, we will clear cache partially.
 */
const CACHE_COUNT_LIMIT = 2000;

/**
 * The flag to enable/disable logs.
 */
const IS_LOG_ENABLED = false;

/**
 * Class to get blocks by hashes. It uses cache to avoid unnecessary requests.
 *
 * @class
 * @example
 * const getBlocksManager = new GetBlocksManager();
 * const blocks = await getBlocksManager.getBlocks(web3, blocksHashes);
 */
export class GetBlocksManager {
  /**
   * Cache for blocks.
   *
   * @type {Record<string, BlockTransactionObject>}
   * @private
   */
  private cachedBlocks: Record<string, BlockTransactionObject> = {};

  /**
   * Internal function to get blocks by hashes. It uses cache to avoid unnecessary requests.
   *
   * @public
   * @param  {Web3}  web3 - web3 instance.
   * @param  {string[]}  blocksHashes - blocks hashes to get.
   * @return  {Promise<BlockTransactionObject[]>}  blocks data.
   */
  public async getBlocks(
    web3: Web3,
    blocksHashes: string[],
  ): Promise<BlockTransactionObject[]> {
    const blocksFromCache = this.getBlocksFromCache(blocksHashes);
    const isAllBlocksFromCache = blocksFromCache.length === blocksHashes.length;

    this.log(
      'cachedBlocks in the beginning:',
      Object.keys(this.cachedBlocks).length,
    );

    if (isAllBlocksFromCache) {
      this.log('all blocks from cache');
      return blocksFromCache;
    }

    // We are collecting blocks hashes to get from blockchain.
    const blocksHashesToGet = blocksHashes.filter(
      blockHash => !this.cachedBlocks[blockHash],
    );

    const calls = blocksHashesToGet.map(
      blockHash => (callback: TWeb3BatchCallback<BlockTransactionObject>) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/ChainSafe/web3.js/issues/4655
        web3.eth.getBlock.request(blockHash, false, callback),
    );

    const blocks = await this.executeBatchCalls<BlockTransactionObject>(
      web3,
      calls,
    );

    this.log({
      callsLength: calls.length,
      usedFromCache: blocksFromCache.length,
      blocks,
    });

    this.saveBlocksToCache(blocks);

    return blocksFromCache.concat(blocks);
  }

  /**
   * Returns blocks from cache by specified hashes.
   *
   * @private
   * @param {string[]} blocksHashes - blocks hashes
   * @return  {BlockTransactionObject[]} blocks data.
   */
  private getBlocksFromCache(blocksHashes: string[]): BlockTransactionObject[] {
    return blocksHashes.reduce<BlockTransactionObject[]>((acc, blockHash) => {
      if (this.cachedBlocks[blockHash]) {
        acc.push(this.cachedBlocks[blockHash]);
      }

      return acc;
    }, []);
  }

  /**
   * Function to save blocks to cache. It also optimizes cache size.
   *
   * @private
   * @param {BlockTransactionObject[]} blocks - blocks to save to cache
   * @return {void}
   */
  private saveBlocksToCache(blocks: BlockTransactionObject[]): void {
    this.optimizeCachedBlocks(blocks.length);

    blocks.forEach(block => {
      this.cachedBlocks[block.hash] = block;
    });
  }

  /**
   * Function to optimize cached blocks. It removes old blocks from cache.
   *
   * @private
   * @param {number} newBlocksCount - count of new blocks to add to cache
   * @return {void}
   */
  private optimizeCachedBlocks(newBlocksCount: number): void {
    const cachedBlocksKeys = Object.keys(this.cachedBlocks);

    const isLimitReached =
      cachedBlocksKeys.length + newBlocksCount > CACHE_COUNT_LIMIT;

    if (isLimitReached) {
      const keysToRemove = cachedBlocksKeys.slice(0, newBlocksCount);
      this.log('limit reached, removing keys count', keysToRemove.length);

      keysToRemove.forEach(key => {
        delete this.cachedBlocks[key];
      });
    }
  }

  /**
   * `executeBatchCalls` is supposed to decrease calls to blockchain.
   * It only sends one request and returns data from each call.
   *
   * @public
   * @param {Web3} web3 - web3 instance
   * @param {TWeb3Call<T>[]} calls - web3 calls
   * @returns array of return values from web3 calls
   */
  public async executeBatchCalls<T>(
    web3: Web3,
    calls: TWeb3Call<T>[],
  ): Promise<T[]> {
    const batch = new web3.eth.BatchRequest();

    const promises = calls.map(
      call =>
        new Promise<T>((res, rej) => {
          const callback: TWeb3BatchCallback<T> = (err, data) =>
            err ? rej(err) : res(data);

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore https://github.com/ChainSafe/web3.js/issues/4655
          batch.add(call(callback));
        }),
    );

    batch.execute();

    return Promise.all(promises);
  }

  /**
   * Function to log messages.
   *
   * @private
   * @param  {any[]} args - arguments to log
   * @return {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private log(...args: any[]): void {
    if (IS_LOG_ENABLED) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  }
}
