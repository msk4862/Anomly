const FloatButton = ({
    htmlFor,
    icon,
    type,
    color,
    accept,
    onClick,
    onChange,
}) => (
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
