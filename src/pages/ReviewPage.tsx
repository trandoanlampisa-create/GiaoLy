import { SacredLayout, PageHeader } from "@/components/SacredLayout";
import { useProgress } from "@/lib/storage";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function ReviewPage() {
  const { progress, removeQuizMistake, reset } = useProgress();
  const { mistakesQuiz, mistakesFB } = progress;
  const empty = mistakesQuiz.length === 0 && mistakesFB.length === 0;

  return (
    <SacredLayout>
      <PageHeader eyebrow="Ôn lỗi" title="Xem lại câu sai"
        subtitle="Đây là nơi tổng hợp các câu trắc nghiệm và điền khuyết bạn từng làm sai — để học lại cho chắc."
        right={!empty ? (
          <button onClick={reset} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-burgundy/30 text-burgundy text-xs font-medium hover:bg-burgundy hover:text-primary-foreground transition-colors">
            <Trash2 className="w-3.5 h-3.5" /> Xóa toàn bộ tiến trình
          </button>
        ) : undefined} />
      <div className="container max-w-3xl space-y-8">
        {empty && (
          <div className="rounded-3xl bg-ivory border border-border p-10 text-center shadow-soft">
            <div className="font-serif text-2xl text-burgundy-deep">Chưa có câu sai nào</div>
            <p className="mt-2 text-muted-foreground">Hãy bắt đầu làm trắc nghiệm hoặc luyện điền khuyết.</p>
            <div className="mt-5 flex gap-3 justify-center">
              <Link to="/quiz" className="px-5 py-2.5 rounded-full bg-gradient-sacred text-primary-foreground text-sm font-medium">Làm trắc nghiệm</Link>
              <Link to="/fill" className="px-5 py-2.5 rounded-full border border-burgundy/30 text-burgundy text-sm font-medium">Luyện điền khuyết</Link>
            </div>
          </div>
        )}

        {mistakesQuiz.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl text-burgundy-deep mb-3">Trắc nghiệm sai ({mistakesQuiz.length})</h2>
            <div className="space-y-3">
              {mistakesQuiz.map((m) => (
                <div key={m.id} className="rounded-2xl bg-ivory border border-border p-5 shadow-soft">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold">{m.groupId}</div>
                  <div className="font-serif text-lg mt-1 text-balance">{m.question}</div>
                  <div className="mt-3 text-sm space-y-1">
                    <div><span className="text-muted-foreground">Bạn chọn:</span> <span className="text-destructive">{"ABCD"[m.chosen]}. {m.options[m.chosen]}</span></div>
                    <div><span className="text-muted-foreground">Đáp án đúng:</span> <span className="text-success">{"ABCD"[m.correct]}. {m.options[m.correct]}</span></div>
                  </div>
                  <div className="mt-3 text-sm text-foreground/80 italic">{m.explanation}</div>
                  <div className="mt-3 text-right">
                    <button onClick={() => removeQuizMistake(m.id)} className="text-xs text-muted-foreground hover:text-burgundy">Đánh dấu đã ôn</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {mistakesFB.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl text-burgundy-deep mb-3">Điền khuyết sai ({mistakesFB.length})</h2>
            <div className="space-y-3">
              {mistakesFB.map((m) => (
                <div key={m.id} className="rounded-2xl bg-ivory border border-border p-5 shadow-soft">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold">{m.sourceTitle}</div>
                  <div className="font-serif text-lg mt-1 text-balance">{m.fullSentence}</div>
                  <div className="mt-3 text-sm">
                    <span className="text-muted-foreground">Bạn nhập:</span> <span className="text-destructive">{m.yourAnswer || "(trống)"}</span>
                    <span className="mx-2 text-muted-foreground">·</span>
                    <span className="text-muted-foreground">Đúng:</span> <span className="text-success">{m.correct}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </SacredLayout>
  );
}