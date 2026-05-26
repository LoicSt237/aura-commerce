import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { products, categories } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LumièreStore — Marketplace premium" },
      { name: "description", content: "Découvrez des produits triés sur le volet, livrés rapidement par des vendeurs passionnés." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 8);
  const trending = products.slice(4, 12);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white_0%,transparent_50%)] opacity-20" />
        <div className="container relative mx-auto grid gap-8 px-4 py-20 md:grid-cols-2 md:py-28 lg:py-32">
          <div className="flex flex-col justify-center text-primary-foreground">
            <Badge className="w-fit border-white/30 bg-white/10 text-white backdrop-blur">
              <Sparkles className="mr-1 h-3 w-3" /> Nouvelle collection 2026
            </Badge>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Des produits qui<br /><span className="italic">illuminent</span> votre quotidien.
            </h1>
            <p className="mt-5 max-w-md text-base text-white/80 md:text-lg">
              Marketplace premium réunissant les meilleures marques et créateurs indépendants du monde entier.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/products">Explorer la boutique <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/vendor">Devenir vendeur</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/80">
              <div><p className="text-2xl font-bold text-white">12k+</p>Produits</div>
              <div><p className="text-2xl font-bold text-white">3.2k</p>Vendeurs vérifiés</div>
              <div><p className="text-2xl font-bold text-white">98%</p>Clients satisfaits</div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -right-10 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 4).map((p, i) => (
                <div key={p.id} className={`overflow-hidden rounded-2xl bg-white/10 p-2 backdrop-blur ${i % 2 ? "translate-y-8" : ""} animate-float`} style={{ animationDelay: `${i * 0.3}s` }}>
                  <img src={p.image} alt={p.name} className="aspect-square w-full rounded-xl object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto grid gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Truck, t: "Livraison gratuite", d: "Dès 100€ d'achat dans le monde entier" },
          { icon: ShieldCheck, t: "Paiement sécurisé", d: "Chiffrement bancaire SSL 256-bit" },
          { icon: RefreshCw, t: "Retours 30 jours", d: "Satisfait ou remboursé, sans condition" },
          { icon: Sparkles, t: "Sélection premium", d: "Produits validés par nos experts" },
        ].map((f) => (
          <div key={f.t} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 hover-lift">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <f.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">{f.t}</p>
              <p className="text-sm text-muted-foreground">{f.d}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Explorer par catégorie</h2>
            <p className="mt-1 text-sm text-muted-foreground">Trouvez exactement ce dont vous avez besoin.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.slug} to="/products"
              className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-5 text-center hover-lift">
              <span className="text-3xl transition-transform group-hover:scale-110">{c.icon}</span>
              <span className="text-sm font-medium">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container mx-auto px-4 py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <Badge variant="secondary" className="mb-2"><TrendingUp className="mr-1 h-3 w-3" /> Tendance</Badge>
            <h2 className="text-2xl font-bold md:text-3xl">Sélection de la semaine</h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/products">Voir tout <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Editorial banner */}
      <section className="container mx-auto px-4 py-10">
        <div className="overflow-hidden rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-elegant md:p-14">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div>
              <Badge className="border-white/30 bg-white/10 text-white">Édition limitée</Badge>
              <h3 className="mt-3 text-3xl font-bold md:text-4xl">-30% sur la collection automne</h3>
              <p className="mt-3 max-w-md text-white/85">Code <span className="font-mono font-bold">AUTUMN30</span> à l'achat. Offre valable jusqu'à dimanche.</p>
              <Button asChild size="lg" className="mt-6 bg-white text-primary hover:bg-white/90">
                <Link to="/products">Profiter de l'offre</Link>
              </Button>
            </div>
            <div className="hidden grid-cols-2 gap-3 md:grid">
              {trending.slice(0, 4).map((p) => (
                <img key={p.id} src={p.image} alt="" className="aspect-square w-full rounded-2xl object-cover shadow-glow" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Découvert récemment</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
