import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateDocs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new high-fidelity documents catalog
    navigate("/documents", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse text-primary font-black uppercase tracking-widest text-[10px]">
        Redirecting to Document Studio...
      </div>
    </div>
  );
};

export default CreateDocs;