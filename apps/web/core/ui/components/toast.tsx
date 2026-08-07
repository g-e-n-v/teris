import type { ComponentProps } from "react";

import { Toast as BaseToast } from "@base-ui/react";
import { tv } from "tailwind-variants";

import { Button } from "./button";

const TOAST_ICONS = {
  error: (
    <g fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
      <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M12 7v6" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </g>
  ),
  info: (
    <g fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
      <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M12 17v-6" />
      <circle cx="1" cy="1" r="1" fill="currentColor" transform="matrix(1 0 0 -1 11 9)" />
    </g>
  ),
  loading: (
    <path
      fill="currentColor"
      d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5a.75.75 0 0 1 1.5 0c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2a.75.75 0 0 1 0 1.5"
    />
  ),
  success: (
    <g fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10" />
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.5 12.5l2 2l5-5" />
    </g>
  ),
  warning: (
    <g fill="none">
      <path
        stroke="currentColor"
        stroke-width="1.5"
        d="M5.312 10.762C8.23 5.587 9.689 3 12 3s3.77 2.587 6.688 7.762l.364.644c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572s.117-3.722 2.542-8.022z"
      />
      <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M12 8v5" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </g>
  ),
} as const;

type ToastType = keyof typeof TOAST_ICONS;

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

      "absolute right-0 bottom-0 z-[calc(9999-var(--toast-index))] w-full select-none",
      "h-(--toast-calc-height)",
      "rounded-lg border border-neutral-200 bg-white text-neutral-900 shadow-lg/5",
      "[transition:transform_.5s_cubic-bezier(.22,1,.36,1),opacity_.5s,height_.15s]",

      // Local offset-y variable used by expanded and swipe-dismissal transforms
      "[--toast-calc-offset-y:calc(var(--toast-offset-y)*-1+var(--toast-index)*var(--toast-gap)*-1+var(--toast-swipe-movement-y))]",

      // Collapsed stack transform
      "transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--toast-peek))-(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",

      // Disable transition while actively swiping so the toast tracks the pointer
      "data-swiping:transition-none",

      // Expanded (hover) state
      "data-expanded:h-(--toast-height)",
      "data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-calc-offset-y))]",

      // Enter/exit animations
      "data-starting-style:transform-[translateY(calc(100%+var(--toast-inset)))]",
      "data-ending-style:opacity-0",
      "data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(100%+var(--toast-inset)))]",
      "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
      "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
      "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
      "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
      "data-limited:opacity-0",

      // Gap fill so hovering between stacked toasts keeps the stack expanded
      "after:absolute after:bottom-full after:left-0 after:h-[calc(var(--toast-gap)+1px)] after:w-full",
    ],
    title: "font-medium",
  },
  variants: {
    pulse: {
      even: { root: "animate-pulse-toast-even" },
      odd: { root: "animate-pulse-toast-odd" },
    },
    type: {
      error: { icon: "text-error-500" },
      info: { icon: "text-brand-500" },
      loading: { icon: "animate-spin text-neutral-400" },
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
function Toasts() {
  const { toasts } = BaseToast.useToastManager();

  const v = variants();

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport className="fixed right-4 bottom-4 z-60 flex w-90 max-w-[calc(100vw-2rem)] [--toast-inset:--spacing(4)]">
        {toasts.map((toast) => {
          const type = isValidType(toast.type) ? toast.type : undefined;
          const icon = type ? TOAST_ICONS[type] : undefined;
          const pulse = getPulse(toast.updateKey);

          return (
            <BaseToast.Root
              key={toast.id}
              className={v.root({ pulse })}
              swipeDirection={["right", "down"]}
              toast={toast}
            >
              <BaseToast.Content className={v.content()}>
                <div className="flex min-w-0 gap-2.5">
                  {icon && (
                    <svg
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
                    <BaseToast.Title className={v.title()} />
                    <BaseToast.Description className={v.description()} />
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  {toast.actionProps && (
                    <BaseToast.Action render={<Button size="xs" variant="secondary" />}>
                      {toast.actionProps.children}
                    </BaseToast.Action>
                  )}
                </div>
              </BaseToast.Content>
            </BaseToast.Root>
          );
        })}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}

// Toast
export const toast = BaseToast.createToastManager();

// ToastProvider
type ToastProviderProps = ComponentProps<typeof BaseToast.Provider>;

export function ToastProvider({ children, ...props }: ToastProviderProps) {
  return (
    <BaseToast.Provider toastManager={toast} {...props}>
      {children}
      <Toasts />
    </BaseToast.Provider>
  );
}
