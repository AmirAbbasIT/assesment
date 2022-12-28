import { render, screen } from "@testing-library/react";
import { studentList } from "../../utils/mockData";
import StudentList from "./StudentList";

describe("Student List", () => {

  test("List is rendered seccessfuly", () => {
    render(<StudentList students={studentList} query={{byName:"",byTag:""}} handleAddTag={jest.fn()} />);
    const result = screen.getAllByTestId("student-card");
    expect(result.length).toBe(5)
  });

  test("List rendering with query (byName)", () => {
    render(<StudentList students={studentList} query={{byName:"Laurens",byTag:""}} handleAddTag={jest.fn()} />);
    const result = screen.getAllByTestId("student-card");
    expect(result.length).toBe(1)
  });

  test("List rendering with query (byTag) as no tagges are added", () => {
    render(<StudentList students={studentList} query={{byName:"",byTag:"tag0"}} handleAddTag={jest.fn()} />);
    const result = screen.queryAllByTestId("student-card");
    expect(result.length).toBe(0)
  });

});
