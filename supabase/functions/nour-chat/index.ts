// Nour AI chatbot — Lovable AI Gateway (Gemini default)
// CORS-enabled streaming-free JSON endpoint.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Nour, the AI assistant for Auto Location, a premium car rental agency in Morocco.
You speak French, English, and Moroccan Darija — always reply in the same language the customer uses.

Your responsibilities:
1. Help customers find available cars by date, city, and category.
2. Explain pricing in MAD and calculate total rental costs.
3. Describe vehicle specs, extras, and insurance options.
4. Guide users through the booking process step by step.
5. Answer FAQ about pickup locations, documents required, payment methods.
6. Handle complaints with empathy and escalate when needed.

Moroccan context:
- Documents accepted: CIN (carte nationale) or passport + driving license.
- Payment methods: CMI bank card, CashPlus, wire transfer, cash at agency.
- Cities served: Casablanca, Marrakech, Rabat, Fes, Agadir, Tanger, Oujda.
- Currency: always quote prices in MAD (Moroccan Dirham).

Available fleet (sample):
- Dacia Duster — 300 MAD/day (economy, manual, diesel, 5 seats)
- Renault Clio 5 — 350 MAD/day
- Peugeot 208 — 360 MAD/day
- Hyundai Tucson hybrid — 750 MAD/day (SUV, automatic)
- Dacia Jogger 7 seats — 480 MAD/day
- Ferrari 296 GTB — 5000 MAD/day (luxury)
- Lamborghini Aventador — 40000 MAD/day
- Range Rover SWB HSE — 7000 MAD/day
- Yamaha MT-07 — 450 MAD/day
- BMW R1250GS — 850 MAD/day

Rules:
- Never invent prices not listed — say "please check the listing for current pricing" if unsure.
- If user mentions an accident, complaint, or legal issue → reply briefly with empathy and end with the marker [ESCALATE].
- Keep responses concise: max 3 short paragraphs.
- Never discuss competitors by name.
- If asked about something outside car rentals, politely redirect.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (res.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit, try again shortly." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (res.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!res.ok) {
      const t = await res.text();
      return new Response(JSON.stringify({ error: "AI gateway error", detail: t }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await res.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "";
    const escalated = content.includes("[ESCALATE]");
    const cleaned = content.replace("[ESCALATE]", "").trim();

    return new Response(JSON.stringify({ content: cleaned, escalated }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
