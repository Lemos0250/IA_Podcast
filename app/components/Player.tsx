'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

export default function SimplePodcastWithImage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
      {/* Imagem */}
      <div className="lg:w-3/5">
        <Image
          src="/img/Joker.png"
          alt="Joker"
          width={1000}
          height={1000}
          className="rounded-lg shadow-lg"
        />
      </div>
      
      {/* Player */}
      <div className="lg:w-3/5 w-full">
        <div className="rounded-xl">
          
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-20 h-20 rounded-full bg-stone-900 text-white hover:bg-stone-800 transition-colors"
            >
              {isPlaying ? (
                <span className="text-3xl">⏸</span>
              ) : (
                <span className="text-3xl ml-1">▶</span>
              )}
            </button>
          </div>
          
          <div className="text-center">
            <audio
              ref={audioRef}
              controls
              className="w-full"
              src="/audio/0119.mp3"
            />
          </div>
        </div>
      </div>
    </div>
  )
}