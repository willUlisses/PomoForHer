interface ToastProps {
  message: string;
  visible: boolean;
}

const RestToast = ({ message, visible } : ToastProps) => {
  return (
    <div
      className={`
        absolute -top-16 left-1/2 -translate-x-1/2 
        bg-emerald-500 text-white px-6 py-2 rounded-full shadow-xl font-bold
        transition-all duration-500 ease-in-out z-50 whitespace-nowrap
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      {message}
    </div>
  );
};

export default RestToast;