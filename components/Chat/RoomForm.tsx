import { FormEvent, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { MIN_USERNAME_LENGTH } from "@/utils/Constants";
import "./RoomForm.scss";

type RoomFormProps = {
  handleSubmit: (user: TUserInfo) => void;
};

type TErrorState = {
  [K in keyof TUserInfo]?: string;
};

const RoomForm = ({ handleSubmit }: RoomFormProps) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [errors, setErrors] = useState<TErrorState | null>(null);

  const onJoin = (event: FormEvent) => {
    event.preventDefault();

    if (errors) {
      const { username: usernameErr, room: roomErr } = errors;
      if (
        username !== "" &&
        room !== "" &&
        username == null &&
        roomErr == null
      ) {
        const user = {
          username,
          room,
        };
        handleSubmit(user);
      } else {
        // if both the field are null
        if (!usernameErr && !roomErr) {
          setErrors({
            username: "Username can't be empty!",
            room: "Room name can't be empty!",
          });
        }
      }
    }
  };

  /**
   * Validating form fields
   */
  const validate = ({ name, value }: HTMLInputElement) => {
    let usernameErr = errors?.username;
    let roomErr = errors?.room;

    switch (name) {
      case "username":
        if (value.length == 0) {
          usernameErr = "Username can't be empty!";
        } else if (value.length < MIN_USERNAME_LENGTH) {
          usernameErr = "Username is too short!";
        } else {
          usernameErr = undefined;
        }
        break;
      case "room":
        if (value.length == 0) {
          roomErr = "Room name can't be empty!";
        } else if (value.length > 0 && value.includes(" ")) {
          roomErr = "Room name can't have spaces!";
        } else {
          roomErr = undefined;
        }
        break;
    }
    setErrors({
      username: usernameErr,
      room: roomErr,
    });
  };

  return (
    <div className="chat-form-container container">
      <div className="row justify-content-center m-0 text-center">
        <h2 className="mt-5 mb-5">Welcome again to Anomly!</h2>
      </div>
      <div className="row justify-content-center align-items center m-0">
        <div className="chat-form col-11 col-sm-6 col-md-4 p-0">
          <div className="row justify-content-center align-items-center m-0">
            <Link href="/">
              <a>
                <img src="/images/chat-logo1.png" alt="icon" />
              </a>
            </Link>
          </div>
          <form onSubmit={onJoin}>
            <div
              className={clsx("form-group", {
                error: errors?.username,
              })}>
              <label>Display name</label>
              <input
                className="form-control"
                type="text"
                name="username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  validate(event.target);
                }}
              />
              {errors?.username && (
                <span>
                  <i className="fa fa-exclamation-triangle"></i>
                  <small className="pl-2">{errors.username}</small>
                </span>
              )}
            </div>
            <div
              className={clsx("form-group", {
                error: errors?.room,
              })}>
              <label>Room name</label>
              <input
                className="form-control"
                type="text"
                name="room"
                value={room}
                onChange={(event) => {
                  setRoom(event.target.value);
                  validate(event.target);
                }}
              />
              {errors?.room && (
                <span>
                  <i className="fa fa-exclamation-triangle"></i>
                  <small className="pl-2">{errors.room}</small>
                </span>
              )}
            </div>

            <input className="btn" type="submit" value="Join Chat" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomForm;
