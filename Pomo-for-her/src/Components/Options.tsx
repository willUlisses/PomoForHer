import { useState } from "react";


const Options = () => {
    const [activeOption, setActiveOption] = useState<string>("25/5")

    const options = ["25/5", "50/10", "100/20"];

    return (
       <ul className="w-fit text-2xl grid grid-cols-3 text-white font-medium bg-violet-900 overflow-hidden rounded-xl divide-zinc-100 shadow-2xl">
            {
                options.map((timeOption) => {
                    const isActive = (activeOption === timeOption);
                    return (
                        <li 
                        key={timeOption}
                        onClick={() => {setActiveOption(timeOption)}}
                        className={`
                        px-10 py-3 cursor-pointer transition-all duration-200
                        ${isActive ? 'bg-violet-600' : 'hover:bg-white/5'}
                        `}
                        >
                            {timeOption}
                        </li>
                    );
                })
            }
       </ul> 
    )
}

export default Options;