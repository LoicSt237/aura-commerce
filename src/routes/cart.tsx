import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart, cart, cartTotals, formatPrice } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Panier — LumièreStore" }] }),
  component: CartPage,
});

function CartPage() {
  const state = useCart();
  const totals = cartTotals(state.items);

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center px-4 py-20 text-center animate-fade-in">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
          <ShoppingBag className="h-10 w-10 text-accent-foreground" />
        </div>
        <h1 className="mt-6 text-3xl font-bold">Votre panier est vide</h1>
        <p className="mt-2 text-muted-foreground">Découvrez nos produits sélectionnés avec soin.</p>
        <Button asChild size="lg" className="mt-6 bg-gradient-primary shadow-glow">
          <Link to="/products">Explorer la boutique</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="mb-6 text-3xl font-bold md:text-4xl">Mon panier</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-3">
          {state.items.map((item) => (
            <div key={item.product.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
              <img src={item.product.image} alt={item.product.name} className="h-24 w-24 flex-none rounded-xl object-cover" />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.product.brand}</p>
                    <Link to="/products/$slug" params={{ slug: item.product.slug }} className="font-semibold hover:text-primary">
                      {item.product.name}
                    </Link>
                  </div>
                  <p className="font-bold">{formatPrice(item.product.price * item.qty)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-xl border border-border">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => cart.setQty(item.product.id, item.qty - 1)}><Minus className="h-3 w-3" /></Button>
                    <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => cart.setQty(item.product.id, item.qty + 1)}><Plus className="h-3 w-3" /></Button>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => cart.remove(item.product.id)}>
                    <Trash2 className="h-4 w-4" /> Retirer
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Récapitulatif</h2>
          <Separator className="my-4" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt>Sous-total</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Livraison</dt><dd>{totals.shipping === 0 ? "Offerte" : formatPrice(totals.shipping)}</dd></div>
            <div className="flex justify-between text-muted-foreground"><dt>TVA (20%)</dt><dd>{formatPrice(totals.tax)}</dd></div>
          </dl>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="text-sm">Total</span>
            <span className="text-2xl font-bold">{formatPrice(totals.total)}</span>
          </div>
          <Button asChild size="lg" className="mt-5 w-full bg-gradient-primary shadow-glow">
            <Link to="/checkout">Passer commande <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Livraison offerte dès 100€</p>
        </aside>
      </div>
    </div>
  );
}
