import * as AuthActions from './auth.actions'

export interface State {
    token: string;
    authenticated: boolean;
    uid: string;
}

const initialState: State = {
    token : null,
    authenticated : false,
    uid : null
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.SIGNUP:
        case AuthActions.SIGNIN:
            console.log("SIGIN/SIGNUP" + action.payload);
            return {
                ...state,
                authenticated: true,
                uid: action.payload
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                authenticated: false,
                token: null
            }
        case AuthActions.SET_TOKEN:
            console.log("SET TOKEN " + action.payload)
            return {
                ...state,
                token: action.payload
            }
        default:
            return state
    }
}