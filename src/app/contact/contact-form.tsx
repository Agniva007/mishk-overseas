"use client";

import { useActionState, useId } from "react";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { site } from "@/data/site";
import { initialContactState, submitContact } from "./actions";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );
  const uid = useId();
  const err = state.errors ?? {};
  const f = (n: string) => `${uid}-${n}`;

  if (state.status === "success") {
    return (
      <div className="rounded-md border border-teal-500/50 bg-teal-500/[0.08] p-8">
        <div className="flex items-start gap-4">
          <PlimsollBullet className="mt-1 size-6 shrink-0 text-teal-300" />
          <div>
            <h2 className="font-display text-2xl font-semibold text-cream-50">
              Message sent.
            </h2>
            <p className="mt-2 text-cream-200">
              We will come back to you shortly. If it is urgent, call{" "}
              <a href={site.phone.href} className="text-brass-500 hover:text-brass-400">
                {site.phone.display}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-6">
      {state.status === "error" && state.message && (
        <div role="alert" className="rounded-md border border-rust-500/50 bg-rust-500/10 p-5">
          <p className="eyebrow mb-1.5 text-rust-300">Not sent</p>
          <p className="text-sm leading-relaxed text-cream-200">{state.message}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={f("name")}>Your name *</Label>
          <Input
            id={f("name")} name="name" required autoComplete="name"
            aria-invalid={Boolean(err.name)}
            aria-describedby={err.name ? f("name-e") : undefined}
            className={cn(err.name && "border-rust-500")}
          />
          {err.name && <p id={f("name-e")} className="mt-1.5 text-xs text-rust-300">{err.name}</p>}
        </div>
        <div>
          <Label htmlFor={f("company")}>Company</Label>
          <Input id={f("company")} name="company" autoComplete="organization" />
        </div>
        <div>
          <Label htmlFor={f("email")}>Email *</Label>
          <Input
            id={f("email")} name="email" type="email" required autoComplete="email"
            aria-invalid={Boolean(err.email)}
            aria-describedby={err.email ? f("email-e") : undefined}
            className={cn(err.email && "border-rust-500")}
          />
          {err.email && <p id={f("email-e")} className="mt-1.5 text-xs text-rust-300">{err.email}</p>}
        </div>
        <div>
          <Label htmlFor={f("phone")}>Phone</Label>
          <Input id={f("phone")} name="phone" type="tel" autoComplete="tel" className="font-mono" />
        </div>
      </div>

      <div>
        <Label htmlFor={f("subject")}>Subject *</Label>
        <Input
          id={f("subject")} name="subject" required
          aria-invalid={Boolean(err.subject)}
          className={cn(err.subject && "border-rust-500")}
        />
        {err.subject && <p className="mt-1.5 text-xs text-rust-300">{err.subject}</p>}
      </div>

      <div>
        <Label htmlFor={f("message")}>Message *</Label>
        <Textarea
          id={f("message")} name="message" rows={7} required
          aria-invalid={Boolean(err.message)}
          className={cn(err.message && "border-rust-500")}
        />
        {err.message && <p className="mt-1.5 text-xs text-rust-300">{err.message}</p>}
      </div>

      <div aria-hidden="true" className="absolute left-[-9999px] h-0 overflow-hidden">
        <label htmlFor={f("website")}>Leave empty</label>
        <input id={f("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
