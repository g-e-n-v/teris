import type { ColumnDef } from "@tanstack/react-table";

import { createFileRoute } from "@tanstack/react-router";
import { rowSelectionFeature, tableFeatures, useTable } from "@tanstack/react-table";
import { useState } from "react";
import { cn } from "tailwind-variants";

import {
  Badge,
  CardFrame,
  Checkbox,
  Frame,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/table")({
  component: TableDemoPage,
});

type Project = {
  budget: string;
  name: string;
  status: "Failed" | "Paid" | "Pending" | "Unpaid";
  team: string;
};

const PROJECTS: Project[] = [
  { budget: "$12,500", name: "Website Redesign", status: "Paid", team: "Frontend Team" },
  { budget: "$8,750", name: "Mobile App", status: "Unpaid", team: "Mobile Team" },
  { budget: "$5,200", name: "API Integration", status: "Pending", team: "Backend Team" },
  { budget: "$3,800", name: "Database Migration", status: "Paid", team: "DevOps Team" },
  { budget: "$7,200", name: "User Dashboard", status: "Paid", team: "UX Team" },
  { budget: "$2,100", name: "Security Audit", status: "Failed", team: "Security Team" },
];

const STATUS_DOT: Record<Project["status"], string> = {
  Failed: "bg-error-500",
  Paid: "bg-success-500",
  Pending: "bg-warning-500",
  Unpaid: "bg-neutral-500/64",
};

function StatusBadge({ status }: { status: Project["status"] }) {
  return (
    <Badge variant="outline">
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", STATUS_DOT[status])} />
      {status}
    </Badge>
  );
}

const TOTAL_BUDGET = "$39,550";

function DemoTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Team</TableHead>
          <TableHead className="text-right">Budget</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {PROJECTS.map((project) => (
          <TableRow key={project.name}>
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>
              <StatusBadge status={project.status} />
            </TableCell>
            <TableCell>{project.team}</TableCell>
            <TableCell className="text-right">{project.budget}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Budget</TableCell>
          <TableCell className="text-right">{TOTAL_BUDGET}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function CardStyleTable() {
  return (
    <Table className="w-full" variant="card">
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Team</TableHead>
          <TableHead className="text-right">Budget</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {PROJECTS.map((project) => (
          <TableRow key={project.name}>
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>
              <StatusBadge status={project.status} />
            </TableCell>
            <TableCell>{project.team}</TableCell>
            <TableCell className="text-right">{project.budget}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Budget</TableCell>
          <TableCell className="text-right">{TOTAL_BUDGET}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function TableInCardFrame() {
  return (
    <CardFrame className="w-full">
      <CardStyleTable />
    </CardFrame>
  );
}

function TableInFrame() {
  return (
    <Frame className="w-full">
      <CardStyleTable />
    </Frame>
  );
}

const features = tableFeatures({
  rowSelectionFeature,
});

const COLUMNS: ColumnDef<typeof features, Project>[] = [
  {
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={() => {
          row.toggleSelected(!row.getIsSelected());
        }}
      />
    ),
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onCheckedChange={() => {
          table.toggleAllRowsSelected(!table.getIsAllRowsSelected());
        }}
      />
    ),
    id: "select",
  },
  {
    accessorKey: "name",
    cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>,
    header: "Project",
  },
  {
    accessorKey: "status",
    cell: ({ getValue }) => <StatusBadge status={getValue<Project["status"]>()} />,
    header: "Status",
  },
  {
    accessorKey: "team",
    header: "Team",
  },
  {
    accessorKey: "budget",
    cell: ({ getValue }) => <div className="text-right">{getValue<string>()}</div>,
    header: () => <div className="text-right">Budget</div>,
  },
];

function DataTableWithTanStack() {
  const [rowSelection, setRowSelection] = useState({});

  const table = useTable({
    columns: COLUMNS,
    data: PROJECTS,
    features,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  return (
    <Table variant="card">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : <table.FlexRender header={header} />}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
            {row.getAllCells().map((cell) => (
              <TableCell key={cell.id}>
                <table.FlexRender cell={cell} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Budget</TableCell>
          <TableCell className="text-right">{TOTAL_BUDGET}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function TableDemoPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Table</h1>
        <p className="text-neutral-600">A simple table component for displaying tabular data.</p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Default</h2>
        <DemoTable />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Card-style table</h2>
        <p className="mb-4 text-sm text-neutral-500">
          Use{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-sm">variant=&#34;card&#34;</code>{" "}
          for a card-style table with separated borders, rounded corners, and row surfaces that read
          as cards.
        </p>
        <CardStyleTable />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Table in CardFrame</h2>
        <p className="mb-4 text-sm text-neutral-500">
          Put the table in CardFrame so the grid sits inside the card shell (border, radius,
          clipping). Use{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-sm">variant=&#34;card&#34;</code>{" "}
          on Table.
        </p>
        <TableInCardFrame />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Table in Frame</h2>
        <p className="mb-4 text-sm text-neutral-500">
          Wrap the table in a Frame for bordered app-surface framing. Use{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-sm">variant=&#34;card&#34;</code>{" "}
          on Table so rows keep the card-style treatment inside the frame.
        </p>
        <TableInFrame />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Data table with TanStack</h2>
        <p className="mb-4 text-sm text-neutral-500">
          Use TanStack Table with{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-sm">variant=&#34;card&#34;</code>{" "}
          when you need column definitions, row selection, and flexRender over the same table
          primitives.
        </p>
        <DataTableWithTanStack />
      </section>
    </div>
  );
}
