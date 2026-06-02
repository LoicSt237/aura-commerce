import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAdminAuth, adminAuth } from "@/lib/admin-auth";
import { toast } from "sonner";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Package,
  ArrowUpRight, Plus, Lock,
} from "lucide-react";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/cart-store";

export const Route = createFileRoute("/vendor")({
  head: () => ({ meta: [{ title: "Espace vendeur — LumièreStore" }] }),
  component: VendorPage,
});

const revenueData = [
  { m: "Jan", revenue: 12400, orders: 142 },
  { m: "Fév", revenue: 15800, orders: 178 },
  { m: "Mar", revenue: 14200, orders: 165 },
  { m: "Avr", revenue: 19500, orders: 220 },
  { m: "Mai", revenue: 22100, orders: 248 },
  { m: "Juin", revenue: 28400, orders: 312 },
  { m: "Juil", revenue: 31200, orders: 348 },
  { m: "Août", revenue: 29800, orders: 326 },
  { m: "Sep", revenue: 34500, orders: 389 },
  { m: "Oct", revenue: 38200, orders: 424 },
  { m: "Nov", revenue: 42100, orders: 471 },
  { m: "Déc", revenue: 51800, orders: 562 },
];

const categoryData = [
  { name: "Électronique", value: 35 },
  { name: "Mode", value: 24 },
  { name: "Maison", value: 18 },
  { name: "Beauté", value: 13 },
  { name: "Sport", value: 10 },
];

const recentOrders = [
  { id: "#10428", customer: "Marie Laurent", product: "Aurora Headphones", total: 249, status: "Livré" },
  { id: "#10427", customer: "Thomas Petit", product: "Lumen Smart Watch", total: 399, status: "En cours" },
  { id: "#10426", customer: "Sophie Marchand", product: "Nova Running Shoes", total: 129, status: "Préparation" },
  { id: "#10425", customer: "Lucas Bernard", product: "Velvet Trench Coat", total: 289, status: "Livré" },
  { id: "#10424", customer: "Emma Dubois", product: "Atlas Leather Backpack", total: 219, status: "Annulé" },
];

const statusVariant: Record<string, string> = {
  "Livré": "bg-success text-success-foreground",
  "En cours": "bg-primary text-primary-foreground",
  "Préparation": "bg-warning text-warning-foreground",
  "Annulé": "bg-destructive text-destructive-foreground",
};

function VendorPage() {
  const { vendorUnlocked } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (adminAuth.unlockVendor(password)) {
        toast.success("Accès vendeur déverrouillé");
        setPassword("");
      } else {
        toast.error("Mot de passe incorrect");
      }
      setLoading(false);
    }, 500);
  };

  if (!vendorUnlocked) {
    return (
      <div className="container mx-auto flex flex-col items-center px-4 py-20">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-lg">
          <div className="mb-8 text-center">
            <Lock className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h1 className="text-2xl font-bold">Espace Vendeur Verrouillé</h1>
            <p className="mt-2 text-sm text-muted-foreground">Saisissez le mot de passe pour accéder au tableau de bord</p>
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
          <p className="text-sm text-muted-foreground">Bonjour Marie 👋</p>
          <h1 className="text-3xl font-bold md:text-4xl">Tableau de bord vendeur</h1>
        </div>
        <Button className="bg-gradient-primary shadow-glow"><Plus className="h-4 w-4" /> Ajouter un produit</Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Revenu mensuel" value={formatPrice(51800)} delta="+18.2%" icon={DollarSign} positive />
        <Kpi label="Commandes" value="562" delta="+12.4%" icon={ShoppingBag} positive />
        <Kpi label="Nouveaux clients" value="1 248" delta="+8.1%" icon={Users} positive />
        <Kpi label="Stock faible" value="14" delta="-3" icon={Package} positive={false} />
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenus & commandes</CardTitle>
                <p className="text-sm text-muted-foreground">12 derniers mois</p>
              </div>
              <Badge variant="secondary"><TrendingUp className="mr-1 h-3 w-3 text-success" />+24%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ord" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#rev)" />
                <Area type="monotone" dataKey="orders" stroke="var(--color-chart-2)" strokeWidth={2} fill="url(#ord)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Répartition catégories</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={`var(--color-chart-${(i % 5) + 1})`} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1.5 text-sm">
              {categoryData.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: `var(--color-chart-${(i % 5) + 1})` }} />
                    {c.name}
                  </span>
                  <span className="font-medium">{c.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily bar + recent orders */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Ventes par jour</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={[
                { d: "Lun", v: 42 }, { d: "Mar", v: 58 }, { d: "Mer", v: 35 },
                { d: "Jeu", v: 72 }, { d: "Ven", v: 89 }, { d: "Sam", v: 96 }, { d: "Dim", v: 64 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="v" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Commandes récentes</CardTitle>
              <Button variant="ghost" size="sm" asChild><Link to="/vendor">Tout voir <ArrowUpRight className="h-4 w-4" /></Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N°</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Produit</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono text-xs">{o.id}</TableCell>
                    <TableCell className="font-medium">{o.customer}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">{o.product}</TableCell>
                    <TableCell className="text-right font-semibold">{formatPrice(o.total)}</TableCell>
                    <TableCell><Badge className={statusVariant[o.status]}>{o.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Top products */}
      <Card className="mt-6">
        <CardHeader><CardTitle>Mes produits les plus vendus</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
              <img src={p.image} alt="" className="h-14 w-14 flex-none rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.stock} en stock</p>
              </div>
              <p className="text-sm font-bold">{formatPrice(p.price)}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Kpi({ label, value, delta, icon: Icon, positive }:
  { label: string; value: string; delta: string; icon: React.ComponentType<{ className?: string }>; positive: boolean }) {
  return (
    <Card className="hover-lift">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-3 text-2xl font-bold">{value}</p>
        <p className={`mt-1 flex items-center gap-1 text-xs ${positive ? "text-success" : "text-destructive"}`}>
          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {delta} vs mois dernier
        </p>
      </CardContent>
    </Card>
  );
}
