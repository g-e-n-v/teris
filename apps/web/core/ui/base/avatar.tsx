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

type AvatarImageProps = Omit<BaseAvatar.Image.Props, "className"> & {
  className?: string;
};

type AvatarFallbackProps = Omit<BaseAvatar.Fallback.Props, "className"> & {
  className?: string;
};

type AvatarProps = Omit<BaseAvatar.Root.Props, "className" | "children"> &
  VariantProps<typeof variants> & {
    className?: string;
    image?: AvatarImageProps;
    fallback?: AvatarFallbackProps;
  };

export function Avatar({ className, image, fallback, ...props }: AvatarProps) {
  const v = variants();

  return (
    <BaseAvatar.Root className={v.root({ className })} data-slot="avatar" {...props}>
      <BaseAvatar.Image
        data-slot="avatar-image"
        {...image}
        className={v.image({ className: image?.className })}
      />
      <BaseAvatar.Fallback
        data-slot="avatar-fallback"
        {...fallback}
        className={v.fallback({ className: fallback?.className })}
      />
    </BaseAvatar.Root>
  );
}
