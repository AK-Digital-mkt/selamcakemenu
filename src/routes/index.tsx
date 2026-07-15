import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import heroCake from "@/assets/hero-cake.jpg";
import cakeStrawberry from "@/assets/cake-strawberry.jpg";
import cakeVanilla from "@/assets/cake-vanilla.jpg";
import cakeMint from "@/assets/cake-mint.jpg";
import cakeCupcake from "@/assets/cake-cupcake.jpg";
import cakeChocolate from "@/assets/cake-chocolate.jpg";
import cakeCheesecake from "@/assets/cake-cheesecake.jpg";

export const Route = createFileRoute("/")({
  component: DigitalMenu,
});

// ============================================================
//   SHOP INFO
// ============================================================
const SHOP = {
  name: "Selam",
  location: "Adama, Ethiopia",
  phone: "+251 921 109 307",
  about: "Selam is a boutique cake atelier crafting elegant, handmade cakes and pastries for life's sweetest moments.",
};

const BANKS = [
  { id: 1, name: "CBE Birr", number: "1000189273367", display: "Selam Cakes: 1000189273367", icon: "🏦", show: true },
  { id: 2, name: "Awash Bank", number: "01320123456789", display: "Acct: 01320123456789", icon: "🏛️", show: true },
  { id: 3, name: "Bank of Abyssinia", number: "12345678901234", display: "Acct: 12345678901234", icon: "🏦", show: true },
];

const MOBILE_PAY = {
  telebirr_number: "+251921109307",
  telebirr_display: "Selam Cakes: +251 921 109 307",
  show_telebirr: true,
};

// ============================================================
//   MENU
// ============================================================
type CakeItem = {
  id: number;
  cat: "SIGNATURE" | "CUPCAKES" | "CHEESECAKES" | "MACARONS" | "CUSTOM";
  emoji: string;
  name: { en: string; am: string; om: string };
  desc: { en: string; am: string; om: string };
  price: number;
  img: string;
  special?: boolean;
};

