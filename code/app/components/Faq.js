"use client";

import { useState } from "react";
import Link from "next/link";

export default function Faq({ accordion }) {
  const [openedIndex, setOpenedIndex] = useState(null);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold tracking-[-0.01em] text-foreground mb-6">
        FAQ
      </h2>
      <div className="space-y-3">
        {accordion.map((item, index) => (
          <div key={index} className="rounded-xl border border-white/[0.08] bg-white/[0.015] p-4">
            <button
              aria-controls={`faq-answer-${index}`}
              aria-expanded={openedIndex === index}
              className="w-full flex items-center justify-between text-left text-[12px] font-medium text-primary transition-colors hover:text-foreground"
              onClick={() => setOpenedIndex(openedIndex === index ? null : index)}
            >
              {item.question}
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`mt-3 text-[11px] leading-relaxed text-muted ${openedIndex === index ? "block" : "hidden"}` }
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}