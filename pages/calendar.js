import React from 'react'

function calendar() {

//   const daysInMonth=31;
//   const startingDay=0;

//   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const renderDaysOfWeek = daysOfWeeek.map((day, index)=>{

//     <div key={index} className='day-of-week'>
//       {day}
//     </div>
//   })

//   const renderCaledarDays =()=>{
//     const calendarDays=[];

//     for (let i=1; i<=daysInMonth; i++){
//       const dayNumber=i;
//       calendarDays.push(
//         <div key={i} className='calendar-day'>
//         {dayNumber}
//         </div>
//       )
//     }
  
// return calendarDays
// };

let days=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let date=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]

let bag=''
for(let i=0; i<days.length; i++){
  
  bag+=days[i]+'  '
}
console.log(bag)
  

  return(
    <div className="calendar">
      <h1>October 2023</h1>
     </div>
  );
};


export default calendar