import "./Home.css";

const Home = ({ colorPalettes }) => {
  return (
    <div className="home">
      {Object.values(colorPalettes).length > 0 ? (
        Object.values(colorPalettes).map((c, index) => (
          <div className="palette">
            <div className="colors">
              <div className="color c1" style={{ backgroundColor: c.c1 }}>
                <span className="color-name">{c.c1}</span>
              </div>
              <div className="color c2" style={{ backgroundColor: c.c2 }}>
                <span className="color-name">{c.c2}</span>
              </div>
              <div className="color c3" style={{ backgroundColor: c.c3 }}>
                <span className="color-name">{c.c3}</span>
              </div>
              <div className="color c4" style={{ backgroundColor: c.c4 }}>
                <span className="color-name">{c.c4}</span>
              </div>
            </div>
            <div className="colors-footer">
              <button className="save-btn">Save</button>
              <span className="creator">{c.username}</span>
            </div>
          </div>
        ))
      ) : (
        <div>No Colors</div>
      )}
    </div>
  );
};

export default Home;
