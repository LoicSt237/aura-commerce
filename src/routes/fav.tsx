import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart, cart } from "@/lib/cart-store";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Heart, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/fav")({
  head: () => ({
    meta: [
      { title: "Mes favoris — LumièreStore" },
      { name: "description", content: "Retrouvez tous les produits que vous avez ajoutés à votre liste de souhaits." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const state = useCart();
  const wishlistProducts = products.filter((p) => state.wishlist.includes(p.id));

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link to="/products"><ArrowLeft className="h-4 w-4" /> Retour</Link>
        </Button>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 fill-destructive text-destructive" />
          <h1 className="text-4xl font-bold">Mes favoris</h1>
        </div>
        <p className="mt-2 text-muted-foreground">{wishlistProducts.length} produit(s) dans votre liste</p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Aucun favoris pour le moment</h2>
          <p className="mt-2 text-muted-foreground">Commencez à ajouter vos produits préférés à votre liste de souhaits.</p>
          <Button asChild className="mt-6">
            <Link to="/products">Parcourir les produits</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {wishlistProducts.map((p) => (
            <div key={p.id} className="relative">
              <ProductCard product={p} />
              <button
                onClick={() => cart.toggleWishlist(p.id)}
                className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background"
              >
                <Heart className="h-4 w-4 fill-destructive text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}