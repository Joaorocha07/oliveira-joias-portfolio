'use client'

import { useState } from 'react'
import Image from 'next/image'

type Media = { type: 'image' | 'video'; src: string }

type Props = {
  images: string[]
  videos?: string[]
  productName: string
}

export default function ImageGallery({ images, videos = [], productName }: Props) {
  const [selected, setSelected] = useState(0)

  const media: Media[] = [
    ...images.map((src) => ({ type: 'image' as const, src })),
    ...videos.map((src) => ({ type: 'video' as const, src })),
  ]

  const current = media[selected]

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
    </div>
  )
}

function PlayIcon() {
  return (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
