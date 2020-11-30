import React from "react";
import { formatDistance } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { DateTime } from './Time.styled'

type TimeProps = {
  date: any
}

const Time = ({ date }: TimeProps) => (
  <div style={{display:"flex"}}>
    <DateTime>{formatDistance(date, new Date(), { addSuffix: true, locale: enUS })
}</DateTime>
  </div>
);

export default Time;