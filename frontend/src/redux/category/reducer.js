import categoryActionTypes from "./actionTypes"

const categoryReducer = (state = initialState, action) => {
    switch(action.type){
        case categoryActionTypes.INSERT:
            return {...state, categories: action.payload }
        case categoryActionTypes.SHOWCATEGORY:
            return {...state, showForm: !state.showForm}
        default:
            return state
    }
}

const initialState = {
    categories: [],
    showForm: false
}

export default categoryReducer