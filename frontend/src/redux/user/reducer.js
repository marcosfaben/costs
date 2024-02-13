import UserActionTypes from "./actionTypes"

const useReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.USERS:
            return { ...state, users: action.payload }
        case UserActionTypes.LOGIN:
            return { ...state, currentUser: action.payload}
        case UserActionTypes.LOGOUT:
            return { ...state, currentUser: null}
        default:
            return state
    }
}

const initialState = {
    users: {},
    currentUser: null,
}

export default useReducer