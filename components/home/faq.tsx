import { FAQS } from '@/lib/site'

export function Faq() {
  return (
    <section id="faq" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-arc">FAQ</p>
        <h2 className="mt-4 text-center text-3xl font-extrabold tracking-tight sm:text-5xl">Questions, answered.</h2>

        <div className="mt-12 flex flex-col gap-3">
          {FAQS.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-border bg-card p-5 [&_svg]:open:rotate-45">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {item.q}
                <svg className="size-5 shrink-0 text-arc transition-transform" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="mt-3 leading-7 text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
