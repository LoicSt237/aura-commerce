import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth-store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Connexion — LumièreStore" },
      { name: "description", content: "Connectez-vous à votre compte LumièreStore." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    window.setTimeout(() => {
      setLoading(false);
      auth.login(email);
      setMessage("Connexion simulée réussie !");
      navigate({ to: "/" });
    }, 800);
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-8 space-y-2 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Bienvenue</p>
          <h1 className="text-3xl font-bold">Connexion</h1>
          <p className="text-sm text-muted-foreground">Saisissez vos informations pour accéder à votre compte.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Adresse e-mail</label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nom@exemple.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Mot de passe</label>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>

          {message && (
            <p className="rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
              {message}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link to="/products" className="text-primary hover:underline">
            Voir la boutique
          </Link>
        </p>
      </div>
    </main>
  );
}