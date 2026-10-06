"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  X,
  Send,
  User,
  Mail,
  MessageCircle,
  Headphones,
  Mic,
  Square,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  GraduationCap,
  Lock,
  BookOpenText,
} from "lucide-react";
import "react-phone-number-input/style.css";
import PhoneInput, { Country, isValidPhoneNumber } from "react-phone-number-input";
import { Button } from "./ui/button-2";
import { Input } from "./ui/input-2";
import { toast } from "sonner";
import { useSpeech } from "@/hooks/useSpeech";
import { useCountryCode } from "@/hooks/useCountry";
import { WhatsAppIcon } from "./WhatsAppIcon";
import ChatMessageContent from "./ChatMessageContent";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

/** The public half of the chatbot settings, as served by /chatbot/config. */
interface ChatbotConfig {
  enabled: boolean;
  botName: string;
  botTagline: string;
  avatarUrl: string;
  accentFrom: string;
  accentTo: string;
  preChatTitle: string;
  preChatSubtitle: string;
  askForPhone: boolean;
  inputPlaceholder: string;
  quickReplies: { label: string }[];
  operatorEnabled: boolean;
  operatorLabel: string;
  whatsappNumber: string;
  whatsappMessage: string;
  voiceInputEnabled: boolean;
  voiceReplyEnabled: boolean;
  voiceLanguage: string;
}

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

/** Used only when /chatbot/config cannot be reached. Mirrors the live settings. */
const FALLBACK_CONFIG: ChatbotConfig = {
  enabled: true,
  botName: "Juniors Support Bot",
  botTagline: "Instant Arabic Learning & Admissions Advisor",
  avatarUrl: "",
  accentFrom: "#FF60A8",
  accentTo: "#FB6238",
  preChatTitle: "Start Your Free Consultation",
  preChatSubtitle: "Enter your details to connect with our Admissions Advisor",
  askForPhone: true,
  inputPlaceholder: "Type your message...",
  quickReplies: [],
  operatorEnabled: true,
  operatorLabel: "Talk with Operator",
  whatsappNumber: "971505344645",
  whatsappMessage:
    "Hello! I'm interested in enrolling in Arabic tuition classes. Please get in touch with me",
  voiceInputEnabled: false,
  voiceReplyEnabled: false,
  voiceLanguage: "en-US",
};

/**
 * Phone field with a country picker. Its own component so the visitor's
 * country is only looked up once the form is actually on screen, not on every
 * page load for every visitor.
 */
const ChatPhoneField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { countryCode } = useCountryCode();
  return (
    <PhoneInput
      international
      defaultCountry={(countryCode && countryCode !== "undefined" ? countryCode : "AE") as Country}
      value={value}
      onChange={(next) => onChange(next ?? "")}
      placeholder="50 123 4567"
      className="chatbot-phone h-11 rounded-xl border border-[#EBE4DC] bg-white pl-3 pr-3 flex items-center gap-2 text-sm text-neutral-800 transition-colors focus-within:border-[#FB6238] focus-within:ring-2 focus-within:ring-[#FB6238]/15"
    />
  );
};

/** One labelled field in the pre-chat form. */
const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-[#0D1B2A]">
      {label} {required && <span className="text-[#FB6238]">*</span>}
    </label>
    {children}
  </div>
);

