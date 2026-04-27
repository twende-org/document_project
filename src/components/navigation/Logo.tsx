import logo from "../../assets/logo_docs.png";

export const Logo = () => {
  return (
    <div className="flex items-center select-none group cursor-pointer">
      <div className="text-xl font-black tracking-tighter flex items-center gap-0.5">
        <span className="text-white uppercase">Twende</span>
        <span className="text-primary uppercase border-l-2 border-primary/20 pl-1 ml-1">Documents</span>
      </div>
    </div>
  );
};
