import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import {Record, RecordWrapper} from './Recorder.styled'
import MicrophoneIcon from '../Assets/microphone.svg'

type RecorderProps = {
    succesRecord:(blob:Blob) => void,
    setisRecording: Dispatch<SetStateAction<boolean>>,
    isRecording:boolean,
    setpassedTime: Dispatch<SetStateAction<number>>
}
    

const Recorder = ({
    succesRecord,
    setisRecording,
    isRecording,
    setpassedTime
    }: RecorderProps) => {
        const [mediaRecorder, setmediaRecorder] = useState<MediaRecorder | null>()
        let timePassing:number 
        if(!navigator.mediaDevices){
            return <> </>
        }

        const handleSuccess = (strem:MediaStream, event:React.MouseEvent<HTMLDivElement>) => {
                let chunks:any[] = []
                let stream = strem

                const mouseUsEvent = () => {
                    setisRecording(false)
                    return mediaRecorder.stop()
                }
                function createAudioElement(blobUrl:any) {
                    const downloadEl = document.createElement('a');
                    // @ts-ignore
                    downloadEl.style = 'display: block';
                    downloadEl.innerHTML = 'download';
                    downloadEl.download = 'audio.webm';
                    downloadEl.href = blobUrl;
                    const audioEl = document.createElement('audio');
                    audioEl.controls = true;
                    const sourceEl = document.createElement('source');
                    sourceEl.src = blobUrl;
                    sourceEl.type = 'audio/webm';
                    audioEl.appendChild(sourceEl);
                    document.body.appendChild(audioEl);
                    document.body.appendChild(downloadEl);
                }
                
        
                const mediaRecorder = new MediaRecorder(stream)
                    event.target.addEventListener("mouseup", mouseUsEvent)
                    setmediaRecorder(mediaRecorder)
                    
                    timePassing = setInterval( () => {
                        setpassedTime((prevState:number) => prevState + 1 )
                    }, 1000)
        
                    mediaRecorder.addEventListener("dataavailable", (e) => {
                        chunks.push(e.data)
                    })
                    mediaRecorder.addEventListener("stop" , () => {
                        clearInterval(timePassing)
                        setpassedTime(0)
                        const blob = new Blob(chunks, { 'type': 'audio/mp4; codecs=opus' })
                        
                        chunks = []
                        stream.getAudioTracks().forEach((track) => track.stop())
        
                        if(blob.size < 16769) {
                            return
                        }
                        var url = URL.createObjectURL(blob);
                        console.log(url)
                        console.log(blob)
                        succesRecord(blob)

                    })
                    mediaRecorder.start()
        }

        const startRecording = (event:React.MouseEvent<HTMLDivElement>) => {
            if (isRecording) return
            setisRecording(true)
            clearInterval(timePassing)

            navigator.mediaDevices
                .getUserMedia({audio:true})
                .then(stream =>(handleSuccess(stream, event)))
                .catch( (e) => console.log(e) )
        }
    
        const stopRecording = () => {
            if (!isRecording) return
            if(!mediaRecorder) return 
            setisRecording(false)
            mediaRecorder.stop()
        }

    return(
        <RecordWrapper onMouseDown={startRecording} >
            <Record src={MicrophoneIcon} />
        </RecordWrapper>

    )
}

export default Recorder