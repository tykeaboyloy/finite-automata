"use client";
import React from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import checkDFAorNFA from "@/utils/CheckDFAorNFA";
import nfaToDfa from "@/utils/NfaToDfa";
import stringTest from "@/utils/StringTest";
import { instance } from "@viz-js/viz";
const StringInput = ({
  transitions,
  start_state,
  end_states,
  symbols,
  states,
}) => {
  const [string, setString] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isAccepted, setIsAccepted] = React.useState();
  const [fa, setFa] = React.useState();
  const [type, setType] = React.useState();
  const grapRef = React.useRef();
  const tableConstructor = (fa) => {
    return (
      <div className="border border-slate-300 w-full overflow-auto">
        <table className="w-full table-fixed border border-collaps">
          <thead>
            <tr className="text-center">
              <th className="border border-slate-300 md:w-44 w-36 p-2 text-black">
                Transitions
              </th>
              {fa?.symbols?.map((symbol, index) => {
                return (
                  <td
                    key={index}
                    className=" w-44 border border-slate-300 text-black"
                  >
                    {symbol}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {fa?.states?.map((state, index) => {
              return (
                <tr
                  key={index}
                  className="border border-slate-300 w-full text-center"
                >
                  <td className="border border-slate-300 w-44 p-3 text-black">
                    {state}
                  </td>
                  {fa?.symbols?.map((symbol, index) => {
                    return (
                      <td
                        key={index}
                        className="border border-slate-300 w-44 p-3"
                      >
                        {fa?.transitions?.[state]?.[symbol]?.join(",")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  const handleTest = () => {
    const type = checkDFAorNFA(transitions);
    setType(type);
    if (type == "DFA") {
      const testResult = stringTest(
        string,
        transitions,
        start_state,
        end_states
      );
      setFa({ transitions, start_state, end_states, symbols, states });
      instance().then((viz) => {
        grapRef.current?.appendChild(
          viz.renderSVGElement(testResult.dotScript)
        );
      });
      setIsAccepted(testResult.isAccepted);
    }
    if (type == "NFA") {
      const dfa = nfaToDfa({
        transitions,
        start_state,
        end_states,
        symbols,
        states,
      });
      setFa(dfa);
      const testResult = stringTest(
        string,
        dfa.transitions,
        dfa.start_state,
        dfa.end_states
      );
      instance().then((viz) => {
        grapRef.current?.appendChild(
          viz.renderSVGElement(testResult.dotScript)
        );
      });
      setIsAccepted(testResult.isAccepted);
    }
    setOpen(true);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleTest();
      }}
    >
      <div className="text-black w-full border rounded-lg shadow-lg shadow-black-400 px-5 pt-5">
        <div className=" text-md">Test if a string is accepted.</div>
        <input
          onChange={(e) => {
            e.preventDefault();
            setString(e.target.value);
          }}
          value={string}
          type="text"
          placeholder="Input a string"
          className="px-1.5 bg-white block w-full rounded-md border-0 py-1.5 my-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          type="submit"
          className="font-semibold my-2 p-2 text-sm border border-gray-400 rounded-lg"
        >
          TEST
        </button>
        <Dialog
          open={open}
          handler={() => {
            setOpen(!open);
          }}
          className="p-2"
          size="lg"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>{`"${string}" is${
            isAccepted ? " accpeted" : "n't accepted"
          } by the FA`}</DialogHeader>
          <DialogBody
            divider
            className="h-[25rem] md:h-[30rem] lg:h-[33rem] xl:h-[37rem]  overflow-scroll"
          >
            <div className="">
              <div>{`States: { ${states} }`}</div>
              <div>{`Symbols: { ${symbols} }`}</div>
              <div>{`Finale State: { ${end_states} }`}</div>
              {type == "NFA" && (
                <div>
                  {
                    "Since the FA is an NFA we converted it to DFA before string test."
                  }
                </div>
              )}
              <div
                ref={grapRef}
                className="my-10"
                style={{ display: "flex", justifyContent: "center" }}
              ></div>
              {tableConstructor(fa)}
            </div>
          </DialogBody>
        </Dialog>
      </div>
    </form>
  );
};

export default StringInput;
