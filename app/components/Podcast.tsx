type DialogueProps = {
  speaker: string
  text: string
  variant?: "host" | "guest"
}

export default function Podcast({
  speaker,
  text,
  variant = "host",
}: DialogueProps) {
  return (
    <div className="space-y-3 mb-8">
      <p
        className={`text-sm uppercase tracking-[0.2em] font-sans ${
          variant === "host"
            ? "text-stone-600 font-medium"
            : "text-stone-500"
        }`}
      >
        {speaker}
      </p>

      <p className="text-xl leading-relaxed text-stone-800 font-light font-serif">
        {text}
      </p>
    </div>
  )
}