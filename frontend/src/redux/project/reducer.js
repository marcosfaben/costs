import projectActionTypes from "./actionTypes";

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case projectActionTypes.INSERT:
            return { ...state, projects: action.payload }
        case projectActionTypes.DELET:
            return { ...state, projects: state.projects.filter((project) => project.id !== action.payload) }
            case 'setProject':
                return { ...state, project: action.payload }
            case projectActionTypes.EDIT:
                return { ...state, services: action.payload }
            case "setShowProjectForm":
                return { ...state, showProjectForm: !state.showProjectForm }
            case "setShowServices":
                return { ...state, showServices: !state.showServices }
            case "setMsg":
                return { ...state, msg: action.payload }
            case "setTypeMsg":
                return { ...state, typeMsg: action.payload }
        default:
            return state
    }
}

const initialState = {
    projects: {},
    project: null,
    services: [],
    showProjectForm: false,
    showServices: false,
    msg: '',
    typeMsg: '',

}

export default projectReducer;