const MENU: CakeItem[] = [
  { id: 1, cat: "SIGNATURE", emoji: "🌸", special: true,
    name: { en: "Rose Strawberry Dream", am: "የጽጌረዳ እንጆሪ ኬክ", om: "Keeka Roozii Stroberrii" },
    desc: { en: "Soft strawberry sponge with rose cream and fresh berries.", am: "ለስላሳ የእንጆሪ ስፖንጅ ከጽጌረዳ ክሬም ጋር.", om: "Keeka stroberrii lallaafaa cream roozii wajjin." },
    price: 1200, img: cakeStrawberry },
  { id: 2, cat: "SIGNATURE", emoji: "🤍",
    name: { en: "Vanilla Bloom", am: "የቫኒላ አበባ", om: "Vaanilaa Daraaraa" },
    desc: { en: "Two-tier vanilla cake finished with sugar florals.", am: "ባለ ሁለት ደረጃ ቫኒላ ኬክ በስኳር አበቦች.", om: "Keeka vaanilaa sadarkaa lamaa daraaraa sukkaaraa qabu." },
    price: 1800, img: cakeVanilla },
  { id: 3, cat: "SIGNATURE", emoji: "🍫",
    name: { en: "Pink Drip Chocolate", am: "ሮዝ ቸኮሌት", om: "Chokoleetii Roozii" },
    desc: { en: "Rich chocolate cake with pink ganache drip and blossoms.", am: "ጥልቅ የቸኮሌት ኬክ በሮዝ ጋናሽ.", om: "Keeka chokoleetii dhugaa ganaash roozii qabu." },
    price: 1500, img: cakeChocolate },

  { id: 4, cat: "CUPCAKES", emoji: "🧁",
    name: { en: "Blush Rose Cupcake", am: "የጽጌረዳ ኬክ", om: "Keeka Roozii Xiqqaa" },
    desc: { en: "Vanilla cupcake topped with a pink buttercream rose.", am: "ቫኒላ ኬክ በሮዝ ክሬም.", om: "Cupcake vaanilaa cream roozii wajjin." },
    price: 150, img: cakeCupcake },
  { id: 5, cat: "CUPCAKES", emoji: "🍓",
    name: { en: "Strawberry Cloud", am: "እንጆሪ ደመና", om: "Duumessa Stroberrii" },
    desc: { en: "Fluffy strawberry cupcake with whipped cream.", am: "ለስላሳ የእንጆሪ ኬክ.", om: "Cupcake stroberrii lallaafaa." },
    price: 140, img: cakeCupcake },
  { id: 6, cat: "CUPCAKES", emoji: "💫",
    name: { en: "Mini Vanilla Delight", am: "ሚኒ ቫኒላ", om: "Vaanilaa Xiqqaa" },
    desc: { en: "Bite-sized vanilla cupcakes for gifting.", am: "ትንንሽ የቫኒላ ኬኮች.", om: "Cupcake vaanilaa xixiqqaa." },
    price: 120, img: cakeCupcake },

  { id: 7, cat: "CHEESECAKES", emoji: "🍰",
    name: { en: "Berry Cheesecake", am: "የቤሪ ቺዝኬክ", om: "Cheesecake Bariiwwan" },
    desc: { en: "Creamy cheesecake with mixed berry glaze.", am: "ክሬም ቺዝኬክ በተቀላቀሉ ቤሪ.", om: "Cheesecake cream cream barii walmakaa qabu." },
    price: 950, img: cakeCheesecake },
  { id: 8, cat: "CHEESECAKES", emoji: "🥭",
    name: { en: "Classic New York", am: "ኒው ዮርክ ቺዝኬክ", om: "New York Cheesecake" },
    desc: { en: "Silky-smooth traditional New York cheesecake.", am: "ባህላዊ ኒው ዮርክ ቺዝኬክ.", om: "Cheesecake New York aadaa." },
    price: 850, img: cakeCheesecake },

  { id: 9, cat: "MACARONS", emoji: "🍬",
    name: { en: "Mint Pearl Tower", am: "የከበሮ ማካሮን ማማ", om: "Gamoo Makaaroon" },
    desc: { en: "Pastel macaron tower with edible pearls.", am: "ፓስቴል ማካሮን ማማ.", om: "Gamoo makaaroon paasteel." },
    price: 2400, img: cakeMint },
  { id: 10, cat: "MACARONS", emoji: "🌷",
    name: { en: "Pink Macaron Box", am: "ሮዝ ማካሮን ሳጥን", om: "Saanduqa Makaaroon Roozii" },
    desc: { en: "Box of 12 handcrafted pink macarons.", am: "12 የሮዝ ማካሮን.", om: "Saanduqa makaaroon roozii 12." },
    price: 600, img: cakeMint },

  { id: 11, cat: "CUSTOM", emoji: "💍",
    name: { en: "Wedding Cake — 3 Tier", am: "የሠርግ ኬክ", om: "Keeka Cidhaa" },
    desc: { en: "Bespoke 3-tier wedding cake, custom flavors & florals.", am: "የሠርግ ኬክ በተመረጠ ጣዕም.", om: "Keeka cidhaa sadarkaa 3." },
    price: 8500, img: heroCake },
  { id: 12, cat: "CUSTOM", emoji: "🎂",
    name: { en: "Birthday Custom", am: "የልደት ኬክ", om: "Keeka Guyyaa Dhalootaa" },
    desc: { en: "Custom birthday cake designed to your theme.", am: "የተመረጠ የልደት ኬክ.", om: "Keeka guyyaa dhalootaa filatamaa." },
    price: 2200, img: cakeVanilla },
];

