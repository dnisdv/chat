import React, {useEffect, useState, useRef} from 'react'
import {Wrapper, Controls, ControlImg, ProgressBar, Wave, WaveImg, Duration} from './MessageAudio.styled'
import PlayIcon from './assets/play-icon.svg'
import PauseIcon from './assets/pause-button.svg'
import WaveIcon from '../../../Assets/img/sound-waves.svg'
import { MouseClickEvent } from './MessageAudio.container'


export type MessageAudioProps = {
    AudioUrl:string
    changeCurrentTime:(e:MouseClickEvent) => void,
    audioElem:React.MutableRefObject<HTMLAudioElement>,
    currentTime:number,
    togglePlay:() => void,
    isPlaying:boolean,
    restDuration:string
}

const MessageAudio = ({
  AudioUrl,
  changeCurrentTime,
  audioElem,
  currentTime,
  togglePlay,
  isPlaying,
  restDuration
}:MessageAudioProps) => {
    console.log(audioElem.current.duration) 
    return(
        <Wrapper onClick={changeCurrentTime}>
            <ProgressBar style={{width: audioElem.current ? (currentTime +.25)/audioElem.current.duration*100 + "%": "auto"} } />
            <audio ref={audioElem} src={AudioUrl} preload="auto" />
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

