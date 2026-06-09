import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect  } from "react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
const FILTERS_STORAGE_KEY = "products-filters";
const defaultPrice = [0, 100000];

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Boutique — LumièreStore" },
      { name: "description", content: "Parcourez tous nos produits triés sur le volet." },
    ],
  }),
  component: ProductsPage,
  validateSearch: (search) => ({
    q: (search.q as string) || "",
    category: (search.category as string) || "",
  }),
});
function getSavedFilters() {
  if (typeof window === "undefined") return {
    cats: [],
    price: defaultPrice,
    sort: "featured",
  };

  try {
    const saved = localStorage.getItem(FILTERS_STORAGE_KEY);
    if (!saved) return {
      cats: [],
      price: defaultPrice,
      sort: "featured",
    };
    return JSON.parse(saved) as { cats: string[]; price: number[]; sort: string };
  } catch {
    return {
      cats: [],
      price: defaultPrice,
      sort: "featured",
    };
  }
}
function ProductsPage() {
const { q, category } = Route.useSearch();
const [cats, setCats] = useState<string[]>(() => category ? [category] : getSavedFilters().cats);
const [price, setPrice] = useState<number[]>(() => getSavedFilters().price);
const [sort, setSort] = useState(() => getSavedFilters().sort);
const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => {
  localStorage.setItem(
    FILTERS_STORAGE_KEY,
    JSON.stringify({ cats, price, sort }),
  );
}, [cats, price, sort]);
  const filtered = products
    .filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase()))
    .filter((p) => (cats.length ? cats.includes(p.category) : true))
    .filter((p) => p.price >= price[0] && p.price <= price[1])
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  const toggleCat = (slug: string) =>
    setCats((prev) => prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]);

  const FilterPanel = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold">Catégories</h3>
        <div className="space-y-2">
          {categories.map((c) => (
            <label key={c.slug} className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox checked={cats.includes(c.slug)} onCheckedChange={() => toggleCat(c.slug)} />
              <span>{c.icon} {c.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold">Prix · {price[0]} fcfa– {price[1]}fcfa</h3>
        <Slider value={price} onValueChange={setPrice} min={0} max={100000} step={100} />
      </div>
      <Button variant="outline" className="w-full" onClick={() => { setCats([]); setPrice(defaultPrice);setSort("featured"); }}>
        Réinitialiser
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-bold md:text-4xl">Boutique</h1>
        <p className="text-sm text-muted-foreground">{filtered.length} produits</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden rounded-2xl border border-border bg-card p-5 lg:block">
          {FilterPanel}
        </aside>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setFiltersOpen((o) => !o)}>
              <SlidersHorizontal className="h-4 w-4" /> Filtres
            </Button>
            <div className="ml-auto flex items-center gap-2">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Recommandés</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="rating">Mieux notés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {cats.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {cats.map((c) => (
                <Badge key={c} variant="secondary" className="cursor-pointer" onClick={() => toggleCat(c)}>
                  {categories.find((x) => x.slug === c)?.name} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}

          {filtersOpen && (
            <div className="mb-4 rounded-2xl border border-border bg-card p-5 lg:hidden">{FilterPanel}</div>
          )}

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              Aucun produit ne correspond à vos filtres.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
