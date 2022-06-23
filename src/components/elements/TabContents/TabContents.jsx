import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import useStore from "../../../Store/useStore";
import "./TabContents.scss";
import { nanoid } from "nanoid";
import axios from "axios";

const TabContents = (workSpaceIDName) => {
  const userWorkSpace = useStore((state) => state.userWorkSpace);
  const deleteWorkSpace = useStore((state) => state.deleteWorkSpace);
  const getTabsFromServer = useStore((state) => state.getTabsFromServer);
  const currentUser = useStore((state) => state.currentUser);
  const addTab = useStore((state) => state.addTab);
  const removeTab = useStore((state) => state.removeTab);
  const [isError, setIsError] = useState(false);
  const [link, setLink] = useState("");
  const [linkName, setLinkName] = useState("");
  const [currentWorkSpace, setCurrentWorkspace] = useState([]);
  const [rerender, setRerender] = useState(true);
  const [currentTabId, setCurrentTabId] = useState("");
  const [currentWorkSpaceId, setCurrentWorkSpaceId] = useState("");

  const CREATE_TAB_URL = `http://localhost:8000/v1/workspace/createTab/${currentWorkSpaceId}`;
  const GET_ALL_WORKSPACES = `http://localhost:8000/v1/workspace/${currentUser.id}`;
  const DELETE_TAB = `http://localhost:8000/v1/workspace/:${currentTabId}`;
  const ARCHIVE_TAB = `http://localhost:8000/v1/workspace/ArchiveTab`;

  useEffect(() => {
    setCurrentWorkSpaceId(workSpaceIDName.workSpaceIDName);
  }, []);

  useEffect(() => {
    const getWorkSpaces = async () => {
      try {
        const res = await axios.get(
          GET_ALL_WORKSPACES,

          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${currentUser.accessToken}`,
            },

            params: {
              userID: currentUser.id,
            },

            withCredentials: true,
          }
        );

        await deleteWorkSpace();
        await addTab(res.data);
        const workSpaceToShow = userWorkSpace[0].filter(
          (workSpace) =>
            workSpace.workSpaceName === workSpaceIDName.workSpaceIDName
        );
        if (workSpaceToShow[0]) {
          setCurrentWorkspace(workSpaceToShow[0].currentUserTabs);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getWorkSpaces();
  }, []);

  const handleAddLink = async () => {
    if (link === "" || linkName === "") {
      setIsError(true);
      return;
    }

    let timeStamp = new Date().getTime();
    const newTab = {
      id: nanoid(),
      tabURL:
        link.includes("http://") || link.includes("https://")
          ? link
          : `http://${link}`,
      tabName: linkName,
      timeStamp,
    };
    try {
      const res = await axios.post(
        CREATE_TAB_URL,
        JSON.stringify({
          newTab,

          userID: currentUser.id,
          workSpaceName: currentWorkSpaceId,
        }),
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${currentUser.accessToken}`,
          },

          // params: {
          //   workSpaceId: workSpaceIDName.workSpaceIDName,
          // },

          withCredentials: true,
        }
      );
      setCurrentWorkspace(res.data.workspace.currentUserTabs);
    } catch (err) {
      console.log(err);
    }
    setIsError(false);
    setRerender((prev) => !prev);
  };

  const removeTabFromServer = async (id) => {
    setCurrentTabId(id);
    try {
      const res = await axios.patch(
        DELETE_TAB,
        JSON.stringify({
          userID: currentUser.id,
          workSpaceName: workSpaceIDName.workSpaceIDName,
          tabId: id,
        }),
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${currentUser.accessToken}`,
          },

          params: {
            tabId: currentTabId,
          },

          withCredentials: true,
        }
      );

      setCurrentWorkspace(res.data.workspace.currentUserTabs);
      setRerender((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(currentWorkSpace);
  }, [currentWorkSpace]);

  // const moveToArchive = async (tabId) => {
  //   try {
  //     const res = await axios.post(
  //       ARCHIVE_TAB,
  //       JSON.stringify({
  //         // userID: currentUser.id,
  //         workSpaceName: workSpaceIDName.workSpaceIDName,
  //         tabId: tabId,
  //       }),
  //       {
  //         headers: {
  //           "content-type": "application/json",
  //           Authorization: `Bearer ${currentUser.accessToken}`,
  //         },

  //         withCredentials: true,
  //       }
  //     );
  //     console.log(res.data.workspace.currentUserTabs);
  //     setCurrentWorkspace(res.data.workspace.currentUserTabs);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <div className="main-container">
        <div className="TabContents">
          <TextField
            error={isError === true && link === ""}
            helperText={
              isError === true && link === ""
                ? "Please copy a URL to add"
                : "Insert URL"
            }
            id="outlined-basic"
            label="Add link"
            variant="outlined"
            value={link}
            size="medium"
            onChange={(e) => setLink(e.target.value)}
          />
          <TextField
            error={isError === true && linkName === ""}
            helperText={
              isError === true && linkName === ""
                ? "Please name your new link"
                : "insert name for your new link"
            }
            id="outlined-basic"
            label="Link name"
            variant="outlined"
            value={linkName}
            size="medium"
            onChange={(e) => setLinkName(e.target.value)}
          />
          <Button
            disabled={
              (isError === true && link === "") ||
              (isError === true && linkName === "")
            }
            onClick={handleAddLink}
          >
            Add link
          </Button>
        </div>
      </div>
      <div className="links">
        {currentWorkSpace
          // .filter((tab) => tab.isArchived === true)
          .map((tab) => (
            <div className="link-styles" key={nanoid()}>
              <span>
                <div> {/* <Button>Archive</Button> */}</div>
                <a rel="noreferrer" target="_blank" href={tab.tabURL}>
                  {tab.tabName}
                </a>

                <Button onClick={() => removeTabFromServer(tab._id)}>
                  Delete link
                </Button>
              </span>
            </div>
          ))}
      </div>

      {/* <div className="links">
        {currentWorkSpace.map((tab) => (
          <div className="link-styles-Archived" key={nanoid()}>
            <span>
              <a rel="noreferrer" target="_blank" href={tab.tabURL}>
                {tab.tabName}
              </a>
              <div>{tab.tabURL}</div>
              <Button onClick={() => removeTabFromServer(tab._id)}>
                Discard
              </Button>
            </span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default TabContents;
