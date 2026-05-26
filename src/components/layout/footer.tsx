import { Link } from "@tanstack/react-router";
import { Sparkles, Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-gradient-subtle">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg">Lumière<span className="text-gradient">Store</span></span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Une marketplace moderne pour des produits exceptionnels, livrés par des vendeurs passionnés.
          </p>
          <div className="mt-4 flex gap-2 text-muted-foreground">
            <a className="rounded-md p-2 hover:bg-accent hover:text-foreground"><Twitter className="h-4 w-4" /></a>
            <a className="rounded-md p-2 hover:bg-accent hover:text-foreground"><Instagram className="h-4 w-4" /></a>
            <a className="rounded-md p-2 hover:bg-accent hover:text-foreground"><Github className="h-4 w-4" /></a>
          </div>
        </div>
        {[
          { title: "Boutique", links: [["Tous les produits", "/products"], ["Nouveautés", "/products"], ["Promotions", "/products"]] },
          { title: "Vendeurs", links: [["Devenir vendeur", "/vendor"], ["Tableau de bord", "/vendor"], ["Commissions", "/vendor"]] },
          { title: "Support", links: [["Centre d'aide", "/"], ["Livraison & retours", "/"], ["Contact", "/"]] },
        ].map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold">{c.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {c.links.map(([label, to]) => (
                <li key={label}><Link to={to} className="hover:text-foreground">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 LumièreStore. Tous droits réservés.</p>
          <p>Conçu avec passion · Paiements sécurisés · Livraison mondiale</p>
        </div>
      </div>
    </footer>
  );
}
