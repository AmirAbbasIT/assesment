import React, { useCallback, useEffect, useState } from 'react'
import StudentList from '../../components/Student/StudentList'
import {useFetch} from '../../hooks/useFetch'
import { endPoints } from '../../utils/constants'

const Students = () => {

    const {loading,data,error}=useFetch(endPoints.getStudentList)

    const [students,setStudents] = useState([])
    const [query,setQuery]=useState({byName:"",byTag:""})

    const handleAddTag=useCallback((id,tag)=>{
        setStudents(students=>{
           let student =students.find(s=>s.id===id);
           student.tags=[...(student?.tags ? student.tags:[]),tag];
            students.map(s=>s.id===id?student:s);
            return students;
        })
    },[])

    const handleQueryChange=e=>{
        const {name, value}=e?.target;
        setQuery({...query,[name]:value})
    }

    useEffect(()=>{
        if(data && Object.keys(data).length){
            setStudents(data?.students)
        }
    },[data])
  
 if (loading || !students?.length)
  return (
    <>
      <p data-testid="loading">Loading...</p>
    </>
  )

  if(error)
  return (
    <>
     <p>Something went wrong!</p>
    </>
  )

  return (
    <>
    <div className="body-wrapper">
    <div>
    <input className="form-control w-full" placeholder="Search by name" name="byName" value={query?.byName} onChange={handleQueryChange}  />
    <input className="form-control w-full" placeholder="Search by tag" name="byTag" value={query?.byTag} onChange={handleQueryChange}  />
    </div>
    <StudentList query={query} students={students} handleAddTag={handleAddTag} />
    </div>
    </>
  )
}

export default Students