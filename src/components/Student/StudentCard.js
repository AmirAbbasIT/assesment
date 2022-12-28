import React, { useState } from "react";
import MinusSVG from "../../assets/svg/MinusSVG";
import PlusSVG from "../../assets/svg/PlusSVG";
import { calculateAverage } from "../../utils/utils";
import Image from "../Image";

const StudentCard = ({ student, handleAddTag }) => {

    const [expand,setExpand]=useState(false)
    const [tagInput,setTagInput]=useState("")

    const handleTagInput=e=>{
        e.preventDefault();
        if (e.key === "Enter") {
            handleAddTag(student?.id,tagInput)
            setTagInput("")
        }
    }

  const { pic, firstName, lastName, email, company, skill, grades, tags } = student;

  return (
    <div className="card" data-testid="student-card" >
      <Image url={pic} />
      <div className="card-body">
        <div className="card-header">
          <h2 className="card-title">
            {" "}
            {firstName} {lastName}{" "}
          </h2>
          <button className="btn" data-testid="toggle-button" onClick={() => setExpand(!expand)}>
            {expand ? <MinusSVG /> : <PlusSVG />}
          </button>
        </div>
        <div className="card-section">
          <p>Email: {email}</p>
          <p>Company: {company}</p>
          <p>Skill: {skill}</p>
          <p>Average: {calculateAverage(grades)}%</p>
          {expand ? (
            <>
              <div data-testid="grades-list" className="grades-section">
                {grades?.map((grade, index) => (
                  <p key={index}>
                    Test {index + 1}: &emsp; {grade}%
                  </p>
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="tag-wrapper">
            <div className="tag-section" >
            {
               tags && tags?.map((tag,index)=>(<span key={`${tag}-${index}`} className="tag">{tag}</span>))
            }
            </div>
            <input
              className="form-control"
              placeholder="Add a tag"
              onKeyUp={(e) => handleTagInput(e)}
              value={tagInput}
              onChange={e=>setTagInput(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
