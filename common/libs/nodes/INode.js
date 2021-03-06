// @flow
import Big from 'bignumber.js';
import type { TransactionWithoutGas } from 'libs/messages';
import type { Token } from 'config/data';
import type { Wei } from 'libs/units';

export interface INode {
  getBalance(_address: string): Promise<Wei>,
  getTokenBalance(_address: string, _token: Token): Promise<Big>,
  getTokenBalances(_address: string, _tokens: Token[]): Promise<Big>,
  estimateGas(_tx: TransactionWithoutGas): Promise<Big>,
  getTransactionCount(_address: string): Promise<string>,
  sendRawTx(_tx: string): Promise<string>
}
