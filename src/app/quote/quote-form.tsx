"use client";

import { useActionState, useId, useState } from "react";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { MAX_UPLOAD_BYTES, formatBytes } from "@/lib/form-constants";
import { sparesCategories, supplyCategories } from "@/data/site";
import { ports } from "@/data/ports";
import { site } from "@/data/site";
import { initialQuoteState, submitQuote } from "./actions";
import { cn } from "@/lib/utils";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-rust-300">
      {message}
    </p>
  );
}

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(
    submitQuote,
    initialQuoteState,
  );
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const uid = useId();

  const err = state.errors ?? {};
  const field = (name: string) => `${uid}-${name}`;
  const errId = (name: string) => `${uid}-${name}-error`;

  /* --- Success ----------------------------------------------------------- */
  if (state.status === "success") {
    return (
      <div className="rounded-md border border-teal-500/50 bg-teal-500/[0.08] p-8">
        <div className="flex items-start gap-4">
          <PlimsollBullet className="mt-1 size-6 shrink-0 text-teal-300" />
          <div>
            <h2 className="font-display text-3xl font-semibold text-cream-50">
              Requisition received.
            </h2>
            <p className="mt-3 text-cream-200">
              A priced quotation follows within two hours. If it is urgent,
              call{" "}
              <a href={site.phone.href} className="text-brass-500 hover:text-brass-400">
                {site.phone.display}
              </a>{" "}
              and quote the reference below.
            </p>
            <div className="mt-6 inline-block rounded-md border border-navy-600 bg-navy-900 px-5 py-3">
              <p className="eyebrow text-slate-400">Your reference</p>
              <p className="mt-1 font-mono text-lg text-brass-500">
                {state.reference}
              </p>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              A confirmation has been emailed to you.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* --- Form -------------------------------------------------------------- */
  return (
    <form action={formAction} noValidate className="space-y-10">
      {/* Form-level error. Never silently swallowed. */}
      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="rounded-md border border-rust-500/50 bg-rust-500/10 p-5"
        >
          <p className="eyebrow mb-1.5 text-rust-300">Not submitted</p>
          <p className="text-sm leading-relaxed text-cream-200">
            {state.message}
          </p>
        </div>
      )}

      {/* --- Vessel --------------------------------------------------- */}
      <fieldset>
        <legend className="eyebrow mb-5 text-brass-500">Vessel</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor={field("vesselName")}>Vessel name *</Label>
            <Input
              id={field("vesselName")}
              name="vesselName"
              required
              placeholder="MV Southern Cross"
              aria-invalid={Boolean(err.vesselName)}
              aria-describedby={err.vesselName ? errId("vesselName") : undefined}
              className={cn(err.vesselName && "border-rust-500")}
            />
            <FieldError id={errId("vesselName")} message={err.vesselName} />
          </div>

          <div>
            <Label htmlFor={field("imo")}>IMO number</Label>
            <Input
              id={field("imo")}
              name="imo"
              inputMode="numeric"
              placeholder="9436729"
              className="font-mono"
            />
          </div>

          <div>
            <Label htmlFor={field("port")}>Port of call *</Label>
            <Input
              id={field("port")}
              name="port"
              required
              placeholder="Mundra"
              list={`${uid}-ports`}
              aria-invalid={Boolean(err.port)}
              aria-describedby={err.port ? errId("port") : undefined}
              className={cn(err.port && "border-rust-500")}
            />
            <FieldError id={errId("port")} message={err.port} />
            {/* Suggests all 148 ports without restricting entry — buyers call
                at ports we do not list, and the form must still accept them.
                The LOCODE and country disambiguate the repeated names
                (Newcastle, Manzanillo) the global list brings with it. */}
            <datalist id={`${uid}-ports`}>
              {ports.map((p) => (
                <option key={p.slug} value={p.name}>
                  {p.locode} · {p.country}
                </option>
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={field("eta")}>ETA</Label>
              <Input id={field("eta")} name="eta" type="date" className="font-mono" />
            </div>
            <div>
              <Label htmlFor={field("etd")}>ETD</Label>
              <Input id={field("etd")} name="etd" type="date" className="font-mono" />
            </div>
          </div>
        </div>
      </fieldset>

      {/* --- Requirement ---------------------------------------------- */}
      <fieldset>
        <legend className="eyebrow mb-5 text-brass-500">Requirement</legend>

        <p className="mb-3 text-sm text-slate-400">
          Select anything that applies — or skip this and attach your
          requisition below.
        </p>

        <p className="eyebrow mb-2 text-slate-400">Stores</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {supplyCategories.map((c) => (
            <label key={c.href} className="group cursor-pointer select-none">
              <input type="checkbox" name="categories" value={c.label} className="peer sr-only" />
              <span className="inline-flex items-center rounded-sm border border-navy-600 px-3 py-1.5 text-xs text-cream-200 transition-colors hover:border-brass-500/60 peer-checked:border-brass-500 peer-checked:bg-brass-500/12 peer-checked:text-brass-400 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass-500">
                {c.label}
              </span>
            </label>
          ))}
        </div>

        <p className="eyebrow mb-2 text-slate-400">Spares</p>
        <div className="mb-3 flex flex-wrap gap-2">
          {sparesCategories.map((c) => (
            <label key={c.href} className="group cursor-pointer select-none">
              <input type="checkbox" name="categories" value={`Spares — ${c.label}`} className="peer sr-only" />
              <span className="inline-flex items-center rounded-sm border border-navy-600 px-3 py-1.5 text-xs text-cream-200 transition-colors hover:border-brass-500/60 peer-checked:border-brass-500 peer-checked:bg-brass-500/12 peer-checked:text-brass-400 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass-500">
                {c.label}
              </span>
            </label>
          ))}
        </div>
        <p className="mb-6 text-xs text-slate-400">
          For spares, include the maker, type and serial number in the message
          or attach the nameplate photograph — it removes a round of
          clarification.
        </p>

        <div className="mb-6">
          <Label htmlFor={field("requisition")}>
            Attach requisition (PDF, spreadsheet, CSV or image · max{" "}
            {formatBytes(MAX_UPLOAD_BYTES)})
          </Label>
          <input
            id={field("requisition")}
            name="requisition"
            type="file"
            accept=".pdf,.xls,.xlsx,.csv,.txt,.jpg,.jpeg,.png"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) {
                setFileName(null);
                setFileError(null);
                return;
              }
              if (f.size > MAX_UPLOAD_BYTES) {
                setFileError(
                  `${formatBytes(f.size)} is over the ${formatBytes(MAX_UPLOAD_BYTES)} limit.`,
                );
                setFileName(null);
                e.target.value = "";
                return;
              }
              setFileError(null);
              setFileName(`${f.name} · ${formatBytes(f.size)}`);
            }}
            className="block w-full cursor-pointer rounded-md border border-navy-600 bg-navy-900 text-sm text-cream-200 file:mr-4 file:cursor-pointer file:border-0 file:bg-navy-700 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-cream-50 hover:file:bg-navy-600"
          />
          {fileName && (
            <p className="mt-1.5 font-mono text-xs text-teal-300">{fileName}</p>
          )}
          {(fileError || err.requisition) && (
            <p className="mt-1.5 text-xs text-rust-300">
              {fileError ?? err.requisition}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor={field("message")}>Requisition details</Label>
          <Textarea
            id={field("message")}
            name="message"
            rows={6}
            placeholder="Paste your requisition here, or describe what you need."
          />
        </div>
      </fieldset>

      {/* --- Contact -------------------------------------------------- */}
      <fieldset>
        <legend className="eyebrow mb-5 text-brass-500">Your details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor={field("company")}>Company *</Label>
            <Input
              id={field("company")}
              name="company"
              required
              aria-invalid={Boolean(err.company)}
              aria-describedby={err.company ? errId("company") : undefined}
              className={cn(err.company && "border-rust-500")}
            />
            <FieldError id={errId("company")} message={err.company} />
          </div>

          <div>
            <Label htmlFor={field("contactName")}>Your name *</Label>
            <Input
              id={field("contactName")}
              name="contactName"
              required
              autoComplete="name"
              aria-invalid={Boolean(err.contactName)}
              aria-describedby={err.contactName ? errId("contactName") : undefined}
              className={cn(err.contactName && "border-rust-500")}
            />
            <FieldError id={errId("contactName")} message={err.contactName} />
          </div>

          <div>
            <Label htmlFor={field("email")}>Email *</Label>
            <Input
              id={field("email")}
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={Boolean(err.email)}
              aria-describedby={err.email ? errId("email") : undefined}
              className={cn(err.email && "border-rust-500")}
            />
            <FieldError id={errId("email")} message={err.email} />
          </div>

          <div>
            <Label htmlFor={field("phone")}>Phone</Label>
            <Input
              id={field("phone")}
              name="phone"
              type="tel"
              autoComplete="tel"
              className="font-mono"
            />
          </div>
        </div>
      </fieldset>

      {/* Honeypot — visually and programmatically hidden from real users. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 overflow-hidden">
        <label htmlFor={field("website")}>Leave this field empty</label>
        <input
          id={field("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-5 border-t border-navy-600 pt-8">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send requisition"}
        </Button>
        <p className="text-xs text-slate-400">
          Fields marked * are required.
        </p>
      </div>
    </form>
  );
}
