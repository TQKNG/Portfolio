import { useEffect, useState, type ImgHTMLAttributes } from "react";

interface AssetImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  localSrc?: string;
}

export const AssetImage = ({ src, localSrc, onError, ...props }: AssetImageProps) => {
  const [imageSrc, setImageSrc] = useState(localSrc ?? src);

  useEffect(() => {
    setImageSrc(localSrc ?? src);
  }, [localSrc, src]);

  const handleError: NonNullable<ImgHTMLAttributes<HTMLImageElement>["onError"]> =
    (event) => {
      if (imageSrc !== src) {
        setImageSrc(src);
        return;
      }

      onError?.(event);
    };

  return <img {...props} src={imageSrc} onError={handleError} />;
};
