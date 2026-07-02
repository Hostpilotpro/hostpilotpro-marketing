import { Reveal } from "./Reveal";

export function CtaBand() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="rounded-2xl bg-navy px-8 py-14 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl text-display font-semibold text-white">
            Run your portfolio on the product operators actually use
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            All three apps, unlimited seats, uncapped AI — priced per portfolio. Start on
            join.mrpropertysiam.com.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://join.mrpropertysiam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-cream px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
            >
              Start free trial
            </a>
            <a
              href="mailto:info@mrpropertysiam.com"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Talk to us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
