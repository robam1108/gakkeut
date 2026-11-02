import { useRef, useState } from "react";
import SectionHeader from "../ui/SectionHeader";
import Icon from "../ui/Icon";
import styles from "./BeforeAfter.module.css";

// 데모용 예시 이미지. 실제 시공 사진이 생기면 같은 공간·같은 구도의 전후 사진으로 교체하세요.
const PAIRS = [
  {
    id: "kitchen",
    label: "주방",
    before: "/images/before-after/kitchen-before.webp",
    after: "/images/before-after/kitchen-after.webp",
    alt: "주방 싱크대와 상판",
  },
  {
    id: "bathroom",
    label: "욕실",
    before: "/images/before-after/bathroom-before.webp",
    after: "/images/before-after/bathroom-after.webp",
    alt: "욕실 세면대와 타일",
  },
];

export default function BeforeAfter() {
  const [pairIdx, setPairIdx] = useState(0);
  const [pos, setPos] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const pair = PAIRS[pairIdx];

  const updateFromX = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updateFromX(e.clientX);
  };

  const stop = () => {
    dragging.current = false;
  };

  return (
    <section id="cases" className="section section--surface" aria-labelledby="cases-title">
      <div className="container">
        <div className={styles.head}>
          <SectionHeader
            id="cases-title"
            eyebrow="Before & After"
            title="작업 전후의 차이를 확인하세요"
            desc="같은 공간을 작업 전과 후로 비교합니다. 가운데 손잡이를 좌우로 움직여 보세요."
          />
          <div className={styles.switch} role="group" aria-label="비교할 공간 선택">
            {PAIRS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={i === pairIdx}
                className={`${styles.switchBtn} ${i === pairIdx ? styles.switchActive : ""}`}
                onClick={() => {
                  setPairIdx(i);
                  setPos(50);
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={frameRef}
          className={styles.frame}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stop}
          onPointerCancel={stop}
          style={{ "--pos": `${pos}%` } as React.CSSProperties}
        >
          <img
            src={pair.after}
            alt={`청소 후 ${pair.alt}`}
            className={styles.img}
            width={1086}
            height={724}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div className={styles.beforeLayer} aria-hidden={pos === 0}>
            <img
              src={pair.before}
              alt={`청소 전 ${pair.alt}`}
              className={styles.img}
              width={1081}
              height={721}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>

          <span className={`${styles.tag} ${styles.tagBefore}`}>Before</span>
          <span className={`${styles.tag} ${styles.tagAfter}`}>After</span>

          <div className={styles.handle} aria-hidden="true">
            <span className={styles.knob}>
              <Icon name="drag" size={20} />
            </span>
          </div>

          {/* 키보드·스크린리더용 컨트롤. 마우스/터치는 위 포인터 이벤트로 처리 */}
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(pos)}
            onChange={(e) => setPos(Number(e.target.value))}
            className={styles.range}
            aria-label={`${pair.label} 전후 비교 슬라이더. 값이 클수록 청소 전 사진이 넓게 보입니다`}
            aria-valuetext={`청소 전 ${Math.round(pos)}%, 청소 후 ${100 - Math.round(pos)}%`}
          />
        </div>

        <p className={styles.disclaimer}>
          <Icon name="alert" size={16} />
          예시 이미지입니다. 실제 시공 사례가 아니며, 서비스 결과를 이해하기 위한 참고용입니다.
        </p>
      </div>
    </section>
  );
}
