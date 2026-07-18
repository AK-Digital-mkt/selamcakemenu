// Shared client-side data helpers that read from Lovable Cloud via RLS.
import { supabase } from "@/integrations/supabase/client";

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  sort_order: number;
  visible: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string | null;
  image_url: string | null;
  image_display_url?: string | null;
  gallery: string[];
  emoji: string;
  available: boolean;
  featured: boolean;
  sort_order: number;
};


export type PaymentMethod = {
  id: string;
  name: string;
  type: "bank" | "mobile" | "cash";
  account_name: string;
  account_number: string;
  icon: string;
  qr_url: string | null;
  enabled: boolean;
  sort_order: number;
};

export type SiteSettings = {
  id: string;
  shop_name: string;
  tagline: string;
  about_text: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string | null;
  hero_display_url?: string | null;
  logo_url: string | null;

  address: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  working_hours: string | null;
  maps_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  telegram_url: string | null;
  primary_color: string | null;
  accent_color: string | null;
};

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function fetchPaymentMethods(): Promise<PaymentMethod[]> {
  const { data, error } = await supabase
    .from("payment_methods")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as PaymentMethod[];
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data as SiteSettings | null;
}

export function imageUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("product-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  return path;
}

export async function isAdmin(): Promise<boolean> {
  const { data: userRes } = await supabase.auth.getUser();
  if (!userRes.user) return false;
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userRes.user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (error) return false;
  return !!data;
}
