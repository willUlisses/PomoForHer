import { useEffect, useState } from "react";
import Options from "./Options";


function timeFormat(timeInSeconds: number): string {
    const minutesUnit: number = Math.floor(timeInSeconds / 60);
    const secondsUnit: number = Math.floor(timeInSeconds % 60);
    
    return minutesUnit + ":" + secondsUnit;
}

const Timer = () => {
    const [workTime, setWorkTime] = useState<number>(900)

    useEffect(() => {
        if (workTime <= 0) return;

        const intervalId = setInterval(() => {setWorkTime(tempoAtual => tempoAtual - 1)}, 1000)
        return () => clearInterval(intervalId);
    }, [workTime]);

    return (
        <div className="flex flex-col px-4 py-2 bg-violet-950 rounded-xl">
            <Options></Options>
            <h1 className="font-mono text-3xl text-white">
                {workTime > 0 ? timeFormat(workTime) : "Tempo Esgotado!"}
            </h1>
        </div>
    )
}

export default Timer;