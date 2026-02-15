import { useEffect, useState } from "react";
import Options from "./Options";


function timeFormat(timeInSeconds: number): string {
    const minutesUnit: number = Math.floor(timeInSeconds / 60);
    const secondsUnit: number = Math.floor(timeInSeconds % 60);
    
    return minutesUnit + ":" + secondsUnit;
}

const Timer = () => {
    const [workTime, setWorkTime] = useState<number>(900)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    useEffect(() => {
        if (workTime <= 0) return;
        
        if (isPlaying) {
            const timeDecreaseInterval = setInterval(() => {setWorkTime(tempoAtual => tempoAtual - 1)}, 1000)
            return () => clearInterval(timeDecreaseInterval);
        } 
        return;
    }, [workTime, isPlaying]);

    return (
        <div className="flex flex-col gap-6 px-4 py-4 bg-violet-950 rounded-xl shadow-2xl">
            <Options></Options>
            <h1 className="font-mono text-9xl text-white self-center text-shadow-lg">
                {workTime > 0 ? timeFormat(workTime) : "Tempo Esgotado!"}
            </h1>
            <button 
            type="button"
            onClick={() =>{ setIsPlaying(!isPlaying)}}
            className="text-2xl text-white bg-violet-500 rounded-lg font-medium py-2 active:scale-98">
                {isPlaying ? "Stop" : "Start"}
            </button>
        </div>
    )
}

export default Timer;