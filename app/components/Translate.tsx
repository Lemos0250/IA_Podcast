'use client'

import { useAudioTranscription } from '../context/AudioTranscriptionContext'
import { useState, useEffect } from 'react'

export default function Transcription() {
  const { transcription, isTranscribing, error, startTranscription, clearTranscription } = useAudioTranscription()
  const [lastAction, setLastAction] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (transcription && !isTranscribing && !error) {
      setLastAction('success')
    } else if (error) {
      setLastAction('error')
    }
  }, [transcription, isTranscribing, error])

  const handleTranscribe = async () => {
    console.log('🎬 Usuário clicou em Gerar Transcrição')
    await startTranscription()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transcription)
    alert('Transcrição copiada para a área de transferência!')
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-200">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-stone-900">Transcrição por IA</h3>
          <p className="text-sm text-stone-500 mt-1">
            {lastAction === 'success' ? '✅ Transcrição gerada com sucesso' : 
             lastAction === 'error' ? '❌ Erro na geração' : 
             'Clique para gerar a transcrição automática'}
          </p>
        </div>
        
        <div className="flex gap-2">
          {transcription && (
            <>
              <button
                onClick={handleCopy}
                className="px-3 py-2 text-sm bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
              >
                📋 Copiar
              </button>
              <button
                onClick={clearTranscription}
                className="px-3 py-2 text-sm bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
              >
                🗑️ Limpar
              </button>
            </>
          )}
          
          <button
            onClick={handleTranscribe}
            disabled={isTranscribing}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isTranscribing ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Processando IA...
              </>
            ) : (
              '🎤 Gerar Transcrição'
            )}
          </button>
        </div>
      </div>
      
      {/* Área de Status */}
      {isTranscribing && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <div>
              <p className="font-medium text-blue-800">IA processando áudio...</p>
              <p className="text-sm text-blue-600">
                Analisando o arquivo de áudio e convertendo para texto. Isso pode levar alguns segundos.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {error && !isTranscribing && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-red-600">❌</span>
            <div>
              <p className="font-medium text-red-800">Erro na transcrição</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
              <p className="text-xs text-red-500 mt-2">
                Dica: Verifique se o servidor está rodando e se a API está acessível.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Área de Conteúdo */}
      <div className="min-h-[300px] transition-all duration-300">
        {isTranscribing ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-6 bg-stone-200 rounded w-3/4"></div>
            <div className="h-4 bg-stone-200 rounded"></div>
            <div className="h-4 bg-stone-200 rounded w-5/6"></div>
            <div className="h-6 bg-stone-200 rounded w-2/4 mt-6"></div>
            <div className="h-4 bg-stone-200 rounded w-4/6"></div>
            <div className="h-4 bg-stone-200 rounded w-5/6"></div>
            <div className="h-4 bg-stone-200 rounded w-3/4"></div>
          </div>
        ) : transcription ? (
          <div className="space-y-6">
            <div className="relative">
              <div className="whitespace-pre-wrap font-serif text-stone-700 leading-relaxed text-lg">
                {transcription}
              </div>
            </div>
            
            <div className="pt-4 border-t border-stone-200">
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-stone-500">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Transcrição disponível
                  </span>
                </div>
                <div className="text-xs">
                  Clique em Copiar para salvar o texto
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 rounded-full">
              <span className="text-3xl">🤖</span>
            </div>
            <h4 className="text-xl font-medium text-stone-900 mb-3">
              Transcrição Inteligente
            </h4>
            <p className="text-stone-600 mb-8 max-w-md mx-auto">
              Nosso sistema de IA pode analisar o áudio da entrevista e criar uma transcrição textual automática com separação de falantes e pontuação inteligente.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 bg-stone-50 rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <p className="font-medium text-stone-800">Precisão</p>
                <p className="text-sm text-stone-500">Alta taxa de acerto em português</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <p className="font-medium text-stone-800">Rápido</p>
                <p className="text-sm text-stone-500">Processamento em segundos</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-lg">
                <div className="text-2xl mb-2">📝</div>
                <p className="font-medium text-stone-800">Formatado</p>
                <p className="text-sm text-stone-500">Com pontuação e estrutura</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Rodapé informativo */}
      <div className="mt-6 pt-4 border-t border-stone-200">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer text-sm text-stone-500 hover:text-stone-700">
            <span>ℹ️ Como funciona a transcrição por IA?</span>
            <span className="group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="mt-2 pt-2 border-t border-stone-100 text-xs text-stone-500 space-y-2">
            <p>1. O áudio é enviado para nosso servidor de processamento</p>
            <p>2. A IA analisa as frequências de voz e converte em texto</p>
            <p>3. O sistema identifica diferentes falantes automaticamente</p>
            <p>4. Pontuação e formatação são aplicadas inteligentemente</p>
            <p className="mt-2 italic">
              Esta é uma versão demonstrativa. Para produção, integre com serviços como OpenAI Whisper ou AssemblyAI.
            </p>
          </div>
        </details>
      </div>
    </div>
  )
}