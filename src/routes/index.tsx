import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroCake from "@/assets/hero-cake.jpg";
import cakeStrawberry from "@/assets/cake-strawberry.jpg";
import cakeVanilla from "@/assets/cake-vanilla.jpg";
import cakeMint from "@/assets/cake-mint.jpg";
import cakeCupcake from "@/assets/cake-cupcake.jpg";
import cakeChocolate from "@/assets/cake-chocolate.jpg";
import cakeCheesecake from "@/assets/cake-cheesecake.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const cakes = [
  { name: "Rose Strawberry Dream", price: "1,200 ETB", tag: "Best Seller", img: cakeStrawberry },
  { name: "Vanilla Bloom", price: "1,800 ETB", tag: "Signature", img: cakeVanilla },
  { name: "Mint Pearl Tower", price: "2,400 ETB", tag: "New", img: cakeMint },
  { name: "Blush Rose Cupcake", price: "150 ETB", tag: "Popular", img: cakeCupcake },
  { name: "Pink Drip Chocolate", price: "1,500 ETB", tag: "Bestseller", img: cakeChocolate },
  { name: "Berry Cheesecake", price: "950 ETB", tag: "New", img: cakeCheesecake },
];

const categories = [
  { name: "Wedding Cakes", icon: "💍" },
  { name: "Birthday Cakes", icon: "🎂" },
  { name: "Cupcakes", icon: "🧁" },
  { name: "Cheesecakes", icon: "🍰" },
  { name: "Macarons", icon: "🍬" },
  { name: "Custom Orders", icon: "✨" },
];

const testimonials = [
  { name: "Hanan A.", text: "Absolutely stunning cakes! The flavors are as beautiful as the design. Selam made my wedding unforgettable.", rating: 5 },
  { name: "Michael T.", text: "The most elegant boutique bakery in town. Every bite feels like a celebration.", rating: 5 },
  { name: "Sara K.", text: "Ordered a custom birthday cake — it exceeded all expectations. Pure artistry.", rating: 5 },
];

