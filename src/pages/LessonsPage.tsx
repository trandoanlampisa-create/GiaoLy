import { Link, useParams } from "react-router-dom";
import { SacredLayout, PageHeader } from "@/components/SacredLayout";
import { lessonGroups, getLessonsByGroup, LessonGroupId } from "@/data/content";
import { useProgress } from "@/lib/storage";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function LessonsPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const gid = (groupId as LessonGroupId) || "B123";
  const group = lessonGroups.find((g) => g.id === gid);
  const list = getLessonsByGroup(gid);
  const { progress, markLessonRead } = useProgress();
  const [active, setActive] = useState(0);
  useEffect(() => { setActive(0); }, [gid]);
  const lesson = list[active];

  useEffect(() => { if (lesson) markLessonRead(lesson.id); }, [lesson, markLessonRead]);

  if (!lesson || !group) return null;

  return (
    <SacredLayout>
      <PageHeader eyebrow={group.range} title={group.label} subtitle={group.description}
        right={
          <Link to={`/quiz/${gid}`} className="px-5 py-2.5 rounded-full bg-burgundy text-primary-foreground text-sm font-medium shadow-soft hover:shadow-elegant">
            Làm trắc nghiệm
          </Link>
        } />
      <div className="container grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="text-[11px] uppercase tracking-[0.22em] text-gold mb-3">Bài học</div>
          <ul className="space-y-1.5">
            {list.map((l, i) => (
              <li key={l.id}>
                <button onClick={() => setActive(i)}
                  className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm transition-colors flex items-center gap-2 ${
                    i === active ? "bg-burgundy text-primary-foreground" : "hover:bg-muted text-foreground/80"
                  }`}>
                  <span className="font-serif text-base">Bài {l.number}</span>
                  <span className="truncate text-xs opacity-80">— {l.title}</span>
                  {progress.lessonsRead[l.id] && <Check className="w-3.5 h-3.5 ml-auto opacity-70" />}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <article className="animate-fade-in">
          <div className="rounded-3xl bg-ivory border border-border p-7 md:p-10 shadow-soft">
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold">Bài {lesson.number}</div>
            <h2 className="font-serif text-3xl md:text-4xl text-burgundy-deep mt-2">{lesson.title}</h2>

            <div className="mt-8 grid md:grid-cols-2 gap-4">
              {lesson.sections.map((s) => (
                <div key={s.title} className="rounded-2xl border border-border bg-parchment/50 p-5">
                  <div className="font-serif text-lg text-burgundy">{s.title}</div>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-gradient-sacred text-primary-foreground p-6 relative overflow-hidden">
              <Sparkles className="absolute -top-2 -right-2 w-20 h-20 text-gold/30" strokeWidth={1} />
              <div className="text-[11px] uppercase tracking-[0.22em] text-gold-soft">Ghi nhớ</div>
              <p className="mt-2 font-serif text-xl leading-relaxed text-balance">{lesson.remember}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-between items-center">
              <Link to={`/quiz/${gid}`} className="px-5 py-2.5 rounded-full border border-burgundy/30 text-burgundy text-sm font-medium hover:bg-burgundy hover:text-primary-foreground transition-colors">
                Bắt đầu quiz nhóm này
              </Link>
              {active < list.length - 1 ? (
                <button onClick={() => setActive(active + 1)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-sacred text-primary-foreground text-sm font-medium shadow-soft">
                  Bài kế tiếp <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link to="/dashboard" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-sacred text-primary-foreground text-sm font-medium shadow-soft">
                  Hoàn thành nhóm <Check className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </article>
      </div>
    </SacredLayout>
  );
}