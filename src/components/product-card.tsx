import { Link } from "@tanstack/react-router";
import { Heart, Star, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/products";
import { cart, useCart, formatPrice } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const badgeMap = {
  new: { label: "Nouveau", className: "bg-success text-success-foreground" },
  sale: { label: "Promo", className: "bg-destructive text-destructive-foreground" },
  hot: { label: "Top", className: "bg-warning text-warning-foreground" },
};

export function ProductCard({ product }: { product: Product }) {
  const state = useCart();
  const isWishlisted = state.wishlist.includes(product.id);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card hover-lift">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {product.badge && (
              <Badge className={badgeMap[product.badge].className}>{badgeMap[product.badge].label}</Badge>
            )}
            {discount > 0 && (
              <Badge variant="secondary" className="bg-foreground/90 text-background">-{discount}%</Badge>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); cart.toggleWishlist(product.id); toast.success(isWishlisted ? "Retiré des favoris" : "Ajouté aux favoris"); }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background">
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-destructive text-destructive" : ""}`} />
          </button>
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.brand}</p>
        <Link to="/products/$slug" params={{ slug: product.slug }}>
          <h3 className="mt-1 line-clamp-1 font-semibold transition-colors group-hover:text-primary">{product.name}</h3>
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-lg font-bold">{formatPrice(product.price)}</p>
            {product.oldPrice && (
              <p className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>
            )}
          </div>
          <Button size="icon" className="h-9 w-9 rounded-full bg-gradient-primary shadow-glow"
            onClick={(e) => {
              e.preventDefault();
              cart.add(product);
              toast.success(`${product.name} ajouté au panier`);
            }}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
