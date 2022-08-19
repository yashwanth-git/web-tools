import "./About.css";

const About = () => {
  return (
    <div className="about">
      <h2 className="about-heading">About ColorsHub</h2>
      <p className="about-desc">
        ColorsHub is a collection of user created color palettes to share
        between other developers and designers. Feel free to add your color
        palette suggestion in the create option.
      </p>
      <div className="about-details">
        <p>Created by</p>
        <p>Yashwanth Sridharan</p>
      </div>
    </div>
  );
};

export default About;
