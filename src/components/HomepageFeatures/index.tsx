import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Step-by-Step Tutorials",
    Svg: require("@site/static/img/stairs.svg").default,
    description: (
      <>
        Follow a clear and structured path to master programming concepts.
        Tutorials designed to guide you through each step effortlessly.
      </>
    ),
  },
  {
    title: "Deep Dive Explanations",
    Svg: require("@site/static/img/analyze.svg").default,
    description: (
      <>
        Explore every topic in depth with detailed explanations, practical
        examples, and visual aids that make learning immersive.
      </>
    ),
  },
  {
    title: "Code as You Learn",
    Svg: require("@site/static/img/code.svg").default,
    description: (
      <>
        Engage with hands-on coding sessions directly within the tutorials.
        Learn by doing, with practical exercises and interactive examples.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
