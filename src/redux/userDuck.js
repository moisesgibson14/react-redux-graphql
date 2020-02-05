import {loginWithGoogle, signOutGoogle} from '../firebase'

// Constant
let initialData = {
    loggedIn: false,
    fetching:false
}

let LOGIN = "LOGIN";
let LOGGIN_SUCCESS = "LOGGIN_SUCCESS"
let LOGGIN_ERROR = "LOGGIN_ERROR"
let LOG_OUT = "LOG_OUT"

// Reducer

export default function reducer(state = initialData, action ){
    switch (action.type) {
        case LOG_OUT:
            return {...initialData}
        case LOGIN:
            return {...state, fetching:true}
        case LOGGIN_SUCCESS:
            return {...state, fetching:false, ...action.payload, loggedIn:true}
        case LOGGIN_ERROR:
            return {...state, fetching:false, payload:action.payload}
        default:
            return state;
    }
}
// aux

function saverStorage(storage){
    localStorage.storage = JSON.stringify(storage)
}

// Action (Actions Create)

export let restoreSessionAction = () => dispatch => {
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage);
    if(storage && storage.user){
        dispatch({
            type:LOGGIN_SUCCESS,
            payload: storage.user
        })
    }
}

export let logOutAction = () => (dispatch, getState) => {
    signOutGoogle()
    dispatch({
        type: LOG_OUT
    })
    localStorage.removeItem('storage')
}


export let doGoogleLoginAction = () => (dispatch, getState) => {
    dispatch({
        type: LOGIN
    })
    return loginWithGoogle()
        .then(user => {
            dispatch({
                type: LOGGIN_SUCCESS,
                payload: {
                    uid:user.uid,
                    displayName: user.displayName,
                    email:user.email,
                    photoURL: user.photoURL
                }
            })
            saverStorage(getState())
        })
        .catch( e => {
            dispatch({
                type: LOGGIN_ERROR,
                payload: e.message
            })
        })
}