// ============================================================
//   TRANSLATIONS
// ============================================================
type Lang = "en" | "am" | "om";
const T = {
  en: {
    heroTitle: "Selam Cake Shop",
    heroSub: "Handcrafted with love",
    heroBadge: "Open today",
    orderNow: "Order Now",
    payTitle: "Payment Information",
    paySub: "Accepted payment methods for your order",
    payCash: "Cash on delivery",
    aboutTitle: "About " + SHOP.name,
    catLabels: { ALL: "All", SIGNATURE: "Signature", CUPCAKES: "Cupcakes", CHEESECAKES: "Cheesecakes", MACARONS: "Macarons", CUSTOM: "Custom" } as Record<string, string>,
    currency: "Birr", navPay: "Pay", navInfo: "Info", tagline: "Sweetness, delicately made.",
    copied: "copied!", contact: "Contact us to order",
  },
  am: {
    heroTitle: "ሰላም ኬክ ሱቅ",
    heroSub: "በእጅ የተሰራ በፍቅር",
    heroBadge: "ዛሬ ክፍት ነው",
    orderNow: "አዝዙ",
    payTitle: "የክፍያ መረጃ",
    paySub: "ተቀባይነት ያላቸው የክፍያ ዘዴዎች",
    payCash: "ጥሬ ገንዘብ",
    aboutTitle: "ስለ ሰላም",
    catLabels: { ALL: "ሁሉም", SIGNATURE: "ልዩ", CUPCAKES: "ካፕኬኮች", CHEESECAKES: "ቺዝኬኮች", MACARONS: "ማካሮኖች", CUSTOM: "የተመረጠ" } as Record<string, string>,
    currency: "ብር", navPay: "ክፍያ", navInfo: "መረጃ", tagline: "ጣፋጭነት፣ በጥንቃቄ የተሰራ።",
    copied: "ተቀድቷል!", contact: "ለማዘዝ ያግኙን",
  },
  om: {
    heroTitle: "Selam Keeka",
    heroSub: "Harkaan qophaa'e jaalalaan",
    heroBadge: "Har'a bane",
    orderNow: "Ajaji",
    payTitle: "Odeeffannoo Kaffaltii",
    paySub: "Karaaleen kaffaltii fudhataman",
    payCash: "Maallaqaan",
    aboutTitle: "Waa'ee " + SHOP.name,
    catLabels: { ALL: "Hunda", SIGNATURE: "Addaa", CUPCAKES: "Cupcake", CHEESECAKES: "Cheesecake", MACARONS: "Makaaroon", CUSTOM: "Filatamaa" } as Record<string, string>,
    currency: "ETB", navPay: "Kaffaltii", navInfo: "Odeeffannoo", tagline: "Miʼaawaa, of eeggannoon.",
    copied: "kopeeffame!", contact: "Nu quunnamaa",
  },
} satisfies Record<Lang, any>;

// ============================================================
//   COMPONENT
// ============================================================
type ModalKey = "payment" | "about" | null;

