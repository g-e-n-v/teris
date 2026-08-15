import type { ComponentProps } from "react";

import { Toast } from "@base-ui/react";
import { tv } from "tailwind-variants";

import { Button } from "./button";

const TOAST_ICONS = {
  error: (
    <g fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12 7v6" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </g>
  ),
  info: (
    <g fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12 17v-6" />
      <circle cx="1" cy="1" r="1" fill="currentColor" transform="matrix(1 0 0 -1 11 9)" />
    </g>
  ),
  loading: (
    <g stroke="currentColor">
      <circle cx="12" cy="12" r="9.5" fill="none" strokeLinecap="round" strokeWidth="3">
        <animate
          attributeName="stroke-dasharray"
          calcMode="spline"
          dur="1.5s"
          keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
          keyTimes="0;0.475;0.95;1"
          repeatCount="indefinite"
          values="0 150;42 150;42 150;42 150"
        />
        <animate
          attributeName="stroke-dashoffset"
          calcMode="spline"
          dur="1.5s"
          keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
          keyTimes="0;0.475;0.95;1"
          repeatCount="indefinite"
          values="0;-16;-59;-59"
        />
      </circle>
      <animateTransform
        attributeName="transform"
        dur="2s"
        repeatCount="indefinite"
        type="rotate"
        values="0 12 12;360 12 12"
      />
    </g>
  ),
  success: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 12.5l2 2l5-5" />
    </g>
  ),
  warning: (
    <g fill="none">
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M5.312 10.762C8.23 5.587 9.689 3 12 3s3.77 2.587 6.688 7.762l.364.644c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572s.117-3.722 2.542-8.022z"
      />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12 8v5" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </g>
  ),
} as const;

type ToastType = keyof typeof TOAST_ICONS;

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type SwipeDirection = "up" | "down" | "left" | "right";

function getSwipeDirection(position: ToastPosition): SwipeDirection[] {
  const verticalDirection: SwipeDirection = position.startsWith("top") ? "up" : "down";

  if (position.includes("center")) {
    return [verticalDirection];
  }

  if (position.includes("left")) {
    return ["left", verticalDirection];
  }

  return ["right", verticalDirection];
}

const variants = tv({
  slots: {
    body: "flex min-w-0 flex-col gap-0.5",
    close:
      "shrink-0 cursor-pointer rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-50 hover:text-neutral-600",
    content:
      "pointer-events-auto flex items-center justify-between gap-2 overflow-hidden px-3.5 py-3 text-sm transition-opacity duration-200 data-behind:not-data-expanded:pointer-events-none data-behind:not-data-expanded:opacity-0",
    description: "text-neutral-500",
    icon: "size-5 shrink-0",
    root: [
      // Local variables
      "[--toast-gap:--spacing(3)]",
      "[--toast-peek:--spacing(3)]",
      "[--toast-scale:calc(max(0,1-(var(--toast-index)*0.1)))]",
      "[--toast-shrink:calc(1-var(--toast-scale))]",
      "[--toast-calc-height:var(--toast-frontmost-height,var(--toast-height))]",

      "absolute z-[calc(9999-var(--toast-index))] w-full select-none motion-reduce:transition-none",
      "h-(--toast-calc-height)",
      "rounded-lg border border-neutral-200 bg-white text-neutral-900 shadow-lg/5",
      "[transition:transform_.5s_cubic-bezier(.22,1,.36,1),opacity_.5s,height_.15s]",

      // Base positioning using data-position
      "data-[position*=right]:right-0 data-[position*=right]:left-auto",
      "data-[position*=left]:right-auto data-[position*=left]:left-0",
      "data-[position*=center]:right-0 data-[position*=center]:left-0",
      "data-[position*=top]:top-0 data-[position*=top]:bottom-auto data-[position*=top]:origin-[50%_calc(50%-50%*min(var(--toast-index,0),1))]",
      "data-[position*=bottom]:top-auto data-[position*=bottom]:bottom-0 data-[position*=bottom]:origin-[50%_calc(50%+50%*min(var(--toast-index,0),1))]",

      // Offset-y variable used by expanded and swipe-dismissal transforms
      "data-[position*=top]:[--toast-calc-offset-y:calc(var(--toast-offset-y)+var(--toast-index)*var(--toast-gap)+var(--toast-swipe-movement-y))]",
      "data-[position*=bottom]:[--toast-calc-offset-y:calc(var(--toast-offset-y)*-1+var(--toast-index)*var(--toast-gap)*-1+var(--toast-swipe-movement-y))]",

      // Collapsed stack transform
      "data-[position*=top]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--toast-peek))+(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
      "data-[position*=bottom]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--toast-peek))-(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",

      // Disable transition while actively swiping so the toast tracks the pointer
      "data-swiping:transition-none",

      // Expanded (hover) state
      "data-expanded:h-(--toast-height)",
      "data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-calc-offset-y))]",

      // Enter/exit animations
      "data-[position*=top]:data-starting-style:transform-[translateY(calc(-100%-var(--toast-inset)))]",
      "data-[position*=bottom]:data-starting-style:transform-[translateY(calc(100%+var(--toast-inset)))]",
      "data-ending-style:opacity-0",
      "data-[position*=top]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(-100%-var(--toast-inset)))]",
      "data-[position*=bottom]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(100%+var(--toast-inset)))]",
      "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
      "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
      "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
      "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
      "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
      "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
      "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
      "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
      "data-limited:opacity-0",

      // Gap fill so hovering between stacked toasts keeps the stack expanded
      "after:absolute after:left-0 after:h-[calc(var(--toast-gap)+1px)] after:w-full",
      "data-[position*=top]:after:top-full",
      "data-[position*=bottom]:after:bottom-full",
    ],
    title: "font-medium",
    viewport: [
      "fixed z-60 mx-auto flex w-[calc(100%-var(--toast-inset)*2)] max-w-90 [--toast-inset:--spacing(4)] sm:[--toast-inset:--spacing(8)]",
      // Vertical positioning
      "data-[position*=top]:top-(--toast-inset)",
      "data-[position*=bottom]:bottom-(--toast-inset)",
      // Horizontal positioning
      "data-[position*=left]:left-(--toast-inset)",
      "data-[position*=right]:right-(--toast-inset)",
      "data-[position*=center]:left-1/2 data-[position*=center]:-translate-x-1/2",
    ],
  },
  variants: {
    pulse: {
      even: { root: "animate-pulse-toast-even" },
      odd: { root: "animate-pulse-toast-odd" },
    },
    type: {
      error: { icon: "text-error-500" },
      info: { icon: "text-brand-500" },
      loading: { icon: "animate-spin text-neutral-400 motion-reduce:animate-none" },
      success: { icon: "text-success-500" },
      warning: { icon: "text-warning-500" },
    },
  },
});

