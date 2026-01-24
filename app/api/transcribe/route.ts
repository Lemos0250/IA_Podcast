// app/api/transcribe/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('=== API TRANSCRIBE CHAMADA ===')
  
  try {
    // Verifica se o corpo da requisição existe
    let body;
    try {
      body = await request.json()
      console.log('Corpo recebido:', body)
    } catch (parseError) {
      console.error('Erro ao parsear JSON:', parseError)
      return NextResponse.json({
        text: 'Erro: Corpo da requisição inválido ou não é JSON',
        success: false,
        error: 'Invalid JSON body'
      }, { status: 400 })
    }

    const { audioUrl } = body
    
    if (!audioUrl) {
      return NextResponse.json({
        text: 'Erro: audioUrl é obrigatório',
        success: false,
        error: 'Missing audioUrl'
      }, { status: 400 })
    }

    console.log('Transcrevendo áudio:', audioUrl)
    
    // TRANSCRIÇÃO SIMULADA DETALHADA
    const simulatedTranscription = `[TRANSCRIÇÃO AUTOMÁTICA - EPISÓDIO #1]
Gerada em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}

[INÍCIO DA TRANSCRIÇÃO]

IVAN ALMEIDA: Hoje vamos além da justiça e tentar entender o outro lado da conversa. Em uma entrevista exclusiva, conversamos com uma das figuras mais controversas da cidade.

O CORINGA: A verdade é que ninguém gosta de ouvir aquilo que desafia suas certezas. A sociedade cria regras para se proteger do caos que existe dentro de cada um de nós.

IVAN ALMEIDA: Mas o caos não destrói tudo? Não destrói a ordem que tanto lutamos para construir?

O CORINGA: Destrói? Ou revela? O que você vê como destruição, eu vejo como sinceridade. Quando tudo é reduzido a pó, finalmente você pode ver o que realmente importa. Vocês construíram castelos de areia e reclamam quando a maré chega.

IVAN ALMEIDA: E as pessoas inocentes? As vidas destruídas?

O CORINGA: Inocentes? Todos nós temos nossa quota de culpa. O sistema que você defende destrói vidas todos os dias, só que de forma mais lenta, mais aceitável. Eu apenas acelero o processo. Mostro a ferida que já existia.

IVAN ALMEIDA: Mas há leis, há justiça...

O CORINGA: Leis feitas pelos poderosos para controlar os fracos. Justiça que pode ser comprada por quem tem dinheiro. Eu não inventei esse jogo, só mostrei como ele realmente funciona.

[FIM DA TRANSCRIÇÃO]

Duração estimada: 47:22
Palavras transcritas: ~850
Confiança da IA: 92%
Idioma detectado: Português (Brasil)`
    
    // Simula um delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Transcrição simulada gerada com sucesso')
    
    return NextResponse.json({
      text: simulatedTranscription,
      success: true,
      timestamp: new Date().toISOString(),
      metadata: {
        duration: '00:47:22',
        language: 'pt-BR',
        wordCount: 850,
        confidence: 0.92,
        source: 'simulated-transcription-service'
      }
    })
    
  } catch (error) {
    console.error('Erro inesperado na API:', error)
    
    return NextResponse.json({
      text: '❌ Erro inesperado no servidor de transcrição. Por favor, tente novamente mais tarde.',
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// Adiciona também um método GET para testar
export async function GET() {
  console.log('GET request para /api/transcribe')
  
  return NextResponse.json({
    message: 'API de transcrição está funcionando!',
    endpoint: 'POST /api/transcribe',
    status: 'operational',
    timestamp: new Date().toISOString(),
    instructions: 'Envie um POST com { audioUrl: "string" } para transcrever'
  })
}