const features = [
  { title: "Handcrafted Daily", desc: "Every cake is made fresh by our master pâtissiers.", icon: "🌸" },
  { title: "Premium Ingredients", desc: "Only the finest butter, chocolate and seasonal fruit.", icon: "✨" },
  { title: "Custom Designs", desc: "Bespoke creations tailored to your special moments.", icon: "🎨" },
  { title: "On-Time Delivery", desc: "Fresh from oven to your doorstep, on the dot.", icon: "🚚" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Nav />
      <Hero />
      <Categories />
      <FeaturedCakes />
      <WhyUs />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-3xl">🌸</span>
          <span className="font-display text-2xl font-semibold tracking-tight">Selam</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Home", "Cakes", "Categories", "About", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="relative hover:text-[var(--blush-deep)] transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[var(--blush-deep)] after:transition-all hover:after:w-full">{l}</a>
          ))}
        </nav>
        <a href="#cakes" className="hidden md:inline-flex btn-primary text-sm">Order Now</a>
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-white/95 backdrop-blur">
          <div className="px-6 py-4 flex flex-col gap-3">
            {["Home", "Cakes", "Categories", "About", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="py-1">{l}</a>
            ))}
            <a href="#cakes" onClick={() => setOpen(false)} className="btn-primary text-sm text-center">Order Now</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#fadadd] opacity-40 blur-3xl" />
      <div className="absolute top-40 -right-20 w-96 h-96 rounded-full bg-[#ddf8f8] opacity-50 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[var(--blush-deep)] animate-pulse" />
            Handcrafted in Adama, Ethiopia
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold leading-[1.05]">
            Sweetness,<br />
            <span className="italic font-normal bg-gradient-to-r from-[#e89aa3] to-[#8ac5c8] bg-clip-text text-transparent">delicately</span> made.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed">
            Boutique cakes, cupcakes and pastries — designed with love, baked with the finest ingredients, and finished by hand.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#cakes" className="btn-primary">Order Your Cake</a>
            <a href="#gallery" className="btn-secondary">View Gallery</a>
          </div>
          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="font-display text-3xl font-semibold">10+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Years</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="font-display text-3xl font-semibold">5k+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Happy Clients</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="font-display text-3xl font-semibold">100%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Handmade</div>
            </div>
          </div>
        </div>
        <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#fadadd] to-[#ddf8f8] blur-2xl opacity-60" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-[var(--shadow-elegant)] animate-float">
            <img src={heroCake} alt="Signature tiered cake" width={1024} height={1024} className="w-full h-auto" />
          </div>
          <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-[var(--shadow-soft)] hidden sm:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ddf8f8] flex items-center justify-center text-lg">⭐</div>
              <div>
                <div className="font-semibold text-sm">4.9 / 5.0</div>
                <div className="text-xs text-muted-foreground">2,300+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section id="categories" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--blush-deep)] font-medium">Explore</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold">Our Categories</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((c) => (
            <div key={c.name} className="group rounded-3xl bg-white border border-border p-6 text-center hover:shadow-[var(--shadow-soft)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl transition-colors group-hover:bg-[#ddf8f8]" style={{ background: "#fadadd66" }}>
                {c.icon}
              </div>
              <div className="mt-4 font-medium text-sm">{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCakes() {
  return (
    <section id="cakes" className="py-20 md:py-28" style={{ background: "var(--gradient-soft)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--blush-deep)] font-medium">Best Sellers</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold">Featured Cakes</h2>
          </div>
          <p className="max-w-sm text-muted-foreground">Our most-loved creations, freshly baked and beautifully finished by hand.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cakes.map((cake) => (
            <article key={cake.name} className="group rounded-3xl bg-white overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] hover:-translate-y-2 transition-all duration-500">
              <div className="relative aspect-square overflow-hidden">
                <img src={cake.img} alt={cake.name} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur">{cake.tag}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold">{cake.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#ddf8f8] text-sm font-semibold">{cake.price}</span>
                  <button className="btn-primary text-sm !py-2 !px-5">Order Now</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--blush-deep)] font-medium">Why Selam</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold">A slice of perfection</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300" style={{ background: "var(--gradient-blush)" }}>
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/40 blur-2xl group-hover:bg-[#ddf8f8]/60 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--gradient-mist)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--blush-deep)] font-medium">Kind Words</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold">Loved by our customers</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="rounded-3xl bg-white p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
              <div className="flex gap-1 text-[#f5c1c8]">{"★".repeat(t.rating)}</div>
              <p className="mt-4 text-foreground leading-relaxed italic">"{t.text}"</p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fadadd] to-[#ddf8f8] flex items-center justify-center font-semibold">{t.name[0]}</div>
                <cite className="not-italic font-medium text-sm">{t.name}</cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [cakeStrawberry, cakeVanilla, cakeMint, cakeCupcake, cakeChocolate, cakeCheesecake];
  return (
    <section id="gallery" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--blush-deep)] font-medium">@selamcakes</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold">From our kitchen</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {imgs.map((img, i) => (
            <a key={i} href="#" className="group relative aspect-square rounded-2xl overflow-hidden">
              <img src={img} alt="Selam cake" loading="lazy" width={512} height={512} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fadadd]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                <span className="text-white text-2xl">♡</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28" style={{ background: "var(--gradient-soft)" }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--blush-deep)] font-medium">Get in touch</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold">Order or say hello</h2>
          <p className="mt-4 text-muted-foreground max-w-md">Reach us for custom orders, event cakes or just to chat about your dream design.</p>
          <div className="mt-8 space-y-4">
            {[
              { icon: "📍", label: "Adama, Ethiopia" },
              { icon: "📞", label: "+251 921 109 307" },
              { icon: "✉️", label: "hello@selamcakes.et" },
              { icon: "🕐", label: "Mon–Sun · 8:00 – 21:00" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[var(--shadow-soft)]">
                <div className="w-12 h-12 rounded-xl bg-[#fadadd]/40 flex items-center justify-center text-xl">{item.icon}</div>
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <form className="rounded-3xl bg-white p-8 shadow-[var(--shadow-elegant)]">
          <h3 className="font-display text-2xl font-semibold">Custom Order</h3>
          <div className="mt-6 space-y-4">
            <input placeholder="Your name" className="w-full rounded-2xl border border-border bg-[#fef8f9] px-5 py-3.5 outline-none focus:border-[var(--blush-deep)] transition-colors" />
            <input placeholder="Phone or email" className="w-full rounded-2xl border border-border bg-[#fef8f9] px-5 py-3.5 outline-none focus:border-[var(--blush-deep)] transition-colors" />
            <input placeholder="Occasion (birthday, wedding…)" className="w-full rounded-2xl border border-border bg-[#fef8f9] px-5 py-3.5 outline-none focus:border-[var(--blush-deep)] transition-colors" />
            <textarea rows={4} placeholder="Tell us about your dream cake…" className="w-full rounded-2xl border border-border bg-[#fef8f9] px-5 py-3.5 outline-none focus:border-[var(--blush-deep)] transition-colors resize-none" />
            <button type="button" className="btn-primary w-full">Send Request</button>
          </div>
        </form>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-soft)] h-80">
          <iframe
            title="Selam Cake Shop location"
            src="https://www.google.com/maps?q=Adama,Ethiopia&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-14 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌸</span>
            <span className="font-display text-2xl font-semibold">Selam</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">Boutique cake atelier crafting elegant, handmade cakes for life's sweetest moments.</p>
          <div className="mt-6 flex gap-3">
            {["Instagram", "Facebook", "TikTok"].map(s => (
              <a key={s} href="#" className="w-10 h-10 rounded-full bg-[#fadadd]/40 hover:bg-[#ddf8f8] flex items-center justify-center text-sm transition-colors" aria-label={s}>{s[0]}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#cakes" className="hover:text-foreground">Cakes</a></li>
            <li><a href="#categories" className="hover:text-foreground">Categories</a></li>
            <li><a href="#gallery" className="hover:text-foreground">Gallery</a></li>
            <li><a href="#about" className="hover:text-foreground">About</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Payment</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>CBE Birr</li>
            <li>Awash Bank</li>
            <li>Telebirr</li>
            <li>Cash on delivery</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-border text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
        <span>© {new Date().getFullYear()} Selam Cake Shop. Baked with love.</span>
        <span>Adama, Ethiopia</span>
      </div>
    </footer>
  );
}
