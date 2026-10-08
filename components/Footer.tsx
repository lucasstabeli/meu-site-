export default function Footer() {
  return (
    <footer className="bg-tinta py-12 text-apoio-escuro">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 text-[15px] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <p>Stabeli Studio. Sites, apps e sistemas para pequenos negócios.</p>
        <ul className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <li>
            <a
              href="mailto:stabeli.studio@gmail.com"
              className="inline-flex min-h-[44px] items-center text-white hover:underline focus-visible:underline"
            >
              stabeli.studio@gmail.com
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/stabelistudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center text-white hover:underline focus-visible:underline"
            >
              Instagram @stabelistudio
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </li>
        </ul>
        <p>© {new Date().getFullYear()} Stabeli Studio</p>
      </div>
    </footer>
  );
}
