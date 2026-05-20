"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { FAQ } from "@/lib/validators/tool-validator";

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors"
            aria-expanded={openIndex === i}
            style={{ color: "var(--text-primary)" }}
          >
            <span className="pr-4 font-medium text-sm sm:text-base">{faq.pertanyaan}</span>
            <span
              className="flex-shrink-0 rounded-full p-0.5"
              style={{
                color: "var(--orange)",
                backgroundColor: "var(--orange-dim)",
              }}
            >
              {openIndex === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </span>
          </button>
          {openIndex === i && (
            <div
              className="border-t px-5 pb-4 pt-3 text-sm leading-relaxed"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
            >
              {faq.jawaban}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
