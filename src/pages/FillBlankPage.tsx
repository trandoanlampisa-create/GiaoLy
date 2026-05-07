import { SacredLayout, PageHeader } from "@/components/SacredLayout";
import { fillBlankItems, prayers } from "@/data/content";
import { useProgress, normalizeAnswer } from "@/lib/storage";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, X, Lightbulb, RotateCcw, Shuffle, Eye } from "lucide-react";

type Mode = "recite" | "blanks";
type Source = "prayer" | "catechism";

// ---------- Recite items (full text given only the title) ----------
interface ReciteItem {
  id: string;
  source: Source;
  title: string;
  fullText: string;
}

const reciteItems: ReciteItem[] = [
  ...prayers.map((p) => ({ id: `r-${p.id}`, source: "prayer" as const, title: p.title, fullText: p.body })),
  // Catechism clauses derived from existing fill-blank source data
  ...Array.from(
    fillBlankItems
      .filter((f) => f.type === "catechism")
      .reduce((m, f) => m.set(f.sourceTitle, f.fullSentence), new Map<string, string>())
      .entries()
  ).map(([title, fullText], i) => ({ id: `r-c-${i}`, source: "catechism" as const, title, fullText })),
];

// ---------- Helpers ----------
function normalizeFull(s: string) {
  return s
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.,;:!?"“”‘’\-–—()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function similarity(a: string, b: string) {
  const A = normalizeFull(a).split(" ").filter(Boolean);
  const B = normalizeFull(b).split(" ").filter(Boolean);
  if (A.length === 0 || B.length === 0) return 0;
  const setB = new Map<string, number>();
  B.forEach((w) => setB.set(w, (setB.get(w) || 0) + 1));
  let hit = 0;
  A.forEach((w) => {
    const c = setB.get(w);
    if (c && c > 0) { hit++; setB.set(w, c - 1); }
  });
  return Math.round((hit / Math.max(A.length, B.length)) * 100);
}

// Pick blank indices for a tokenized sentence. Tokens are words separated by spaces.
// Prefer "meaningful" words (length >= 3, not common stop-ish), and aim for ~40% blanks.
const STOPWORDS = new Set(["và", "là", "của", "cho", "một", "các", "có", "với", "trong", "thì", "mà", "để", "không", "ở", "ta", "ngài", "này", "ấy", "đó"]);

function tokenize(sentence: string): string[] {
  // Keep punctuation attached so re-rendering preserves spacing
  return sentence.split(/(\s+)/).filter((t) => t.length > 0);
}

