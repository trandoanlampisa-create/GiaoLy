import { Link } from "react-router-dom";
import { BookOpen, ListChecks, PenLine, ArrowRight, Cross } from "lucide-react";
import { SacredLayout, ArchOrnament } from "@/components/SacredLayout";

const features = [
  { icon: BookOpen, title: "Ý chính bài học", desc: "Tóm tắt cô đọng 13 bài giáo lý hôn nhân.", to: "/dashboard" },
  { icon: ListChecks, title: "Trắc nghiệm ôn tập", desc: "Câu hỏi chọn đáp án có giải thích rõ ràng.", to: "/quiz" },
  { icon: PenLine, title: "Điền khuyết lời kinh", desc: "Luyện nhớ kinh và câu giáo lý quan trọng.", to: "/fill" },
];

export default function Index() {
  return (
    <SacredLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 halo-bg" />
        <ArchOrnament className="absolute -top-6 left-1/2 -translate-x-1/2 w-[640px] max-w-[110vw] text-gold/30 opacity-70 pointer-events-none" />

        <div className="container relative pt-20 md:pt-32 pb-16 md:pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/40 bg-ivory/70 backdrop-blur text-xs uppercase tracking-[0.22em] text-burgundy mb-6 animate-fade-in">
            <Cross className="w-3 h-3" /> Sacred Minimalism
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-burgundy-deep text-balance animate-fade-in">
            Học Giáo Lý <br className="hidden md:block" /> Hôn Nhân
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-muted-foreground text-balance animate-fade-in">
            Ôn tập giáo lý Công giáo qua bài học ngắn, trắc nghiệm và luyện nhớ kinh.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-in">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-sacred text-primary-foreground font-medium shadow-elegant hover:shadow-soft transition-all"
            >
              Bắt đầu học
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/fill"
              className="px-6 py-3.5 rounded-full border border-burgundy/20 text-burgundy hover:bg-burgundy hover:text-primary-foreground transition-colors text-sm font-medium"
            >
              Luyện nhớ kinh
            </Link>
          </div>
        </div>

        <div className="container relative pb-20 md:pb-28">
          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.title}
                  to={f.to}
                  className="group relative overflow-hidden rounded-3xl bg-ivory border border-border p-7 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all animate-fade-in"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-sacred grid place-items-center text-primary-foreground shadow-soft">
                      <Icon className="w-5 h-5" strokeWidth={1.6} />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl text-burgundy-deep">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    <div className="mt-5 inline-flex items-center text-burgundy text-sm font-medium">
                      Khám phá <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </SacredLayout>
  );
}
