export default function Footer() {
  return (
    <footer className="bg-black text-white px-12 py-12 flex flex-wrap justify-between items-center gap-6">
      <div className="text-[18px] font-bold">Stabeli Studio</div>
      <div className="flex gap-7">
        <a href="mailto:lucasstabeli@hotmail.com"
           className="text-white/50 hover:text-white text-sm no-underline transition-colors">
          E-mail
        </a>
      </div>
      <div className="text-white/30 text-[13px]">© 2026 Stabeli Studio. Todos os direitos reservados.</div>
    </footer>
  );
}
