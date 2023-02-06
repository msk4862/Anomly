import "../../styles/floatingButtonList.scss";
import FloatButton from "./FloatButton";
import { Message } from "../../utils/Message";
import { uploadToAzure } from "../../utils/uploadFiles";

const FloatingButtonList = ({
    onSend,
    isVisible,
    toggleVisibility,
    setProgress,
}) => {
    let animate;
    if (isVisible) animate = "animate-reveal";
    else animate = "animate-hide";

    const uploadFile = (event, type) => {
        const file = event.target.files[0];
        if (!file) return;

        const { uploadPromise, fileUrl } = uploadToAzure(file, (progress) => {
            setProgress(Math.floor(progress * 100));
        });

        uploadPromise
            .then(() => onSend(fileUrl, file.name, type))
            .catch((err) => console.error(err))
            .finally(() => setProgress(0)); // this will make uploading progress bar hidden
    };

    return (
        <ul className={`float-menu ${animate}`}>
            <li className="mb-3">
                <FloatButton
                    htmlFor={"image-upload"}
                    type={Message.IMAGE}
                    icon={"fa fa-image"}
                    accept={"image/*"}
                    onClick={toggleVisibility}
                    onChange={uploadFile}
                    color={"#f05454"}
                />
            </li>
            <li className="mb-3">
                <FloatButton
                    htmlFor={"video-upload"}
                    icon={"fa fa-play"}
                    type={Message.VIDEO}
                    accept={"video/*"}
                    onClick={toggleVisibility}
                    onChange={uploadFile}
                    color={"#a685e2"}
                />
            </li>
            <li className="mb-4">
                <FloatButton
                    htmlFor={"doc-upload"}
                    icon={"fa fa-file"}
                    type={Message.FILE}
                    accept={".doc,.docx,.xml,.pdf,.txt"}
                    onClick={toggleVisibility}
                    onChange={uploadFile}
                    color={"#70af85"}
                />
            </li>
        </ul>
    );
};

export default FloatingButtonList;
