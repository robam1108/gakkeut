// 이모지 대신 쓰는 단색 라인 아이콘. currentColor를 따르므로 부모 color로 색을 정한다.
const PATHS = {
  clipboard: "M9 4h6v3H9zM7 5.5H5.5v15h13v-15H17M8.5 12l2 2 4.5-4.5",
  layout: "M4 4h16v16H4zM4 10h16M10 10v10",
  check: "M5 12.5l4.5 4.5L19 7.5",
  phone:
    "M6.6 3.5h3l1.5 4-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z",
  chat: "M12 4.5c-4.7 0-8.5 3-8.5 6.7 0 2.4 1.6 4.5 4 5.7l-.9 3.4 3.9-2.5c.5.1 1 .1 1.5.1 4.7 0 8.5-3 8.5-6.7S16.7 4.5 12 4.5z",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 6l-6 6 6 6",
  plus: "M12 5v14M5 12h14",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  alert: "M12 8v5M12 16.5v.01M10.3 3.9L2.6 17.3A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.7L13.7 3.9a2 2 0 0 0-3.4 0z",
  drag: "M9 7l-5 5 5 5M15 7l5 5-5 5",
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
