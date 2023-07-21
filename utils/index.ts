export const concat = (...args: (string | undefined)[]) => {
  return args.filter(Boolean).join(" ");
};
