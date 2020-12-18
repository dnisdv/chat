import React from 'react'
import ProfileComponent from './Profile'

const Profile = () => {
    return(
        <ProfileComponent 
            user={{
                firstName:"Denis",
                lastName:"Gradinaru",
                avatar:"https://avatars.mds.yandex.net/get-kino-vod-films-gallery/28788/47e2fd514411e18b76af786d7417062d/280x178_2"
            }}
        />
    )
}

export default Profile