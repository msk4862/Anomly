type TMessageTypes = "text" | "bot" | "image" | "video" | "file" | "others";

type TextMessageTypes = Extract<TMessageTypes, "text" | "bot">;
type FileMessageTypes = Exclude<TMessageTypes, TextMessageTypes>;

type TUser = {
  id: string;
  username: string;
  room: string;
};

type TUserInfo = Omit<TUser, "id">;
