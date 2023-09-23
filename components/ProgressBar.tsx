import { useEffect, useRef } from "react";
import "./ProgressBar.scss";

type ProgressBarProps = {
  progress: number;
  color: string;
};

const ProgressBar = ({ progress, color }: ProgressBarProps) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    var bar = progressBarRef.current;
    if (bar) bar.style.width = progress + "%";
  }, [progress]);

  return (
    <div className="progress-wrapper">
      <small>Uploading...</small>
      <div className="progress">
        <div
          aria-label="file upload progress"
          ref={progressBarRef}
          className="progress-bar progress-bar-striped"
          style={{ backgroundColor: color }}
          role="progressbar">
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
