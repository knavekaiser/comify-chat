"use client";

import endpoints from "@/utils/endpoints";
import pageStyle from "../page.module.scss";
import s from "./page.module.scss";
import CodeBlock from "@/components/codeBlock";
import { useContext, useState } from "react";
import { SiteContext } from "@/app/context";
import { Table } from "@/components/table";

export default function Home() {
  const { user } = useContext(SiteContext);
  const sdkUrl = endpoints.infinAIChatSdk;
  const chatbot_id = user.chatbot._id;

  const [fields, setFields] = useState([
    {
      field: "chatbotId",
      required: "Yes",
      default: "null",
      description:
        "The unique ID of your chatbot. You must provide this ID for the chatbot to function correctly.",
    },
    {
      field: "openAtStart",
      required: "No",
      default: "false",
      description: (
        <>
          Set to <code>true</code> if you want the chatbot to open automatically
          when the website loads.
        </>
      ),
    },
    {
      field: "standalone",
      required: "No",
      default: "false",
      description: (
        <>
          If set to <code>true</code>, the chatbot will be placed within the
          document flow, instead of a popup style at the corner of the page.
        </>
      ),
    },
    {
      field: "containerId",
      required: "No",
      default: "null",
      description:
        "The ID of the HTML element where you want the chatbot to be placed. Required when using standalone mode.",
    },
    {
      field: "paths",
      required: "No",
      default: "null",
      description:
        "An array of strings that determines on which pages the chatbot will appear.",
    },
    {
      field: "blacklistedPaths",
      required: "No",
      default: "null",
      description:
        "An array of strings that hides the chatbot from certain pages.",
    },
  ]);
  const [pathsExample, setPathsExapmle] = useState([
    {
      path: `["/*"]`,
      description: "The chatbot will appear on every page.",
    },
    {
      path: `["/"]`,
      description: "The chatbot will only appear on the home screen.",
    },
    {
      path: `["/inside-page"]`,
      description: (
        <>
          The chatbot will only appear on the <code>/inside-page</code>.
        </>
      ),
    },
    {
      path: `["/nested-page/*"]`,
      description: (
        <>
          The chatbot will only appear on <code>/nested-page/one</code>,{" "}
          <code>/nested-page/two</code>, and so on.
        </>
      ),
    },
    {
      path: `["/page-one", "/page-two"]`,
      description: (
        <>
          The chatbot will only appear on <code>/page-one</code> and{" "}
          <code>/page-two</code>.
        </>
      ),
    },
  ]);

  const js = `<script src="${sdkUrl}"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const { default: mountInfinAI } = InfinAI;
    const options = {
      chatbotId: "${chatbot_id}"
    }
    mountInfinAI(options);
  });
</script>`;

  const react = `function loadScript(src) {
  return new Promise((res, rej) => {
    if (!document.querySelector(\`script[src="\${src}"]\`)) {
      const scr = document.createElement("script");
      scr.src = src;
      document.body.appendChild(scr);
      scr.onload = () => res(true);
      scr.onerror = () => rej(true);
    } else {
      res(true);
    }
  });
}

function App() {
  useEffect(() => {
    loadScript("${sdkUrl}").then(() => {
      if (window.InfinAI) {
        const { default: mountInfinAI } = window.InfinAI;
        const options = {
          chatbotId: "${chatbot_id}"
        }
        mountInfinAI(options);
      }
    });
  }, []);

  return (
    <div className={"App"}>
      {/* Your website content */}
    </div>
  );
}`;

  const nextjs = `"use client";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        src="${sdkUrl}"
        strategy="lazyOnload"
        onLoad={() => {
          const { default: mountInfinAI } = InfinAI;
          const options = {
            chatbotId: "${chatbot_id}"
          }
          mountInfinAI(options);
        }}
      />
      <body>{children}</body>
    </html>
  );
}`;

  const angularScript = `"scripts": [
  "${sdkUrl}"
]`;
  const angular = `import { Component, AfterViewInit } from '@angular/core';

declare const InfinAI: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  ngAfterViewInit() {
    const mountInfinAI = InfinAI.default;
    const options = {
      chatbotId: "${chatbot_id}"
    }
    mountInfinAI(options);
  }
}`;

  const vueScript = `import Vue from 'vue';

Vue.prototype.$InfinAI = require('${sdkUrl}');`;
  const vue = `mounted() {
  const mountInfinAI = this.$InfinAI.default;
  const options = {
    chatbotId: "${chatbot_id}"
  }
  mountInfinAI(options);
}`;

  const standalone = `const options = {
  chatbotId: "${chatbot_id}",
  path: ["/support"],
  standalone: true,
  containerId: "chatContainer"
}
`;
  return (
    <main className={`${pageStyle.main} ${s.main}`}>
      <header>
        <h1>Development</h1>
        <p className={s.description}>
          This documentation provides step-by-step instructions on how to
          implement the Infin AI Chatbot into your website. By following these
          guidelines, you can seamlessly integrate the chatbot functionality and
          enhance your customer engagement. Let&apos;s get started!
        </p>
      </header>

      <section className={s.section}>
        <div className={s.head}>
          <h2>Javascript Websites</h2>
          {/* <p>The website </p> */}
        </div>
        <div className={s.content}>
          <ol>
            <li>Open the HTML source code of your website.</li>
            <li>
              Locate the <code>{"<head>"}</code> section of your HTML code.
            </li>
            <li>
              Add the following code snippet within the <code>{"<head>"}</code>{" "}
              section:
              <CodeBlock code={js} language="javascript" />
            </li>
            <li>Save the changes to your website&apos;s source code.</li>
          </ol>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.head}>
          <h3>
            <code>options</code>
          </h3>
        </div>
        <div className={s.content}>
          <Table
            className={s.fieldsTable}
            columns={[
              { label: "Field" },
              { label: "Default", className: "center" },
              { label: "Required", className: "center" },
              { label: "Description" },
            ]}
          >
            {fields.map((item) => (
              <tr key={item.field}>
                <td className={s.fieldName}>
                  <strong>{item.field}</strong>
                </td>
                <td className="center">{item.default}</td>
                <td className="center">{item.required}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </Table>

          <div className={s.head}>
            <h4>
              <code>paths</code>
            </h4>
          </div>
          <ul className={s.ps}>
            <li>
              <p>
                The <code>paths</code> field allows you to control on which
                pages of your website the Chatbot will appear. It takes an array
                of strings that define the URL paths where the chatbot should be
                visible.
              </p>
            </li>
            <li>
              <p>Here&apos;s a more detailed explanation:</p>
              <Table className={s.pathsExample}>
                {pathsExample.map((item) => (
                  <tr key={item.path}>
                    <td className={s.pathName}>
                      <code>{item.path}</code>
                    </td>
                    <td className={s.description}>{item.description}</td>
                  </tr>
                ))}
              </Table>
            </li>
          </ul>

          <div className={s.head}>
            <h4>
              <code>standalone</code>
            </h4>
          </div>
          <ul className={s.ps}>
            <li>
              <p>
                When <code>standalone</code> is set to <code>false</code>{" "}
                (default), the chatbot appears as a non-intrusive popup-style
                chatbot, usually located at the corner of the page. It overlays
                on top of the content and does not affect the document flow.
              </p>
            </li>
            <li>
              <p>
                When <code>standalone</code> is set to <code>true</code>, the
                chatbot is placed within the document flow of your website. It
                means the chatbot becomes part of the webpage layout, and its
                position will be determined by the element with the specified
                containerId. This option allows more flexibility in positioning
                the chatbot within your webpage&apos;s design.
              </p>
            </li>
          </ul>

          <div className={s.head}>
            <h4>Chatbot on a dedicated page</h4>
          </div>
          <ul className={s.ps}>
            <li>
              <p>
                To set up the chatbot on a dedicated page like{" "}
                <code>website.com/support</code> follow these steps:
              </p>
              <CodeBlock code={standalone} language="javascript" />
            </li>
            <li>
              <p>Style the container so that it takes up the whole page.</p>
            </li>
          </ul>

          <div className={s.head}>
            <h4>Automatic mode switch</h4>
          </div>
          <ul className={s.ps}>
            <li>
              <p>
                You can enable standalone mode on specific pages by passing an
                array of strings to the <code>standalone</code> field.
                seamlessly transitioning from popup to a dedicated chatbot
                experience.
              </p>
            </li>
            <li>
              <p>
                Example: <code>{`["/chatbot"]`}</code>
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.head}>
          <h2>React Application</h2>
        </div>
        <div className={s.content}>
          <ol>
            <li>
              In your React application, you can create a function called{" "}
              <code>loadScript</code> that loads an external script
              asynchronously and use that function to load Infin AI:
              <CodeBlock code={react} language="javascript" />
            </li>
          </ol>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.head}>
          <h2>Next.JS</h2>
        </div>
        <div className={s.content}>
          <ol>
            <li>
              Add this snippet of code on the top level of the app
              <CodeBlock code={nextjs} language="javascript" />
            </li>
          </ol>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.head}>
          <h2>Angular JS</h2>
        </div>
        <div className={s.content}>
          <ol>
            <li>
              In your Angular application, open the <code>angular.json</code>{" "}
              file.
            </li>
            <li>
              Locate the &quot;scripts&quot; array within the
              &quot;architect&quot; section and add the following script URL:
              <CodeBlock code={angularScript} language="javascript" />
            </li>
            <li>
              Save the changes to the <code>angular.json</code> file.
            </li>
            <li>
              In your Angular component file (e.g.,{" "}
              <code>app.component.ts</code>), import the{" "}
              <code>AfterViewInit</code> interface from{" "}
              <code>@angular/core</code> and implement it in your component
              class.
            </li>
            <li>
              Within the component class, add the following code:
              <CodeBlock code={angular} language="javascript" />
            </li>
            <li>Save the changes to your component file.</li>
          </ol>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.head}>
          <h2>Angular JS</h2>
        </div>
        <div className={s.content}>
          <ol>
            <li>
              In your Vue.js application, open the main JavaScript file (e.g.,{" "}
              <code>main.js</code>).
            </li>
            <li>
              Add the following code snippet at the top of the file to import
              the Infin AI SDK:
              <CodeBlock code={vueScript} language="javascript" />
            </li>
            <li>Save the changes to your main JavaScript file.</li>
            <li>
              In your Vue component file (e.g., <code>App.vue</code>), add the
              following code snippet within the mounted lifecycle hook:
              <CodeBlock code={vue} language="javascript" />
            </li>
            <li>Save the changes to your component file.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
