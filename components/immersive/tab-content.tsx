import {
  ChevronRight,
  Clock,
  MapPin,
  Maximize2,
  Phone,
} from "lucide-react";
import {
  spaces,
  programme,
  options,
  plans,
  hours,
} from "./data";
import { SectionTitle, Panel, Pill } from "./ui";
import type { TabId } from "./types";

interface TabContentProps {
  tab: TabId;
  onScan: (params?: Record<string, string>) => void;
  onResetView: () => void;
}

export function TabContent({ tab, onScan, onResetView }: TabContentProps) {
  return (
    <>
      {tab === "club" && (
        <Panel>
          <SectionTitle title="Le club" subtitle="Découvrez nos espaces" />
          <div className="space-y-3">
            {spaces.map((s) => (
              <button
                key={s.id}
                onClick={() => onScan(s.params)}
                className="group relative block w-full overflow-hidden rounded-xl border border-border text-left transition hover:border-lime/60"
              >
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-500 group-hover:scale-105 group-hover:opacity-60"
                />
                <div className="relative bg-linear-to-r from-background/95 via-background/70 to-transparent p-4 md:p-5">
                  <h3 className="skew-title text-lg md:text-xl">{s.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-lime md:text-[11px]">
                    Visite 3D
                  </span>
                  <p className="mt-2 max-w-[16rem] text-xs text-muted-foreground md:mt-3 md:text-sm">
                    {s.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1 md:mt-3 md:gap-1.5">
                    {s.equipment.slice(0, 3).map((e) => (
                      <Pill key={e}>{e}</Pill>
                    ))}
                  </div>
                  <span className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-lime text-lime-foreground transition group-hover:translate-x-1 md:bottom-4 md:right-4 md:size-10">
                    <ChevronRight className="size-4 md:size-5" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Panel>
      )}

      {tab === "programme" && (
        <Panel>
          <SectionTitle
            title="Programme"
            subtitle="Cours collectifs de la semaine"
          />
          <div className="space-y-5">
            {programme.map((day) => (
              <div key={day.day}>
                <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-lime">
                  {day.day}
                </h3>
                <div className="space-y-2">
                  {day.items.map((it) => (
                    <div
                      key={it.n + it.t}
                      className="flex items-center gap-3 rounded-lg border border-border bg-card/60 px-3 py-2.5 transition hover:border-lime/50 md:gap-4 md:px-4 md:py-3"
                    >
                      <span className="font-mono text-xs font-bold text-foreground md:text-sm">
                        {it.t}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold md:text-sm">
                          {it.n}
                        </p>
                        <p className="text-[10px] text-muted-foreground md:text-xs">
                          {it.c} · {it.d}
                        </p>
                      </div>
                      <span className="rounded-md bg-lime/15 px-2 py-1 text-[9px] font-bold uppercase text-lime md:text-[10px]">
                        Réserver
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {tab === "options" && (
        <Panel>
          <SectionTitle
            title="Options"
            subtitle="Personnalisez votre expérience"
          />
          <div className="space-y-3">
            {options.map((o) => (
              <div
                key={o.name}
                className="rounded-xl border border-border bg-card/60 p-3.5 md:p-4"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="skew-title text-sm md:text-base">{o.name}</h3>
                  <span className="whitespace-nowrap text-xs font-bold text-lime md:text-sm">
                    {o.price}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground md:mt-2 md:text-sm">
                  {o.desc}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {tab === "abonnements" && (
        <Panel>
          <SectionTitle title="Abonnements" subtitle="Sans engagement" />
          <div className="space-y-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-xl border p-4 md:p-5 ${
                  p.featured
                    ? "border-lime bg-lime/10 shadow-[0_0_40px_oklch(0.95_0.24_118/0.15)]"
                    : "border-border bg-card/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="skew-title text-lg md:text-xl">{p.name}</h3>
                  {p.featured && (
                    <span className="rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold uppercase text-lime-foreground">
                      Populaire
                    </span>
                  )}
                </div>
                <p className="mt-2 skew-title text-2xl text-lime md:text-3xl">
                  {p.price}€
                  <span className="text-xs text-muted-foreground md:text-sm">
                    {p.period}
                  </span>
                </p>
                <ul className="mt-2.5 space-y-1 text-xs text-muted-foreground md:mt-3 md:space-y-1.5 md:text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-lime">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="skew-title mt-3 w-full rounded-lg bg-lime py-2 text-sm text-lime-foreground transition hover:brightness-110 md:mt-4 md:py-2.5 md:text-base">
                  Je m&apos;abonne
                </button>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {tab === "infos" && (
        <Panel>
          <SectionTitle title="Infos" subtitle="Club & accès" />
          <div className="space-y-3 text-sm md:space-y-4">
            {/* Subtitle */}
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground md:text-sm">
              Salle de sport / centre de remise en forme
            </p>
            {/* Address */}
            <div className="flex gap-3 rounded-xl border border-border bg-card/60 p-3.5 md:p-4">
              <MapPin className="mt-0.5 size-4 shrink-0 text-lime" />
              <p className="text-xs md:text-sm">Zone Industriel — Salé</p>
            </div>
            {/* Google Maps */}
            <div className="overflow-hidden rounded-xl border border-border bg-card/60">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.3005100039622!2d-6.7905193247633395!3d34.061810017225866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda769007ea34f43%3A0x58061bfa4ad19bbf!2sDynamo%20Fit!5e0!3m2!1sfr!2sma!4v1787142995778!5m2!1sfr!2sma"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="block"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            {/* Hours */}
            <div className="rounded-xl border border-border bg-card/60 p-3.5 md:p-4">
              <h3 className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-lime md:mb-3">
                <Clock className="size-3.5" /> Horaires
              </h3>
              <ul className="space-y-1.5 md:space-y-2">
                {hours.map((h) => (
                  <li
                    key={h.d}
                    className="flex justify-between text-xs text-muted-foreground md:text-sm"
                  >
                    <span>{h.d}</span>
                    <span className="font-mono text-foreground">{h.h}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Phone */}
            <div className="flex gap-3 rounded-xl border border-border bg-card/60 p-3.5 md:p-4">
              <Phone className="mt-0.5 size-4 shrink-0 text-lime" />
              <p className="text-xs md:text-sm">06-10-30-70-60</p>
            </div>
            {/* Service pills */}
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              <Pill>Martial Arts</Pill>
              <Pill>Bodybuilding 100% Men</Pill>
              <Pill>Kid&apos;s Gymnastics</Pill>
              <Pill>Yoga & Pilates</Pill>
              <Pill>Parking gratuit</Pill>
              <Pill>Vestiaires & douches</Pill>
            </div>
            <button
              onClick={onResetView}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-lime/40 py-2 text-[10px] font-bold uppercase tracking-widest text-lime transition hover:bg-lime hover:text-lime-foreground md:py-2.5 md:text-xs"
            >
              <Maximize2 className="size-3.5 md:size-4" /> Relancer la visite
            </button>
          </div>
        </Panel>
      )}
    </>
  );
}
