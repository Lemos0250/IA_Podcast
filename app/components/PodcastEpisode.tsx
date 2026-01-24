'use client'

import { useState } from 'react'
import Podcast from './Podcast'
import Transcription from './Translate'

interface PodcastEpisodeProps {
  episodeNumber: number
  audioSrc: string
  hostText: string
  guestText: string
  guestName?: string
}

export default function PodcastEpisode({
  episodeNumber = 1,
  audioSrc = '/audio/entrevista.mp3',
  hostText = "Hoje vamos além da justiça e tentar entender o outro lado da conversa",
  guestText = "A verdade é que ninguém gosta de ouvir aquilo que desafia suas certezas",
  guestName = "Entrevistado"
}: PodcastEpisodeProps) {
  const [showTranscription, setShowTranscription] = useState(false)

  return (
    <div className="space-y-8 mb-12">
        
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-stone-900">
          Episódio #{episodeNumber}
        </h2>
        <button
          onClick={() => setShowTranscription(!showTranscription)}
          className="px-4 py-2 text-sm bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
        >
          {showTranscription ? 'Ocultar Transcrição' : 'Mostrar Transcrição'}
        </button>
      </div>

      {/* Player de Áudio */}
      <div className="bg-white p-6 rounded-xl border border-stone-200">
        <audio 
          controls 
          src={audioSrc} 
          className="w-full"
        />
      </div>

      {/* Diálogo usando componente Podcast */}
      <Podcast
        speaker="Ivan Almeida"
        text={hostText}
        variant="host"
      />

      <Podcast
        speaker={guestName}
        text={guestText}
        variant="guest"
      />

      {/* Transcrição usando SEU componente Transcription */}
      {showTranscription && (
        <div className="mt-8">
          <Transcription />
        </div>
      )}
    </div>
  )
}