function chooseBlankIndices(tokens: string[], ratio = 0.4, seed = Date.now()): number[] {
  // Candidate token indices = non-whitespace, length>=2, not pure punctuation
  const candidates: number[] = [];
  tokens.forEach((tok, i) => {
    if (/^\s+$/.test(tok)) return;
    const word = tok.replace(/[.,;:!?"“”‘’\-–—()]/g, "");
    if (word.length < 2) return;
    if (STOPWORDS.has(word.toLowerCase())) return;
    candidates.push(i);
  });
  if (candidates.length === 0) return [];
  // Mulberry32 PRNG seeded
  let s = seed >>> 0;
  const rand = () => {
    s += 0x6D2B79F5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  // Shuffle candidates
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  const n = Math.max(2, Math.min(candidates.length, Math.round(candidates.length * ratio)));
  return candidates.slice(0, n).sort((a, b) => a - b);
}

function stripPunct(s: string) {
  return s.replace(/[.,;:!?"“”‘’\-–—()]/g, "");
}

// ---------- Page ----------
export default function FillBlankPage() {
  const [params, setParams] = useSearchParams();
  const mode = (params.get("mode") as Mode) || "recite";
  const source = (params.get("src") as Source) || "prayer";

  return (
    <SacredLayout>
      <PageHeader
        eyebrow="Luyện nhớ"
        title={mode === "recite" ? "Đọc thuộc lòng" : "Điền khuyết nâng cao"}
        subtitle={
          mode === "recite"
            ? "Chỉ cho biết tên — bạn gõ lại toàn bộ nội dung từ trí nhớ."
            : "Nhiều ô trống trong cùng một câu, được xáo trộn ngẫu nhiên mỗi lần làm."
        }
      />
      <div className="container max-w-2xl">
        {/* Mode tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {([
            { v: "recite", label: "Đọc thuộc lòng" },
            { v: "blanks", label: "Điền khuyết" },
          ] as const).map((m) => (
            <button
              key={m.v}
              onClick={() => setParams({ mode: m.v, src: source })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === m.v
                  ? "bg-burgundy text-primary-foreground shadow-soft"
                  : "bg-ivory border border-border text-foreground/70 hover:bg-muted"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        {/* Source tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {([
            { v: "prayer", label: "Lời kinh" },
            { v: "catechism", label: "Câu giáo lý" },
          ] as const).map((s) => (
            <button
              key={s.v}
              onClick={() => setParams({ mode, src: s.v })}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase transition-colors ${
                source === s.v
                  ? "bg-gold/20 text-burgundy-deep border border-gold/40"
                  : "bg-transparent border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {mode === "recite" ? (
          <ReciteRunner source={source} />
        ) : (
          <BlanksRunner source={source} />
        )}
      </div>
    </SacredLayout>
  );
}

// ---------- Recite Runner ----------
function ReciteRunner({ source }: { source: Source }) {
  const items = useMemo(() => reciteItems.filter((i) => i.source === source), [source]);
  const [idx, setIdx] = useState(0);
  const [val, setVal] = useState("");
  const [checked, setChecked] = useState(false);
  const [reveal, setReveal] = useState(false);
  const item = items[idx];

  useEffect(() => { setVal(""); setChecked(false); setReveal(false); }, [idx, source]);

  if (!item) return <div className="text-muted-foreground">Chưa có nội dung.</div>;

  const score = checked ? similarity(val, item.fullText) : 0;
  const verdict = score >= 95 ? "Hoàn hảo" : score >= 80 ? "Rất tốt" : score >= 60 ? "Khá" : "Cần ôn lại";

  return (
    <div className="rounded-3xl bg-ivory border border-border p-6 md:p-7 shadow-soft animate-scale-in">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-gold">
        <span>{source === "prayer" ? "Lời kinh" : "Câu giáo lý"}</span>
        <span className="text-muted-foreground">{idx + 1}/{items.length}</span>
      </div>
      <h2 className="mt-3 font-serif text-2xl md:text-3xl text-burgundy-deep">{item.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground italic">
        Hãy gõ lại toàn bộ nội dung từ trí nhớ. Dấu câu và viết hoa không quan trọng.
      </p>

      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        disabled={checked}
        rows={8}
        placeholder="Bắt đầu gõ ở đây…"
        className="mt-5 w-full rounded-2xl border border-input bg-background p-4 text-base leading-relaxed font-serif focus:outline-none focus:ring-2 focus:ring-burgundy/40 disabled:opacity-80"
      />

      {!checked ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setReveal((v) => !v)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-gold/40 text-burgundy text-sm font-medium hover:bg-gold/10"
          >
            <Eye className="w-4 h-4" /> {reveal ? "Ẩn" : "Hiện"} đáp án
          </button>
          <button
            onClick={() => setChecked(true)}
            disabled={val.trim().length === 0}
            className="ml-auto px-5 py-2.5 rounded-full bg-gradient-sacred text-primary-foreground text-sm font-medium shadow-soft disabled:opacity-50"
          >
            Kiểm tra
          </button>
        </div>
      ) : (
        <div className="mt-5 space-y-4 animate-fade-in">
          <div
            className={`rounded-2xl p-4 border ${
              score >= 80 ? "bg-success/10 border-success/30" : "bg-burgundy/5 border-burgundy/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="font-medium text-burgundy">{verdict}</div>
              <div className="font-serif text-2xl text-burgundy-deep">{score}%</div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Tỉ lệ trùng khớp từ ngữ với bản gốc.</div>
          </div>
          <div className="rounded-2xl p-4 border border-border bg-background">
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold mb-2">Bản gốc</div>
            <p className="font-serif text-base md:text-lg leading-relaxed whitespace-pre-line text-foreground">{item.fullText}</p>
          </div>
        </div>
      )}

      {reveal && !checked && (
        <div className="mt-4 rounded-2xl p-4 border border-border bg-background animate-fade-in">
          <div className="text-[11px] uppercase tracking-[0.22em] text-gold mb-2">Bản gốc</div>
          <p className="font-serif text-base leading-relaxed whitespace-pre-line text-foreground">{item.fullText}</p>
        </div>
      )}

      <div className="mt-6 flex justify-between gap-2">
        <button
          onClick={() => { setVal(""); setChecked(false); setReveal(false); }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-burgundy/30 text-burgundy text-sm hover:bg-burgundy/5"
        >
          <RotateCcw className="w-4 h-4" /> Làm lại
        </button>
        <button
          onClick={() => setIdx((idx + 1) % items.length)}
          className="px-5 py-2.5 rounded-full bg-gradient-sacred text-primary-foreground text-sm font-medium shadow-soft"
        >
          Bài tiếp theo
        </button>
      </div>
    </div>
  );
}

// ---------- Blanks Runner ----------
function BlanksRunner({ source }: { source: Source }) {
  const items = useMemo(() => fillBlankItems.filter((f) => f.type === source), [source]);
  const { markFillCorrect, addFillMistake, progress } = useProgress();
  const [idx, setIdx] = useState(0);
  const [seed, setSeed] = useState(() => Date.now());
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const item = items[idx];

  // Build tokens + blank indices for current attempt
  const { tokens, blanks } = useMemo(() => {
    if (!item) return { tokens: [] as string[], blanks: [] as number[] };
    const tks = tokenize(item.fullSentence);
    const bls = chooseBlankIndices(tks, 0.45, seed);
    return { tokens: tks, blanks: bls };
  }, [item, seed]);

  const [answers, setAnswers] = useState<string[]>([]);
  useEffect(() => { setAnswers(new Array(blanks.length).fill("")); setChecked(false); setShowHint(false); }, [blanks.length, item?.id, seed]);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  if (!item) return <div className="text-muted-foreground">Chưa có nội dung.</div>;

  const correctWords = blanks.map((i) => stripPunct(tokens[i]));
  const results = checked
    ? correctWords.map((cw, i) => normalizeAnswer(stripPunct(answers[i] ?? "")) === normalizeAnswer((cw ?? "").toLowerCase()))
    : [];
  const allCorrect = checked && results.length > 0 && results.every(Boolean);

  function check() {
    setChecked(true);
    const ok = correctWords.every((cw, i) => normalizeAnswer(stripPunct(answers[i] ?? "")) === normalizeAnswer((cw ?? "").toLowerCase()));
    if (ok) markFillCorrect(item.id);
    else addFillMistake({
      id: item.id, sourceTitle: item.sourceTitle, fullSentence: item.fullSentence,
      yourAnswer: answers.join(" / "), correct: correctWords.join(" / "),
    });
  }

  function next() { setIdx((idx + 1) % items.length); setSeed(Date.now()); }
  function shuffle() { setSeed(Date.now()); }

  let blankCounter = -1;
  const correctCount = items.filter((i) => progress.fillBlankCorrect[i.id]).length;

  return (
    <div className="rounded-3xl bg-ivory border border-border p-6 md:p-7 shadow-soft animate-scale-in">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-gold">
        <span>{item.sourceTitle}</span>
        <span className="text-muted-foreground">Câu {idx + 1}/{items.length} · Đã đúng {correctCount}</span>
      </div>

      <div className="mt-5 font-serif text-lg md:text-xl text-foreground leading-loose">
        {tokens.map((tok, i) => {
          if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
          const blankPos = blanks.indexOf(i);
          if (blankPos === -1) return <span key={i}>{tok}</span>;
          blankCounter++;
          const bi = blankCounter;
          // preserve trailing punctuation outside the input
          const m = tok.match(/^([\p{L}\p{N}]+)([.,;:!?"“”‘’\-–—()]*)$/u);
          const wordPart = m ? m[1] : tok;
          const punctPart = m ? m[2] : "";
          const width = Math.max(4, wordPart.length + 2);
          const ok = checked ? results[bi] : null;
          return (
            <span key={i} className="inline-flex items-baseline">
              <input
                ref={(el) => (inputsRef.current[bi] = el)}
                value={answers[bi] ?? ""}
                onChange={(e) => {
                  const next = [...answers]; next[bi] = e.target.value; setAnswers(next);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const nxt = inputsRef.current[bi + 1];
                    if (nxt) nxt.focus(); else if (!checked) check();
                  }
                }}
                disabled={checked}
                style={{ width: `${width}ch` }}
                className={`mx-0.5 px-2 py-0.5 text-center rounded-md border-b-2 bg-burgundy/5 font-serif transition-colors focus:outline-none focus:ring-2 focus:ring-burgundy/30 ${
                  ok === null
                    ? "border-burgundy/40 text-burgundy"
                    : ok
                    ? "border-success text-success bg-success/10"
                    : "border-destructive text-destructive bg-destructive/10"
                }`}
              />
              {punctPart && <span>{punctPart}</span>}
            </span>
          );
        })}
      </div>

      {showHint && !checked && (
        <div className="mt-4 text-sm text-muted-foreground italic animate-fade-in">
          💡 {item.hint} · Có {blanks.length} ô trống.
        </div>
      )}

      {checked && (
        <div
          className={`mt-5 rounded-2xl p-4 border animate-fade-in ${
            allCorrect ? "bg-success/10 border-success/30" : "bg-burgundy/5 border-burgundy/20"
          }`}
        >
          <div className="flex items-center gap-2 font-medium text-burgundy">
            {allCorrect ? (
              <><Check className="w-4 h-4 text-success" /> Tất cả chính xác</>
            ) : (
              <><X className="w-4 h-4 text-destructive" /> Có ô chưa đúng — xem đáp án bên dưới</>
            )}
          </div>
          {!allCorrect && (
            <ul className="mt-2 text-sm text-foreground/80 space-y-1">
              {blanks.map((_, bi) =>
                results[bi] ? null : (
                  <li key={bi}>
                    Ô {bi + 1}: <span className="font-medium text-burgundy">{correctWords[bi]}</span>
                  </li>
                )
              )}
            </ul>
          )}
          <div className="mt-3 text-sm italic text-foreground/70">{item.fullSentence}</div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {!checked ? (
          <>
            <button
              onClick={() => setShowHint(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-gold/40 text-burgundy text-sm font-medium hover:bg-gold/10"
            >
              <Lightbulb className="w-4 h-4" /> Gợi ý
            </button>
            <button
              onClick={shuffle}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-burgundy/30 text-burgundy text-sm hover:bg-burgundy/5"
              title="Xáo trộn ô trống"
            >
              <Shuffle className="w-4 h-4" /> Xáo lại
            </button>
            <button
              onClick={check}
              className="ml-auto px-5 py-2.5 rounded-full bg-gradient-sacred text-primary-foreground text-sm font-medium shadow-soft"
            >
              Kiểm tra
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { setSeed(Date.now()); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-burgundy/30 text-burgundy text-sm hover:bg-burgundy/5"
            >
              <RotateCcw className="w-4 h-4" /> Thử lại (xáo mới)
            </button>
            <button
              onClick={next}
              className="ml-auto px-5 py-2.5 rounded-full bg-gradient-sacred text-primary-foreground text-sm font-medium shadow-soft"
            >
              Câu tiếp theo
            </button>
          </>
        )}
      </div>
    </div>
  );
}