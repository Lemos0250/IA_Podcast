export default function Footer() {
  return (
    <footer className="text-center py-8 text-sm text-stone-400 border-t border-stone-200 mt-16">
      © Projeto experimental de IA • {new Date().getFullYear()}
    </footer>
  )
}