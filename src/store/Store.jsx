import UserStore from './UserState';
import AccountingState from './AccountingState';

const store = {
    userState: new UserStore(),
    accounting: new AccountingState(),
}

export default store;