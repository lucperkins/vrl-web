import '../style.css';
import { Navbar } from "./Navbar";
import axios from "axios";
import React, { useContext } from "react";
import { Context, ContextProvider } from "../state";
import { VRL_RESOLVE_ENDPOINT } from '../values';


function Main() {
  const { eventState, programState, outputState, resultState } = useContext(Context);
  const [event] = eventState;
  const [program] = programState;
  const [output, setOutput] = outputState;
  const [result, setResult] = resultState;

  function resolve() {
    const resolvePayload = { event, program };

    axios.post(VRL_RESOLVE_ENDPOINT, resolvePayload)
      .then(res => {
        const result = res.data;

        console.log(result.success);
        if (result.success) {
          setOutput(result.success.output);
          setResult(result.success.result);
        }
      });
  }

  return <div>
    <p>
      Event
    </p>
    
    <p>
      {JSON.stringify(event)}
    </p>

    <p>
      Program
    </p>

    <p>
      {program}
    </p>

    {output && (
      <>
        <div>
          <p>
            Output
          </p>

          <p>
            {JSON.stringify(output)}
          </p>
        </div>

        {result && (
          <div>
            <p>
              Resolved
            </p>

            <p>
              {JSON.stringify(result)}
            </p>
          </div>
        )}
      </>
    )}

    {!output && !result && (
      <button onClick={resolve}>
        Resolve
      </button>
    )}
  </div>
}

export function App() {
  return <div className="font-sans antialiased bg-gray-50 min-h-screen flex flex-col">
    <ContextProvider>
      <Navbar />

      <Main />
    </ContextProvider>
  </div>
}