import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAdminAuth, adminAuth } from "@/lib/admin-auth";
import { toast } from "sonner";
import {
  LineChart, Line, BarChart, Bar, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Users, Store, Package, DollarSign, ShieldCheck, MoreHorizontal, Lock } from "lucide-react";
import { formatPrice } from "@/lib/cart-store";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — LumièreStore" }] }),
  component: AdminPage,
});

const platformRevenue = Array.from({ length: 30 }).map((_, i) => ({
  d: `${i + 1}`,
  gmv: 12000 + Math.round(Math.sin(i / 3) * 3500 + i * 280 + Math.random() * 1500),
  fee: 1200 + Math.round(Math.sin(i / 3) * 350 + i * 28 + Math.random() * 150),
}));

const topVendors = [
  { name: "Sonix Audio", sales: 84200, growth: 24 },
  { name: "Maison Côte", sales: 62300, growth: 18 },
  { name: "Wanderlight", sales: 51400, growth: -4 },
  { name: "Lumen Watches", sales: 47800, growth: 12 },
  { name: "Brewlab", sales: 38200, growth: 31 },
];

function AdminPage() {
  const { adminUnlocked } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (adminAuth.unlockAdmin(password)) {
        toast.success("Accès administrateur déverrouillé");
        setPassword("");
      } else {
        toast.error("Mot de passe incorrect");
      }
      setLoading(false);
    }, 500);
  };

  if (!adminUnlocked) {
    return (
      <div className="container mx-auto flex flex-col items-center px-4 py-20">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-lg">
          <div className="mb-8 text-center">
            <Lock className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h1 className="text-2xl font-bold">Espace Admin Verrouillé</h1>
            <p className="mt-2 text-sm text-muted-foreground">Saisissez le mot de passe pour accéder à l'administration</p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Mot de passe</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-primary shadow-glow" disabled={loading}>
              {loading ? "Vérification..." : "Déverrouiller"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Badge variant="secondary"><ShieldCheck className="mr-1 h-3 w-3" /> Administration</Badge>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Vue d'ensemble plateforme</h1>
        </div>
        <Button variant="outline">Exporter le rapport</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Volume d'affaires (GMV)" value={formatPrice(1248300)} sub="+22% ce mois" icon={DollarSign} />
        <KpiCard label="Vendeurs actifs" value="3 248" sub="+128 nouveaux" icon={Store} />
        <KpiCard label="Clients" value="84 210" sub="+12.4% ce mois" icon={Users} />
        <KpiCard label="Produits listés" value="12 489" sub="+340 cette semaine" icon={Package} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>GMV & commissions plateforme — 30 jours</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={platformRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="gmv" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="fee" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Top vendeurs</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {topVendors.map((v, i) => (
              <div key={v.name} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{formatPrice(v.sales)}</p>
                </div>
                <Badge className={v.growth >= 0 ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
                  {v.growth >= 0 ? "+" : ""}{v.growth}%
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Acquisition utilisateurs — par canal</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={[
              { c: "Organique", v: 4200 }, { c: "Paid Ads", v: 2800 }, { c: "Social", v: 3500 },
              { c: "Email", v: 1900 }, { c: "Affiliés", v: 1200 }, { c: "Direct", v: 2400 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="c" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Bar dataKey="v" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader><CardTitle>Demandes de validation vendeurs</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendeur</TableHead>
                <TableHead className="hidden md:table-cell">Catégorie</TableHead>
                <TableHead className="hidden sm:table-cell">Pays</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { n: "Atelier Lumen", c: "Bijoux", p: "France", s: "En attente" },
                { n: "Forge Nord", c: "Mode", p: "Suède", s: "En attente" },
                { n: "Studio Rive", c: "Maison", p: "Italie", s: "Vérification KYC" },
                { n: "Pixel Lab", c: "Électronique", p: "Allemagne", s: "Approuvé" },
              ].map((v) => (
                <TableRow key={v.n}>
                  <TableCell className="font-medium">{v.n}</TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">{v.c}</TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">{v.p}</TableCell>
                  <TableCell>
                    <Badge variant={v.s === "Approuvé" ? "default" : "secondary"} className={v.s === "Approuvé" ? "bg-success text-success-foreground" : ""}>
                      {v.s}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function KpiCard({ label, value, sub, icon: Icon }:
  { label: string; value: string; sub: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <Card className="hover-lift">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-3 text-2xl font-bold">{value}</p>
        <p className="mt-1 text-xs text-success">{sub}</p>
      </CardContent>
    </Card>
  );
}
