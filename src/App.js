import Calculator from "./components/Calculator";

const App = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-2 bg-blue-200">
      <p className="text-3xl font-bold">React Calculator App</p>
      <Calculator />
      <p className="text-xl font-bold">Coded by Ethan Safai</p>
    </div>
  );
};

export default App;
