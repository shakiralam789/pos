import cn from "@/utilities/cn";

export default function TabHeaders({ children, className = "" }) {
  return (
    <div className={cn(`border rounded-md p-2`, className)}>
      <ul className="capitalize flex flex-wrap justify-center sm:justify-start font-medium items-center gap-2 font-13">
        {children}
      </ul>
    </div>
  );
}
