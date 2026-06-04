import { AuthProvider } from "./components/AuthContext";
import SchedulerApp from "./components/SchedulerApp";

export default function Home() {
  return (
    <AuthProvider>
      <SchedulerApp />
    </AuthProvider>
  );
}
