'use client';
import { useEffect, useState } from 'react';
import questions from '../questions.json';
import IQuestion from './interfaces';
import Block from './block';

export default function Home() {
  const [questionChunks, setQuestionChunks] = useState<IQuestion[][]>([]);

  useEffect(() => {
    const shuffled = questions.sort(() => Math.random() - 0.5);
    const chunks: IQuestion[][] = [];
    for (let i = 0; i < shuffled.length; i += 60) {
      chunks.push(shuffled.slice(i, i + 60));
    }
    setQuestionChunks(chunks);
  }, []);

  return (
    <div className="w-full h-full pt-10 p-3 sm:p-10">
      <div className="font-bold sm:py-5 text-2xl sm:text-4xl w-full text-center sm:text-left">
        CSA Actual Exam Questions { questions.length }
      </div>
      {
        questionChunks.map((chunk, chunkIndex) => (
          <div key={ chunkIndex } className="mb-5">
            <Block
              chunkIndex={ chunkIndex + 1 }
              chunk={ chunk }
            />
          </div>
        ))
      }
    </div>
  );
}

