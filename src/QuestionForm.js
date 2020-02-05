import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getQuestions, inputAnswer, submitAnswer } from './actions'
import { QuestionAndAnswer } from './QuestionAndAnswer'

const questionForm = ({ getQuestions, submitAnswer, inputAnswer, loaded, questions, results, userAnswers }) => {

    useEffect(() => {
        getQuestions()
    }, [])

    const generateQuestionAndAnswer = (key,mark, question, answer,) => {
        switch(mark) {
            case true: 
            return <QuestionAndAnswer isRight={'CORRECT'} inputAnswer={inputAnswer} questionNum={question.number} key={key} choice={answer} topic={question.topic}/>
            case false: 
            return <QuestionAndAnswer isRight={'WRONG'} inputAnswer={inputAnswer} questionNum={question.number} key={key} choice={answer} topic={question.topic}/>
            default:
            return <QuestionAndAnswer inputAnswer={inputAnswer} questionNum={question.number} key={key} choice={answer} topic={question.topic}/>
        }
    }

    const markingAnswers = (question, answerToQuestion) => {
        return question.answers.map((answer, key) => {
                if(answerToQuestion.isRight) {
                    if(answer.answer === answerToQuestion.userAnswer) {
                        return generateQuestionAndAnswer(key,true, question, answer)
                    }
                } else {
                    if(answer.answer === answerToQuestion.userAnswer) {
                        return generateQuestionAndAnswer(key,false, question, answer)
                    } else if(answer.answer === answerToQuestion.correctAnswer) {
                        return generateQuestionAndAnswer(key,true, question, answer)
                    }
                }
                return generateQuestionAndAnswer(key, null, question, answer)
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
        <div>
            {!loaded ? 'Loading...' 
            : <div>
            <form>
                {questions.map((question, index) => {
                    if(results) {
                        const answerToQuestion = results.find(result => result.number === question.number)
                        console.log(answerToQuestion)
                            return createQuestionFields(index, question, markingAnswers(question, answerToQuestion))
                    }
                    return createQuestionFields(index, question, markingAnswers(question, {}))
                    })}
                <button onClick={submitAnswer}>Submit</button>
            </form> 
            </div>}


                {results && 
                <div>
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