import FloatButton from "./FloatButton";
import { uploadToAzure } from "../../utils/uploadFiles";
import "./FloatingButtonList.scss";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  onSend: (url: string, fileName: string, type: FileMessageTypes) => void;
  isVisible: boolean;
  toggleVisibility: () => void;
  setProgress: Dispatch<SetStateAction<number>>;
};

const FloatingButtonList = ({
  onSend,
  isVisible,
  toggleVisibility,
  setProgress,
}: Props) => {
  let animate;
  if (isVisible) animate = "animate-reveal";
  else animate = "animate-hide";

  const uploadFile = (
    event: ChangeEvent<HTMLInputElement>,
    type: FileMessageTypes
  ) => {
    const file = event.target.files?.[0];
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
          type="image"
          icon={"fa fa-image"}
          accept={"image/*"}
          onClick={toggleVisibility}
          onChange={uploadFile}
          color="#f05454"
        />
      </li>
      <li className="mb-3">
        <FloatButton
          htmlFor={"video-upload"}
          icon={"fa fa-play"}
          type="video"
          accept={"video/*"}
          onClick={toggleVisibility}
          onChange={uploadFile}
          color="#a685e2"
        />
      </li>
      <li className="mb-4">
        <FloatButton
          htmlFor={"doc-upload"}
          icon={"fa fa-file"}
          type="file"
          accept={".doc,.docx,.xml,.pdf,.txt"}
          onClick={toggleVisibility}
          onChange={uploadFile}
          color="#70af85"
        />
      </li>
    </ul>
  );
};

export default FloatingButtonList;
