import type { ReactNode } from "react";

interface ToastProps {
  children: ReactNode;
  visible: boolean;
}

const RestToast = ({ children, visible }: ToastProps) => {
  return (
    <div
      className={`
        absolute -top-16 left-1/2 -translate-x-1/2 
        bg-violet-900 text-white text-lg px-6 p-3 rounded-full shadow-xl font-bold tracking-wider
        transition-all duration-500 ease-in-out z-50 whitespace-nowrap
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      {children}
    </div>
  );
};

export default RestToast;