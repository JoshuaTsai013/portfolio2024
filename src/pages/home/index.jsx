import Parallex from "../../components/Parallax";
import Model from "../../components/Model";
function HomePage() {
  return (
    <div>
     
      <Parallex />
      <Model />
      <div className="h-80 place-content-center">
        <h1 className="place-self-center text-3xl font-bold underline">
          Hello world!
        </h1>
      </div>
    </div>
  );
}

export default HomePage;