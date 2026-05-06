import { Link } from "react-router-dom";
import { SacredLayout, PageHeader } from "@/components/SacredLayout";
import { lessonGroups, lessons, quizQuestions, fillBlankItems, prayers } from "@/data/content";
import { useProgress } from "@/lib/storage";
import { BookOpen, ListChecks, PenLine, ScrollText } from "lucide-react";

function Ring({ pct }: { pct: number }) {
  const r = 22, c = 2 * Math.PI * r;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
      <circle cx="28" cy="28" r={r} stroke="hsl(var(--muted))" strokeWidth="4" fill="none" />
      <circle cx="28" cy="28" r={r} stroke="hsl(var(--burgundy))" strokeWidth="4" fill="none"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
    </svg>
  );
}

export default function Dashboard() {
  const { progress } = useProgress();

  return (
    <SacredLayout>
      <PageHeader
        eyebrow="Bảng học"
        title="Hành trình học giáo lý"
        subtitle="Chọn một nhóm bài để bắt đầu — bạn có thể đọc ý chính, làm trắc nghiệm hoặc luyện điền khuyết."
      />
      <div className="container grid md:grid-cols-2 gap-5">
        {lessonGroups.map((g) => {
          let pct = 0;
          if (g.id === "Kinh") {
            const read = prayers.filter((p) => progress.prayersRead[p.id]).length;
            pct = Math.round((read / prayers.length) * 100);
          } else {
            const groupLessons = lessons.filter((l) => l.groupId === g.id);
            const groupQuiz = quizQuestions.filter((q) => q.groupId === g.id);
            const groupFB = fillBlankItems.filter((f) =>
              f.type === "catechism" && groupLessons.some((l) => f.sourceTitle.includes(`Bài ${l.number}`))
            );
            const lessonsRead = groupLessons.filter((l) => progress.lessonsRead[l.id]).length;
            const quizDone = progress.quizCompletedGroups[g.id] ? 1 : 0;
            const fbDone = groupFB.filter((f) => progress.fillBlankCorrect[f.id]).length;
            const total = groupLessons.length + 1 + Math.max(groupFB.length, 1);
            pct = Math.round(((lessonsRead + quizDone + fbDone) / total) * 100);
          }

          return (
            <div key={g.id} className="relative overflow-hidden rounded-3xl bg-ivory border border-border p-6 shadow-soft hover:shadow-elegant transition-all">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gold/10" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold">{g.range}</div>
                  <h3 className="font-serif text-2xl text-burgundy-deep mt-1">{g.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5">{g.description}</p>
                </div>
                <div className="relative grid place-items-center">
                  <Ring pct={pct} />
                  <span className="absolute text-xs font-semibold text-burgundy">{pct}%</span>
                </div>
              </div>
              <div className="relative mt-5 grid grid-cols-3 gap-2">
                {g.id === "Kinh" ? (
                  <>
                    <Link to="/prayers" className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-sacred text-primary-foreground py-2.5 text-sm font-medium">
                      <ScrollText className="w-4 h-4" /> Đọc kinh
                    </Link>
                    <Link to="/fill?mode=prayer" className="rounded-full border border-burgundy/20 text-burgundy py-2.5 text-sm font-medium text-center hover:bg-burgundy hover:text-primary-foreground transition-colors">
                      Điền khuyết
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={`/lessons/${g.id}`} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-sacred text-primary-foreground py-2.5 text-xs font-medium">
                      <BookOpen className="w-3.5 h-3.5" /> Ý chính
                    </Link>
                    <Link to={`/quiz/${g.id}`} className="inline-flex items-center justify-center gap-1.5 rounded-full border border-burgundy/30 text-burgundy py-2.5 text-xs font-medium hover:bg-burgundy hover:text-primary-foreground transition-colors">
                      <ListChecks className="w-3.5 h-3.5" /> Quiz
                    </Link>
                    <Link to="/fill?mode=catechism" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-burgundy/30 text-burgundy py-2.5 text-xs font-medium hover:bg-burgundy hover:text-primary-foreground transition-colors">
                      <PenLine className="w-3.5 h-3.5" /> Điền khuyết
                    </Link>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SacredLayout>
  );
}