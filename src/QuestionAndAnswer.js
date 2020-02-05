import React from 'react'

export const QuestionAndAnswer = ({ inputAnswer, questionNum, choice, topic, isRight }) => {
    return <div>
        <input onInput={event => inputAnswer(event, questionNum)} value={choice.answer} type="radio" name={topic} />
        <label>{choice.answer}</label>
        {isRight && <span>{isRight}</span>}
        {console.log(questionNum, isRight)}
    </div>
}

