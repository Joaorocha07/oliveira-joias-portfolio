'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type Media = { type: 'image' | 'video'; src: string }

type Props = {
  images: string[]
  videos?: string[]
  productName: string
}

export default function ImageGallery({ images, videos = [], productName }: Props) {
  const [selected, setSelected] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const media: Media[] = [
    ...images.map((src) => ({ type: 'image' as const, src })),
    ...videos.map((src) => ({ type: 'video' as const, src })),
  ]

  const current = media[selected]

  useEffect(() => {
    if (!lightboxOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'ArrowLeft') {
        setSelected((currentIndex) => (currentIndex - 1 + media.length) % media.length)
      }
      if (event.key === 'ArrowRight') {
        setSelected((currentIndex) => (currentIndex + 1) % media.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxOpen, media.length])

  const showPrevious = () => {
    setSelected((currentIndex) => (currentIndex - 1 + media.length) % media.length)
  }

  const showNext = () => {
    setSelected((currentIndex) => (currentIndex + 1) % media.length)
  }

  if (!current) {
    return (
      <div className="flex flex-col gap-4">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-md flex flex-col items-center justify-center gap-3 text-text/30">
          <ImageOffIcon />
          <span className="text-sm font-medium">Fotos em breve</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-md group">
        {current.type === 'video' ? (
          <video
            key={current.src}
            src={current.src}
            controls
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            key={current.src}
            src={current.src}
            alt={`${productName} — imagem ${selected + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={selected === 0}
          />
        )}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/60 bg-black/55 px-3.5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          aria-label={`Ampliar ${productName}`}
        >
          <MagnifyIcon />
          Ampliar
        </button>
      </div>

      {media.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {media.map((item, i) => (
            <button
              key={item.src}
              onClick={() => setSelected(i)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 bg-gray-50 ${
                i === selected
                  ? 'border-gold shadow-md'
                  : 'border-transparent hover:border-gold/40'
              }`}
              aria-label={
                item.type === 'video'
                  ? `Ver vídeo de ${productName}`
                  : `Ver imagem ${i + 1} de ${productName}`
              }
            >
              {item.type === 'video' ? (
                <>
                  <video src={item.src} muted className="absolute inset-0 w-full h-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center bg-dark/30">
                    <PlayIcon />
                  </span>
                </>
              ) : (
                <Image
                  src={item.src}
                  alt={`${productName} — miniatura ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria ampliada de ${productName}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightboxOpen(false)
          }}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between pb-3 text-white">
            <p className="truncate pr-4 text-sm font-medium sm:text-base">{productName}</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/60 sm:text-sm">
                {selected + 1} / {media.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                aria-label="Fechar galeria"
                autoFocus
              >
                ×
              </button>
            </div>
          </div>

          <div className="relative min-h-0 flex-1">
            {current.type === 'video' ? (
              <video
                key={`lightbox-${current.src}`}
                src={current.src}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            ) : (
              <Image
                key={`lightbox-${current.src}`}
                src={current.src}
                alt={`${productName} — imagem ampliada ${selected + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            )}

            {media.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-1 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/55 text-3xl text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-gold hover:text-dark sm:left-4 sm:h-12 sm:w-12"
                  aria-label="Ver mídia anterior"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-1 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/55 text-3xl text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-gold hover:text-dark sm:right-4 sm:h-12 sm:w-12"
                  aria-label="Ver próxima mídia"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {media.length > 1 && (
            <div className="mx-auto mt-3 flex max-w-full gap-2 overflow-x-auto pb-1">
              {media.map((item, index) => (
                <button
                  key={`lightbox-thumb-${item.src}`}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white/5 transition-colors sm:h-20 sm:w-20 ${
                    index === selected ? 'border-gold' : 'border-transparent hover:border-white/40'
                  }`}
                  aria-label={`Ver ${item.type === 'video' ? 'vídeo' : 'imagem'} ${index + 1}`}
                >
                  {item.type === 'video' ? (
                    <>
                      <video src={item.src} muted className="h-full w-full object-cover" />
                      <span className="absolute inset-0 grid place-items-center bg-black/30"><PlayIcon /></span>
                    </>
                  ) : (
                    <Image src={item.src} alt="" fill className="object-cover" sizes="80px" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function MagnifyIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
      <path strokeLinecap="round" strokeWidth="1.8" d="m16 16 4 4" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function ImageOffIcon() {
  return (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3l18 18M9.5 5H18a2 2 0 012 2v10.5M4 7v10a2 2 0 002 2h10.5M4 15l4-4a2 2 0 012.8 0L14 14" />
    </svg>
  )
}
