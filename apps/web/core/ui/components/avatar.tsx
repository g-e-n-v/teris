import type { ReactElement } from "react";
import type { VariantProps } from "tailwind-variants";

import { Avatar as BaseAvatar } from "@base-ui/react";
import { tv } from "tailwind-variants";

export const variants = tv({
  slots: {
    fallback: "flex size-full items-center justify-center rounded-full bg-neutral-100",
    image: "size-full object-cover",
    root: "inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white align-middle text-xs font-medium select-none",
  },
});

type AvatarProps = Omit<BaseAvatar.Root.Props, "className"> &
  VariantProps<typeof variants> & { className?: string };

type AvatarImageProps = Omit<BaseAvatar.Image.Props, "className"> & {
  className?: string;
};

type AvatarFallbackProps = Omit<BaseAvatar.Fallback.Props, "className"> & {
  className?: string;
};

export function Avatar({ className, ...props }: AvatarProps): ReactElement {
  const v = variants();

  return <BaseAvatar.Root className={v.root({ className })} data-slot="avatar" {...props} />;
}

export function AvatarImage({ className, ...props }: AvatarImageProps): ReactElement {
  const v = variants();

  return (
    <BaseAvatar.Image className={v.image({ className })} data-slot="avatar-image" {...props} />
  );
}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps): ReactElement {
  const v = variants();

  return (
    <BaseAvatar.Fallback
      className={v.fallback({ className })}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}
