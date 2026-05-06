import { SacredLayout, PageHeader } from "@/components/SacredLayout";
import { prayers } from "@/data/content";
import { useProgress } from "@/lib/storage";
import { useState } from "react";
import { Check, Cross } from "lucide-react";

export default function PrayersPage() {
  const { progress, markPrayerRead } = useProgress();
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const list = prayers.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  const p = list[active] ?? prayers[0];

  return (
    <SacredLayout>
      <PageHeader eyebrow="Kinh căn bản" title="Các kinh Công giáo" subtitle="Đọc, suy niệm và ghi nhớ những lời kinh nền tảng." />
      <div className="container grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="lg:sticky lg:top-24 self-start">
          <input value={search} onChange={(e) => { setSearch(e.target.value); setActive(0); }}
            placeholder="Tìm kinh…" className="w-full px-4 py-2.5 rounded-full border border-input bg-background text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-burgundy/40" />
          <ul className="space-y-1.5">
            {list.map((pr, i) => (
              <li key={pr.id}>
                <button onClick={() => setActive(i)}
                  className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm flex items-center gap-2 transition-colors ${
                    list[active]?.id === pr.id ? "bg-burgundy text-primary-foreground" : "hover:bg-muted"
                  }`}>
                  <Cross className="w-3.5 h-3.5 opacity-70" />
                  <span className="font-serif">{pr.title}</span>
                  {progress.prayersRead[pr.id] && <Check className="w-3.5 h-3.5 ml-auto opacity-70" />}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <article className="rounded-3xl bg-ivory border border-border p-7 md:p-10 shadow-soft animate-fade-in">
          <h2 className="font-serif text-3xl md:text-4xl text-burgundy-deep">{p.title}</h2>
          <div className="mt-6 font-serif text-lg md:text-xl leading-[1.85] text-foreground/85 whitespace-pre-line text-balance">
            {p.body}
          </div>
          <div className="mt-8 flex justify-end">
            <button onClick={() => markPrayerRead(p.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-sacred text-primary-foreground text-sm font-medium shadow-soft">
              <Check className="w-4 h-4" /> Đã thuộc
            </button>
          </div>
        </article>
      </div>
    </SacredLayout>
  );
}