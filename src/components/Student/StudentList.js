import React from 'react'
import StudentCard from './StudentCard'

const StudentList = ({students,query,handleAddTag}) => {
  return (
    <div>
    {
        students
        ?.filter(s=>(`${s.firstName} ${s.lastName}`.toLowerCase().includes(query?.byName.toLowerCase()) 
        && (!query?.byTag || (s?.tags?.length && s?.tags?.some(tag=>tag.includes(query?.byTag)))) ))
        ?.map((student,index)=>(
        <StudentCard key={index} student={student} handleAddTag={handleAddTag} />
        ))
    }
    </div>
  )
}

export default StudentList