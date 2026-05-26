import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCart, cart, cartTotals, formatPrice } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Truck, Lock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Paiement — LumièreStore" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const state = useCart();
  const totals = cartTotals(state.items);
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="container mx-auto flex flex-col items-center px-4 py-20 text-center animate-fade-in">
        <CheckCircle2 className="h-20 w-20 text-success" />
        <h1 className="mt-6 text-3xl font-bold">Commande confirmée !</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          Merci pour votre achat. Vous recevrez un e-mail de confirmation avec le suivi de votre commande.
        </p>
        <Button className="mt-6 bg-gradient-primary shadow-glow" onClick={() => navigate({ to: "/products" })}>
          Continuer mes achats
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="mb-6 text-3xl font-bold md:text-4xl">Finaliser la commande</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cart.clear();
          setDone(true);
          toast.success("Paiement accepté");
        }}
        className="grid gap-6 lg:grid-cols-[1fr_400px]"
      >
        <div className="space-y-6">
          <Section icon={<Truck className="h-4 w-4" />} title="Adresse de livraison">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field id="firstName" label="Prénom" required />
              <Field id="lastName" label="Nom" required />
              <Field id="email" label="Email" type="email" className="sm:col-span-2" required />
              <Field id="address" label="Adresse" className="sm:col-span-2" required />
              <Field id="city" label="Ville" required />
              <Field id="zip" label="Code postal" required />
            </div>
          </Section>

          <Section icon={<CreditCard className="h-4 w-4" />} title="Mode de paiement">
            <RadioGroup defaultValue="card" className="grid gap-3 sm:grid-cols-3">
              {[["card", "Carte bancaire"], ["paypal", "PayPal"], ["apple", "Apple Pay"]].map(([v, l]) => (
                <label key={v} className="flex cursor-pointer items-center gap-2 rounded-xl border border-border p-3 hover:bg-accent">
                  <RadioGroupItem value={v} /> <span className="text-sm font-medium">{l}</span>
                </label>
              ))}
            </RadioGroup>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field id="card" label="Numéro de carte" placeholder="4242 4242 4242 4242" className="sm:col-span-2" />
              <Field id="exp" label="Expiration" placeholder="MM/AA" />
              <Field id="cvc" label="CVC" placeholder="123" />
            </div>
          </Section>
        </div>

        <aside className="h-fit space-y-3 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Votre commande</h2>
          <Separator />
          <ul className="space-y-2 text-sm">
            {state.items.map((i) => (
              <li key={i.product.id} className="flex justify-between gap-2">
                <span className="line-clamp-1">{i.qty}× {i.product.name}</span>
                <span className="flex-none font-medium">{formatPrice(i.product.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <Separator />
          <dl className="space-y-1 text-sm">
            <Row k="Sous-total" v={formatPrice(totals.subtotal)} />
            <Row k="Livraison" v={totals.shipping === 0 ? "Offerte" : formatPrice(totals.shipping)} />
            <Row k="TVA" v={formatPrice(totals.tax)} muted />
          </dl>
          <Separator />
          <div className="flex justify-between text-lg font-bold"><span>Total</span><span>{formatPrice(totals.total)}</span></div>
          <Button type="submit" size="lg" className="w-full bg-gradient-primary shadow-glow" disabled={state.items.length === 0}>
            <Lock className="h-4 w-4" /> Payer {formatPrice(totals.total)}
          </Button>
          <p className="text-center text-xs text-muted-foreground">Transaction sécurisée par SSL</p>
        </aside>
      </form>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-foreground">{icon}</div>
        <h2 className="font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({ id, label, className = "", ...rest }: { id: string; label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-1.5 block text-xs">{label}</Label>
      <Input id={id} {...rest} />
    </div>
  );
}

function Row({ k, v, muted }: { k: string; v: string; muted?: boolean }) {
  return <div className={`flex justify-between ${muted ? "text-muted-foreground" : ""}`}><dt>{k}</dt><dd>{v}</dd></div>;
}
