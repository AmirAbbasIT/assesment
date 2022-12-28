import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { studentObject } from "../../utils/mockData";
import StudentCard from "./StudentCard";

describe("Student Card", () => {

  test("Card is rendered seccessfuly", () => {
    render(<StudentCard student={studentObject} handleAddTag={jest.fn()} />);
    const result = screen.getByTestId("student-card");
    expect(result).toBeInTheDocument();
  });

  test("Expand grades list",async ()=>{
      render(<StudentCard student={studentObject} handleAddTag={jest.fn()} />);
      const button = screen.getByTestId("toggle-button") 
      userEvent.click(button); 
      await waitFor(() =>  {
          expect(screen.getByTestId("grades-list")).toBeInTheDocument();
     });
  })

});