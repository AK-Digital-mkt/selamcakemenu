import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import heroFallback from "@/assets/hero-cake.jpg";
import cakeFallback from "@/assets/cake-strawberry.jpg";
import {
  fetchCategories,
  fetchPaymentMethods,
  fetchProducts,
  fetchSiteSettings,
  imageUrl,
  type Product,
} from "@/lib/db";

export const Route = createFileRoute("/")({
  component: DigitalMenu,
});

type ModalKey = "payment" | "about" | null;

function DigitalMenu() {
  const settings = useQuery({ queryKey: ["site-settings"], queryFn: fetchSiteSettings });
  const cats = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const products = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const pays = useQuery({ queryKey: ["payments"], queryFn: fetchPaymentMethods });

  const [activeCat, setActiveCat] = useState<string>("ALL");
  const [modal, setModal] = useState<ModalKey>(null);
  const [openItem, setOpenItem] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const visibleCats = useMemo(() => (cats.data ?? []).filter((c) => c.visible), [cats.data]);
  const visibleProducts = useMemo(() => (products.data ?? []).filter((p) => p.available), [products.data]);

  const filtered = useMemo(
    () => (activeCat === "ALL"
      ? visibleProducts
      : visibleProducts.filter((p) => p.category_id === activeCat)),
    [visibleProducts, activeCat]
  );

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }
  async function copy(text: string, label: string) {
    try { await navigator.clipboard.writeText(text); } catch { /* noop */ }
    showToast(`${label} copied!`);
  }

  const heroImg = imageUrl(settings.data?.hero_image_url ?? null) ?? heroFallback;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fef5f7] to-[#f0fafa] pb-32">
      <div className="mx-auto max-w-[520px] relative">
        <Hero settings={settings.data} heroImg={heroImg} />
        <CategoryPills categories={visibleCats} activeCat={activeCat} setActiveCat={setActiveCat} />
        <MenuList items={filtered} activeCat={activeCat} categories={visibleCats} onOpen={setOpenItem} />
        {filtered.length === 0 && !products.isLoading && (
          <div className="text-center py-16 text-[#8b6b73] px-6">
            <div className="text-4xl mb-2">🌸</div>
            <div>No cakes in this category yet.</div>
          </div>
        )}
      </div>

      <BottomNav onNav={(k: ModalKey) => setModal(k)} active={modal} />

      {modal === "payment" && (
        <PaymentModal methods={pays.data ?? []} onClose={() => setModal(null)} onCopy={copy} />
      )}
      {modal === "about" && (
        <AboutModal settings={settings.data} onClose={() => setModal(null)} />
      )}
      {openItem && (
        <ItemModal item={openItem} onClose={() => setOpenItem(null)}
          onOrder={() => { setOpenItem(null); setModal("payment"); }} />
      )}

      <Toast msg={toast} />
    </div>
  );
}

function Hero({ settings, heroImg }: { settings: any; heroImg: string }) {
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
        <img src={heroImg} alt="Signature cake" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(250,218,221,0.55) 55%, rgba(221,248,248,0.85) 100%)" }} />

      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 glass px-3 py-2 rounded-full">
          <span className="text-lg">🌸</span>
          <span className="font-display font-semibold text-sm">{settings?.shop_name ?? "Selam"}</span>
        </div>
        <Link to="/auth" className="glass w-11 h-11 rounded-full flex items-center justify-center hover:scale-105 transition-transform" aria-label="Admin">
          <span className="text-lg">🔒</span>
        </Link>
      </div>

      <div className="absolute bottom-8 left-6 right-6 z-10">
        <div className="inline-flex items-center gap-2 glass px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-[#f5a1ad] animate-pulse shadow-[0_0_10px_#f5a1ad]" />
          {settings?.hero_subtitle ?? "Handcrafted with love"}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight text-[#2d2029]">
          {settings?.hero_title ?? "Selam Cake Shop"}
        </h1>
        <p className="mt-2 text-sm text-[#5a4a52] font-medium">{settings?.tagline ?? "Sweetness, delicately made."}</p>
      </div>
    </section>
  );
}

