import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Scissors, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface Msg { role: "user" | "assistant"; content: string }

export function ChatbotWidget() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: t("chatbot.welcome") }]);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("nour-chat", {
        body: { messages: next.map((m) => ({ role: m.role, content: m.content })), language: i18n.language },
      });
      if (error) throw error;
      if (data?.escalated) setEscalated(true);
      setMessages([...next, { role: "assistant", content: data?.content || "..." }]);
    } catch (e: any) {
      setMessages([...next, { role: "assistant", content: "⚠️ " + (e?.message || "Erreur de connexion") }]);
    } finally {
      setLoading(false);
    }
  };

  const quickReplies = [t("chatbot.quick1"), t("chatbot.quick2"), t("chatbot.quick3"), t("chatbot.quick4")];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="fixed bottom-5 end-5 z-50 flex items-end gap-3">
        {!open && (
          <div className="hidden rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-glow sm:block">
            {t("chatbot.greeting")}
          </div>
        )}
        <SheetTrigger asChild>
          <button
            aria-label="Open chat"
            className="relative grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition hover:scale-105 hover:bg-primary-dark"
          >
            <Bot className="h-6 w-6" />
            <span className="pulse-dot absolute end-1 top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-background" />
          </button>
        </SheetTrigger>
      </div>

      <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border bg-secondary/40 px-5 py-4">
          <SheetTitle className="flex items-center gap-2 text-base">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Scissors className="h-4 w-4 -rotate-45" />
            </span>
            {t("chatbot.title")}
            <span className="ms-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Online
            </span>
          </SheetTitle>
        </SheetHeader>

        {escalated && (
          <div className="border-b border-amber-300/50 bg-amber-50 px-5 py-2 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            <AlertTriangle className="me-1 inline h-3.5 w-3.5" />
            Connecting you with a human agent shortly…
          </div>
        )}

        <ScrollArea className="flex-1" ref={scrollRef as any}>
          <div className="flex flex-col gap-3 p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "self-end bg-primary text-primary-foreground"
                    : "self-start bg-secondary text-secondary-foreground"
                )}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="self-start rounded-2xl bg-secondary px-4 py-3">
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/60 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/60 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/60" />
                </span>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-foreground/80 transition hover:border-primary/50 hover:text-primary"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chatbot.placeholder")}
              className="rounded-full"
            />
            <Button type="submit" size="icon" className="rounded-full bg-primary text-primary-foreground hover:bg-primary-dark" disabled={loading}>
              <Send className="h-4 w-4 rtl:-scale-x-100" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
