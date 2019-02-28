import { observable, computed, action, decorate } from "mobx";
import {firebaseApp } from "../config";
import moment from 'moment'

class UserState {
    user = {};
    loading = false;

    async doLogin(id, pass){
        this.loading = true;
        const result = await loginHandler(id, pass, 'email').then(res=> {
            if (res.hasOwnProperty('_id')) {
                this.user = res;
            }
            return res;
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


async function loginHandler(id, pass, how) {
    let result;
    if (how === "email") result = await emailLoginHandler(id, pass);
    return result;
}

async function emailLoginHandler(email, pass) {
    const result = await firebaseApp.auth()
        .signInWithEmailAndPassword(email, pass).catch(err => err);
    if (result.user) {
        return new UserModel(result.user);
    }
    return new ErrorModel(result);
}

class UserModel {
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

class ErrorModel {
    constructor(err) {
        this._errorCode = err.code;
        this._errorMessage = err.message;
        this._date =  moment.utc();
    }

    getMessage() {
        return this._errorMessage;
    }
}

// class Todo {
//   value
//   id
//   complete

//   constructor(value) {
//     this.value = value;
//     this.id = Date.now();
//     this.complete = false;
//   }
// }

// const todoClass = decorate(Todo, {
//   value: observable,
//   id: observable,
//   complete: observable,
// })

// class UserState {
//   todos = [];
//   filter = "";
//   get filteredTodos() {
//     let matchesFilter = new RegExp(this.filter, "i");
//     return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value));
//   }
 
//   createTodo = (value) => {
//     this.todos.push(new todoClass(value));
//   }

//   clearComplete = () => {
//     const incompleteTodos = this.todos.filter(todo => !todo.complete)
//     this.todos.replace(incompleteTodos);
//   }

// }

// export default decorate(UserState, {
//   todos: observable,
//   filter: observable,
//   filteredTodos: computed,
//   createTodo: action,
//   clearComplete: action,
// });