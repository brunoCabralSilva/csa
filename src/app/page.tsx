'use client'
import { useEffect, useState } from 'react';
import questions from '../questions.json';
import IQuestion from './interfaces';
import Question from './question';

export default function Home() {
  const [listQuestions, setListQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    setListQuestions(questions.sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="w-full h-full pt-10 p-3 sm:p-10">
      <div className="font-bold sm:py-5 text-2xl sm:text-4xl w-full text-center sm:text-left">
        CSA Actual Exam Questions
      </div>
      {
        listQuestions.map((question: IQuestion, index: number) => (
          <div key={ index }>
            <Question question={ question } />
          </div>
        ))
      }
    </div>
  );
}
