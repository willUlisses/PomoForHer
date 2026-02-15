interface OptionsProps {
    activeOption: string,
    onOptionSelect: (option: string) => void
}

const Options = ({activeOption, onOptionSelect} : OptionsProps) => {
    const options = ["25/5", "50/10", "100/20"];

    return (
       <ul className="w-fit text-2xl font-bold tracking-wider grid grid-cols-3 text-white bg-violet-900 overflow-hidden rounded-xl divide-zinc-100 shadow-2xl">
            {
                options.map((timeOption) => {
                    const isActive = (activeOption === timeOption);
                    return (
                        <li 
                        key={timeOption}
                        onClick={() => {onOptionSelect(timeOption)}}
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