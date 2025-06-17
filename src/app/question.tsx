'use client'
import { useEffect, useState } from "react";
import IQuestion from "./interfaces";

export default function Question(props: { question: IQuestion }) {
  const [alternative, setAlternative] = useState<string[]>([]);
  const [optionList, setOptionList] = useState<string[]>([]);
  const [corrects, setCorrects] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [showResponse, setShowResponse] = useState<boolean>(false);
  const { question } = props;

  useEffect(() => {
    setOptionList(question.options.sort(() => Math.random() - 0.5));
  }, []);

  const updateOption = (option: string) => {
    if (showResponse) {
      setShowResponse(false);
      setAlternative([]);
    }
    if (question.correctAnswer.length === 1) setAlternative([option]);
    else {
      if (alternative.find((alt: string) => alt === option)) {
        setAlternative(alternative.filter((alt: string) => alt !== option));
      } else setAlternative([...alternative, option]);
    }
  }

  const revealSolution = () => {
    if (showResponse) {
      setShowResponse(false);
      setAlternative([]);
    } else {
      setShowResponse(true);
      setCorrects(alternative.filter((alt: string) => question.correctAnswer.includes(alt)));
      setErrors(alternative.filter((alt: string) => !question.correctAnswer.includes(alt)));
    }
  }

  return(
    <div className="my-5 border-black dark:border-white border p-4 sm:p-5">
      <p className="font-bold mb-5">{ question.text }</p>
      <ul className="flex flex-col gap-2">
        { 
          optionList.map((option: string, index: number) => (
            <li
              key={ index }
              onClick={ () => updateOption(option) }
              className={ `dark:border-white cursor-pointer p-3 rounded flex gap-2 items-start ${ alternative.find((op: string) => op === option) ? 'border border-black shadow-lg': 'border-gray-400 border' } ${showResponse && corrects.find((alt: string) => alt === option) ? 'bg-green-200 dark:bg-green-900': ''} ${showResponse && errors.find((alt: string) => alt === option) ? 'bg-red-200 dark:bg-red-900': '' } ${showResponse && question.correctAnswer.find((alt: string) => alt === option) ? 'bg-green-200 dark:bg-green-900': '' }` }
            >
              <div className={`w-5 h-5 flex items-center justify-center border border-black dark:bg-white  ${question.correctAnswer.length === 1 ? 'rounded-full' : ''}`}>
                {
                  question.correctAnswer.length > 1 
                  ? <div className={`w-3 h-3 ${alternative.find((op: string) => op === option) ? 'bg-black': '' }`} />
                  : <div className={`rounded-full w-3 h-3 ${alternative.find((op: string) => op === option) ? 'bg-black': '' }`} />
                }
              </div>
              <div className="w-full">{ option }</div>
            </li>
          ))
        }
      </ul>
      {
        optionList.length > 0 &&
        <button
          type="button"
          onClick={ revealSolution }
          className="mt-5 border dark:border-white dark:bg-white dark:text-black border-black p-2 rounded cursor-pointer font-bold"
        >
          { !showResponse ? 'Reveal Solution': 'Hide Solution' }
        </button>
      }
    </div>
  );
}