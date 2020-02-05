import types from '../types'

export const gettingQuestionsSuccess = data => {
    return {
        type: types.GETTING_QUESTIONS_SUCCESS,
        payload: {
            questions: data,
            loaded: true
        }
    }
}

export const inputAnswer = (event, questionNum) => (dispatch, getState) => {
    const { value, name } = event.target
    const { userAnswers } = getState()
    
    const oldAnswers = userAnswers.filter(answer => (answer.number !== questionNum) && (answer.topic !== name))
    return dispatch({
        type: types.INPUT_ANSWER,
        payload: {
            userAnswers: [
                ...oldAnswers,
                {
                    number: questionNum,
                    topic: name,
                    answer: value
                }
            ]
        }
    })
}

export const submitAnswer = event => (dispatch, getState) => {
    event.preventDefault();
    dispatch({ type: types.SUBMITTING_ANSWER })
    const { userAnswers } = getState()
    return fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userAnswers)
    })
    .then(r => r.json()
    .then(results => {
        return dispatch({
            type: types.SUBMIT_ANSWER,
            payload: {
                results
            }
        })
    }))
}

export const getQuestions = () => (dispatch, getState) => {
    dispatch({type: types.GET_QUESTIONS})
    return fetch('http://localhost:8000/')
    .then(r => r.json())
    .then(data => {
        dispatch({type: types.GETTING_QUESTIONS})
        dispatch(gettingQuestionsSuccess(data))
    })
    .catch(error => console.log('Error', error))
}