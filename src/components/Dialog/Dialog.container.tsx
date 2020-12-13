import React from 'react'

import DialogComponent,{DialogProps} from './Dialog'

const Dialog = (props:DialogProps) => {
    return(
        <DialogComponent {...props} />
    )
}

export default Dialog