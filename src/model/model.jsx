import moment from 'moment'


export class UserModel {
    constructor(user) {
        this._id = user.email;
        this._meta = user.metadata;
        this._photURL = user.photURL || 'no image url is here';
        this.isLogin = !!user;
    }
    getId() {
        return this._id;
    }
    getLastLoginDate() {
        const lastLoginDate =  moment(this._meta.lastSignInTime);
        return lastLoginDate;
    }
}

export class ErrorModel {
    constructor(err) {
        this._errorCode = err.code;
        this._errorMessage = err.message;
        this._date =  moment.utc();
    }

    getMessage() {
        return this._errorMessage;
    }
}

export class AccountingItemModel {
    constructor(name) {
        this.name = name;
        this.fee = 0;
        this.isConfirmed = false;
        this.userRate = 0;
    }
}