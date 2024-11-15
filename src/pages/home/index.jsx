import Parallex from "../../components/Parallax";
function HomePage() {
  return (
    <div>
      <Parallex />
      <div className="h-80 place-content-center">
        <h1 className="place-self-center text-3xl font-bold underline">
          Hello world!
        </h1>
        <div className="h-10 w-10 bg-white place-self-center"></div>
      </div>
      
    </div>
  );
}

export default HomePage;