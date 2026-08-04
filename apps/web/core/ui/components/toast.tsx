import type { ComponentProps } from "react";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { Icon } from "@iconify/react/offline";
import { tv } from "tailwind-variants";

import { Button } from "./button";

const TOAST_ICONS = {
  error: "solar:danger-circle-linear",
  info: "solar:info-circle-linear",
  loading: "svg-spinners:90-ring",
  success: "solar:check-circle-linear",
  warning: "solar:danger-triangle-linear",
} as const;

type ToastType = keyof typeof TOAST_ICONS;

const variants = tv({
  slots: {
    body: "flex min-w-0 flex-col gap-0.5",
    close:
      "shrink-0 cursor-pointer rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-50 hover:text-neutral-600",
    content:
      "pointer-events-auto flex items-center justify-between gap-2 overflow-hidden px-3.5 py-3 text-sm transition-opacity duration-200 data-behind:opacity-0 data-behind:not-data-expanded:pointer-events-none",
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
      "transition-[transform,opacity,height] duration-300 ease-out",

      // Collapsed stack transform
      "transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--toast-peek))-(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",

      // Expanded (hover) state
      "data-expanded:h-(--toast-height)",
      "data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-offset-y)*-1+var(--toast-index)*var(--toast-gap)*-1+var(--toast-swipe-movement-y)))]",

      // Enter/exit animations
      "data-starting-style:transform-[translateY(calc(100%+var(--toast-inset)))]",
      "data-ending-style:opacity-0",
      "data-ending-style:not-data-limited:not-data-swiping:transform-[translateY(calc(100%+var(--toast-inset)))]",
      "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))]",
      "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
      "data-limited:opacity-0",

      // Gap fill so hovering between stacked toasts keeps the stack expanded
      "after:absolute after:bottom-full after:left-0 after:h-[calc(var(--toast-gap)+1px)] after:w-full",
    ],
    title: "font-medium",
  },
  variants: {
    type: {
      error: { icon: "text-error-500" },
      info: { icon: "text-brand-500" },
      loading: { icon: "text-neutral-400" },
      success: { icon: "text-success-500" },
      warning: { icon: "text-warning-500" },
    },
  },
});

// Utils
function isValidType(type?: string): type is ToastType {
  return type !== undefined && type in TOAST_ICONS;
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

          return (
            <BaseToast.Root
              key={toast.id}
              className={v.root()}
              swipeDirection={["right", "down"]}
              toast={toast}
            >
              <BaseToast.Content className={v.content()}>
                <div className="flex min-w-0 gap-2.5">
                  {icon && <Icon aria-hidden className={v.icon({ type })} icon={icon} />}

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

                  {/*<BaseToast.Close className={v.close()}>
                    <span className="sr-only">Dismiss</span>
                  </BaseToast.Close>*/}
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
