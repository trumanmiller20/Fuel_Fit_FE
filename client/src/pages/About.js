import SideBar from '../components/SideBar'

const About = () => {
  return (
    <div className="about">
      <SideBar />
      <div className="mission-statement">
        <h1>About FUELfit</h1>
        <p>
          More than a nutrition tracking app, FUELfit represents the potential
          to fundamentally change your perspective on food.
          <br />
          <br />
          Once you commit to and embrace this potential, your choice in fuel
          will allow you to accomplish more, maintain higher energy levels, feel
          better, and live confidently.
          <br />
          <br />
          Our goal is to enable this positive change by educating you on your
          body's specific needs, enabling you to set realistic, long term,
          life-altering goals.Our hope is to convey that this methodology is
          achievable without adopting severe eating practices.
          <br />
          <br />
          "He who has health has hope and he who has hope has everything."
          <br />- Arabian Proverb
        </p>
      </div>
    </div>
  )
}

export default About
