import { ChangeEvent, ComponentPropsWithoutRef } from "react";

type Props = {
  htmlFor: Pick<ComponentPropsWithoutRef<"label">, "htmlFor">["htmlFor"];
  icon: string;
  type: FileMessageTypes;
  color: `#${string}`;
  accept: Pick<ComponentPropsWithoutRef<"input">, "accept">["accept"];
  onClick: () => void;
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
    type: FileMessageTypes
  ) => void;
};

const FloatButton = ({
  htmlFor,
  icon,
  type,
  color,
  accept,
  onClick,
  onChange,
}: Props) => (
  <>
    <label
      style={{ backgroundColor: `${color}` }}
      className="circular-btn"
      htmlFor={htmlFor}>
      <i className={icon}></i>
    </label>
    <input
      id={htmlFor}
      accept={accept}
      type="file"
      onClick={onClick}
      onChange={(evt) => onChange(evt, type)}
    />
  </>
);

export default FloatButton;
