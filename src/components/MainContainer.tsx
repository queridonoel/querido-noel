import { useEffect, useState } from 'react'
import cat from '../assets/cat.webp'
import dog from '../assets/dog.webp'
import envelope from '../assets/envelope.svg'
import titleArt from '../assets/querido-noel.svg'
import type { LetterData } from '../types/letter'
import { LetterPreview } from './LetterPreview'
import { LetterForm } from './form/LetterForm'

const initialLetter: LetterData = {
  contact: '',
  institution: '',
  message: '',
  petName: '',
  photoUrl: '',
  template: 'classic',
}

export function MainContainer() {
  const [letter, setLetter] = useState(initialLetter)

  useEffect(() => {
    const photoUrl = letter.photoUrl
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl)
    }
  }, [letter.photoUrl])

  function updateLetter(updates: Partial<LetterData>) {
    setLetter((current) => ({ ...current, ...updates }))
  }

  return (
    <div className="relative isolate mx-auto mt-28 w-[calc(100%-2rem)] max-w-[1200px] sm:mt-42 sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)]">
      <img
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute -top-[94px] left-6 z-0 h-auto w-[127px] select-none sm:-top-[156px] sm:w-[207px]"
        src={dog}
      />
      <img
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute -top-[94px] right-6 z-0 h-auto w-[127px] select-none sm:-top-[156px] sm:w-[207px]"
        src={cat}
      />
      <header className="absolute -top-[96px] left-1/2 z-10 flex w-[calc(100%-9rem)] max-w-[720px] -translate-x-1/2 flex-col items-center text-center sm:-top-[146px] sm:w-[calc(100%-26rem)] lg:w-[calc(100%-22rem)]">
        <h1 className="sr-only">Querido Noel</h1>
        <img
          alt=""
          aria-hidden="true"
          className="h-auto w-full max-w-[430px] select-none"
          src={titleArt}
        />
        <p className="mt-2 hidden text-xs leading-tight font-semibold text-[#9a623f] sm:mt-3 sm:block sm:text-[15px]">
          Que a magia do Natal também encontre quem tem patinhas.
        </p>
      </header>
      <main className="relative z-10 grid w-full grid-cols-1 gap-8 rounded-container border border-border bg-surface p-8 pt-12 shadow-soft lg:min-h-[min(700px,calc(100dvh-11rem))] lg:grid-cols-[minmax(0,45fr)_1px_minmax(0,55fr)] lg:gap-x-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-2 right-7 left-7 z-20 flex h-3 overflow-hidden"
        >
          {Array.from({ length: 9 }, (_, index) => (
            <img
              alt=""
              className="h-5 w-36 max-w-none shrink-0"
              key={index}
              src={envelope}
            />
          ))}
        </div>
        <p className="text-center text-xs leading-tight font-semibold text-[#9a623f] sm:hidden">
          Que a magia do Natal também encontre quem tem patinhas.
        </p>
        <LetterForm data={letter} onChange={updateLetter} />
        <div aria-hidden="true" className="hidden bg-border lg:block" />
        <LetterPreview data={letter} />
      </main>
    </div>
  )
}
