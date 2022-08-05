import "./Create.css";

const Create = () => {
  return (
    <div className="create">
      <h2>Create a Palette</h2>
      <div className="color-box">
        <input type="color" name="color1" className="color color1" value="#dddddd" />
        <input type="color" name="color2" className="color color2" value="#cccccc" />
        <input type="color" name="color2" className="color color3" value="#bbbbbb" />
        <input type="color" name="color2" className="color color4" value="#aaaaaa" />
      </div>
    </div>
  );
};

export default Create;
