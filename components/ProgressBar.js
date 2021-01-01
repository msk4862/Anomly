import { useEffect, useRef } from "react";
import "../styles/progressBar.scss";

const ProgressBar = ({ progress, color }) => {
    const progressBarRef = useRef(null);

    useEffect(() => {
        var bar = progressBarRef.current;
        if (bar) bar.style.width = progress + "%";
    }, [progress]);

    return (
        <div className="progress-wrapper">
            <small>Uploading...</small>
            <div className="progress">
                <div
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
