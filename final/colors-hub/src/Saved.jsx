import "./Saved.css";
import { copyToClipboard } from "./util";

const Saved = ({ colorPalettes, onRemoveSavedColorPalette }) => {
  const clickHandler = (id) => {
    onRemoveSavedColorPalette(id);
  };

  return (
    <div className="saved">
      {Object.values(colorPalettes).length > 0 ? (
        Object.values(colorPalettes).map((c, index) => (
          <div className="palette" key={index}>
            <div className="colors">
              <div className="color c1" style={{ backgroundColor: c.c1 }}>
                <span
                  className="color-name"
                  onClick={(e) => {
                    copyToClipboard(e, c.c1);
                  }}
                >
                  {c.c1}
                </span>
                <span className="toast">Copied</span>
              </div>
              <div className="color c2" style={{ backgroundColor: c.c2 }}>
                <span
                  className="color-name"
                  onClick={(e) => copyToClipboard(e, c.c2)}
                >
                  {c.c2}
                </span>
                <span className="toast">Copied</span>
              </div>
              <div className="color c3" style={{ backgroundColor: c.c3 }}>
                <span
                  className="color-name"
                  onClick={(e) => copyToClipboard(e, c.c3)}
                >
                  {c.c3}
                </span>
                <span className="toast">Copied</span>
              </div>
              <div className="color c4" style={{ backgroundColor: c.c4 }}>
                <span
                  className="color-name"
                  onClick={(e) => copyToClipboard(e, c.c4)}
                >
                  {c.c4}
                </span>
                <span className="toast">Copied</span>
              </div>
            </div>
            <div className="colors-footer">
              <button className="save-btn" onClick={() => clickHandler(c.id)}>
                Unsave
              </button>
              <span className="creator">{c.username}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="no-content">No Palettes Saved</div>
      )}
    </div>
  );
};

export default Saved;
