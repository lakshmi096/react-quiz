import React, { Component } from "react";
import '../assets/style.css';
import quizService from '../quizService';
import QuestionBox from './QuestionBox';

class QuestionsMain extends Component {
    state = {
        questionBank: [],
        score: 0,
        responses: 0
    }

    componentDidMount() {
        quizService().then(questions => {
            this.setState({
                questionBank: questions
            })
        });
    }
    computeAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            this.setState({
                score: this.state.score + 1
            })
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        });
    }
    render() {
        const questionList = (this.state.questionBank.length > 0 && this.state.responses < 5) ? (
            this.state.questionBank.map(({ questionId, question, answers, correct }) => {
                return (
                    <QuestionBox question={question} options={answers} key={questionId}
                        selected={answer => this.computeAnswer(answer, correct)} />
                )
            })
        ) : null
        const scoreText = (this.state.responses === 5) ? (
            <h5>Your score is {this.state.score}/{this.state.responses}</h5>
        ) : null;
        return (
            <div className="container">
                <div className="title"> QuizMe </div>
                {questionList}
                {scoreText}
            </div>
        )
    }
}

export default QuestionsMain;