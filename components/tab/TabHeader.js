import cn from "@/utilities/cn";

export default function TabHeader({ href, children, className = "", ...rest }) {
  const Component = href ? "a" : "button";

  return (
    <li>
      <Component
        {...rest}
        {...(href ? { href } : {})}
        className={cn(
          `hover:bg-primary border hover:border-transparent [&.active]:border-transparent px-3 py-1 rounded-md capitalize text-primary hover:text-secondary cursor-pointer duration-300 [&.active]:bg-primary [&.active]:text-white`,
          className
        )}
      >
        {children}
      </Component>
    </li>
  );
}
