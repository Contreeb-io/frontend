import { Plus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const questions = [
  {
    id: 'create-campaign',
    question: 'How do I create a campaign?',
    answer:
      'Create an account, tell your story and submit your campaign for review. Once approved, it will be published for donations.',
  },
  {
    id: 'campaign-review',
    question: 'Are campaigns reviewed before they go live?',
    answer:
      'Yes. Every campaign is reviewed before it goes live to help maintain a trusted fundraising environment.',
  },
  {
    id: 'identity-verification',
    question: 'Do I need to verify my identity?',
    answer:
      'Campaign creators may be asked to verify their identity before receiving donations.',
  },
  {
    id: 'get-help',
    question: 'How can I get help with my campaign?',
    answer:
      'Reach out using the email link below. Include your campaign name and a description of what you need help with.',
  },
];

export default function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="font-outfit flex flex-col items-center justify-center gap-8 bg-[#0070FF] bg-[url('/faqs.png')] bg-cover bg-center bg-no-repeat px-5 py-16 text-center text-[#F9F3E9] bg-blend-multiply sm:px-8 sm:py-20 lg:px-14"
    >
      <div className="w-full max-w-250 space-y-4">
        <h2
          id="faqs-heading"
          className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] font-medium tracking-tight text-balance"
        >
          Frequently Asked Questions
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-pretty sm:text-2xl">
          Learn more about fundraising and supporting campaigns on Contreebute.
        </p>
      </div>

      <Accordion
        defaultValue={['create-campaign']}
        className="w-full max-w-3xl space-y-4 text-left"
      >
        {questions.map(({ id, question, answer }) => (
          <AccordionItem
            key={id}
            value={id}
            className="overflow-hidden rounded-3xl border-0 bg-[#FFFEFC] text-[#171717] not-last:border-b-0"
          >
            <AccordionTrigger className="group min-h-[68px] items-center gap-5 rounded-3xl px-5 py-5 text-base font-normal hover:no-underline focus-visible:ring-inset sm:px-6 [&>svg]:hidden!">
              {question}
              <span aria-hidden="true" className="shrink-0">
                <Plus
                  strokeWidth={1.5}
                  className="size-5 transition-transform duration-200 group-aria-expanded:rotate-45 motion-reduce:transition-none"
                />
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-5 pt-0 pb-5 text-sm leading-relaxed text-[#333333] sm:px-6 sm:text-base">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div id="contact" className="space-y-2 text-lg sm:text-xl">
        <p>Still need help? Reach out to us</p>
        <a
          href="mailto:admin@contreebute.app"
          className="inline-flex min-h-11 items-center rounded-sm font-medium underline decoration-dotted decoration-1 underline-offset-4 hover:decoration-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          admin@contreebute.app
        </a>
      </div>
    </section>
  );
}
