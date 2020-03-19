import {CREATE_MODULE, FIND_MODULES_FOR_COURSE} from "../actions/moduleActions";


// (state A) == action 1 ==> (state B)
// (state A) == action 2 ==> (state C)

const moduleReducer = (state = {modules: []}, action) => {
    switch(action.type) {
        case CREATE_MODULE:
            return {
                modules: [
                    ...state.modules,
                    action.module
                ]
            }
        case FIND_MODULES_FOR_COURSE:
            return {
                modules: action.modules
            }
            break;
        case "DELETE_MODULE":
            return {
                modules: state.modules.filter(module =>
                    module._id !== action.moduleId
                )
            }
            break;
        default:
            return state
    }
}

export default moduleReducer
