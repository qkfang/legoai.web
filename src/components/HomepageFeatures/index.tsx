import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link'; 

type FeatureItem = {
  title: string;
  img: string;
  link: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'FIRST LEGO League',
    img: "/img/fll.jpg",
    link: "/blog/tags/fll",
    description: (
      <>
      FLL is not just about winning - it's about learning, growing, and having fun as young minds tackle real-world problems through STEM and innovation. Our team is diving into the FLL season with excitement, focusing on tackling the season's challenges with a strategic approach.
      </>
    ),
  },
  {
    title: 'AI Innovation',
    img: "/img/ai.png",
    link: "/blog/tags/ai",
    description: (
      <>
      Share insights from workshops, hackathons, and presentations. Showcase how AI tools like Azure, ChatGPT, and DALL-E can improve learning experiences, especially in fields like robotics and coding. Combine passion with AI technology to create innovative and accessible solutions, both for students and developers alike.
      </>
    ),
  },
  {
    title: 'Robotics',
    img: "/img/legoai.png",
    link: "/blog/tags/robotics",
    description: (
      <>
      Embarked on a robotics journey using the LEGO Spike Prime kit, diving into its Python coding interface and unlocking advanced features like motor control and sensors. Enhance robotics and coding skills through practical application and experimentation. Grow your confidence and curiosity!
      </>
    ),
  },
];

function Feature({title, img, link, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={link}></a>
        <Link to={link}><img className={styles.featureSvg} role="img" src={img} /></Link>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link to={link}>Read More</Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
