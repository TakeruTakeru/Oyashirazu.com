import { observable, computed, action, decorate } from "mobx";
import {loginHandler} from '../api/firebase';
import { UserModel, ErrorModel } from '../model/model';

class UserState {
    user = {};
    loading = false;

    async doLogin(id, pass){
        this.loading = true;
        const result = await loginHandler(id, pass, 'email').then(res=> {
            let model = (res.user && new UserModel(res.user)) || new ErrorModel(res);
            this.user = (model.hasOwnProperty('_id') && model) || {};
            return model;
        });
        this.loading = false;
        return result;
    }

    get getUserState() {
        return this.user;
    }
}

export default decorate(UserState, {
    user: observable,
    loading: observable,
    doLogin: action,
    getUserState: computed,
})