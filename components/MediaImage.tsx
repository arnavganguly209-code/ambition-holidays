import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
};

/** Local / uploaded photos with lazy decode so mobile GPUs stay calm. */
export default function MediaImage({ src, alt, className, sizes, priority = false }: Props) {
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
