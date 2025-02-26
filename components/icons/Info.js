import cn from "@/utilities/cn";

export default function InfoIcon({classname=""}) {
  return (
    <svg
    className={cn('w-1',classname)}
     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
      <path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 224 32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0 0-192-32 0c-17.7 0-32-14.3-32-32z" />
    </svg>
  );
}
