import { useEffect, useState } from "react";
import Options from "./Options";

function timeFormat(timeInSeconds: number): string {
    const minutesUnit: number = Math.floor(timeInSeconds / 60);
    const secondsUnit: number = Math.floor(timeInSeconds % 60);

    return `${minutesUnit.toString().padStart(2, "0")}:${secondsUnit.toString().padStart(2, "0")}`;
}

function takeTimeFromOptionString(option: string, index: number): number {
        const timeInMinutes = option.split("/")[index]; // pego o tempo em minutos total (a depender do index o de work ou de restTime)
        const totalTimeLeftInSeconds = parseInt(timeInMinutes) * 60; 

        return totalTimeLeftInSeconds;
}

const Timer = () => {
    const [activeOption, setActiveOption] = useState<string>("25/5");
    const [timeLeft, setTimeLeft] = useState<number>(1500);
    const [isRestTimeOn, setIsRestTimeOn] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);


    const handleMinutesOptionSwitch = (option: string) => {
        setActiveOption(option);
        setIsPlaying(false);

        const timeInSeconds:number = takeTimeFromOptionString(option, 0); 
        setTimeLeft(timeInSeconds); // mudo o timeLeft pro tempo total em segundos e depois ele lida com a formatação
    }

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsPlaying(false);
            return
        };


        if (isPlaying) {
            const timeDecreaseInterval = setInterval(() => {setTimeLeft(tempoAtual => tempoAtual - 1)}, 1000)
            return () => clearInterval(timeDecreaseInterval);
        } 
    }, [timeLeft, isPlaying]);

    return (
            <div className="flex flex-col gap-6 px-4 py-4 bg-violet-950 rounded-xl shadow-2xl text-white">
                <Options activeOption={activeOption} onOptionSelect={handleMinutesOptionSwitch}></Options>
                <h1 className="font-extrabold tracking-wider text-9xl self-center text-shadow-lg my-10">
                    {timeFormat(timeLeft)}
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