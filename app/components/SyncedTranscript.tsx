'use client'

import { useEffect, useRef, useState } from 'react'

interface TranscriptSegment {
  start: number;
  end: number;
  speaker: string;
  text: string;
}

interface SyncedTranscriptProps {
  segments: TranscriptSegment[];
  currentTime: number;
  onSegmentClick?: (time: number) => void;
}

export default function SyncedTranscript({ 
  segments, 
  currentTime,
  onSegmentClick 
}: SyncedTranscriptProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [lastScrollTime, setLastScrollTime] = useState<number>(0)

  
  useEffect(() => {
    if (segments.length === 0) return

    const activeSegmentIndex = segments.findIndex(
      segment => currentTime >= segment.start && currentTime <= segment.end
    )
    
    if (activeSegmentIndex !== activeIndex) {
      setActiveIndex(activeSegmentIndex)
      
      
      const now = Date.now()
      if (activeSegmentIndex !== -1 && containerRef.current && (now - lastScrollTime) > 1000) {
        const segmentElements = containerRef.current.querySelectorAll('.segment-item')
        if (segmentElements[activeSegmentIndex]) {
          setTimeout(() => {
            segmentElements[activeSegmentIndex].scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            })
            setLastScrollTime(now)
          }, 100)
        }
      }
    }
  }, [currentTime, segments, activeIndex, lastScrollTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSegmentClick = (time: number) => {
    if (onSegmentClick) {
      onSegmentClick(time)
    }
  }

  return (
    <div 
      ref={containerRef}
      className="h-[500px] overflow-y-auto p-4 bg-stone-50 rounded-lg border border-stone-200 scroll-smooth"
    >
      <div className="space-y-4">
        {segments.length > 0 ? (
          segments.map((segment, index) => {
            const isActive = index === activeIndex
            const isPast = currentTime > segment.end
            const isFuture = currentTime < segment.start
            
            return (
              <div
                key={index}
                className={`segment-item p-4 rounded-lg transition-all duration-300 cursor-pointer transform ${
                  isActive 
                    ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm scale-[1.02]' 
                    : isPast
                    ? 'bg-stone-100 opacity-80'
                    : isFuture
                    ? 'bg-white opacity-90'
                    : 'bg-white hover:bg-stone-50 hover:shadow-sm'
                }`}
                onClick={() => handleSegmentClick(segment.start)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      isActive ? 'bg-blue-100 text-blue-700' : 
                      isPast ? 'bg-stone-200 text-stone-600' :
                      'bg-stone-100 text-stone-600'
                    }`}>
                      {segment.speaker === 'IVAN ALMEIDA' ? 'IA' : 'C'}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className={`font-medium ${
                        isActive ? 'text-blue-800' : 
                        isPast ? 'text-stone-600' :
                        'text-stone-800'
                      }`}>
                        {segment.speaker}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        {formatTime(segment.start)} → {formatTime(segment.end)}
                      </span>
                    </div>
                    
                    <p className={`leading-relaxed ${
                      isActive ? 'text-blue-900 font-medium' : 
                      isPast ? 'text-stone-600' :
                      'text-stone-700'
                    }`}>
                      {segment.text}
                    </p>
                    
                    {isActive && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-blue-100">
                        <span className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                          Tocando agora...
                        </span>
                        <span className="text-xs text-blue-500">
                          {currentTime.toFixed(1)}s
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-stone-200 to-stone-300 rounded-full">
              <span className="text-2xl">🎵</span>
            </div>
            <p className="text-stone-600">
              Nenhuma transcrição disponível. Gere a transcrição para ver o texto sincronizado.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}