// @flow
import React from 'react';
import Big from 'bignumber.js';
import { BaseWallet } from 'libs/wallet';
import type { NetworkConfig } from 'config/data';
import type { State } from 'reducers';
import { connect } from 'react-redux';
import { getWalletInst, getTokenBalances } from 'selectors/wallet';
import type { TokenBalance } from 'selectors/wallet';
import { getNetworkConfig } from 'selectors/config';
import * as customTokenActions from 'actions/customTokens';
import { showNotification } from 'actions/notifications';

import AccountInfo from './AccountInfo';
import Promos from './Promos';
import TokenBalances from './TokenBalances';
import EquivalentValues from './EquivalentValues';
import { Ether } from 'libs/units';

type Props = {
  wallet: BaseWallet,
  balance: Ether,
  network: NetworkConfig,
  tokenBalances: TokenBalance[],
  rates: { [string]: number },
  showNotification: Function,
  addCustomToken: typeof customTokenActions.addCustomToken,
  removeCustomToken: typeof customTokenActions.removeCustomToken
};

export class BalanceSidebar extends React.Component {
  props: Props;

  render() {
    const { wallet, balance, network, tokenBalances, rates } = this.props;
    if (!wallet) {
      return null;
    }

    const blocks = [
      {
        name: 'Account Info',
        content: (
          <AccountInfo wallet={wallet} balance={balance} network={network} />
        )
      },
      {
        name: 'Promos',
        isFullWidth: true,
        content: <Promos />
      },
      {
        name: 'Token Balances',
        content: (
          <TokenBalances
            tokens={tokenBalances}
            onAddCustomToken={this.props.addCustomToken}
            onRemoveCustomToken={this.props.removeCustomToken}
          />
        )
      },
      {
        name: 'Equivalent Values',
        content: <EquivalentValues balance={balance} rates={rates} />
      }
    ];

    return (
      <aside>
        {blocks.map(block =>
          <section
            className={`Block ${block.isFullWidth ? 'is-full-width' : ''}`}
            key={block.name}
          >
            {block.content}
          </section>
        )}
      </aside>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    wallet: getWalletInst(state),
    balance: state.wallet.balance,
    tokenBalances: getTokenBalances(state),
    network: getNetworkConfig(state),
    rates: state.rates
  };
}

export default connect(mapStateToProps, {
  ...customTokenActions,
  showNotification
})(BalanceSidebar);
