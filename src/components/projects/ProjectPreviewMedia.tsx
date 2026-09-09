import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { cn } from "@/lib/utils";
import { Project } from "@/types";

interface ProjectPreviewMediaProps {
  project: Project;
  className?: string;
}

const canPlayHoverPreview = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const ProjectPreviewMedia = ({
  project,
  className,
}: ProjectPreviewMediaProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHoveringRef = useRef(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoSrc, setVideoSrc] = useState(
    project.localPreviewVideo ?? project.previewVideo,
  );

  useEffect(() => {
    isHoveringRef.current = false;
    setIsPreviewPlaying(false);
    setVideoFailed(false);
    setVideoSrc(project.localPreviewVideo ?? project.previewVideo);
  }, [project.localPreviewVideo, project.previewVideo]);

  useEffect(() => {
    const video = videoRef.current;

    return () => {
      video?.pause();
    };
  }, []);

  const stopPreview = () => {
    isHoveringRef.current = false;
    setIsPreviewPlaying(false);

    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      !videoSrc ||
      videoFailed ||
      !canPlayHoverPreview()
    ) {
      return;
    }

    isHoveringRef.current = true;
    void videoRef.current?.play().catch(() => {
      setIsPreviewPlaying(false);
    });
  };

  const handleVideoError = () => {
    if (project.previewVideo && videoSrc !== project.previewVideo) {
      setIsPreviewPlaying(false);
      setVideoSrc(project.previewVideo);
      return;
    }

    setVideoFailed(true);
    stopPreview();
  };

  const handleVideoCanPlay = () => {
    if (!isHoveringRef.current) return;

    void videoRef.current?.play().catch(() => {
      setIsPreviewPlaying(false);
    });
  };

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={stopPreview}
    >
      <AssetImage
        src={project.heroImage}
        localSrc={project.localHeroImage}
        alt={project.title}
        className={cn(
          "h-full w-full object-cover grayscale transition-opacity duration-300",
          isPreviewPlaying ? "opacity-0" : "opacity-100",
        )}
      />

      {videoSrc && !videoFailed && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => {
            if (isHoveringRef.current) setIsPreviewPlaying(true);
          }}
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            isPreviewPlaying ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
};
