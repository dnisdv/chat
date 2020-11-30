import React, {useEffect, useState, useRef} from 'react'
import {Wrapper, Controls, ControlImg, ProgressBar, Wave, WaveImg, Duration} from './MessageAudio.styled'
import PlayIcon from './assets/play-icon.svg'
import PauseIcon from './assets/pause-button.svg'
import WaveIcon from './assets/sound-waves.svg'


type MessageAudioProps = {
    AudioUrl:string
}

const MessageAudio = ({AudioUrl}:MessageAudioProps) => { 
    const audioElem = useRef<any>(null);
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

    const changeCurrentTime = (e:any) =>{
      console.log(e.target.className)
      if(e.target.className.includes("Control_Wrapper") ||
        e.target.className.includes("Control_Img") || 
        e.target.className.includes("Wave")){
          return false
      }else{
        const RectLeft = e.currentTarget.getBoundingClientRect().left
        const procentage = (+(+(+e.clientX - +RectLeft) * 100) / +e.currentTarget.offsetWidth) 
        audioElem.current.currentTime = ((audioElem.current.duration / 100) * procentage)

        setCurrentTime(audioElem.current.currentTime)
      }
  }
  
    useEffect(() => {
      audioElem.current.volume = '1';
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
        <Wrapper onClick={changeCurrentTime}>
            <ProgressBar style={{width: audioElem.current ? (currentTime +.25)/audioElem.current.duration*100 + "%": "auto"} } />
            <audio ref={audioElem} src={AudioUrl} preload="auto"  />
            <Controls className="Control_Wrapper" onClick={togglePlay}>
                <ControlImg className="Control_Img" src={isPlaying ? PauseIcon : PlayIcon} alt="playIcon"/>
            </Controls>
            <Wave className="Wave">
                <WaveImg src={WaveIcon} alt="wave image"/>
            </Wave>
            <Duration>{restDuration? restDuration : "00:00"}</Duration>
        </Wrapper>
    )
} 

export default MessageAudio

