import types from '../types'

export default (state = {loaded: false, userAnswers: []}, action) => {
    switch(action.type) {
        case types.GETTING_QUESTIONS_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
            case types.INPUT_ANSWER:
                return {
                    ...state,
                    ...action.payload
                }
            case types.SUBMIT_ANSWER:
                return {
                    ...state,
                    ...action.payload
                }
        default:
            return state
    }
}