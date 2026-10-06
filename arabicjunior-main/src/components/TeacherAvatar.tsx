import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The four original teacher illustrations, which have their coloured blob
 * drawn into the PNG. Only these are shown as they are.
 */
const ORIGINAL_ART = new Set([
  "/first-teacher.png",
  "/second-teacher.png",
  "/third-teacher.png",
  "/fourth-teacher.png",
]);

/**
 * The same four blobs on their own (public/teacher-blobs), cut from the
 * original illustrations — same shapes, same colours.
 */
const BLOBS = [1, 2, 3, 4].map((n) => `/teacher-blobs/blob-${n}.png`);

/**
 * A teacher's picture on its coloured "curve circle".
 *
 * Any picture that is not one of the original illustrations — an upload from
 * the admin screen, or any other cut-out — is placed on one of the four blob
 * designs in turn, and clipped to that shape, so every new teacher matches the
 * original set without anyone having to edit the image.
 */
export default function TeacherAvatar({
  src,
  alt,
  index = 0,
  className,
  sizes = "128px",
}: {
  src: string;
  alt: string;
  /** Position in the list; picks the blob design so neighbours differ. */
  index?: number;
  className?: string;
  sizes?: string;
}) {
  if (ORIGINAL_ART.has(src)) {
    return (
      <Image
        src={src}
        width={256}
        height={256}
        alt={alt}
        sizes={sizes}
        className={cn("w-full aspect-square object-cover", className)}
      />
    );
  }

  const blob = BLOBS[index % BLOBS.length];
  const shape: React.CSSProperties = {
    backgroundImage: `url(${blob})`,
    backgroundSize: "100% 100%",
    // The blob is also the mask, so the figure is cut to the same curve.
    WebkitMaskImage: `url(${blob})`,
    maskImage: `url(${blob})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
  };

  return (
    <div className={cn("relative w-full aspect-square", className)} style={shape}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        // Upper body standing on the bottom edge, as in the original art.
        className="object-contain object-bottom scale-[1.06] origin-bottom"
      />
    </div>
  );
}