const ChatbotWidget = () => {
  const [config, setConfig] = useState<ChatbotConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Pre-chat form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Chat conversation states
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [voiceReplies, setVoiceReplies] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const accent = {
    backgroundImage: `linear-gradient(to right, ${config?.accentFrom || "#FF60A8"}, ${
      config?.accentTo || "#FB6238"
    })`,
  };

  // Load the admin's settings. If the API cannot be reached the widget still
  // appears with built-in defaults: it is now the only WhatsApp shortcut on the
  // page, so hiding it during an outage would leave visitors no way to reach us.
  // Only an admin switching the chatbot off hides it.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      let loaded: ChatbotConfig | null = null;
      try {
        const res = await fetch(`${API}/chatbot/config`);
        if (res.ok) loaded = (await res.json())?.data ?? null;
      } catch {
        // Fall through to the defaults below.
      }
      if (!cancelled) setConfig(loaded ?? FALLBACK_CONFIG);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  const appendMessage = useCallback((sender: "bot" | "user", text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        sender,
        text,
        timestamp: new Date(),
      },
    ]);
  }, []);

  /** Sends a message to the server and shows whatever comes back. */
  const askBot = useCallback(
    async (text: string, quickReplyLabel?: string) => {
      setBotTyping(true);
      try {
        const res = await fetch(`${API}/chatbot/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, text, quickReplyLabel }),
        });

        const json = await res.json().catch(() => null);
        // A rate limit or an outage still has to say something in the window;
        // an unanswered message reads as a broken site.
        const reply =
          json?.data?.reply ||
          json?.message ||
          "Sorry, something went wrong. Please try again in a moment.";

        appendMessage("bot", reply);
        return reply as string;
      } catch {
        const reply = "Sorry, I could not reach our server. Please try again in a moment.";
        appendMessage("bot", reply);
        return reply;
      } finally {
        setBotTyping(false);
      }
    },
    [appendMessage, sessionId]
  );

  const handleVoiceInput = useCallback(
    (transcript: string) => {
      appendMessage("user", transcript);
      void askBot(transcript);
    },
    [appendMessage, askBot]
  );

  const {
    listening,
    speaking,
    micSupported,
    speechSupported,
    micError,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  } = useSpeech({
    language: config?.voiceLanguage || "en-US",
    onResult: handleVoiceInput,
  });

  useEffect(() => {
    if (micError) toast.error(micError);
  }, [micError]);

  // Read new bot replies aloud, but only after the visitor has switched it on.
  // A widget that starts talking on its own is the fastest way to make someone
  // close the tab.
  const lastSpokenId = useRef<string | null>(null);
  useEffect(() => {
    if (!voiceReplies) return;

    const last = messages[messages.length - 1];
    if (!last || last.sender !== "bot" || last.id === lastSpokenId.current) return;

    lastSpokenId.current = last.id;
    speak(last.text);
  }, [messages, voiceReplies, speak]);

  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    if (config?.askForPhone && !(phone && isValidPhoneNumber(phone))) {
      toast.error("Please enter a valid WhatsApp / mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/chatbot/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed to record chat session");

      const json = await res.json();
      setSessionId(json.data?.sessionId ?? null);
      setIsChatStarted(true);

      // The greeting is composed on the server from the admin's settings, so
      // changing the welcome text does not need a new build of the site.
      const opening = (json.data?.messages ?? []) as { text: string }[];
      setMessages(
        opening.map((message, index) => ({
          id: `opening-${index}`,
          sender: "bot" as const,
          text: message.text,
          timestamp: new Date(),
        }))
      );
    } catch (err) {
      console.error(err);
      toast.error("Unable to start chat. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickReply = (label: string) => {
    appendMessage("user", label);
    void askBot(label, label);
  };

  const handleOperator = () => {
    if (!config) return;

    appendMessage("user", config.operatorLabel);
    appendMessage(
      "bot",
      "Connecting you with our support operator on WhatsApp... Please wait."
    );

    if (sessionId) {
      // Best effort — the visitor is already on their way to WhatsApp.
      void fetch(`${API}/chatbot/handoff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      }).catch(() => undefined);
    }

    window.open(
      `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
        config.whatsappMessage
      )}`,
      "_blank"
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text || botTyping) return;

    appendMessage("user", text);
    setInputText("");
    void askBot(text);
  };

  const toggleVoiceReplies = () => {
    if (voiceReplies) {
      stopSpeaking();
      setVoiceReplies(false);
      return;
    }
    // Skip whatever is already on screen — switching this on should not replay
    // the whole conversation.
    lastSpokenId.current = messages[messages.length - 1]?.id ?? null;
    setVoiceReplies(true);
  };

  if (!config || !config.enabled) return null;

  const showMic = config.voiceInputEnabled && micSupported;
  const showSpeaker = config.voiceReplyEnabled && speechSupported;

  return (
    <React.Fragment>
      {/* Floating Chat Bubble — hidden while the window is open, whose own X
          closes it, so there are never two close buttons on screen. */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={accent}
          className="fixed bottom-6 right-6 z-50 w-[60px] h-[60px] rounded-full text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Toggle chatbot"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Window Panel — opens in the bubble's corner. WhatsApp lives in
          its header; there is no separate floating WhatsApp button. */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[400px] h-[min(600px,calc(100vh-8rem))] bg-[#FCF9F6] border border-[#F0EAE3] rounded-[28px] shadow-2xl flex flex-col overflow-hidden text-neutral-800 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div
            style={accent}
            className="px-4 py-3.5 text-white flex justify-between items-center gap-3 shrink-0 shadow-sm"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-full bg-white/20 ring-2 ring-white/40 flex items-center justify-center overflow-hidden">
                  {config.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={config.avatarUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <MessageCircle size={22} />
                  )}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white" />
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-[15px] leading-tight truncate">
                  {config.botName}
                </h4>
                {/* The badge shares the tagline's line so the bot's name keeps
                    the full width next to the header buttons. */}
                <div className="mt-1 flex items-center gap-1.5 min-w-0">
                  <span className="shrink-0 rounded-full bg-white/20 border border-white/40 px-1.5 py-px text-[9px] font-extrabold tracking-wider">
                    24/7 LIVE
                  </span>
                  <p className="text-[11px] text-white/90 font-medium truncate">
                    {config.botTagline}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {config.whatsappNumber && (
                <a
                  href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
                    config.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full bg-white/95 p-0.5 shadow-sm transition-transform hover:scale-110"
                  aria-label="Chat with us on WhatsApp"
                  title="Chat with us on WhatsApp"
                >
                  <WhatsAppIcon size={26} />
                </a>
              )}
              {showSpeaker && (
                <button
                  onClick={toggleVoiceReplies}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  aria-label={voiceReplies ? "Turn off spoken replies" : "Read replies aloud"}
                  title={voiceReplies ? "Turn off spoken replies" : "Read replies aloud"}
                >
                  {voiceReplies ? (
                    <Volume2 size={16} className={speaking ? "animate-pulse" : undefined} />
                  ) : (
                    <VolumeX size={16} />
                  )}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div
            className={`flex-1 overflow-y-auto flex flex-col ${
              isChatStarted ? "p-4 bg-neutral-50" : "p-4 sm:p-5"
            }`}
          >
            {!isChatStarted ? (
              // Pre-chat Form
              <form onSubmit={handleStartChat} className="space-y-4">
                {/* Consultation card */}
                <div className="relative overflow-hidden rounded-2xl border border-[#FFE2D2] bg-gradient-to-br from-[#FFF6EE] via-white to-[#FFEADC] p-4 shadow-sm">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FB6238]/10" />
                  <div className="relative flex items-center gap-3">
                    <div
                      style={accent}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-md"
                    >
                      <BookOpenText size={20} />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-extrabold text-[15px] leading-snug text-[#0D1B2A]">
                        {config.preChatTitle}
                      </h5>
                      <p className="text-[11.5px] leading-snug text-[#4A5568] mt-0.5">
                        {config.preChatSubtitle}
                      </p>
                    </div>
                  </div>
                  <div className="relative mt-3.5 flex items-center justify-between gap-1 border-t border-[#FFE2D2] pt-3 text-[10px] sm:text-[10.5px] font-bold text-[#0D1B2A] whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      <Zap size={12} className="text-[#FB6238] fill-[#FB6238]" /> Instant Reply
                    </span>
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#FFD0BD]" />
                    <span className="flex items-center gap-1">
                      <GraduationCap size={13} className="text-[#FB6238]" /> Free Guidance
                    </span>
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#FFD0BD]" />
                    <span className="flex items-center gap-1">
                      <Lock size={11} className="text-[#FB6238]" /> 100% Private
                    </span>
                  </div>
                </div>

                <Field label="Full Name" required>
                  <div className="relative">
                    <User size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <Input
                      required
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Fatima Khan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 rounded-xl pl-10 text-sm border-[#EBE4DC] bg-white text-black focus-within:border-[#FB6238]"
                    />
                  </div>
                </Field>

                <Field label="Email Address" required>
                  <div className="relative">
                    <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <Input
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="e.g. fatima@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 rounded-xl pl-10 text-sm border-[#EBE4DC] bg-white text-black focus-within:border-[#FB6238]"
                    />
                  </div>
                </Field>

                {config.askForPhone && (
                  <Field label="WhatsApp / Mobile Number" required>
                    <ChatPhoneField value={phone} onChange={setPhone} />
                  </Field>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  style={accent}
                  className="w-full h-12 rounded-xl text-white font-bold shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  {loading ? "Starting…" : "Start Consultation"}
                  {!loading && <Sparkles size={16} />}
                </Button>

                <p className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
                  <Lock size={11} /> Safe, confidential &amp; no spam guarantee
                </p>
              </form>
            ) : (
              // Active Conversation
              <div className="space-y-4 flex flex-col flex-1">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user"
                        ? "max-w-[80%] self-end items-end"
                        : "max-w-[90%] self-start items-start"
                    }`}
                  >
                    <div
                      style={msg.sender === "user" ? accent : undefined}
                      className={`p-3 rounded-2xl text-sm ${
                        msg.sender === "user"
                          ? "text-white rounded-br-none whitespace-pre-wrap"
                          : "bg-white border border-neutral-100 text-neutral-700 rounded-bl-none shadow-sm"
                      }`}
                    >
                      {msg.sender === "user" ? msg.text : <ChatMessageContent text={msg.text} />}
                    </div>
                    <span className="text-[9px] text-neutral-400 mt-1 px-1">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}

                {botTyping && (
                  <div className="self-start bg-white border shadow-sm rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                )}

                {/* Quick replies */}
                {config.quickReplies.length > 0 && (
                  <div className="space-y-1.5 pt-2 shrink-0">
                    <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                      Quick Inquiries
                    </p>
                    {config.quickReplies.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => handleQuickReply(option.label)}
                        disabled={botTyping}
                        className="block w-full text-left text-xs bg-white hover:bg-neutral-100 disabled:opacity-60 text-neutral-700 font-medium py-2 px-3 rounded-lg border shadow-sm transition-all duration-200"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}

                {config.operatorEnabled && (
                  <button
                    onClick={handleOperator}
                    className="flex w-full items-center justify-center gap-1.5 text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2 px-3 rounded-lg border border-emerald-200 shadow-sm transition-all duration-200 shrink-0"
                  >
                    <Headphones size={13} />
                    {config.operatorLabel}
                  </button>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Active Chat Input Footer */}
          {isChatStarted && (
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t bg-white flex items-center gap-2 shrink-0"
            >
              <Input
                type="text"
                placeholder={listening ? "Listening…" : config.inputPlaceholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 h-9 text-xs border-neutral-200 focus-within:border-orange-400 text-black bg-white"
              />

              {showMic && (
                <button
                  type="button"
                  onClick={listening ? stopListening : startListening}
                  disabled={botTyping}
                  aria-label={listening ? "Stop listening" : "Speak your message"}
                  title={listening ? "Stop listening" : "Speak your message"}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-colors disabled:opacity-50 ${
                    listening
                      ? "bg-red-500 text-white border-red-500 animate-pulse"
                      : "bg-white text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {listening ? <Square size={13} /> : <Mic size={15} />}
                </button>
              )}

              <button
                type="submit"
                disabled={!inputText.trim() || botTyping}
                style={accent}
                className="w-9 h-9 rounded-full text-white flex items-center justify-center shrink-0 disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={14} className="ml-0.5" />
              </button>
            </form>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default ChatbotWidget;
