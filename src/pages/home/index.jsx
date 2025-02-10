import Parallex from "../../components/Parallax";
import Model from "../../components/Model";

function HomePage({ scrollY }) {
  return (
    <section>
      <Parallex scrollY={scrollY} />
      <Model scrollY={scrollY} />
      <div className="h-80 place-content-center">
        <h1 className="place-self-center text-3xl font-bold underline">
          Hello world!
        </h1>
      </div>
    </section>
  );
}

export default HomePage;