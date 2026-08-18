"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
};

function isRuntimeUpload(src: string) {
  return src.startsWith("/uploads/") || src.startsWith("/api/media/");
}

export default function MediaImage({ src, alt, className, sizes, priority = false }: Props) {
  if (isRuntimeUpload(src)) {
    return (
      // Runtime CMS uploads are served from disk, not the build-time public folder.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`h-full w-full ${className ?? ""}`}
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
      quality={68}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={className}
    />
  );
}
