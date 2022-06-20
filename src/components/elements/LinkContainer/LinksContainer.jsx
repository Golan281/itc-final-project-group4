// import { useState } from "react";
// import { nanoid } from "nanoid";
// import { Button } from "@mui/material";
// import TabContents from "../TabContents/TabContents";
// import "./LinksContainer.scss";
// import useStore from "../../../Store/useStore";

// const LinkContainer = () => {
//   const links = useStore((state) => state.links);
//   const setLinks = useStore((state) => state.setLinks);

//   const handleCreateNewLink = () => {
//     const newLink = <TabContents key={nanoid()} id={nanoid()} />;
//     setLinks(...links, newLink);
//     console.log(links);
//   };

//   return (
//     <div className="main-container">
//       <Button onClick={handleCreateNewLink}>Add a new link</Button>
//       <div className="linksContainer">{links.map((userLink) => {})}</div>
//     </div>
//   );
// };

// export default LinkContainer;
