const ResultsSection = () => {
    const { quizAnswers } = React.useContext(SessionContext);
    
    const questions = [
        {
            id: 1,
            question: "What is the Virtual DOM in React?",
            options: [
                "A direct copy of the browser's DOM",
                "A lightweight copy of the actual DOM",
                "A database for React components",
                "A third-party library"
            ],
            correctAnswer: 1
        },
        {
            id: 2,
            question: "Which hook is used for side effects in React?",
            options: [
                "useState",
                "useContext",
                "useEffect",
                "useReducer"
            ],
            correctAnswer: 2
        }
    ];

    const calculateScore = () => {
        let correct = 0;
        questions.forEach(q => {
            if (quizAnswers[q.id] === q.correctAnswer) {
                correct++;
            }
        });
        return (correct / questions.length) * 100;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Quiz Results</CardTitle>
                <CardDescription>
                    Your Score: {calculateScore().toFixed(1)}%
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {questions.map((q) => (
                        <div key={q.id} className="border-b pb-4">
                            <p className="font-medium">{q.question}</p>
                            <p className="text-sm text-gray-600">
                                Your answer: {q.options[quizAnswers[q.id] || 0]}
                            </p>
                            <p className={`text-sm ${
                                quizAnswers[q.id] === q.correctAnswer
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}>
                                {quizAnswers[q.id] === q.correctAnswer
                                    ? '✓ Correct'
                                    : `✗ Incorrect - Correct answer: ${q.options[q.correctAnswer]}`}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};