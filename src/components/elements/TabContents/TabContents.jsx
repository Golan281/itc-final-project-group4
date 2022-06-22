import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import useStore from "../../../Store/useStore";
import "./TabContents.scss";
import { nanoid } from "nanoid";

const TabContents = (workSpaceId) => {
  const userWorkSpace = useStore((state) => state.userWorkSpace);
  const currentUser = useStore((state) => state.currentUser);
  const addTab = useStore((state) => state.addTab);
  const removeTab = useStore((state) => state.removeTab);
  const [isError, setIsError] = useState(false);
  const [link, setLink] = useState("");
  const [linkName, setLinkName] = useState("");
  const [currentWorkSpace, setCurrentWorkspace] = useState([]);
  const [rerender, setRerender] = useState(true);

  const handleAddLink = () => {
    if (link === "" || linkName === "") {
      setIsError(true);
      return;
    }
    console.log(currentUser);
    let timeStamp = new Date().getTime();
    const newTab = {
      id: nanoid(),
      url:
        link.includes("http://") || link.includes("https://")
          ? link
          : `http://${link}`,
      linkName,
      timeStamp,
      workSpaceId: workSpaceId.workSpaceId,
    };
    addTab(newTab);
    setIsError(false);

    console.log(userWorkSpace);
    setRerender((prev) => !prev);
  };

  useEffect(() => {
    setCurrentWorkspace(
      userWorkSpace.filter((tab) => tab.workSpaceId === workSpaceId.workSpaceId)
    );
  }, [userWorkSpace]);

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
        {currentWorkSpace.map((tab) => (
          <div className="link-styles" key={nanoid()}>
            <span>
              <a rel="noreferrer" target="_blank" href={tab.url}>
                {tab.linkName}
              </a>
              <div>{tab.id}</div>
              <Button onClick={() => removeTab(tab.id)}>Delete link</Button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabContents;
