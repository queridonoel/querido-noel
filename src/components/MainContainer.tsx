import cat from '../assets/cat.png'
import dog from '../assets/dog.png'
import envelope from '../assets/envelope.svg'

export function MainContainer() {
  return (
    <div className="relative isolate mx-auto mt-28 w-[calc(100%-2rem)] max-w-[1200px] sm:mt-38 sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)]">
      <img
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute -top-[82px] left-6 z-0 h-auto w-[110px] select-none sm:-top-[136px] sm:w-[180px]"
        src={dog}
      />
      <img
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute -top-[82px] right-6 z-0 h-auto w-[110px] select-none sm:-top-[136px] sm:w-[180px]"
        src={cat}
      />
      <main className="relative z-10 grid w-full grid-cols-1 gap-8 rounded-container border border-border bg-surface p-8 pt-12 shadow-soft lg:min-h-[min(700px,calc(100dvh-11rem))] lg:grid-cols-[45fr_55fr]">
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
        <div />
        <div />
      </main>
    </div>
  )
}
