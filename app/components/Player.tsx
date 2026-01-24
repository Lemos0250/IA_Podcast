'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useAudioTranscription } from '../context/AudioTranscriptionContext'

interface PlayerProps {
  onTimeUpdate?: (time: number) => void;
  onPlayStateChange?: (playing: boolean) => void;
}

export default function Player({ onTimeUpdate, onPlayStateChange }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { loadMockTranscription } = useAudioTranscription()
  
  const audioSrc = "/audio/0119.mp3"

  useEffect(() => {
    loadMockTranscription()
  }, [loadMockTranscription])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime
      setCurrentTime(time)
      if (onTimeUpdate) {
        onTimeUpdate(time)
      }
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        if (onPlayStateChange) onPlayStateChange(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
        if (onPlayStateChange) onPlayStateChange(true)
      }
    }
  }

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
      if (onTimeUpdate) {
        onTimeUpdate(time)
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
      
      {/* Imagem */}
      <div className="w-full max-w-2xl">
        <Image
          src="/img/Joker.png"
          alt="Joker - Além da Justiça"
          width={1000}
          height={1000}
          className="rounded-lg shadow-lg w-full h-auto"
          priority
        />
      </div>
      
      {/* Player Avançado */}
      <div className="w-full max-w-2xl">
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-stone-900 text-white hover:bg-stone-800 transition-colors active:scale-95"
              >
                {isPlaying ? (
                  <span className="text-xl">⏸</span>
                ) : (
                  <span className="text-xl ml-1">▶</span>
                )}
              </button>
              
              <div className="text-sm text-stone-600">
                <div className="font-medium font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
                <div className="text-xs">
                  {isPlaying ? '▶ Tocando...' : '⏸ Pausado'}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xs text-stone-500 mb-1">
                Transcrição sincronizada
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Ativa</span>
              </div>
            </div>
          </div>
          
          {/* Barra de progresso customizada */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-900 hover:[&::-webkit-slider-thumb]:scale-110"
            />
          </div>
          
          {/* Controles */}
          <div className="flex items-center justify-between text-sm text-stone-600 mb-2">
            <span className="text-xs">00:00</span>
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
          
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => {
              setIsPlaying(true)
              if (onPlayStateChange) onPlayStateChange(true)
            }}
            onPause={() => {
              setIsPlaying(false)
              if (onPlayStateChange) onPlayStateChange(false)
            }}
            className="hidden"
            src={audioSrc}
          />
          
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-stone-500">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-blue-100 border border-blue-300"></div>
              <span>Atual</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-stone-200"></div>
              <span>Passado</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-white border border-stone-300"></div>
              <span>Futuro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}