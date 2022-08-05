import { useState } from "react";
import "./Create.css";

const Create = () => {
  const [colors, setColors] = useState({
    c1: "#dddddd",
    c2: "#cccccc",
    c3: "#bbbbbb",
    c4: "#aaaaaa",
  });

  const changeHandler = (e) => {
    console.log(e.target.value);
    setColors({ ...colors, [e.target.name]: e.target.value });
  };
  return (
    <div className="create">
      <h2>Create a Palette</h2>
      <div className="color-box">
        <input
          type="color"
          name="c1"
          className="color color1"
          value={colors.c1}
          onChange={changeHandler}
        />
        <input
          type="color"
          name="c2"
          className="color color2"
          value={colors.c2}
          onChange={changeHandler}
        />
        <input
          type="color"
          name="c3"
          className="color color3"
          value={colors.c3}
          onChange={changeHandler}
        />
        <input
          type="color"
          name="c4"
          className="color color4"
          value={colors.c4}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};

export default Create;