function DigitalMenu() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeCat, setActiveCat] = useState<string>("ALL");
  const [modal, setModal] = useState<ModalKey>(null);
  const [openItem, setOpenItem] = useState<CakeItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [langMenu, setLangMenu] = useState(false);
  const t = T[lang];

  const categories = useMemo(() => {
    const seen = new Set<string>();
    MENU.forEach((m) => seen.add(m.cat));
    return Array.from(seen);
  }, []);

  const filtered = useMemo(
    () => (activeCat === "ALL" ? MENU : MENU.filter((m) => m.cat === activeCat)),
    [activeCat]
  );

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }
  async function copy(text: string, label: string) {
    try { await navigator.clipboard.writeText(text); } catch { /* noop */ }
    showToast(`${label} ${t.copied}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fef5f7] to-[#f0fafa] pb-32">
      <div className="mx-auto max-w-[520px] relative">
        <Hero t={t} lang={lang} setLang={setLang} langMenu={langMenu} setLangMenu={setLangMenu} />

        <CategoryPills
          categories={categories}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          labels={t.catLabels}
        />

        <MenuList
          items={filtered}
          activeCat={activeCat}
          lang={lang}
          labels={t.catLabels}
          currency={t.currency}
          onOpen={setOpenItem}
        />
      </div>

      <BottomNav onNav={(k) => setModal(k)} active={modal} labels={t} />

      {modal === "payment" && (
        <PaymentModal t={t} onClose={() => setModal(null)} onCopy={copy} />
      )}
      {modal === "about" && (
        <AboutModal t={t} onClose={() => setModal(null)} />
      )}
      {openItem && (
        <ItemModal item={openItem} lang={lang} currency={t.currency} onClose={() => setOpenItem(null)} onOrder={() => { setOpenItem(null); setModal("payment"); }} orderLabel={t.orderNow} />
      )}

      <Toast msg={toast} />
    </div>
  );
}

// ============================================================
//   HERO
// ============================================================
function Hero({ t, lang, setLang, langMenu, setLangMenu }: any) {
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current && window.scrollY < 500) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-[380px] overflow-hidden">
      <div ref={bgRef} className="absolute inset-0">
        <img src={heroCake} alt="Selam signature cake" className="w-full h-full object-cover" />
      </div>
      {/* soft rose overlay for legibility */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(250,218,221,0.55) 55%, rgba(221,248,248,0.85) 100%)" }} />

      {/* topbar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 glass px-3 py-2 rounded-full">
          <span className="text-lg">🌸</span>
          <span className="font-display font-semibold text-sm">Selam</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setLangMenu(!langMenu)}
            className="glass w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold hover:scale-105 transition-transform"
            aria-label="Language"
          >
            {lang.toUpperCase()}
          </button>
          {langMenu && (
            <div className="absolute right-0 top-12 glass rounded-2xl overflow-hidden shadow-[var(--shadow-soft)] w-32">
              {(["en", "am", "om"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setLangMenu(false); }}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#fadadd]/40 transition-colors ${lang === l ? "bg-[#ddf8f8]/50 font-semibold" : ""}`}
                >
                  {l === "en" ? "English" : l === "am" ? "አማርኛ" : "Afaan Oromoo"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* hero content */}
      <div className="absolute bottom-8 left-6 right-6 z-10">
        <div className="inline-flex items-center gap-2 glass px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-[#f5a1ad] animate-pulse shadow-[0_0_10px_#f5a1ad]" />
          {t.heroBadge}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight text-[#2d2029]">
          {t.heroTitle}
        </h1>
        <p className="mt-2 text-sm text-[#5a4a52] font-medium">{t.tagline}</p>
      </div>
    </section>
  );
}

