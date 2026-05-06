import { Link, useParams } from "react-router-dom";
import { SacredLayout, PageHeader } from "@/components/SacredLayout";
import { lessonGroups, getQuizByGroup, LessonGroupId } from "@/data/content";
import { useProgress } from "@/lib/storage";
import { useMemo, useState } from "react";
import { Check, X, RotateCcw, Sparkles } from "lucide-react";

export default function QuizPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const { addQuizMistake, removeQuizMistake, recordQuiz } = useProgress();

  if (!groupId) {
    return (
      <SacredLayout>
        <PageHeader eyebrow="Trắc nghiệm" title="Chọn nhóm bài để làm quiz" />
        <div className="container grid md:grid-cols-2 gap-4">
          {lessonGroups.filter((g) => g.id !== "Kinh").map((g) => (
            <Link key={g.id} to={`/quiz/${g.id}`} className="rounded-3xl bg-ivory border border-border p-6 shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition-all">
              <div className="text-[11px] uppercase tracking-[0.22em] text-gold">{g.range}</div>
              <div className="font-serif text-2xl text-burgundy-deep mt-1">{g.label}</div>
              <div className="text-sm text-muted-foreground mt-1">{g.description}</div>
            </Link>
          ))}
        </div>
      </SacredLayout>
    );
  }

  return <QuizRunner groupId={groupId as LessonGroupId} addQuizMistake={addQuizMistake} removeQuizMistake={removeQuizMistake} recordQuiz={recordQuiz} />;
}

function QuizRunner({ groupId, addQuizMistake, removeQuizMistake, recordQuiz }: any) {
  const group = lessonGroups.find((g) => g.id === groupId)!;
  const all = useMemo(() => getQuizByGroup(groupId), [groupId]);
  const [questions, setQuestions] = useState(all);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<typeof all>([]);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  function pick(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    if (i === q.correctAnswer) {
      setScore((s) => s + 1);
      removeQuizMistake(q.id);
    } else {
      setWrong((w) => [...w, q]);
      addQuizMistake({
        id: q.id, groupId: q.groupId, question: q.question,
        chosen: i, correct: q.correctAnswer, options: q.options, explanation: q.explanation,
      });
    }
  }

  function next() {
    if (idx + 1 >= questions.length) {
      recordQuiz(groupId, score + (chosen === q.correctAnswer ? 0 : 0), questions.length);
      setDone(true);
    } else {
      setIdx(idx + 1);
      setChosen(null);
    }
  }

  function retryWrong() {
    setQuestions(wrong);
    setWrong([]); setIdx(0); setChosen(null); setScore(0); setDone(false);
  }
  function restart() {
    setQuestions(all); setWrong([]); setIdx(0); setChosen(null); setScore(0); setDone(false);
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const message =
      pct === 100 ? "Tuyệt vời! Bạn nắm vững giáo lý nhóm này. Tạ ơn Chúa." :
      pct >= 80 ? "Rất tốt — chỉ còn vài chi tiết nhỏ để hoàn thiện." :
      pct >= 50 ? "Bạn đang đi đúng hướng. Hãy ôn lại các câu chưa đúng." :
      "Đừng nản lòng — mỗi bước học là một bước gần Chúa hơn.";
    return (
      <SacredLayout>
        <PageHeader eyebrow={group.range} title="Kết quả ôn tập" />
        <div className="container max-w-xl">
          <div className="rounded-3xl bg-ivory border border-border p-8 shadow-elegant text-center relative overflow-hidden">
            <Sparkles className="absolute -top-4 -left-4 w-24 h-24 text-gold/20" strokeWidth={1} />
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold">Điểm số</div>
            <div className="font-serif text-6xl text-burgundy-deep mt-2">{score}/{questions.length}</div>
            <div className="text-burgundy text-lg font-medium mt-1">{pct}%</div>
            <p className="mt-5 text-foreground/80 font-serif text-lg italic text-balance">{message}</p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              {wrong.length > 0 && (
                <button onClick={retryWrong} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-sacred text-primary-foreground text-sm font-medium">
                  <RotateCcw className="w-4 h-4" /> Làm lại {wrong.length} câu sai
                </button>
              )}
              <button onClick={restart} className="px-5 py-2.5 rounded-full border border-burgundy/30 text-burgundy text-sm font-medium hover:bg-burgundy hover:text-primary-foreground transition-colors">
                Làm lại từ đầu
              </button>
              <Link to="/dashboard" className="px-5 py-2.5 rounded-full border border-border text-foreground/70 text-sm font-medium hover:bg-muted transition-colors">
                Về bảng học
              </Link>
            </div>
          </div>
        </div>
      </SacredLayout>
    );
  }

  return (
    <SacredLayout>
      <PageHeader eyebrow={group.range} title="Trắc nghiệm ôn tập"
        subtitle={`Câu ${idx + 1} / ${questions.length} · Điểm: ${score}`} />
      <div className="container max-w-2xl">
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-6">
          <div className="h-full bg-gradient-sacred transition-all" style={{ width: `${((idx + (chosen !== null ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>
        <div className="rounded-3xl bg-ivory border border-border p-7 shadow-soft animate-scale-in" key={q.id}>
          <h2 className="font-serif text-xl md:text-2xl text-burgundy-deep text-balance">{q.question}</h2>
          <div className="mt-5 space-y-2.5">
            {q.options.map((o: string, i: number) => {
              const letter = "ABCD"[i];
              const isCorrect = chosen !== null && i === q.correctAnswer;
              const isWrong = chosen === i && i !== q.correctAnswer;
              return (
                <button key={i} onClick={() => pick(i)} disabled={chosen !== null}
                  className={`w-full text-left px-4 py-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    isCorrect ? "border-success bg-success/10 text-foreground" :
                    isWrong ? "border-destructive bg-destructive/10 text-foreground" :
                    chosen !== null ? "border-border bg-muted/40 text-muted-foreground" :
                    "border-border bg-background hover:border-burgundy hover:bg-burgundy/5"
                  }`}>
                  <span className={`grid place-items-center w-7 h-7 rounded-full font-serif text-sm shrink-0 ${
                    isCorrect ? "bg-success text-success-foreground" :
                    isWrong ? "bg-destructive text-destructive-foreground" :
                    "bg-muted text-foreground/70"
                  }`}>{isCorrect ? <Check className="w-4 h-4" /> : isWrong ? <X className="w-4 h-4" /> : letter}</span>
                  <span className="text-sm leading-relaxed pt-0.5">{o}</span>
                </button>
              );
            })}
          </div>

          {chosen !== null && (
            <div className={`mt-5 rounded-2xl p-4 text-sm border animate-fade-in ${
              chosen === q.correctAnswer ? "bg-success/10 border-success/30 text-foreground" : "bg-burgundy/5 border-burgundy/20"
            }`}>
              <div className="font-medium text-burgundy mb-1">
                {chosen === q.correctAnswer ? "Chính xác" : `Đáp án đúng: ${"ABCD"[q.correctAnswer]}`}
              </div>
              <div className="text-foreground/80">{q.explanation}</div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button onClick={next} disabled={chosen === null}
              className="px-6 py-2.5 rounded-full bg-gradient-sacred text-primary-foreground text-sm font-medium shadow-soft disabled:opacity-40 disabled:cursor-not-allowed">
              {idx + 1 >= questions.length ? "Xem kết quả" : "Câu tiếp theo"}
            </button>
          </div>
        </div>
      </div>
    </SacredLayout>
  );
}