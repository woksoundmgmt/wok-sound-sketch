const FloatingElements = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Placeholder circles for logo elements */}
      <div className="absolute top-[15%] left-[5%] w-16 h-16 rounded-full sketch-border-thin animate-float opacity-20" />
      <div className="absolute top-[30%] right-[8%] w-24 h-24 rounded-full sketch-border-thin animate-float-slow opacity-15" />
      <div className="absolute top-[60%] left-[3%] w-12 h-12 sketch-border-thin animate-float-reverse opacity-20" />
      <div className="absolute top-[75%] right-[5%] w-20 h-20 rounded-full sketch-border-thin animate-float opacity-10" />
      <div className="absolute top-[45%] left-[90%] w-14 h-14 sketch-border-thin animate-float-slow opacity-15" />
      <div className="absolute top-[10%] right-[30%] w-10 h-10 rounded-full sketch-border-thin animate-float-reverse opacity-10" />
      
      {/* Cross/X marks */}
      <div className="absolute top-[20%] right-[20%] text-4xl font-heading opacity-10 animate-float-slow select-none">✕</div>
      <div className="absolute top-[50%] left-[15%] text-3xl font-heading opacity-10 animate-float select-none">✕</div>
      <div className="absolute top-[80%] left-[40%] text-2xl font-heading opacity-10 animate-float-reverse select-none">✕</div>
    </div>
  );
};

export default FloatingElements;