// ============================================================
//   CATEGORY PILLS
// ============================================================
function CategoryPills({ categories, activeCat, setActiveCat, labels }: any) {
  return (
    <div className="flex gap-2.5 overflow-x-auto px-4 pt-5 pb-2 no-scrollbar" style={{ scrollbarWidth: "none" }}>
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
      {["ALL", ...categories].map((c) => {
        const active = activeCat === c;
        return (
          <button
            key={c}
            onClick={() => setActiveCat(c)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 ${
              active
                ? "text-white shadow-[0_6px_18px_-4px_#f5c1c8] scale-[1.03]"
                : "bg-white text-[#8b6b73] border border-[#f0d5dc] hover:bg-[#ddf8f8]/40"
            }`}
            style={active ? { background: "linear-gradient(135deg, #f5a1ad 0%, #e88aab 100%)" } : {}}
          >
            {labels[c] || c}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
//   MENU LIST
// ============================================================
function MenuList({ items, activeCat, lang, labels, currency, onOpen }: any) {
  let lastCat: string | null = null;
  return (
    <div className="px-4 pt-2 grid grid-cols-2 gap-4">
      {items.map((item: CakeItem, i: number) => {
        const showHeading = activeCat === "ALL" && item.cat !== lastCat;
        if (showHeading) lastCat = item.cat;
        return (
          <div key={item.id} className="contents">
            {showHeading && (
              <div className="col-span-2 flex items-center gap-2 pt-4 pb-1 text-xs font-bold uppercase tracking-[1.5px] text-[#8b6b73]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f5a1ad]" />
                {labels[item.cat] || item.cat}
              </div>
            )}
            <article
              onClick={() => onOpen(item)}
              className="group bg-white rounded-3xl p-2.5 border border-[#f0d5dc] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-10px_rgba(233,30,99,0.15)] hover:border-[#f5a1ad]/40 animate-fade-up"
              style={{ animationDelay: `${i * 0.04}s`, animationFillMode: "both" }}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-square">
                <img
                  src={item.img}
                  alt={item.name[lang as Lang]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.special ? (
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-[1px] text-white backdrop-blur-sm" style={{ background: "linear-gradient(135deg, #f5a1ad, #e88aab)" }}>
                    SPECIAL
                  </span>
                ) : (
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold text-[#2d2029] bg-white/85 backdrop-blur-sm">
                    {item.price}
                  </span>
                )}
              </div>
              <div className="px-1 pt-3 pb-1 flex flex-col">
                <div className="text-[14px] font-bold leading-tight text-[#2d2029] line-clamp-2">
                  <span className="mr-1">{item.emoji}</span>{item.name[lang as Lang]}
                </div>
                <div className="text-[11px] text-[#8b6b73] mt-1.5 leading-snug line-clamp-2">{item.desc[lang as Lang]}</div>
                <div className="mt-2.5 flex items-center justify-between">
                  <div className="text-[15px] font-extrabold text-[#2d2029]">
                    <span className="text-[11px] font-bold text-[#8b6b73] mr-1">{currency}</span>{item.price}
                  </div>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm shadow-[0_6px_14px_-4px_#f5c1c8] group-hover:scale-110 transition-transform" style={{ background: "linear-gradient(135deg, #f5a1ad, #e88aab)" }}>
                    →
                  </span>
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
//   BOTTOM NAV
// ============================================================
function BottomNav({ onNav, active, labels }: any) {
  const btn = (key: "payment" | "about", icon: string, label: string) => (
    <button
      onClick={() => onNav(key)}
      className={`relative flex flex-col items-center justify-center gap-1 px-5 h-14 min-w-[64px] rounded-2xl transition-all ${
        active === key ? "text-[#e88aab] bg-[#fadadd]/40" : "text-[#8b6b73] hover:text-[#2d2029]"
      }`}
      aria-label={label}
    >
      <span className="text-xl">{icon}</span>
      <span className={`text-[9px] font-semibold uppercase tracking-wider ${active === key ? "opacity-100" : "opacity-70"}`}>{label}</span>
    </button>
  );

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 glass rounded-[28px] px-4 py-2 flex items-center gap-2 shadow-[0_12px_36px_-8px_rgba(233,30,99,0.25)]">
      {btn("payment", "💳", labels.navPay)}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-[0_8px_24px_-4px_rgba(233,30,99,0.5)] hover:scale-110 hover:-translate-y-1 transition-all relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f5a1ad 0%, #e88aab 100%)" }}
        aria-label="Home"
      >
        <span className="relative z-10">🏠</span>
      </button>
      {btn("about", "ℹ️", labels.navInfo)}
    </nav>
  );
}

// ============================================================
//   MODAL SHELL + MODALS
// ============================================================
function Modal({ children, onClose }: any) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onEsc); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-up"
      style={{ animationDuration: "0.25s" }}
    >
      <div className="w-full sm:max-w-[480px] sm:mb-6 bg-white rounded-t-[28px] sm:rounded-[28px] border border-[#f0d5dc] shadow-[0_-8px_40px_rgba(233,30,99,0.15)] max-h-[90vh] overflow-y-auto animate-fade-up">
        {children}
      </div>
    </div>
  );
}

function PaymentModal({ t, onClose, onCopy }: any) {
  return (
    <Modal onClose={onClose}>
      <div className="p-7 pb-10 relative">
        <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#f8e1e7] hover:bg-[#f5a1ad] hover:text-white text-[#8b6b73] flex items-center justify-center transition-colors">✕</button>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-[#fadadd]/50 border border-[#f5a1ad]/30">💳</div>
        <h2 className="font-display text-2xl font-bold text-[#2d2029]">{t.payTitle}</h2>
        <p className="text-sm text-[#8b6b73] mt-1.5 mb-6 leading-relaxed">{t.paySub}</p>

        <div className="space-y-3">
          {BANKS.filter(b => b.show).map((b) => (
            <button
              key={b.id}
              onClick={() => onCopy(b.number, b.name)}
              className="w-full flex items-center justify-between gap-3 bg-[#fef5f7] hover:bg-[#ddf8f8]/40 border border-transparent hover:border-[#f5a1ad]/30 rounded-2xl p-4 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-[#2d2029]">{b.name}</div>
                  <div className="text-xs text-[#8b6b73]">{b.display}</div>
                </div>
              </div>
              <span className="text-[#e88aab] text-lg">📋</span>
            </button>
          ))}

          {MOBILE_PAY.show_telebirr && (
            <button
              onClick={() => onCopy(MOBILE_PAY.telebirr_number, "Telebirr")}
              className="w-full flex items-center justify-between gap-3 bg-[#fef5f7] hover:bg-[#ddf8f8]/40 border border-transparent hover:border-[#f5a1ad]/30 rounded-2xl p-4 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <div className="text-sm font-semibold text-[#2d2029]">Telebirr</div>
                  <div className="text-xs text-[#8b6b73]">{MOBILE_PAY.telebirr_display}</div>
                </div>
              </div>
              <span className="text-[#e88aab] text-lg">📋</span>
            </button>
          )}

          <div className="flex items-center gap-3 bg-[#fef5f7] rounded-2xl p-4">
            <span className="text-2xl">💵</span>
            <span className="text-sm font-semibold text-[#2d2029]">{t.payCash}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function AboutModal({ t, onClose }: any) {
  return (
    <Modal onClose={onClose}>
      <div className="p-7 pb-10 relative">
        <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#f8e1e7] hover:bg-[#f5a1ad] hover:text-white text-[#8b6b73] flex items-center justify-center transition-colors">✕</button>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-[#ddf8f8] border border-[#a0dcdc]/40">🌸</div>
        <h2 className="font-display text-2xl font-bold text-[#2d2029]">{t.aboutTitle}</h2>
        <p className="text-sm text-[#8b6b73] mt-1.5 mb-6 leading-relaxed">{SHOP.about}</p>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-[#fef5f7] rounded-2xl p-4">
            <span className="text-2xl">📍</span>
            <span className="text-sm font-medium text-[#2d2029]">{SHOP.location}</span>
          </div>
          <a href={`tel:${SHOP.phone}`} className="flex items-center gap-3 bg-[#fef5f7] hover:bg-[#ddf8f8]/40 rounded-2xl p-4 transition-colors">
            <span className="text-2xl">📞</span>
            <span className="text-sm font-medium text-[#2d2029]">{SHOP.phone}</span>
          </a>
          <a href={`https://wa.me/${SHOP.phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#fef5f7] hover:bg-[#ddf8f8]/40 rounded-2xl p-4 transition-colors">
            <span className="text-2xl">💬</span>
            <span className="text-sm font-medium text-[#2d2029]">WhatsApp — {t.contact}</span>
          </a>
        </div>
      </div>
    </Modal>
  );
}

function ItemModal({ item, lang, currency, onClose, onOrder, orderLabel }: any) {
  return (
    <Modal onClose={onClose}>
      <div className="relative">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm">✕</button>
        <img src={item.img} alt={item.name[lang]} className="w-full h-64 object-cover" />
        <div className="p-7 pb-10">
          <h2 className="font-display text-2xl font-bold text-[#2d2029]">
            <span className="mr-1">{item.emoji}</span>{item.name[lang]}
          </h2>
          <p className="text-[15px] text-[#8b6b73] mt-2.5 mb-5 leading-relaxed">{item.desc[lang]}</p>
          <div className="flex items-center justify-between gap-4">
            <div className="font-display text-3xl font-extrabold" style={{ color: "#e88aab" }}>
              {item.price} <span className="text-base font-bold text-[#8b6b73]">{currency}</span>
            </div>
            <button onClick={onOrder} className="btn-primary text-sm">{orderLabel}</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function Toast({ msg }: { msg: string | null }) {
  return (
    <div
      className={`fixed bottom-28 left-1/2 -translate-x-1/2 z-[300] px-6 py-3 rounded-full text-white font-bold text-sm flex items-center gap-2 shadow-[0_12px_28px_-6px_rgba(233,30,99,0.5)] transition-all duration-300 ${
        msg ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      style={{ background: "linear-gradient(135deg, #f5a1ad 0%, #e88aab 100%)" }}
    >
      <span>✓</span>
      <span>{msg}</span>
    </div>
  );
}
