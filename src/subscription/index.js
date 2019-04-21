import { PubSub } from 'apollo-server';

import * as BANK_ACCOUNT_EVENTS from './bank_account';

export const EVENTS = {
  BANK_ACCOUNT: BANK_ACCOUNT_EVENTS,
};

export default new PubSub();
