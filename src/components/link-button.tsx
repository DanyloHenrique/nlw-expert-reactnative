import { Link, LinkProps } from "expo-router";

type LinkButtonProps = LinkProps<string> & {
  title: string;
};

export function LinkButton({ title, ...rest }: LinkButtonProps) {
  return (
    <Link {...rest} className="text-slate-100 text-center text-base text-body">
      {title}
    </Link>
  );
}
