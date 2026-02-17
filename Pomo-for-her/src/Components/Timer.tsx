import { useEffect, useState } from "react";
import Options from "./Options";
import RestToast from "./RestToast";

type TimerMode = "WORK" | "REST";

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
    const [durations, setDurations] = useState({work: 1500, rest: 300})
    const [timeLeft, setTimeLeft] = useState<number>(2);
    const [timeMode, setTimeMode] = useState<TimerMode>("WORK");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);


    const handleMinutesOptionSwitch = (option: string) => {
        setActiveOption(option);
        setIsPlaying(false); // vai começar com o timer pausado
        setTimeMode("WORK"); // quando ela escolher alguma opção vai estar no workMode automaticamente

        const workTimeInSeconds:number = takeTimeFromOptionString(option, 0); // pega os segundos totais do workTime
        const restTimeinSeconds:number = takeTimeFromOptionString(option, 1); // pega os segundos totais do restTime

        setDurations({work: workTimeInSeconds, rest: restTimeinSeconds}); // atualiza as durations de work e rest
        setTimeLeft(workTimeInSeconds); // mudo o timeLeft pro tempo total em segundos e depois ele lida com a formatação
    }

    function switchTimeMode() {
        if (timeMode === "WORK") {
            setTimeMode("REST");
            setTimeLeft(durations.rest);
            setShowToast(true);

            const toastTimer = setTimeout(() => setShowToast(false), 5000);
            return () => clearTimeout(toastTimer);
        } else {
            setTimeMode("WORK");
            setTimeLeft(durations.work);
            setIsPlaying(false);
        }
    }

    useEffect(() => {
        let intervalId: number;

        if (isPlaying && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft((tempoAtual) => tempoAtual - 1);
            }, 1000);
        }
        else if (timeLeft === 0 && isPlaying) {
            switchTimeMode();
        }

        return () => clearInterval(intervalId);
        } , [timeLeft, isPlaying, timeMode, durations]);


    const isWorkModeOn = (timeMode === "WORK");

    return (
            <div className="relative flex flex-col gap-6 px-4 py-4 bg-violet-950 rounded-xl shadow-2xl text-white">

                <RestToast visible={showToast}>
                    <span>🎉</span>
                    <span>Hora do descanso! <strong>Tome Água 💧.</strong></span>
                </RestToast>

                <Options activeOption={activeOption} onOptionSelect={handleMinutesOptionSwitch}></Options>

                <div className="text-center">
                    <p className="text-zinc-400 text-xl font-bold tracking-widest my-5">
                        {isWorkModeOn ? 'STUDY TIME' : 'BREAK TIME'}
                    </p>

                    <h1 className="font-extrabold tracking-wider text-9xl self-center text-shadow-lg my-5">
                        {timeFormat(timeLeft)}
                    </h1>
                </div>
                
                <button 
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`text-xl text-white bg-violet-500 rounded-lg font-bold py-3 px-8 w-full active:scale-95 transition-all shadow-lg hover:brightness-110`}
            >
                {isPlaying ? "PAUSAR" :  "INICIAR"}
            </button>

            </div>
    )
}

export default Timer;