import { useContext } from "react";
import { Context } from "../state";
import { SCENARIOS } from "../values";

export function Navbar() {
  const { eventState, programState, outputState, resultState } = useContext(Context);
  const [_event, setEvent] = eventState;
  const [_program, setProgram] = programState;
  const [_output, setOutput] = outputState;
  const [_result, setResult] = resultState;

  function updateScenario(id) {
    const scenario = SCENARIOS.filter(s => s.id === id)[0];
    setEvent(scenario.event);
    setProgram(scenario.program);
    setOutput(null);
    setResult(null);
  }

  return <nav className="bg-gray-200 py-2 px-4">
    <div className="flex justify-between items-center">
      <span className="text-3xl font-bold">
        <a href="/">
          The VRL Playground
        </a>
      </span>

      <ul className="flex space-x-2">
        {SCENARIOS.map(s => (
          <li key={s.id} className="hover:text-gray-700">
            <button onClick={() => updateScenario(s.id)}>
              {s.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </nav>
}