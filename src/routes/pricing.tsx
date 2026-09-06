import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/pricing")({ component: Pricing });

function Pricing() {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-10">
      <p className="text-[11px] font-extrabold tracking-[1.7px] text-[#777] uppercase">Pricing</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">One pass. Twenty-four hours.</h1>
      <Card className="mt-8">
        <CardHeader>
          <CardDescription>Job Hunt Pass</CardDescription>
          <CardTitle className="text-4xl font-extrabold">₹199</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Unlocks job discovery for 24 hours from payment.</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>Search, filter, and open every listing</li>
            <li>Match scores against your profile</li>
            <li>Save and apply during the window</li>
            <li>Tracker stays open after expiry</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button asChild className="h-12 w-full rounded-[10px] font-bold">
            <Link to="/signup">Get 24 Hours — ₹199</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
