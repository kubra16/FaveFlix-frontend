import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [playlistName, setPlayListName] = useState("");
  const [isCreateModal, setCreateModal] = useState(false);
  const [playList, setPlaylist] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (userInfo) navigate();
  }, [navigate]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        playlistName,
        setPlayListName,
        isCreateModal,
        setCreateModal,
        playList,
        setPlaylist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
