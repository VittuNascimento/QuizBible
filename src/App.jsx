import React, { useState, useEffect } from 'react';

// Dados do quiz reorganizados por Livro, contendo apenas UMA pergunta de cada, com a redação exata do arquivo fornecido.
const quizData = [
  // 1. 1 Samuel
  {
    id: '1samuel',
    name: '1 Samuel',
    questions: [
      {
        id: 1,
        book: '1 Samuel',
        text: 'Quem foi o primeiro rei escolhido para governar Israel em 1 Samuel?',
        options: ['Davi', 'Saul', 'Samuel', 'Golias'], // Ordem A, B, C, D
        answer: 'Saul', // Resposta certa B
      },
    ],
  },
  // 2. 2 Samuel
  {
    id: '2samuel',
    name: '2 Samuel',
    questions: [
      {
        id: 1,
        book: '2 Samuel',
        text: 'Qual foi a cidade conquistada por Davi que se tornou a capital de Israel?',
        options: ['Belém', 'Samaria', 'Jerusalém', 'Hebrom'], // Ordem A, B, C, D
        answer: 'Jerusalém', // Resposta certa C
      },
    ],
  },
  // 3. Rute
  {
    id: 'rute',
    name: 'Rute',
    questions: [
      {
        id: 1,
        book: 'Rute',
        // O texto original é 'Qual era o nome da sogra de Rute?'
        text: 'Qual era o nome da sogra de Rute?',
        answer: 'Noemi',
        options: ['Noemi', 'Débora', 'Ester', 'Raabe'], // Opções criadas com a resposta exata como correta
      },
    ],
  },
  // 4. Neemias
  {
    id: 'neemias',
    name: 'Neemias',
    questions: [
      {
        id: 1,
        book: 'Neemias',
        // O texto original é 'O que Neemias foi fazer em Jerusalém?'
        text: 'O que Neemias foi fazer em Jerusalém?',
        answer: 'Reconstruir seus muros',
        options: ['Reconstruir seus muros', 'Reconstruir o Templo', 'Estabelecer a monarquia', 'Escrever novos Salmos'], // Opções criadas com a resposta exata como correta
      },
    ],
  },
  // 5. Esdras
  {
    id: 'esdras',
    name: 'Esdras',
    questions: [
      {
        id: 1,
        book: 'Esdras',
        // O texto original é 'Em que ano foi o Decreto de Ciro ?'
        text: 'Em que ano foi o Decreto de Ciro ?',
        answer: '530 a.c', // Resposta exata: 530 a.c (minúsculo)
        options: ['530 a.c', '722 a.C.', '605 a.C.', '586 a.C.'], // Opções criadas com a resposta exata como correta
      },
    ],
  },
  // 6. Judite
  {
    id: 'judite',
    name: 'Judite',
    questions: [
      {
        id: 1,
        book: 'Judite',
        // O texto original é 'Qual o nome do comandante inimigo de Judite ?'
        text: 'Qual o nome do comandante inimigo de Judite ?',
        answer: 'Holofernes',
        options: ['Holofernes', 'Sambalate', 'Assuero', 'Nabucodonosor'], // Opções criadas com a resposta exata como correta
      },
    ],
  },
  // 7. Juízes
  {
    id: 'juizes',
    name: 'Juízes',
    questions: [
      {
        id: 1,
        book: 'Juízes',
        // O texto original é 'Qual foi o nome do voto que Sansão teria que cumprir?'
        text: 'Qual foi o nome do voto que Sansão teria que cumprir?',
        answer: 'Voto nazireu',
        options: ['Voto nazireu', 'Voto de silêncio', 'Voto de Jejum', 'Voto de pobreza'], // Opções criadas com a resposta exata como correta
      },
    ],
  },
  // 8. Tobias
  {
    id: 'tobias',
    name: 'Tobias',
    questions: [
      {
        id: 1,
        book: 'Tobias',
        // O texto original é 'Quem era o companheiro de Tobias na sua viagem?'
        text: 'Quem era o companheiro de Tobias na sua viagem?',
        answer: 'O anjo Rafael',
        options: ['O anjo Rafael', 'O anjo Gabriel', 'O profeta Natã', 'Seu primo Aicar'], // Opções criadas com a resposta exata como correta
      },
    ],
  },
  // 9. Ester
  {
    id: 'ester',
    name: 'Ester',
    questions: [
      {
        id: 1,
        book: 'Ester',
        // O texto original é 'O que o livro de ester nos ensina:'
        text: 'O que o livro de ester nos ensina:',
        // Resposta exata: 'Que deus está sempre por trás de tudo, mesmo que não pareça, ele esta la'
        answer: 'Que deus está sempre por trás de tudo, mesmo que não pareça, ele esta la',
        options: [
          'Que deus está sempre por trás de tudo, mesmo que não pareça, ele esta la',
          'A importância da construção do Templo',
          'As regras do jejum e da oração',
          'A história da libertação de Moisés',
        ], // Opções criadas com a resposta exata como correta
      },
    ],
  },
  // 10. Josué
  {
    id: 'josue',
    name: 'Josué',
    questions: [
      {
        id: 1,
        book: 'Josué',
        // O texto original é 'O que Deus pediu para que Josué fizesse com os israelitas ao guia-los a terra prometida?'
        text: 'O que Deus pediu para que Josué fizesse com os israelitas ao guia-los a terra prometida?',
        // Resposta exata: 'instruindo-o a ser corajoso e a obedecer aos mandamentos, não desviando-se da Lei.'
        answer: 'instruindo-o a ser corajoso e a obedecer aos mandamentos, não desviando-se da Lei.',
        options: [
          'instruindo-o a ser corajoso e a obedecer aos mandamentos, não desviando-se da Lei.',
          'Construir um grande altar no Monte Sinai',
          'Dividir as terras imediatamente sem lutar',
          'Retornar ao Egito após 40 anos no deserto',
        ], // Opções criadas com a resposta exata como correta
      },
    ],
  },
  // 11. 1 e 2 Reis
  {
    id: 'reis',
    name: '1 e 2 Reis',
    questions: [
      {
        id: 1,
        book: '1 e 2 Reis',
        // O texto original é 'Quem era o filho de Davi ?'
        text: 'Quem era o filho de Davi ?',
        options: ['Ezequias', 'Eliseu', 'Salomão', 'Roboão'], // Ordem A, B, C, D
        answer: 'Salomão', // Resposta certa C
      },
    ],
  },
  // 12. 1 e 2 Crônicas
  {
    id: 'cronicas',
    name: '1 e 2 Crônicas',
    questions: [
      {
        id: 1,
        book: '1 e 2 Crônicas',
        // O texto original é 'Qual é o foco principal dos livros de 1 e 2 Crônicas?'
        text: 'Qual é o foco principal dos livros de 1 e 2 Crônicas?',
        // Resposta exata: 'Um registro genealógico e histórico que foca no reinado de Davi e na linhagem de Judá'
        answer: 'Um resumo de todos os livros históricos da bíblia',
        options: [
          'Um resumo de todos os livros históricos da bíblia',
          'Uma coleção de poemas e cânticos de adoração',
          'Profecias sobre a vinda do Messias',
          'As cartas escritas por Paulo às igrejas',
        ], // Opções criadas com a resposta exata como correta
      },
    ],
  },
  // 13. 1 e 2 Macabeus
  {
    id: 'macabeus',
    name: '1 e 2 Macabeus',
    questions: [
      {
        id: 1,
        book: '1 e 2 Macabeus',
        // O texto original é 'O que o livro de Macabeus nos ensina?'
        text: 'O que o livro de Macabeus nos ensina?',
        answer: 'A importância da fidelidade a Deus',
        options: [
          'A importância da fidelidade a Deus',
          'A lei mosaica e seus rituais',
          'A história da criação do mundo',
          'A sabedoria de Salomão',
        ], // Opções criadas com a resposta exata como correta
      },
    ],
  },
];

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  // O estado 'loading' e 'explanation' foram removidos.
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Carrega o Tailwind CSS
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setUserAnswers({});
    // 'setExplanation' foi removido.
    setIsAnswered(false);
    setSelectedOption(null);
  };

  const handleAnswer = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const questionsToUse = selectedBook.questions;
    const question = questionsToUse[currentQuestionIndex];
    const isCorrect = option === question.answer;

    setUserAnswers((prev) => ({
      ...prev,
      [question.id]: {
        selected: option,
        isCorrect: isCorrect,
      },
    }));

    if (isCorrect) {
      setScore(score + 1);
    }

    // Como há apenas 1 pergunta por livro, o quiz sempre mostrará os resultados após a primeira resposta.
    setTimeout(() => {
      setShowResults(true);
      // Não avançamos currentQuestionIndex, pois só há 1.
      setIsAnswered(false);
      setSelectedOption(null);
    }, 1000); // Espera 1 segundo para mostrar o feedback visual
  };

  // A função getAnswerExplanation foi removida.

  const getResultsComponent = () => {
    const questionsToUse = selectedBook.questions;
    const question = questionsToUse[currentQuestionIndex];
    const userAnswer = userAnswers[question.id];
    const isCorrect = userAnswer && userAnswer.isCorrect;
    const selectedText = userAnswer ? userAnswer.selected : 'Não respondida';

    return (
      // ALTERADO: Adicionado max-w-2xl e mx-auto para melhor centralização e largura
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg max-w-2xl w-full mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-800">Resultado do Quiz: {selectedBook.name}</h2>
        <p className="text-xl text-gray-700">
          Você acertou: <span className="font-bold text-green-600">{score}</span> de{' '}
          <span className="font-bold text-indigo-800">{questionsToUse.length}</span> pergunta.
        </p>

        <div className="mt-6 w-full text-sm max-h-96 overflow-y-auto">
          <div
            className={`p-4 mt-2 rounded-lg text-left transition-colors duration-300 ${
              isCorrect ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'
            }`}
          >
            <p className="font-semibold text-gray-800">
              {question.book}: {question.text}
            </p>
            <p className={`text-sm mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              Sua resposta: <span className="font-medium">{selectedText}</span>
            </p>
            {!isCorrect && (
              <p className="text-sm text-gray-600 mt-1">
                Resposta correta: <span className="font-medium text-green-600">{question.answer}</span>
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => setSelectedBook(null)}
          className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md"
        >
          Tentar Outro Livro
        </button>
      </div>
    );
  };

  const getQuizComponent = () => {
    const questionsToUse = selectedBook.questions;
    const question = questionsToUse[currentQuestionIndex];

    return (
      // ALTERADO: Adicionado max-w-2xl e mx-auto para melhor centralização e largura
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg max-w-2xl w-full mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-indigo-800 text-center">
          Quiz: {selectedBook.name}
        </h2>
        <div className="w-full text-center mb-6">
          <p className="text-sm text-gray-500">
            {question.book} | Questão {currentQuestionIndex + 1} de {questionsToUse.length}
          </p>
        </div>
        <div className="w-full mb-8">
          <p className="text-lg font-semibold text-gray-800 mb-4">{question.text}</p>
          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isCorrect = option === question.answer;
              const isUserSelection = option === selectedOption;

              let buttonClasses = 'w-full text-left px-6 py-4 rounded-lg font-medium transition-colors shadow-sm';
              if (isAnswered) {
                if (isCorrect) {
                  buttonClasses += ' bg-green-500 text-white';
                } else if (isUserSelection) {
                  buttonClasses += ' bg-red-500 text-white';
                } else {
                  buttonClasses += ' bg-gray-100 text-gray-800 opacity-50';
                }
              } else {
                buttonClasses += ' bg-gray-100 text-gray-800 hover:bg-indigo-50 active:ring-2 active:ring-indigo-500';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={buttonClasses}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {/* O botão e o div de explicação foram removidos daqui */}
        </div>
      </div>
    );
  };

  const getBookSelectorComponent = () => (
    // ALTERADO: Adicionado max-w-2xl e mx-auto para melhor centralização e largura
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg max-w-2xl w-full mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-800">
        Quiz dos Livros Históricos da Bíblia
      </h1>
      <p className="text-md text-center text-gray-600 mb-8">
        Escolha um livro para responder à pergunta única.
      </p>
      {/* Mantido: grid-cols-2 md:grid-cols-3 para layout responsivo dos botões */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {quizData.map((book) => (
          <button
            key={book.id}
            onClick={() => handleBookSelect(book)}
            className="p-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md"
          >
            {book.name}
          </button>
        ))}
      </div>
      <p className="mt-8 text-xs text-gray-500">
        Cada livro tem uma pergunta baseada em seu conteúdo.
      </p>
    </div>
  );

  return (
    // ALTERADO: Adicionado w-full para garantir que o contêiner de fundo ocupe 100% da largura.
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4 sm:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      {!selectedBook ? (
        getBookSelectorComponent()
      ) : showResults ? (
        getResultsComponent()
      ) : (
        getQuizComponent()
      )}
    </div>
  );
}

export default App;