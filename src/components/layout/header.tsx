import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingCart, Heart, User, Menu, Sparkles } from "lucide-react";
import { useState } from "react";
import { useCart, cartTotals } from "@/lib/cart-store";
import { useAuth, auth } from "@/lib/auth-store";
import { categories } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet, SheetContent, SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const authState = useAuth();
  const state = useCart();
  const { count } = cartTotals(state.items);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate({ to: "/products", search: { q: search, category: "" } });
      setSearch("");
    }
  };

  const nav = [
    { to: "/", label: "Accueil" },
    { to: "/products", label: "Boutique" },
    { to: "/vendor", label: "Espace vendeur" },
    { to: "/admin", label: "Admin" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="mt-8 flex flex-col gap-1">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
                  {n.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-border" />
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Catégories</p>
              {categories.map((c) => (
                <Link key={c.slug} to="/products" search={{ category: c.slug, q: "" }} onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm hover:bg-accent">
                  <span className="mr-2">{c.icon}</span>{c.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2 font-bold">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden text-lg sm:inline">Lumière<span className="text-gradient">Store</span></span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link key={n.to} to={n.to}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${active ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}>
                {n.label}
                {active && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded bg-gradient-primary" />}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit, une marque…"
              className="h-9 w-64 pl-9 lg:w-80"
            />
          </form>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={handleSearch}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/fav">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full bg-gradient-primary p-0 text-[10px] text-primary-foreground">
                  {count}
                </Badge>
              )}
            </Link>
          </Button>
          {authState.loggedIn ? (
            <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={() => auth.logout()}>
              <User className="h-4 w-4" /> Déconnexion
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
              <Link to="/login">
                <User className="h-4 w-4" /> Connexion
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
