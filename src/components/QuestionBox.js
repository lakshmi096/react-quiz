import React, { useState } from 'react';

const QuestionBox = ({ question, options, selected }) => {
    const [answers, setAnswer] = useState(options);
    const answerList = answers.map((text, index) => {
        return <button className="answerBtn" key={index}
            onClick={() => {
                setAnswer([text]);
                selected(text);
            }}>{text}</button>
    })
    return (
        <div className="questionBox">
            <div className="question">{question}</div>
            {answerList}
        </div>
    )
}

export default QuestionBox;