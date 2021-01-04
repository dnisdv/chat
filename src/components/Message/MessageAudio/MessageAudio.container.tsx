import React,{useEffect, useRef, useState} from 'react'
import MessageAudioComponent,{MessageAudioProps} from './MessageAudio'

interface MouseEventTarget extends EventTarget {
    className: string
  }
  
export interface MouseClickEvent extends React.MouseEvent<HTMLDivElement> {
    target: MouseEventTarget
}


const MessageAudio = ({AudioUrl}:Pick<MessageAudioProps, "AudioUrl">) => {
    const audioElem = useRef<HTMLAudioElement>(document.createElement("audio"));
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [restDuration, setrestDuration] = useState<string>("")
  
    const togglePlay = () => {
      if (!isPlaying) {
            audioElem.current.play();
      } else {
            audioElem.current.pause();
      }
    };


    const changeCurrentTime = (e:MouseClickEvent) =>{
      if(   e.target.className.includes("Control_Wrapper") ||
            e.target.className.includes("Control_Img") || 
            e.target.className.includes("Wave")){
          return 
      }else{
        const RectLeft = e.currentTarget.getBoundingClientRect().left
        const procentage = (+(+(+e.clientX - +RectLeft) * 100) / +e.currentTarget.offsetWidth) 
        audioElem.current.currentTime = +((audioElem.current.duration / 100) * procentage) - 0.2

        setCurrentTime(audioElem.current.currentTime)
      }
  }
  
    useEffect(() => {
      audioElem.current.addEventListener(
        'playing',
        () => {
          setIsPlaying(true);
        },
        false,
      );
      audioElem.current.addEventListener(
        'ended',
        () => {
          setIsPlaying(false);
          setCurrentTime(0);
          audioElem.current.currentTime = 0
        },
        false,
      );
      audioElem.current.addEventListener(
        'pause',
        () => {
          setIsPlaying(false);
        },
        false,
      );
      audioElem.current.addEventListener('timeupdate', () => {
        const duration = (audioElem.current && audioElem.current.duration) || 0;
        setCurrentTime(audioElem.current.currentTime);

        const restDuration = duration - audioElem.current.currentTime
                    
        let minutes = (Math.floor(restDuration / 60)).toString()
        let seconds = (Math.floor(restDuration % 60)).toString()
        
        if (+minutes < 10) {
            minutes = "0" + minutes;
        }   
        if(+seconds < 10){
            seconds = "0" + seconds;
        }
        setrestDuration(`${minutes}:${seconds}`)
      });
    }, []);

    return(
        <MessageAudioComponent 
            AudioUrl={AudioUrl}
            changeCurrentTime={changeCurrentTime}
            audioElem={audioElem}
            currentTime={currentTime}
            togglePlay={togglePlay}
            isPlaying={isPlaying}
            restDuration={restDuration}
        />
    )
}

export default MessageAudio