import { createRoot } from "react-dom/client";
import Heading from "./components/Heading/Heading";
import Description from "./components/Description/Description";

createRoot(document.getElementById("root")).render(
  <>
    <Heading text="Hello, world!" color="crimson" />
    <Description textStyle={"italic"} />
  </>
);
