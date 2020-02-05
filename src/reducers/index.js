import types from '../types'

export default (state = {loaded: false, userAnswers: [], hasCompletedQns: false}, { type, payload }) => {
    switch(type) {
        case types.GETTING_QUESTIONS_SUCCESS:
            return {
                ...state,
                ...payload
            }
            case types.INPUT_ANSWER:
                return {
                    ...state,
                    ...payload
                }
            case types.SUBMIT_ANSWER:
                return {
                    ...state,
                    ...payload
                }
            case types.COMPLETED_QNS:
                return {
                    ...state,
                    ...payload
                }
        default:
            return state
    }
}