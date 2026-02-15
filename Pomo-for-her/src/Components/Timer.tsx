import { useEffect, useState } from "react";
import Options from "./Options";



function timeFormat(timeInSeconds: number): string {
    const minutesUnit: number = Math.floor(timeInSeconds / 60);
    const secondsUnit: number = Math.floor(timeInSeconds % 60);

    return `${minutesUnit.toString().padStart(2, "0")}:${secondsUnit.toString().padStart(2, "0")}`;
}

const Timer = () => {
    const [activeOption, setActiveOption] = useState<string>("25/5")
    const [workTime, setWorkTime] = useState<number>(1500)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const handleOptionSwitch = (option: string) => {
        setActiveOption(option);
        setIsPlaying(false);

        const [minuteString] = option.split("/"); // pego o tempo em minutos total
        const timeInSeconds = parseInt(minuteString) * 60; // transformo o tempo de minutos pro total dele em segundos

        setWorkTime(timeInSeconds); // mudo o worktime pro tempo total em segundos e depois ele lida com a formatação
    }

    useEffect(() => {
        if (workTime <= 0) {
            setIsPlaying(false);
            return
        };
        
        if (isPlaying) {
            const timeDecreaseInterval = setInterval(() => {setWorkTime(tempoAtual => tempoAtual - 1)}, 1000)
            return () => clearInterval(timeDecreaseInterval);
        } 
    }, [workTime, isPlaying]);

    return (
            <div className="flex flex-col gap-6 px-4 py-4 bg-violet-950 rounded-xl shadow-2xl text-white">
                <Options activeOption={activeOption} onOptionSelect={handleOptionSwitch}></Options>
                <h1 className="font-extrabold tracking-wider text-9xl self-center text-shadow-lg my-10">
                    {timeFormat(workTime)}
                </h1>
                <button 
                type="button"
                onClick={() =>{ setIsPlaying(!isPlaying)}}
                className="text-2xl bg-violet-500 rounded-lg font-medium py-2 active:scale-98">
                    {isPlaying ? "Stop" : "Start"}
                </button>
            </div>
    )
}

export default Timer;