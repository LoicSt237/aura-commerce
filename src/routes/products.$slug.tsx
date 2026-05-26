import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, products } from "@/lib/products";
import { cart, formatPrice } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Truck, ShieldCheck, RefreshCw, Minus, Plus, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — LumièreStore` },
      { name: "description", content: loaderData.product.description },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Produit introuvable</h1>
      <Link to="/products" className="mt-4 inline-block text-primary underline">Retour à la boutique</Link>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Accueil</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/products" className="hover:text-foreground">Boutique</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-border bg-card hover:border-primary cursor-pointer">
                <img src={product.image} alt="" className="aspect-square w-full object-cover opacity-90" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.brand}</p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-warning text-warning" : "text-muted-foreground/40"}`} />
              ))}
            </div>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews} avis)</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <p className="text-4xl font-bold">{formatPrice(product.price)}</p>
            {product.oldPrice && (
              <>
                <p className="text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>
                <Badge className="bg-destructive text-destructive-foreground">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</Badge>
              </>
            )}
          </div>

          <p className="mt-5 text-muted-foreground">{product.description}</p>

          <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
            {product.features.map((f: string) => (
              <li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {f}</li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-border">
              <Button variant="ghost" size="icon" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <Button variant="ghost" size="icon" onClick={() => setQty(qty + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
            <Button size="lg" className="flex-1 bg-gradient-primary shadow-glow"
              onClick={() => { cart.add(product, qty); toast.success(`${qty}× ${product.name} ajouté(s) au panier`); }}>
              Ajouter au panier · {formatPrice(product.price * qty)}
            </Button>
            <Button size="lg" variant="outline" onClick={() => cart.toggleWishlist(product.id)}>
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-card p-5 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-2"><Truck className="h-5 w-5 text-primary" /> Livraison 2-3 jours</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Paiement sécurisé</div>
            <div className="flex items-center gap-2"><RefreshCw className="h-5 w-5 text-primary" /> Retour 30 jours</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
