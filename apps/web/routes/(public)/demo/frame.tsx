import { createFileRoute } from "@tanstack/react-router";

import {
  Badge,
  Button,
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/frame")({
  component: FrameDemoPage,
});

function FrameDemoPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Frame</h1>
        <p className="text-neutral-600">
          Composite surface for grouping related panels with a unified background treatment.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Basic</h2>
        <Frame className="max-w-sm">
          <FramePanel>
            <FrameHeader>
              <FrameTitle>Notifications</FrameTitle>
              <FrameDescription>You have 3 unread notifications</FrameDescription>
            </FrameHeader>
          </FramePanel>
          <FramePanel>
            <FrameHeader>
              <FrameTitle>Team updates</FrameTitle>
              <FrameDescription>Activity from your workspace</FrameDescription>
            </FrameHeader>
          </FramePanel>
        </Frame>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With footer</h2>
        <Frame className="max-w-sm">
          <FramePanel>
            <FrameHeader>
              <FrameTitle>Billing</FrameTitle>
              <FrameDescription>Manage your subscription and payment methods</FrameDescription>
            </FrameHeader>
            <FrameFooter>
              <Button size="sm" variant="secondary">
                Cancel subscription
              </Button>
            </FrameFooter>
          </FramePanel>
          <FramePanel>
            <FrameHeader>
              <div className="flex items-center justify-between">
                <FrameTitle>Usage</FrameTitle>
                <Badge variant="warning">85%</Badge>
              </div>
              <FrameDescription>API calls this month</FrameDescription>
            </FrameHeader>
            <FrameFooter>
              <Button size="sm">Upgrade plan</Button>
            </FrameFooter>
          </FramePanel>
        </Frame>
      </section>
    </div>
  );
}
