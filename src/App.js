import { useState } from 'react'
import questions from './data'

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
      setFeedback('True! 🎉')
    } else {
      setFeedback('False! 😢')
    }

    setTimeout(() => {
      setFeedback('')
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion)
      } else {
        setShowScore(true)
      }
    }, 2000)
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#2B2E4A] font-protest_strike text-white">
      {showScore ? (
        score >= questions.length / 2 ? (
          <p className="text-3xl text-center fadeIn">
            Congrats you got {score} out of {questions.length} 🎉
          </p>
        ) : (
          <p className="text-3xl text-center fadeIn">
            You got {score} out of {questions.length}. You can practice your
            basketball knowledge via{' '}
            <a
              className="text-blue-500"
              href="https://en.wikipedia.org/wiki/Basketball"
              target="_blank"
              rel="noreferrer"
            >
              Wikipedia
            </a>
          </p>
        )
      ) : (
        <>
          <span className="text-3xl mb-3">
            Question {currentQuestion + 1}/{questions.length}
          </span>
          <div className="flex justify-between p-2 gap-2 w-4/6 h-4/6 bg-[#E84545] border border-[#903749] rounded-md shadow-lg">
            <div className="w-1/2 p-4 flex flex-col justify-center">
              <p className="flex items-center text-lg font-medium shadow-lg p-2">
                {questions[currentQuestion].questionText}
              </p>
              <p className="text-center mt-5 min-h-6">{feedback}</p>
            </div>
            <div className="w-1/2 flex flex-col justify-between p-2 shadow-lg">
              {questions[currentQuestion].questionOptions.map((option) => (
                <button
                  disabled={feedback.length !== 0}
                  className={`border p-2 rounded-md shadow-lg text-md ${
                    feedback.length !== 0
                      ? option.isCorrect
                        ? 'bg-green-500 border-3'
                        : 'bg-red-800 border-3'
                      : 'border-white'
                  }`}
                  onClick={() => handleClick(option.isCorrect)}
                >
                  {option.answerText}
                </button>
              ))}
            </div>
          </div>
          <span className="mt-2 text-3xl">Score: {score}</span>
        </>
      )}
    </div>
  )
}