// Utils
function isValidType(type?: string): type is ToastType {
  return type !== undefined && type in TOAST_ICONS;
}

// Alternate animation names so repeated updates restart the pulse.
// New toasts start with `updateKey: 0`, so the first add skips the pulse.
function getPulse(updateKey?: number): "even" | "odd" | undefined {
  if (updateKey === undefined || updateKey === 0) {
    return undefined;
  }
  return updateKey % 2 === 0 ? "even" : "odd";
}

//  Toasts
type ToastsProps = { position: ToastPosition };

function Toasts({ position }: ToastsProps) {
  const { toasts } = Toast.useToastManager();

  const v = variants();
  const swipeDirection = getSwipeDirection(position);

  return (
    <Toast.Portal>
      <Toast.Viewport className={v.viewport()} data-position={position}>
        {toasts.map((toast) => {
          const type = isValidType(toast.type) ? toast.type : undefined;
          const icon = type ? TOAST_ICONS[type] : undefined;
          const pulse = getPulse(toast.updateKey);

          return (
            <Toast.Root
              key={toast.id}
              className={v.root({ pulse })}
              data-position={position}
              swipeDirection={swipeDirection}
              toast={toast}
            >
              <Toast.Content className={v.content()}>
                <div className="flex min-w-0 gap-2.5">
                  {icon && (
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className={v.icon({ type })}
                    >
                      {icon}
                    </svg>
                  )}

                  <div className={v.body()}>
                    <Toast.Title className={v.title()} />
                    <Toast.Description className={v.description()} />
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  {toast.actionProps && (
                    <Toast.Action render={<Button size="xs" variant="secondary" />}>
                      {toast.actionProps.children}
                    </Toast.Action>
                  )}
                  <Toast.Close aria-label="Dismiss notification" className={v.close()}>
                    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
                      <path
                        d="m7 7 10 10M17 7 7 17"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </Toast.Close>
                </div>
              </Toast.Content>
            </Toast.Root>
          );
        })}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

// Toast
export const toast = Toast.createToastManager();

// ToastProvider
export type ToastProviderProps = {
  position?: ToastPosition;
} & ComponentProps<typeof Toast.Provider>;

export function ToastProvider({
  children,
  position = "bottom-right",
  ...props
}: ToastProviderProps) {
  return (
    <Toast.Provider toastManager={toast} {...props}>
      {children}
      <Toasts position={position} />
    </Toast.Provider>
  );
}

export { Toast } from "@base-ui/react";
