import s from "./page.module.scss";
import mammoth from "mammoth";
import parseHtml from "html-react-parser";
import { headers } from "next/headers";
import endpoints from "@/utils/endpoints";

async function getContent(path) {
  const props = {};

  let files = null;

  await fetch(endpoints.blogs + `/${path}`, {
    headers: { origin: headers().get("host") },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        props.metadata = data.data;
        files = data.data.files.map((item) => item.url);
      }
    })
    .catch((err) => {});

  if (files?.find((link) => link.endsWith(".docx"))) {
    var options = {
      // styleMap: [
      //     "p[style-name='Section Title'] => h1:fresh",
      //     "p[style-name='Subsection Title'] => h2:fresh"
      // ]
    };
    props.content = await mammoth
      .convertToHtml(
        {
          buffer: await fetch(
            `${endpoints.baseUrl}${files.find((link) =>
              link.endsWith(".docx")
            )}`
          ).then((res) => res.arrayBuffer()),
        },
        options
      )
      .then(async (result) => {
        const styles = files?.find((link) => link.endsWith(".css"))
          ? await fetch(
              `${endpoints.baseUrl}${files.find((link) =>
                link.endsWith(".css")
              )}`
            )
              .then((res) => res.text())
              .catch((err) => console.log(err))
          : null;

        return result.value
          ? (styles ? `<style scoped>${styles}</style>` : "") + result.value
          : null;
      })
      .catch((err) => {
        return null;
      });
  }

  return props;
}

export async function generateMetadata({ params }) {
  const { metadata } = await getContent(params.path);
  if (metadata) {
    return {
      title: metadata.title,
      description: metadata.description,
    };
  }
  return {};
}

export default async function ({ params }) {
  const { content } = await getContent(params.path);

  if (content) {
    return (
      <main className={`${s.main} body-min-1fr-min`}>
        <div className={s.innerWrapper}>{parseHtml(content)}</div>
      </main>
    );
  }
  return (
    <main className={`${s.main} body-min-1fr-min`}>
      <div className={s.not_found}>
        <h1>404</h1>
        <p>Show other blogs...</p>
      </div>
    </main>
  );
}
