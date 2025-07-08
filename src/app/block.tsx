import { useState } from "react";
import IQuestion from "./interfaces";
import Question from "./question";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Block(props: { chunk: any, chunkIndex: number }) {
  const { chunk, chunkIndex } = props;
  const [showBlock, setShowBlock] = useState<boolean>(false);
  return(
    <div>
      <div className="font-semibold text-xl mb-4">
        {
          showBlock
          ? <div>
              <button
                type="button"
                onClick={ () => setShowBlock(!showBlock) }
                className="cursor-pointer border border-white w-full flex p-3 items-center justify-between bg-green-800 hover:bg-green-900"
              >
                <div>Bloco {chunkIndex} ({chunk.length} questões)</div>
                <IoIosArrowUp />
              </button>
              <div>
                {
                  chunk.map((question: IQuestion, index: number) => (
                    <div key={ index }>
                      <Question
                        question={ question }
                        number={ index }
                      />
                    </div>
                  ))
                }
              </div>
              {/* <div>
                <button
                  type="button"
                  className="w-full text-center border p-2 cursor-pointer bg-green-800 hover:bg-green-900"
                >
                  Verificar Desempenho
                </button>
              </div> */}
            </div>
          : <button
              type="button"
              onClick={ () => setShowBlock(!showBlock) }
              className="cursor-pointer border border-white w-full flex p-3 items-center justify-between bg-green-800 hover:bg-green-900"
            >
              <div>Bloco {chunkIndex} ({chunk.length} questões)</div>
              <IoIosArrowDown />
            </button>
        }
      </div>
    </div>
  );
}