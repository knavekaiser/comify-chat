"use client";

import endpoints from "@/utils/endpoints";
import pageStyle from "../page.module.scss";
import s from "./page.module.scss";
import { Space_Grotesk } from "next/font/google";
import CodeBlock from "@/components/codeBlock";

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

export default function Home() {
  const sdkUrl = endpoints.comifyChatSdk;

  const js = `<script src="${sdkUrl}"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const { default: mountComifyChat } = ComifyChat;

    mountComifyChat({
      openAtStart: false,         // optional
      defaultUrl: "infinai.in",   // optional
    });
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
      if (window.ComifyChat) {
        const { default: mountComifyChat } = window.ComifyChat;
        mountComifyChat({
          openAtStart: false,         // optional
          defaultUrl: "infinai.in",   // optional
        });
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
          const { default: mountComifyChat } = ComifyChat;
          mountComifyChat({
            openAtStart: false,         // optional
            defaultUrl: "infinai.in",   // optional
          });
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

declare const ComifyChat: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  ngAfterViewInit() {
    const mountComifyChat = ComifyChat.default;

    mountComifyChat({
      openAtStart: false,         // optional
      defaultUrl: "infinai.in",   // optional
    });
  }
}`;

  const vueScript = `import Vue from 'vue';

Vue.prototype.$comifyChat = require('${sdkUrl}');`;
  const vue = `mounted() {
  const mountComifyChat = this.$comifyChat.default;

  mountComifyChat({
    openAtStart: false,         // optional
    defaultUrl: "infinai.in",   // optional
  });
}`;
  return (
    <main className={`${pageStyle.main} ${s.main}`}>
      <header>
        <h1 className={space_grotesk.className}>Development</h1>
        <p className={s.description}>
          This documentation provides step-by-step instructions on how to
          implement the Comify Chatbot into your website. By following these
          guidelines, you can seamlessly integrate the chatbot functionality and
          enhance your customer engagement. Let's get started!
        </p>
      </header>

      <section className={s.section}>
        <div className={s.head}>
          <h2 className={space_grotesk.className}>Javascript Websites</h2>
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
            <li>Save the changes to your website's source code.</li>
          </ol>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.head}>
          <h2 className={space_grotesk.className}>React Application</h2>
        </div>
        <div className={s.content}>
          <ol>
            <li>
              In your React application, you can create a function called
              loadScript that loads an external script asynchronously and use
              that function to load Comify Chat:
              <CodeBlock code={react} language="javascript" />
            </li>
          </ol>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.head}>
          <h2 className={space_grotesk.className}>Next.JS</h2>
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
          <h2 className={space_grotesk.className}>Angular JS</h2>
        </div>
        <div className={s.content}>
          <ol>
            <li>In your Angular application, open the angular.json file.</li>
            <li>
              Locate the "scripts" array within the "architect" section and add
              the following script URL:
              <CodeBlock code={angularScript} language="javascript" />
            </li>
            <li>Save the changes to the angular.json file.</li>
            <li>
              In your Angular component file (e.g., app.component.ts), import
              the AfterViewInit interface from @angular/core and implement it in
              your component class.
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
          <h2 className={space_grotesk.className}>Angular JS</h2>
        </div>
        <div className={s.content}>
          <ol>
            <li>
              In your Vue.js application, open the main JavaScript file (e.g.,
              main.js).
            </li>
            <li>
              Add the following code snippet at the top of the file to import
              the Comify Chat SDK:
              <CodeBlock code={vueScript} language="javascript" />
            </li>
            <li>Save the changes to your main JavaScript file.</li>
            <li>
              In your Vue component file (e.g., App.vue), add the following code
              snippet within the mounted lifecycle hook:
              <CodeBlock code={vue} language="javascript" />
            </li>
            <li>Save the changes to your component file.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
