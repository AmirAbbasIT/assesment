import { fireEvent, render, screen } from "@testing-library/react";
import { studentList } from "../../utils/mockData";
import Students from "./Students";

   const mock = { data: null, loading: false, error: null };
   jest.mock("../../hooks/useFetch", () => ({
     useFetch: () => {
       return mock;
     },
   }));

describe("Students page", () => {

  test("List is rendered seccessfuly with api data",() => {
    mock.data={
        students:studentList
    }
    render(<Students />);
    expect(screen.getAllByTestId("student-card").length).toBe(5)
    
  });

  test("there is error while calling api",() => {
    mock.error="rejected";
    render(<Students />);
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument()
  });

  test("User input in search by name",() => {
    mock.data={
        students:studentList
    }
    mock.error=null;

    render(<Students />);
    const inputByName=screen.getByPlaceholderText("Search by name");
    fireEvent.change(inputByName,{target: {value: 'Laurens'}})
    expect(screen.getAllByTestId("student-card").length).toBe(1)
  });

  test("Adding a tag then search by tag ",() => {
    mock.data={
        students:studentList
    }
    mock.error=null;
    
    render(<Students />);
    
    //Adding a tag on first list item
    const tagInput1=screen.getAllByPlaceholderText("Add a tag")[0];
    fireEvent.change(tagInput1,{target: {value: 'tag1'}});
    fireEvent.keyUp(tagInput1,{ key: 'Enter', charCode: 13 });
    
    //Search by tag
    const inputByTag=screen.getByPlaceholderText("Search by tag");
    fireEvent.change(inputByTag,{target: {value: 'tag1'}})

    expect(screen.getAllByTestId("student-card").length).toBe(1)
  });


});