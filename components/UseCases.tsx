import {
  BriefcaseBusiness,
  Camera,
  GraduationCap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useCases } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  camera: Camera,
  briefcase: BriefcaseBusiness,
  sparkles: Sparkles,
};
const tags = [
  ["Notes.pdf", "Project.pptx"],
  ["Footage.mov", "Photo.jpg"],
  ["Proposal.docx", "Assets.zip"],
  ["A link", "A little bit of everything"],
];

export default function UseCases() {
  return (
    <section
      className="section use-cases-section"
      aria-labelledby="use-cases-title"
    >
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow">FOR WHATEVER YOU’RE INTO</p>
          <h2 id="use-cases-title">Your everyday, a little easier.</h2>
        </div>
        <div className="use-cases-grid">
          {useCases.map(({ icon, title, body }, i) => {
            const Icon = icons[icon];
            return (
              <article className={`use-case use-case-${i}`} key={title}>
                <Icon size={31} strokeWidth={1.5} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
                <div className="file-tags" aria-hidden="true">
                  {tags[i].map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
