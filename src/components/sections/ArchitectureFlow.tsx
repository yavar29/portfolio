import { Fragment, type CSSProperties } from "react";
import RevealList from "@/components/ui/RevealList";
import type { FlowNode } from "@/lib/data";
import { cn } from "@/lib/utils";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * A project's architecture as a left-to-right flow (top-to-bottom on phones). Stages
 * and the links between them reveal one after another, so the diagram reads as the
 * system doing its work.
 */
export default function ArchitectureFlow({ title, flow }: { title: string; flow: FlowNode[][] }) {
  return (
    <RevealList as="figure" label={`${title} architecture`} className="flow-panel">
      <div className="flex w-full flex-col items-stretch md:flex-row md:items-center">
        {flow.map((stage, s) => (
          <Fragment key={s}>
            {s > 0 && <span aria-hidden className="flow-link reveal-item" style={order(s * 2 - 1)} />}
            <ul
              className="reveal-item flex flex-wrap justify-center gap-2 md:min-w-0 md:flex-1 md:flex-col md:flex-nowrap"
              style={order(s * 2)}
            >
              {stage.map((node, n) => (
                <li key={n} className={cn("flow-node", node.core && "flow-node-core")}>
                  {node.label}
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </RevealList>
  );
}
