import { renderHook } from "@testing-library/react-hooks";
import { endPoints } from "../utils/constants";
import {useFetch} from "./useFetch";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { studentObject } from "../utils/mockData";


 const server = setupServer(
  rest.get(endPoints.getStudentList, (req, res, ctx) => {
    return res(
      ctx.json([
        studentObject
      ])
    );
  })
 );

  describe("useFetch custom hook", () => {
    beforeAll(() => {
     server.listen();
    });

    beforeEach(() => {
     server.resetHandlers();
    });

    afterAll(() => {
     server.close();
    });

   test("Get api data from enpoint", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(endPoints.getStudentList)
    );
    await waitForNextUpdate();
    expect(result.current.data).toMatchInlineSnapshot(`
Array [
  Object {
    "city": "Fushë-Muhurr",
    "company": "Yadel",
    "email": "iorton0@imdb.com",
    "firstName": "Ingaberg",
    "grades": Array [
      "78",
      "100",
      "92",
      "86",
      "89",
      "88",
      "91",
      "87",
    ],
    "id": "1",
    "lastName": "Orton",
    "pic": "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg",
    "skill": "Oracle",
  },
]
`);
     });
    });
