// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Player from "./components/Player"
import SyncedTranscript from "./components/SyncedTranscript"
import { useAudioTranscription } from './context/AudioTranscriptionContext'

export default function Home() {
  const [currentAudioTime, setCurrentAudioTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const { transcriptionSegments } = useAudioTranscription()

  const handleTimeUpdate = (time: number) => {
    setCurrentAudioTime(time)
  }

  const handleSegmentClick = (time: number) => {
    setCurrentAudioTime(time)
    const audioElement = document.querySelector('audio') as HTMLAudioElement
    if (audioElement) {
      audioElement.currentTime = time
      if (!isPlaying) {
        audioElement.play()
        setIsPlaying(true)
      }
    }
  }

  const handlePlayStateChange = (playing: boolean) => {
    setIsPlaying(playing)
  }

  useEffect(() => {
    // Atualizar o tempo inicial do áudio se mudar externamente
    const audioElement = document.querySelector('audio') as HTMLAudioElement
    if (audioElement) {
      const handleTimeUpdateEvent = () => {
        setCurrentAudioTime(audioElement.currentTime)
      }
      audioElement.addEventListener('timeupdate', handleTimeUpdateEvent)
      
      return () => {
        audioElement.removeEventListener('timeupdate', handleTimeUpdateEvent)
      }
    }
  }, [])

  return (
    <section className="flex flex-col lg:flex-row-reverse gap-8 p-4 md:p-8">
      
      {/* Coluna da Direita - Player */}
      <div className="lg:w-2/5">
        <Player 
          onTimeUpdate={handleTimeUpdate}
          onPlayStateChange={handlePlayStateChange}
        />
      </div>

      {/* Coluna da Esquerda - Conteúdo */}
      <div className="lg:w-3/5">
        {/* Cabeçalho */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Além da Justiça
          </h1>
          <p className="text-xl text-stone-600 mb-2">
            A Entrevista Proibida
          </p>
          <p className="text-stone-500">
            Pela primeira vez, o outro lado da história é ouvido. Uma conversa sem filtros com a figura mais enigmática da cidade.
          </p>
        </div>
        
        {/* Transcrição Sincronizada */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-stone-900">
              Transcrição Sincronizada
            </h2>
            <div className="text-sm text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
              {isPlaying ? '▶ Tocando' : '⏸ Pausado'} • 
              <span className="font-mono font-bold ml-1">{currentAudioTime.toFixed(1)}s</span>
            </div>
          </div>
          
          <SyncedTranscript 
            segments={transcriptionSegments}
            currentTime={currentAudioTime}
            onSegmentClick={handleSegmentClick}
          />
          
          <div className="flex items-center justify-between mt-3 text-sm text-stone-500">
            <p>
              O texto é destacado automaticamente conforme o áudio toca.
            </p>
            <p className="text-xs bg-stone-100 px-2 py-1 rounded">
              Clique em qualquer bloco para pular para aquele momento
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}