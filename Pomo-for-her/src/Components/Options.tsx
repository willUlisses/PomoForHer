import { useState } from "react";


const Options = () => {
    const [activeOption, setActiveOption] = useState<string>("15/2")

    const options = ["15/2", "30/5", "60/10"];

    return (
       <ul className="w-fit text-2xl grid grid-cols-3 text-white font-medium bg-violet-900 overflow-hidden rounded-xl divide-zinc-100 shadow-2xl">
            {
                options.map((time) => {
                    const isActive = (activeOption === time);
                    return (
                        <li 
                        key={time}
                        onClick={() => {setActiveOption(time)}}
                        className={`
                        px-10 py-3 cursor-pointer transition-all duration-200
                        ${isActive ? 'bg-violet-600' : 'hover:bg-white/5'}
                        `}
                        >
                            {time}
                        </li>
                    );
                })
            }
       </ul> 
    )
}

export default Options;