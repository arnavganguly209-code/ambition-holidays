"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  objectPosition?: string;
};

function isRuntimeUpload(src: string) {
  return src.startsWith("/uploads/") || src.startsWith("/api/media/");
}

export default function MediaImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
  objectPosition = "center 28%",
}: Props) {
  const style = { objectPosition };

  if (isRuntimeUpload(src)) {
    return (
      // Runtime CMS uploads are served from disk, not the build-time public folder.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`h-full w-full ${className ?? ""}`}
        style={style}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={78}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={className}
      style={style}
    />
  );
}
