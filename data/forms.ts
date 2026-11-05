import { clubs } from "@/data/content";

export type FieldType = "text" | "email" | "tel" | "date" | "select" | "textarea";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
};

export type FormConfig = {
  slug: "schedule-visit" | "know-more" | "join";
  title: string;
  eyebrow: string;
  blurb: string;
  tone: "yellow" | "pilates" | "nutrition";
  submit: string;
  success: string;
  fields: Field[];
};

const clubOptions = clubs.map((c) => ({ value: c.slug, label: `${c.name} — ${c.city}` }));

export const forms: FormConfig[] = [
  {
    slug: "schedule-visit",
    title: "Schedule a visit",
    eyebrow: "Come and see us",
    blurb: "Pick a club and a day. A member of the team will show you around, answer questions and let you try the space. It takes about 30 minutes.",
    tone: "yellow",
    submit: "Book my visit",
    success: "We'll confirm your visit by email within one working day.",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", required: true },
      { name: "club", label: "Club", type: "select", required: true, options: clubOptions },
      { name: "date", label: "Preferred date", type: "date", required: true },
      { name: "message", label: "Anything we should know? (optional)", type: "textarea" },
    ],
  },
  {
    slug: "know-more",
    title: "Know more",
    eyebrow: "Ask us anything",
    blurb: "Memberships, classes, personal training, the app: tell us what you'd like to know and we'll get back to you.",
    tone: "pilates",
    submit: "Send message",
    success: "Thanks for getting in touch. We usually reply within one working day.",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "topic",
        label: "I'm interested in",
        type: "select",
        required: true,
        options: [
          { value: "membership", label: "Membership" },
          { value: "classes", label: "Group classes" },
          { value: "coach", label: "Personal training" },
          { value: "physio", label: "Physiotherapy" },
          { value: "nutri", label: "Nutrition" },
          { value: "app", label: "The KINETIK app" },
          { value: "other", label: "Something else" },
        ],
      },
      { name: "message", label: "Your message", type: "textarea", required: true },
    ],
  },
  {
    slug: "join",
    title: "Join KINETIK",
    eyebrow: "1st month free",
    blurb: "Choose your club and plan. Your first month is on us, with no commitment to carry on.",
    tone: "nutrition",
    submit: "Join now",
    success: "Welcome to KINETIK! Check your inbox for next steps.",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", required: true },
      { name: "club", label: "Home club", type: "select", required: true, options: clubOptions },
      {
        name: "plan",
        label: "Plan",
        type: "select",
        required: true,
        options: [
          { value: "monthly", label: "Monthly — flexible" },
          { value: "annual", label: "Annual — save 15%" },
          { value: "student", label: "Student — with valid ID" },
        ],
      },
    ],
  },
];

export const getForm = (slug: string) => forms.find((f) => f.slug === slug);
