import { createFileRoute } from "@tanstack/react-router";

import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardFrame,
  CardFrameDescription,
  CardFrameFooter,
  CardFrameHeader,
  CardFrameTitle,
  CardHeader,
  CardPanel,
  CardTitle,
} from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/card")({
  component: CardDemoPage,
});

function CardDemoPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Card</h1>
        <p className="text-neutral-600">
          Surface containers for grouping related content and actions.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Basic</h2>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Project revenue</CardTitle>
            <CardDescription>Monthly recurring revenue overview</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600">
              Your MRR grew 12.5% this month, driven by 3 new enterprise accounts and a 4% expansion
              in existing contracts.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">View report</Button>
          </CardFooter>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With action</h2>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Team members</CardTitle>
            <CardDescription>Manage who has access to this workspace</CardDescription>
            <CardAction>
              <Badge variant="secondary">8 active</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MEMBERS.map((member) => (
                <div key={member.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{member.name}</p>
                    <p className="text-xs text-neutral-500">{member.role}</p>
                  </div>
                  <Badge variant={member.variant}>{member.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Panel layout</h2>
        <Card className="max-w-sm">
          <CardHeader className="border-b border-neutral-200">
            <CardTitle>Storage</CardTitle>
            <CardDescription>48.5 GB of 100 GB used</CardDescription>
          </CardHeader>
          <CardPanel>
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full rounded-full bg-brand-500" style={{ width: "48.5%" }} />
            </div>
          </CardPanel>
          <CardFooter className="border-t border-neutral-200">
            <Button size="sm" variant="secondary">
              Upgrade plan
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Card frame</h2>
        <CardFrame className="max-w-sm">
          <CardFrameHeader>
            <CardFrameTitle>Billing settings</CardFrameTitle>
            <CardFrameDescription>Manage your subscription</CardFrameDescription>
          </CardFrameHeader>
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-900">Current plan</span>
                <Badge variant="info">Pro</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-900">Next invoice</span>
                <span className="text-sm text-neutral-600">Sep 1, 2025</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-900">Payment method</span>
                <span className="text-sm text-neutral-600">•••• 4242</span>
              </div>
            </CardContent>
          </Card>
          <CardFrameFooter>
            <Button size="sm">Manage billing</Button>
          </CardFrameFooter>
        </CardFrame>
      </section>
    </div>
  );
}

const MEMBERS = [
  { name: "Ada Lovelace", role: "Owner", status: "online", variant: "success" },
  { name: "Alan Turing", role: "Admin", status: "online", variant: "success" },
  { name: "Grace Hopper", role: "Editor", status: "away", variant: "warning" },
] as const;
