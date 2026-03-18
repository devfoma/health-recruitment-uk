import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support - Health Recruitment UK",
  description: "Get help with your application",
};

const faqs = [
  {
    question: "How long does verification take?",
    answer: "Most documents are verified within 48-72 hours.",
  },
  {
    question: "What documents do I need?",
    answer:
      "You'll need your passport, medical credentials, and proof of identity.",
  },
  {
    question: "How do I track my application?",
    answer: "Check your dashboard for real-time status updates.",
  },
];

export default function SupportPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Help & Support
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        We&apos;re here to help you with your application.
      </p>

      {/* Contact Options */}
      <div className="grid gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-border p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Live Chat</h3>
            <p className="text-sm text-muted-foreground">
              Chat with our support team
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-border p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Mail className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Email Support</h3>
            <p className="text-sm text-muted-foreground">
              support@healthrecruit.uk
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-border p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Phone className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Phone Support</h3>
            <p className="text-sm text-muted-foreground">+44 20 7946 0958</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Support Hours */}
      <div className="bg-primary/5 rounded-xl p-4 mb-8 flex items-start gap-3">
        <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">Support Hours</p>
          <p className="text-xs text-muted-foreground">
            Monday - Friday: 9:00 AM - 6:00 PM GMT
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-white rounded-xl shadow-sm border border-border p-4"
            >
              <h3 className="font-semibold text-foreground mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
