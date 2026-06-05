import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Youtube } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MustardOne" },
      { name: "description", content: "Get in touch with MustardOne. We respond within 24 hours." },
      { property: "og:title", content: "Contact — MustardOne" },
      { property: "og:description", content: "Tell us what you're working on." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title={<>Let's <span className="text-gradient-mustard">talk.</span></>}
        subtitle="Whether it's a prototype, a brand, a service, or a workshop — tell us what you're working on."
      />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-8 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-3xl border border-border/60 p-8" style={{ background: "var(--gradient-card)" }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Your name" />
                <Field label="Email" name="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="mt-4">
                <Field label="Phone" name="phone" placeholder="Optional" />
              </div>
              <div className="mt-4">
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your project, timeline, and budget…"
                  className="mt-2 w-full rounded-xl border border-border bg-background/40 p-4 text-sm outline-none transition-colors focus:border-primary/60"
                />
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 glow-mustard"
              >
                {sent ? "Message sent ✓" : <>Send message <Send className="h-4 w-4" /></>}
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2">
            <div className="rounded-3xl glass p-8">
              <h3 className="text-lg font-bold">Company details</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-primary" /> hello@mustardone.com</li>
                <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-primary" /> +91 00000 00000</li>
                <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> India · Available worldwide</li>
              </ul>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Follow</p>
                <div className="mt-3 flex gap-2">
                  {[Instagram, Linkedin, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 aspect-video overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-amber-500/10 via-card to-background">
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Map preview
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label, name, type = "text", placeholder,
}: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={type !== "text" || name === "name"}
        className="mt-2 w-full rounded-xl border border-border bg-background/40 p-3 text-sm outline-none transition-colors focus:border-primary/60"
      />
    </div>
  );
}
