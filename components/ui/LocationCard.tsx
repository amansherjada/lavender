"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldButton from "@/components/ui/GoldButton";
import { cn } from "@/lib/utils";

interface LocationCardProps {
  name: string;
  image: string;
  className?: string;
  href?: string;
}

export default function LocationCard({
  name,
  image,
  className,
  href,
}: LocationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    setTilt({
      x: -(mouseY / (rect.height / 2)) * 6,
      y: (mouseX / (rect.width / 2)) * 6,
    });
  };

  const inner = (
    <div className="group relative h-full cursor-pointer overflow-hidden rounded-2xl">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <SectionLabel text="Exclusive" />
        <h3 className="mb-4 font-display text-[30px] font-light text-white">
          {name}
        </h3>
        <GoldButton variant="outline" label="Explore" size="sm" />
      </div>
    </div>
  );

  return (
    <div
      ref={cardRef}
      className={cn("location-card relative h-full", className)}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.6s ease-out",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
    >
      {href ? (
        <Link href={href} className="block h-full">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}
