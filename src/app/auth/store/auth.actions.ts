import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class Signup implements Action {
    readonly type = SIGNUP;
    constructor(public payload: string){};
}

export class Signin implements Action {
    readonly type = SIGNIN;
    constructor(public payload: string){};
}

export class TrySignIn implements Action {
    readonly type = TRY_SIGNIN;
    constructor(public payload: {email: string, password: string}){};
}

export class TrySignUp implements Action {
    readonly type = TRY_SIGNUP;
    constructor(public payload: {email: string, password: string}){};
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload: string){}
}


export type AuthActions = Signin | Signup | Logout | SetToken | TrySignIn | TrySignUp; 