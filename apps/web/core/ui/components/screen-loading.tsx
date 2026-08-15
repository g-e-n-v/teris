import type { ReactNode } from "react";

import { Spinner } from "../base/spinner";
import { Text } from "../base/text";

const DEFAULT_ICON = <Spinner className="size-10" />;

type ScreenLoadingProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
};

export function ScreenLoading({ title, description, icon = DEFAULT_ICON }: ScreenLoadingProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-snow">
      <div className="flex w-full max-w-sm flex-col items-center gap-3 px-6 text-center">
        {icon}
        {title && (
          <Text as="h2" variant="title">
            {title}
          </Text>
        )}
        {description && (
          <Text as="p" variant="body">
            {description}
          </Text>
        )}
      </div>
    </div>
  );
}
