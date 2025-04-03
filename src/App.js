import React, { useState } from "react";
import { Select } from "antd";
import { Bubble, Sender } from "@ant-design/x";
import Component from "./App2.tsx";
import App3 from "./App3.tsx";
import App4 from "./App4.tsx";
import App5 from "./App5.tsx";
import App6 from "./App6.tsx";
import App7 from "./App7.tsx";
import App8 from "./App8.tsx";
import App9 from "./App9.tsx";
import App10 from "./App10.tsx";
import App11 from "./App11.tsx";
const App = () => {
  const [example, setXxample] = useState("8");
  function detail(example) {
    switch (example) {
      case "1":
        return <Component />;
        <div>
          <Bubble content="Hello world!" />
          AAAA
          <Sender></Sender>
        </div>;
      case "2":
        return <Component />;
      case "3":
        return <App3 />;
      case "4":
        return <App4 />;
      case "5":
        return <App5 />;
      case "6":
        return <App6 />;
      case "7":
        return <App7 />;
      case "8":
        return <App8 />;
      case "9":
        return <App9 />;
      case "10":
        return <App10 />;
      case "11":
        return <App11 />;
      default:
        return undefined;
    }
  }
  return (
    <div className="App">
      <div>
        <Select
          value={example}
          style={{ width: "100px" }}
          onChange={(e) => {
            setXxample(e);
          }}
          options={[
            /*
            { label: "app1", value: "1" },
            { label: "app2", value: "2" },
            { label: "app3", value: "3" },
            { label: "app4", value: "4" },
            { label: "app5", value: "5" },
            { label: "app6", value: "6" },
            { label: "app7", value: "7" },
             */
            { label: "app8", value: "8" },
            { label: "app9", value: "9" },
            { label: "app10", value: "10" },
            { label: "app11", value: "11" },
          ]}
        ></Select>
      </div>
      <div>{detail(example)}</div>
    </div>
  );
};

export default App;
