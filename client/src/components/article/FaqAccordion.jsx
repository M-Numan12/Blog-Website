export default function FaqAccordion({ faqs = [] }) {
  if (!faqs.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="mt-4 space-y-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="bg-brand-gray p-4">
            <summary className="font-semibold cursor-pointer text-brand-black">{faq.question}</summary>
            <p className="mt-2 text-sm text-brand-charcoal/85">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
