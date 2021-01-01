import AWS_Ops from "../../utils/AWS_S3";
import "../../styles/floatingButtonList.scss";
import FloatButton from "./FloatButton";
import Message from "../../utils/Message";

const FloatingButtonList = ({
    onSend,
    isVisible,
    toggleVisibility,
    setProgress,
}) => {
    let display;
    if (isVisible) display = "block";
    else display = "none";

    const uploadFile = (event, type) => {
        const file = event.target.files[0];
        if (!file) return;

        // creating an instance of AWS oprations class to use its s3 upload
        let up = new AWS_Ops();
        const { uploadHandler, url } = up.uploadToS3(file);

        uploadHandler
            .on("httpUploadProgress", (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100));
            })
            .promise()
            .then(() => onSend(url, type))
            .catch((err) => console.log(err))
            .finally(setProgress(0));
    };

    return (
        <ul style={{ display: `${display}` }} className="float-menu ">
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
