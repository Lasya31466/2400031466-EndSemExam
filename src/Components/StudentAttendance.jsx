import { useReducer } from "react";

const initialData = [
  { id: 1, name: "Student 1", status: "-" },
  { id: 2, name: "Student 2", status: "-" },
  { id: 3, name: "Student 3", status: "-" },
  { id: 4, name: "student 4", status: "-"}
];

function reducer(state, action) {
  switch (action.type) {
    case "MARK_PRESENT":
      return state.map(s =>
        s.id === action.id ? { ...s, status: "Present" } : s
      );

    case "MARK_ABSENT":
      return state.map(s =>
        s.id === action.id ? { ...s, status: "Absent" } : s
      );

    case "RESET":
      return state.map(s => ({ ...s, status: "-" }));

    default:
      return state;
  }
}

export default function StudentAttendance() {
  const [students, dispatch] = useReducer(reducer, initialData);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Attendance Tracker</h2>

      {students.map(s => (
        <p key={s.id}>
          {s.name}
          <button onClick={() => dispatch({ type: "MARK_PRESENT", id: s.id })}>
            Present
          </button>
          <button onClick={() => dispatch({ type: "MARK_ABSENT", id: s.id })}>
            Absent
          </button>
        </p>
      ))}

      <button onClick={() => dispatch({ type: "RESET" })}>RESET</button>

      <h3>Final Attendance</h3>
      <table border="1" cellPadding="6">
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
