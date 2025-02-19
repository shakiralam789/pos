import cn from "@/utilities/cn";

export default function ErrorMsg({
  message,
  isPosition = false,
  position = "bottom",
  arrowPosition = "",
  bgColor = "#dc2f06",
  className = "",
  ...props
}) {
  const commonClass = "font-14";
  return message ? (
    isPosition ? (
      <PositionalTooltip
        message={message}
        position={position}
        className={className}
        arrowPosition={arrowPosition}
        bgColor={bgColor}
        {...props}
      />
    ) : (
      <p {...props} className={cn(`mt-1 ${commonClass}`, className)}>
        {message}
      </p>
    )
  ) : null;
}

function PositionalTooltip({
  message,
  className,
  position,
  arrowPosition,
  bgColor,
  ...props
}) {
  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
      className={cn(
        `duration-300 pointer-events-none opacity-100 absolute bottom-full z-[99] w-fit whitespace-nowrap font-12 font-medium 2xl:px-4 px-2 py-1 left-1/2 -translate-x-1/2 -translate-y-3 text-white rounded ${bgColor}`,
        className,
        {
          "translate-x-0 right-0 left-auto": position == "right",
          "translate-x-0 left-0 right-auto": position == "left",
          "bottom-auto top-full translate-x-0 right-0 left-auto translate-y-3":
            position == "bottom-right",
          "bottom-auto top-full translate-x-0 left-0 right-auto translate-y-3":
            position == "bottom-left",
          "bottom-auto top-full translate-y-3": position == "bottom",
        }
      )}
      {...props}
    >
      {message}
      <span
        style={{
          borderTopColor: bgColor,
          borderBottomColor: bgColor,
        }}
        className={cn(
          `absolute left-1/2 -translate-x-1/2 ${
            position == "bottom" ||
            position == "bottom-left" ||
            position == "bottom-right"
              ? "triangle-down"
              : "triangle-up"
          }`,
          `${arrowPosition}`
        )}
      ></span>
    </div>
  );
}
