import useAuth from "../hooks/useAuth";

const Dashboard = () => {

  const { user } = useAuth();

  return (
    <section className="min-h-screen bg-slate-100 flex items-center justify-center">
      
      <div className="bg-white p-10 rounded-3xl shadow-lg text-center">
        
        <h1 className="text-5xl font-bold">
          Welcome Dashboard
        </h1>

        <p className="text-slate-500 mt-5 text-xl">
          Logged in as:
        </p>

        <p className="text-blue-600 font-bold mt-2 text-2xl">
          {user?.email}
        </p>
      </div>
    </section>
  );
};

export default Dashboard;