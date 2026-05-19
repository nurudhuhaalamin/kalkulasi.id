"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/lib/validators/tool-validator";

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold text-gray-900">Pertanyaan yang Sering Ditanyakan</h2>
      <div className="divide-y divide-gray-200 rounded-xl border border-gray-200">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-gray-900 hover:bg-gray-50 transition-colors"
              aria-expanded={openIndex === i}
            >
              <span className="font-medium pr-4">{faq.pertanyaan}</span>
              <ChevronDown
                className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-gray-600 leading-relaxed">
                {faq.jawaban}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
