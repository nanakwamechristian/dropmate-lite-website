import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { faqItems } from "@/lib/content";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="section faq-section"
      aria-labelledby="faq-title"
    >
      <div className="container faq-grid">
        <div className="faq-intro">
          <p className="eyebrow">GOOD QUESTIONS.</p>
          <h2 id="faq-title">A few things you might be wondering.</h2>
          <p>Something else on your mind?</p>
          <Link href="/support" className="text-link">
            We’re here to help <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="faq-list">
          {faqItems.map(({ question, answer }) => (
            <details name="faq" key={question}>
              <summary>
                {question}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
