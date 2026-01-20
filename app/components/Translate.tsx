// src/components/Transcription.tsx
'use client'

import { useState } from 'react'

export default function Transcription() {
  const [transcription, setTranscription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const transcribeAudio = async (audioFile: File) => {
    setIsLoading(true)
    
    const formData = new FormData()
    formData.append('file', audioFile)
    formData.append('model', 'whisper-1')
    
    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      setTranscription(data.text)
    } catch (error) {
      console.error('Erro na transcrição:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-200">
      <h3 className="text-lg font-semibold mb-4">Transcrição do Áudio</h3>
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900 mx-auto"></div>
          <p className="mt-2 text-stone-500">Transcrevendo áudio...</p>
        </div>
      ) : transcription ? (
        <div className="prose prose-stone max-w-none">
          <pre className="whitespace-pre-wrap font-serif text-stone-700">
            {transcription}
          </pre>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-stone-500 mb-4">Faça upload de um arquivo de áudio para transcrever</p>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                transcribeAudio(e.target.files[0])
              }
            }}
            className="block w-full text-sm text-stone-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-stone-900 file:text-white
              hover:file:bg-stone-800"
          />
        </div>
      )}
    </div>
  )
}