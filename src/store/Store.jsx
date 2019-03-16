import UserState from './UserState';
import AccountingState from './AccountingState';
import UiState from './UiState';

const store = {
    userState: new UserState(),
    accounting: new AccountingState(),
    uiState: new UiState(),
}

export default store;