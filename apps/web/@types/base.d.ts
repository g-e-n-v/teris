type PropsWithClassName<T> = Omit<T, "className"> & { className?: string };
