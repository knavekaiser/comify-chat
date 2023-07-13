import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

const otherStyles = [
  "tomorrow",
  "stackoverflowLight",
  "github",
  "atomOneLight",
];

const CodeBlock = ({ code, language }) => {
  return (
    <SyntaxHighlighter language={language} style={atomOneLight}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
