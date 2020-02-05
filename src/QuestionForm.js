import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getQuestions, inputAnswer, submitAnswer } from './actions'
import { QuestionAndAnswer } from './QuestionAndAnswer'

const questionForm = ({ getQuestions, submitAnswer, inputAnswer, loaded, questions, results, hasCompletedQns }) => {

    useEffect(() => {
        getQuestions()
    }, [])

    const generateQuestionAndAnswer = (key, question, answer, mark = null) => {
        switch(mark) {
            case true: 
            return <QuestionAndAnswer classColour="correct" isRight='CORRECT' inputAnswer={inputAnswer} questionNum={question.number} key={key} choice={answer} topic={question.topic}/>
            case false: 
            return <QuestionAndAnswer classColour="wrong" isRight='WRONG' inputAnswer={inputAnswer} questionNum={question.number} key={key} choice={answer} topic={question.topic}/>
            default:
            return <QuestionAndAnswer inputAnswer={inputAnswer} questionNum={question.number} key={key} choice={answer} topic={question.topic}/>
        }
    }

    const markingAnswers = (question, answerToQuestion = {}) => {
        return question.answers.map((answer, key) => {
                if(answerToQuestion.isRight) {
                    if(answer.answer === answerToQuestion.userAnswer) {
                        return generateQuestionAndAnswer(key, question, answer, true)
                    }
                } else {
                    if(answer.answer === answerToQuestion.userAnswer) {
                        return generateQuestionAndAnswer(key, question, answer, false)
                    } else if(answer.answer === answerToQuestion.correctAnswer) {
                        return generateQuestionAndAnswer(key, question, answer, true)
                    }
                }
                return generateQuestionAndAnswer(key, question, answer)
            }
        )
    }

    const createQuestionFields = (index, question, runMarkingAnswers) => {
        return <section key={index}>
        <h3>Question {question.number}. {question.question}</h3>
        <label>Answer: </label>
        {runMarkingAnswers}
    </section>
    }

    return (
        <div className="app">
            {!loaded ? 'Loading...' 
            : <div className="question-form">
            <form>
                {questions.map((question, index) => {
                    if(results) {
                        const answerToQuestion = results.find(result => result.number === question.number)
                        if(answerToQuestion) {
                            return createQuestionFields(index, question, markingAnswers(question, answerToQuestion))
                        } else {
                            return createQuestionFields(index, question, markingAnswers(question))
                        }
                    }
                    return createQuestionFields(index, question, markingAnswers(question))
                    })}
                <button onClick={submitAnswer}>Submit</button>
            </form> 
            </div>}


                {!results 
                ? !hasCompletedQns
                ? <h2>Please answer all the questions</h2>
                : 'Loading score...'
                : <div className="results">
                    <h2>
                        Total Score: {results.filter(result => result.isRight).length} out of {results.length}
                    </h2>
                </div>
                }
        </div>
    )
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, { submitAnswer, getQuestions, inputAnswer })(questionForm)