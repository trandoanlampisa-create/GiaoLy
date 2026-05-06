import { SacredLayout, PageHeader } from "@/components/SacredLayout";
import { fillBlankItems } from "@/data/content";
import { useProgress, normalizeAnswer } from "@/lib/storage";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, X, Lightbulb, RotateCcw } from "lucide-react";

export default function FillBlankPage() {
  const [params, setParams] = useSearchParams();
  const mode = (params.get("mode") as "prayer" | "catechism") || "prayer";
  const items = useMemo(() => fillBlankItems.filter((f) => f.type === mode), [mode]);
  const { markFillCorrect, addFillMistake, progress } = useProgress();
  const [idx, setIdx] = useState(0);
  const [val, setVal] = useState("");
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");
  const [showHint, setShowHint] = useState(false);
  const item = items[idx];

  function check(e?: React.FormEvent) {
    e?.preventDefault();
    if (state !== "idle") return;
    if (normalizeAnswer(val) === normalizeAnswer(item.answer)) {
      setState("correct"); markFillCorrect(item.id);
    } else {
      setState("wrong");
      addFillMistake({ id: item.id, sourceTitle: item.sourceTitle, fullSentence: item.fullSentence, yourAnswer: val, correct: item.answer });
    }
  }
  function next() {
    setIdx((idx + 1) % items.length); setVal(""); setState("idle"); setShowHint(false);
  }
  function retry() { setVal(""); setState("idle"); setShowHint(false); }

  const correctCount = items.filter((i) => progress.fillBlankCorrect[i.id]).length;

  return (
    <SacredLayout>
      <PageHeader eyebrow="Điền khuyết" title="Luyện nhớ kinh & giáo lý"
        subtitle="Gõ từ còn thiếu vào ô trống. Không phân biệt hoa thường và khoảng trắng dư." />
      <div className="container max-w-2xl">
        <div className="flex items-center gap-2 mb-5">
          {(["prayer", "catechism"] as const).map((m) => (
            <button key={m} onClick={() => { setParams({ mode: m }); setIdx(0); retry(); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === m ? "bg-burgundy text-primary-foreground shadow-soft" : "bg-ivory border border-border text-foreground/70 hover:bg-muted"
              }`}>
              {m === "prayer" ? "Lời kinh" : "Câu giáo lý"}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">Đã đúng {correctCount}/{items.length}</span>
        </div>

        <div className="rounded-3xl bg-ivory border border-border p-7 shadow-soft animate-scale-in" key={item.id}>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-gold">
            <span>{item.sourceTitle}</span>
            <span className="text-muted-foreground">Câu {idx + 1}/{items.length}</span>
          </div>
          <p className="mt-4 font-serif text-xl md:text-2xl text-foreground leading-relaxed text-balance">
            {item.blankedSentence.split("____").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="inline-block align-baseline mx-1 px-3 py-0.5 rounded-md border-b-2 border-burgundy/40 bg-burgundy/5 min-w-[5rem] text-burgundy">
                    {state === "correct" || state === "wrong" ? item.answer : "____"}
                  </span>
                )}
              </span>
            ))}
          </p>

          <form onSubmit={check} className="mt-6 flex flex-wrap gap-2">
            <input
              value={val}
              onChange={(e) => setVal(e.target.value)}
              disabled={state !== "idle"}
              placeholder="Nhập từ còn thiếu…"
              className="flex-1 min-w-[180px] px-4 py-3 rounded-full border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
            />
            {state === "idle" && (
              <>
                <button type="button" onClick={() => setShowHint(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full border border-gold/40 text-burgundy text-sm font-medium hover:bg-gold/10">
                  <Lightbulb className="w-4 h-4" /> Gợi ý
                </button>
                <button type="submit" className="px-5 py-3 rounded-full bg-gradient-sacred text-primary-foreground text-sm font-medium shadow-soft">Kiểm tra</button>
              </>
            )}
          </form>

          {showHint && state === "idle" && (
            <div className="mt-4 text-sm text-muted-foreground italic animate-fade-in">💡 {item.hint}</div>
          )}

          {state !== "idle" && (
            <div className={`mt-5 rounded-2xl p-4 border animate-fade-in ${
              state === "correct" ? "bg-success/10 border-success/30" : "bg-burgundy/5 border-burgundy/20"
            }`}>
              <div className="flex items-center gap-2 font-medium text-burgundy">
                {state === "correct" ? <><Check className="w-4 h-4 text-success" /> Chính xác</> : <><X className="w-4 h-4 text-destructive" /> Đáp án đúng: <span className="text-foreground">{item.answer}</span></>}
              </div>
              <div className="mt-2 text-sm text-foreground/80 italic">{item.fullSentence}</div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            {state === "wrong" ? (
              <button onClick={retry} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-burgundy/30 text-burgundy text-sm">
                <RotateCcw className="w-4 h-4" /> Thử lại
              </button>
            ) : <span />}
            <button onClick={next} className="px-5 py-2.5 rounded-full bg-gradient-sacred text-primary-foreground text-sm font-medium shadow-soft">Câu tiếp theo</button>
          </div>
        </div>
      </div>
    </SacredLayout>
  );
}