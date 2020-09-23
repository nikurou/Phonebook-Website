import React from 'react'

const Notification = ({message, notificationType}) =>{

    if(message === ''){
      return <div></div>
    }
  
    console.log(`notification type: ${notificationType}`)
   
    return(
      <div className = {notificationType}>
        {message}
      </div>
    )
  }

  export default Notification