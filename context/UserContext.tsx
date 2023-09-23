import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";

export type TUserContext = {
  user: TUserInfo | null;
  setUser: Dispatch<SetStateAction<TUserInfo | null>>;
};

export const UserContext = createContext({
  user: null,
} as TUserContext);

function UserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<TUserInfo | null>(null);

  const context: TUserContext = useMemo(() => {
    return {
      user,
      setUser,
    };
  }, [user, setUser]);

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;
