"use client";

import React from "react";
import { CalendarDays, CheckCircle2, Clock, Home } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button-2";

export interface RegistrationSummary {
  firstName: string;
  /** Already formatted for display, e.g. "Mon, 12 Oct 2026". */
  startDate: string;
  time: string;
}

/**
 * Shown once a student registration is accepted. Same look as the trial
 * thank-you page (/register/thank-you) so both confirmations feel like one
 * brand: white rounded card, green tick, orange #FB6238 accents.
 *
 * Any way of closing it — the button, the X, Esc or a click outside — calls
 * `onClose`, which leaves the page so the form cannot be submitted twice.
 */
export default function RegistrationSuccessDialog({
  open,
  summary,
  onClose,
}: {
  open: boolean;
  summary: RegistrationSummary | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg rounded-[32px] sm:rounded-[32px] border border-[#E2E8F0] bg-white p-8 md:p-10 text-center font-sans shadow-[0px_8px_30px_rgba(0,0,0,0.08)]">
        <div className="space-y-6">
          {/* Checkmark */}
          <div className="mx-auto w-20 h-20 rounded-full bg-[#E6F7F0] border-4 border-white shadow-md flex items-center justify-center text-[#00A389] animate-in zoom-in-50 duration-500">
            <CheckCircle2 size={40} className="stroke-[2.5]" />
          </div>

          {/* Headings */}
          <div className="space-y-3">
            <span className="block text-xs sm:text-sm font-extrabold tracking-widest text-[#FB6238] uppercase">
              Registration Confirmed
            </span>
            <DialogTitle className="text-3xl md:text-4xl font-extrabold text-black leading-tight">
              Thank You{summary?.firstName ? `, ${summary.firstName}` : ""}! <br />
              <span className="text-[#FB6238]">You&apos;re Registered</span>
            </DialogTitle>
          </div>

          <DialogDescription className="text-neutral-600 text-sm md:text-base leading-relaxed">
            We have received your student registration for Arabic classes.
          </DialogDescription>

          {/* What they asked for */}
          {summary && (summary.startDate || summary.time) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {summary.startDate && (
                <div className="flex items-center gap-3 rounded-2xl border border-[#FFE2D2] bg-[#FFF6EE] p-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFE7DB] text-[#FB6238]">
                    <CalendarDays size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                      Start date
                    </span>
                    <span className="block text-sm font-bold text-neutral-800 truncate">
                      {summary.startDate}
                    </span>
                  </span>
                </div>
              )}
              {summary.time && (
                <div className="flex items-center gap-3 rounded-2xl border border-[#FFE2D2] bg-[#FFF6EE] p-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFE7DB] text-[#FB6238]">
                    <Clock size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                      Preferred time
                    </span>
                    <span className="block text-sm font-bold text-neutral-800">
                      {summary.time} <span className="font-medium text-neutral-500">(UAE)</span>
                    </span>
                  </span>
                </div>
              )}
            </div>
          )}

          <p className="bg-slate-50 p-5 rounded-2xl border border-neutral-100 text-xs sm:text-sm text-neutral-500 font-medium leading-relaxed">
            Our academic coordinator will review your details and contact you via{" "}
            <strong className="text-neutral-700">WhatsApp</strong> or{" "}
            <strong className="text-neutral-700">Email</strong> within 24 hours to confirm
            your schedule and share the online class link.
          </p>

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto h-12 px-8 bg-[#FB6238] hover:bg-[#E04E26] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-sm whitespace-nowrap"
            >
              <Home size={16} />
              Back to Home
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
