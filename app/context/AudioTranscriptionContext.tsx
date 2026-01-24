'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface TranscriptSegment {
  start: number;
  end: number;
  speaker: string;
  text: string;
}

interface AudioTranscriptionContextType {
  transcriptionSegments: TranscriptSegment[];
  isTranscribing: boolean;
  error: string | null;
  startTranscription: () => Promise<void>;
  clearTranscription: () => void;
  loadMockTranscription: () => void;
}

const AudioTranscriptionContext = createContext<AudioTranscriptionContextType | undefined>(undefined)

export function AudioTranscriptionProvider({ children }: { children: ReactNode }) {
  const [transcriptionSegments, setTranscriptionSegments] = useState<TranscriptSegment[]>([])
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadMockTranscription = () => {
    console.log('📋 Carregando transcrição real com música inicial...')
    
    const realSegments: TranscriptSegment[] = [
      {
        start: 0.0,
        end: 20.0,
        speaker: "MÚSICA",
        text: "♪ Música tema do podcast 'Além da Justiça' ♪"
      },
      {
        start: 20.0,
        end: 35.0,
        speaker: "IVAN ALMEIDA",
        text: "Pessoal, aqui quem fala é o Ivan Almeida, e este é o Além da Justiça, o podcast em que mergulhamos nas mentes mais curiosas, controversas e provocativas do universo que amamos."
      },
      {
        start: 35.5,
        end: 50.0,
        speaker: "IVAN ALMEIDA",
        text: "Hoje é um episódio que muita gente achou improvável. Temos com a gente um dos nomes mais enigmáticos de Gotham City: um homem cuja mente ninguém realmente entende e que passou boa parte da sua história encarando o mundo com um sorriso torto e uma visão bem particular da realidade. Seja bem-vindo."
      },
      {
        start: 51.0,
        end: 65.0,
        speaker: "O CORINGA",
        text: "Obrigado, Ivan. Quando ouvi esse convite, pensei que não teria gente com olhar clínico analisando a minha vida. Mas fico feliz de estar aqui, sob as luzes. Vamos nos divertir. Prometo não explodir nada… pelo menos não hoje."
      },
      {
        start: 66.0,
        end: 75.0,
        speaker: "IVAN ALMEIDA",
        text: "Vamos começar fácil. O que você faz da vida hoje? Como você se define quando não está em pleno projeto caótico por Gotham?"
      },
      {
        start: 76.0,
        end: 105.0,
        speaker: "O CORINGA",
        text: "O que eu faço, Ivan, é observar. Eu observo as engrenagens girando, as pessoas achando que estão no controle, fazendo planos e fingindo sanidade. E então eu apareço para dar uma sacudida. Alguns pintam quadros, outros tocam música. Eu provoco percepções. Gosto de ver até onde a lógica humana aguenta antes de quebrar."
      },
      {
        start: 106.0,
        end: 118.0,
        speaker: "O CORINGA",
        text: "Minha ocupação pode ser chamada de criminosa, mas isso é só um rótulo. Criminoso é quem usa regras para esconder falhas. Eu só mostro onde o sistema não funciona."
      },
      {
        start: 120.0,
        end: 128.0,
        speaker: "IVAN ALMEIDA",
        text: "Todo mundo tem uma história. Qual é a sua? Você sempre foi assim ou houve algo que te levou a esse caminho?"
      },
      {
        start: 130.0,
        end: 145.0,
        speaker: "O CORINGA",
        text: "Origem é algo que todo mundo quer saber. Dizem que eu não tenho um nome verdadeiro. Alguns falam de um engenheiro químico que, após um roubo fracassado, caiu em um tanque de resíduos e saiu assim."
      },
      {
        start: 146.0,
        end: 155.0,
        speaker: "O CORINGA",
        text: "Outros dizem que eu era um comediante que só queria fazer as pessoas rirem, mas a vida riu primeiro. A vida mostra isso bem: um homem comum quebrado por um único dia ruim nunca mais foi o mesmo."
      },
      {
        start: 157.0,
        end: 165.0,
        speaker: "IVAN ALMEIDA",
        text: "Falando em Gotham, o que essa cidade representa pra você?"
      },
      {
        start: 167.0,
        end: 182.0,
        speaker: "O CORINGA",
        text: "Ah, Gotham… a cidade perfeita. Uma metrópole emocional, cheia de vidas agitadas, corações apertados e gente com medo das próprias sombras. Gotham é como um espelho mal polido: distorce, mas revela tudo o que você tenta esconder. Eu sou só um desses reflexos que as pessoas fingem não ver."
      },
      {
        start: 184.0,
        end: 192.0,
        speaker: "O CORINGA",
        text: "Você chama de cidade, mas Gotham é quase uma personagem viva. Cheia de regras e autoridade, sempre a um passo de ser justa, mas nunca chegando lá. Cada esquina é um teste."
      },
      {
        start: 194.0,
        end: 202.0,
        speaker: "IVAN ALMEIDA",
        text: "Você passou um tempo significativo no Asilo Arkham. O que aquele lugar te ensinou sobre você e sobre os outros?"
      },
      {
        start: 204.0,
        end: 220.0,
        speaker: "O CORINGA",
        text: "Arkham… Arkham é um teatro de gente que acha que entendeu a mente humana porque leu alguns papéis e vestiu um jaleco. Eles chamam aquilo de tratamento, mas é mais um espetáculo onde todo mundo finge que sabe o que está quebrado."
      },
      {
        start: 222.0,
        end: 235.0,
        speaker: "O CORINGA",
        text: "Arkham ensina que sanidade é uma palavra frágil. A qualquer momento, uma batida inesperada da vida pode transformar alguém de normal em insano. E ali, todas as máscaras caem. É doloroso, é confuso e, principalmente, é humano."
      },
      {
        start: 237.0,
        end: 250.0,
        speaker: "O CORINGA",
        text: "Ah, meus colegas de Gotham… cada um deles tem sua própria obsessão. Duas-caras busca justiça dividida entre bem e mal, como se o mundo fosse simples assim. Charada acredita que inteligência resolve tudo, mas esquece que a mente humana não tem resposta única. O Pinguim só quer respeito — e isso diz muito sobre fragilidade."
      },
      {
        start: 252.0,
        end: 260.0,
        speaker: "O CORINGA",
        text: "Eu não sou parte dessa coleção. Eu sou o motivo pelo qual ela existe. Sem mim, a história não teria a mesma cor."
      },
      {
        start: 262.0,
        end: 270.0,
        speaker: "IVAN ALMEIDA",
        text: "E quanto ao Batman? O que ele representa pra você?"
      },
      {
        start: 272.0,
        end: 290.0,
        speaker: "O CORINGA",
        text: "Batman é o oposto do que eu sou e, ao mesmo tempo, o motivo da minha existência. Ele é a ordem tentando controlar o caos, a ideia de que tudo pode ser contido. Eu penso diferente: e se o caos for apenas parte da experiência humana?"
      },
      {
        start: 292.0,
        end: 300.0,
        speaker: "O CORINGA",
        text: "Ele representa o que a sociedade chama de esperança. Eu sou o lembrete de que a esperança também tem sombra. Sem ele, o caos seria só curiosidade. Com ele, virou arte."
      },
      {
        start: 302.0,
        end: 310.0,
        speaker: "IVAN ALMEIDA",
        text: "Para encerrar com uma nota leve: tem algo que as pessoas sempre entendem errado sobre você?"
      },
      {
        start: 312.0,
        end: 330.0,
        speaker: "O CORINGA",
        text: "Muita gente acha que eu sou simplesmente cruel ou irracional. Mas a verdade é que eu observo padrões. Vejo como as pessoas se comportam quando pressionadas. Há até teorias de que eu tenha algo chamado supersanidade — uma autoconsciência tão expansiva que, em vez de seguir uma personalidade rígida, eu simplesmente reajo ao mundo como ele é."
      },
      {
        start: 332.0,
        end: 340.0,
        speaker: "O CORINGA",
        text: "Não sou só louco. Sou adaptável demais. E isso, por si só, dá medo em muita gente… ha ha."
      },
      {
        start: 342.0,
        end: 355.0,
        speaker: "IVAN ALMEIDA",
        text: "Bom, chegamos ao fim dessa conversa intensa. Alguma última mensagem para quem está nos ouvindo?"
      },
      {
        start: 357.0,
        end: 375.0,
        speaker: "O CORINGA",
        text: "Nunca aceitem tudo o que lhes dizem como verdade absoluta. Questionem, duvidem e, principalmente, mantenham o senso de humor. Porque, no fim, a vida é uma piada que a maioria só percebe quando já é tarde demais."
      },
      {
        start: 377.0,
        end: 385.0,
        speaker: "BATMAN",
        text: "Já chega, Coringa. Isso acabou."
      },
      {
        start: 386.0,
        end: 392.0,
        speaker: "O CORINGA",
        text: "Ah, Batman… você sempre estraga a parte divertida, não é mesmo?"
      },
      {
        start: 394.0,
        end: 405.0,
        speaker: "IVAN ALMEIDA",
        text: "Pessoal, acho que hoje foi um dos episódios mais imprevisíveis do Além da Justiça. Até a próxima."
      }
    ]
    
    setTranscriptionSegments(realSegments)
  }

  const startTranscription = async () => {
    if (isTranscribing) return
    
    console.log('🔄 Iniciando processo de transcrição...')
    setIsTranscribing(true)
    setError(null)
    
    try {
      const audioUrl = '/audio/0119.mp3'
      console.log('📤 Enviando requisição para API...')
      
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          audioUrl: audioUrl
        }),
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Erro HTTP:', errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('✅ Dados recebidos:', data)
      
      if (data.success && data.segments) {
        setTranscriptionSegments(data.segments)
        console.log('📝 Transcrição definida com sucesso!')
      } else {
        console.error('❌ Resposta inválida:', data)
        loadMockTranscription() 
      }
      
    } catch (error) {
      console.error('💥 Erro na transcrição:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      setError(errorMessage)
      loadMockTranscription() 
    } finally {
      setIsTranscribing(false)
      console.log('🏁 Processamento finalizado')
    }
  }

  const clearTranscription = () => {
    setTranscriptionSegments([])
    setError(null)
  }

  useState(() => {
    loadMockTranscription()
  })

  return (
    <AudioTranscriptionContext.Provider value={{
      transcriptionSegments,
      isTranscribing,
      error,
      startTranscription,
      clearTranscription,
      loadMockTranscription,
    }}>
      {children}
    </AudioTranscriptionContext.Provider>
  )
}

export function useAudioTranscription() {
  const context = useContext(AudioTranscriptionContext)
  if (context === undefined) {
    throw new Error('useAudioTranscription must be used within AudioTranscriptionProvider')
  }
  return context
}