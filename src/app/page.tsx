'use client';
import { useState } from 'react';
import questions from '../questions.json';
import cisdfquestions from '../cisdfQuestions.json';
import IQuestion from './interfaces';
import Block from './block';

export default function Home() {
  const [questionChunks, setQuestionChunks] = useState<IQuestion[][]>([]);
  const [choose, setChoose] = useState<string>('');

  const setTest = (type: string) => {
    let list = [];
    let quant = 0;
    setChoose(type);
    if (type == 'cisdf') {
      list = cisdfquestions;
      quant = 75;
    } else {
      list = questions;
      quant = 60;
    }
    const shuffled = list.sort(() => Math.random() - 0.5);
    const chunks: IQuestion[][] = [];
    for (let i = 0; i < shuffled.length; i += quant) {
      chunks.push(shuffled.slice(i, i + quant));
    }
    setQuestionChunks(chunks);
  }

  return (
    <div className="w-full h-full pt-10 p-3 sm:p-10">
      <div className="font-bold sm:py-5 text-2xl sm:text-4xl w-full text-center sm:text-left">
        { choose == 'csa' ? `CSA Actual Exam Questions ${ questions.length }` : choose == 'cisdf' ? `CIS-DF Actual Exam Questions ${ cisdfquestions.length }` : 'Choose one of the exam options below:' }
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5 mt-5 sm:mt-0">
        <button
          type="button"
          className={ `cursor-pointer w-full border-2 border-white flex items-center justify-center p-5 text-lg ${choose == 'csa' ? 'bg-green-800 hover:bg-green-900' : ''}` }
          onClick={ () => setTest('csa') }
        >
          ServiceNow Certified System Administrator (CSA)
        </button>
        <button
          type="button"
          className={ `cursor-pointer w-full border-2 border-white flex items-center justify-center p-5 text-lg ${choose == 'cisdf' ? 'bg-green-800 hover:bg-green-900' : ''}` }
          onClick={ () => setTest('cisdf') }
        >
          Certified Implementation Specialist - Data Foundations (CMDB and CSDM) (CIS-DF (CMDB and CSDM))
        </button>
      </div>
      {
        choose !== '' &&
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

