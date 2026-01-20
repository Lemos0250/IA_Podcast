// src/app/page.tsx
import VideoPlayer from "./components/Player"
import Podcast from "./components/Podcast"

export default function Home() {
  return (
    <section className="mt-8">
      <VideoPlayer />
      
      <div className="pt-12 pb-8">
        <Podcast
          speaker="Ivan Almeida"
          text="Hoje vamos além da justiça e tentar entender o outro lado da conversa"
          variant="host"
        />

        <Podcast
          speaker="Entrevistado"
          text="A verdade é que ninguém gosta de ouvir aquilo que desafia suas certezas"
          variant="guest"
        />
      </div>
    </section>
  )
}