function CategoryPills({ categories, activeCat, setActiveCat }: any) {
  return (
    <div className="flex gap-2.5 overflow-x-auto px-4 pt-5 pb-2" style={{ scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      {[{ id: "ALL", name: "All", icon: "✨" }, ...categories].map((c: any) => {
        const active = activeCat === c.id;
        return (
          <button key={c.id} onClick={() => setActiveCat(c.id)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 ${
              active ? "text-white shadow-[0_6px_18px_-4px_#f5c1c8] scale-[1.03]" : "bg-white text-[#8b6b73] border border-[#f0d5dc] hover:bg-[#ddf8f8]/40"
            }`}
            style={active ? { background: "linear-gradient(135deg, #f5a1ad 0%, #e88aab 100%)" } : {}}>
            <span className="mr-1">{c.icon}</span>{c.name}
          </button>
        );
      })}
    </div>
  );
}

function MenuList({ items, activeCat, categories, onOpen }: {
  items: Product[]; activeCat: string; categories: any[]; onOpen: (p: Product) => void;
}) {
  let lastCat: string | null = null;
  const catName = (id: string | null) => categories.find((c) => c.id === id)?.name ?? "Other";

  return (
    <div className="px-4 pt-2 grid grid-cols-2 gap-4">
      {items.map((item, i) => {
        const showHeading = activeCat === "ALL" && item.category_id !== lastCat;
        if (showHeading) lastCat = item.category_id;
        const url = imageUrl(item.image_url) ?? cakeFallback;
        return (
          <div key={item.id} className="contents">
            {showHeading && (
              <div className="col-span-2 flex items-center gap-2 pt-4 pb-1 text-xs font-bold uppercase tracking-[1.5px] text-[#8b6b73]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f5a1ad]" />
                {catName(item.category_id)}
              </div>
            )}
            <article onClick={() => onOpen(item)}
              className="group bg-white rounded-3xl p-2.5 border border-[#f0d5dc] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-10px_rgba(233,30,99,0.15)] hover:border-[#f5a1ad]/40 animate-fade-up"
              style={{ animationDelay: `${i * 0.04}s`, animationFillMode: "both" }}>
              <div className="relative overflow-hidden rounded-2xl aspect-square">
                <img src={url} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {item.featured ? (
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-[1px] text-white backdrop-blur-sm" style={{ background: "linear-gradient(135deg, #f5a1ad, #e88aab)" }}>
                    FEATURED
                  </span>
                ) : (
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold text-[#2d2029] bg-white/85 backdrop-blur-sm">
                    {item.price}
                  </span>
                )}
              </div>
              <div className="px-1 pt-3 pb-1 flex flex-col">
                <div className="text-[14px] font-bold leading-tight text-[#2d2029] line-clamp-2">
                  <span className="mr-1">{item.emoji}</span>{item.name}
                </div>
                <div className="text-[11px] text-[#8b6b73] mt-1.5 leading-snug line-clamp-2">{item.description}</div>
                <div className="mt-2.5 flex items-center justify-between">
                  <div className="text-[15px] font-extrabold text-[#2d2029]">
                    <span className="text-[11px] font-bold text-[#8b6b73] mr-1">Birr</span>{item.price}
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

function BottomNav({ onNav, active }: { onNav: (k: ModalKey) => void; active: ModalKey }) {
  const btn = (key: "payment" | "about", icon: string, label: string) => (
    <button onClick={() => onNav(key)}
      className={`relative flex flex-col items-center justify-center gap-1 px-5 h-14 min-w-[64px] rounded-2xl transition-all ${
        active === key ? "text-[#e88aab] bg-[#fadadd]/40" : "text-[#8b6b73] hover:text-[#2d2029]"
      }`} aria-label={label}>
      <span className="text-xl">{icon}</span>
      <span className="text-[9px] font-semibold uppercase tracking-wider">{label}</span>
    </button>
  );

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 glass rounded-[28px] px-4 py-2 flex items-center gap-2 shadow-[0_12px_36px_-8px_rgba(233,30,99,0.25)]">
      {btn("payment", "💳", "Pay")}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-[0_8px_24px_-4px_rgba(233,30,99,0.5)] hover:scale-110 hover:-translate-y-1 transition-all"
        style={{ background: "linear-gradient(135deg, #f5a1ad 0%, #e88aab 100%)" }} aria-label="Home">
        🏠
      </button>
      {btn("about", "ℹ️", "Info")}
    </nav>
  );
}

function ModalShell({ children, onClose }: any) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onEsc); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-up" style={{ animationDuration: "0.25s" }}>
      <div className="w-full sm:max-w-[480px] sm:mb-6 bg-white rounded-t-[28px] sm:rounded-[28px] border border-[#f0d5dc] shadow-[0_-8px_40px_rgba(233,30,99,0.15)] max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

function PaymentModal({ methods, onClose, onCopy }: any) {
  const enabled = methods.filter((m: any) => m.enabled);
  return (
    <ModalShell onClose={onClose}>
      <div className="p-7 pb-10 relative">
        <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#f8e1e7] hover:bg-[#f5a1ad] hover:text-white text-[#8b6b73] flex items-center justify-center">✕</button>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-[#fadadd]/50 border border-[#f5a1ad]/30">💳</div>
        <h2 className="font-display text-2xl font-bold text-[#2d2029]">Payment Information</h2>
        <p className="text-sm text-[#8b6b73] mt-1.5 mb-6 leading-relaxed">Accepted payment methods for your order</p>
        <div className="space-y-3">
          {enabled.map((m: any) => (
            <button key={m.id}
              onClick={() => m.account_number && onCopy(m.account_number, m.name)}
              disabled={!m.account_number}
              className="w-full flex items-center justify-between gap-3 bg-[#fef5f7] hover:bg-[#ddf8f8]/40 border border-transparent hover:border-[#f5a1ad]/30 rounded-2xl p-4 transition-all text-left disabled:hover:bg-[#fef5f7]">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{m.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-[#2d2029]">{m.name}</div>
                  <div className="text-xs text-[#8b6b73]">
                    {m.account_name}{m.account_number && `: ${m.account_number}`}
                  </div>
                </div>
              </div>
              {m.account_number && <span className="text-[#e88aab] text-lg">📋</span>}
            </button>
          ))}
        </div>
      </div>
    </ModalShell>
  );
}

function AboutModal({ settings, onClose }: any) {
  const s = settings ?? {};
  const phoneClean = (s.whatsapp || s.phone || "").replace(/[^\d]/g, "");
  const socials = [
    { key: "facebook_url", label: "Facebook", icon: "📘" },
    { key: "instagram_url", label: "Instagram", icon: "📸" },
    { key: "tiktok_url", label: "TikTok", icon: "🎵" },
    { key: "telegram_url", label: "Telegram", icon: "✈️" },
  ].filter((sc) => s[sc.key]);

  return (
    <ModalShell onClose={onClose}>
      <div className="p-7 pb-10 relative">
        <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#f8e1e7] hover:bg-[#f5a1ad] hover:text-white text-[#8b6b73] flex items-center justify-center">✕</button>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-[#ddf8f8] border border-[#a0dcdc]/40">🌸</div>
        <h2 className="font-display text-2xl font-bold text-[#2d2029]">About {s.shop_name ?? "Selam"}</h2>
        <p className="text-sm text-[#8b6b73] mt-1.5 mb-6 leading-relaxed">{s.about_text}</p>
        <div className="space-y-3">
          {s.address && <Row icon="📍" text={s.address} />}
          {s.phone && <Row icon="📞" text={s.phone} href={`tel:${s.phone}`} />}
          {s.email && <Row icon="✉️" text={s.email} href={`mailto:${s.email}`} />}
          {s.working_hours && <Row icon="🕐" text={s.working_hours} />}
          {phoneClean && <Row icon="💬" text={`WhatsApp — ${s.whatsapp ?? s.phone}`} href={`https://wa.me/${phoneClean}`} />}
          {socials.map((sc) => <Row key={sc.key} icon={sc.icon} text={sc.label} href={s[sc.key]} />)}
        </div>
        {s.maps_url && (
          <div className="mt-5 rounded-2xl overflow-hidden h-48 border border-[#f0d5dc]">
            <iframe title="Location" src={s.maps_url} width="100%" height="100%" style={{ border: 0 }} loading="lazy" />
          </div>
        )}
      </div>
    </ModalShell>
  );
}

function Row({ icon, text, href }: { icon: string; text: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-3 bg-[#fef5f7] hover:bg-[#ddf8f8]/40 rounded-2xl p-4 transition-colors">
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium text-[#2d2029] truncate">{text}</span>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer" className="block">{inner}</a> : <div>{inner}</div>;
}

function ItemModal({ item, onClose, onOrder }: { item: Product; onClose: () => void; onOrder: () => void }) {
  const url = imageUrl(item.image_url) ?? cakeFallback;
  return (
    <ModalShell onClose={onClose}>
      <div className="relative">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm">✕</button>
        <img src={url} alt={item.name} className="w-full h-64 object-cover" />
        <div className="p-7 pb-10">
          <h2 className="font-display text-2xl font-bold text-[#2d2029]">
            <span className="mr-1">{item.emoji}</span>{item.name}
          </h2>
          <p className="text-[15px] text-[#8b6b73] mt-2.5 mb-5 leading-relaxed">{item.description}</p>
          <div className="flex items-center justify-between gap-4">
            <div className="font-display text-3xl font-extrabold" style={{ color: "#e88aab" }}>
              {item.price} <span className="text-base font-bold text-[#8b6b73]">Birr</span>
            </div>
            <button onClick={onOrder} className="btn-primary text-sm">Order Now</button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function Toast({ msg }: { msg: string | null }) {
  return (
    <div className={`fixed bottom-28 left-1/2 -translate-x-1/2 z-[300] px-6 py-3 rounded-full text-white font-bold text-sm flex items-center gap-2 shadow-[0_12px_28px_-6px_rgba(233,30,99,0.5)] transition-all duration-300 ${
      msg ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
    }`} style={{ background: "linear-gradient(135deg, #f5a1ad 0%, #e88aab 100%)" }}>
      <span>✓</span><span>{msg}</span>
    </div>
  );
}
