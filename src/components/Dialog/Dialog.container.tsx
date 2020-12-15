import React from 'react'
import DialogComponent,{DialogProps} from './Dialog'

const Dialogs = (props:DialogProps) => {
    return(
        <DialogComponent {...props} />
    )
}

export default Dialogs