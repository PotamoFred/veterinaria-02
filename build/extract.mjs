import fs from "node:fs";

const ssr = fs.readFileSync(process.argv[2], "utf8");

// Body inner content, between <body ...> and </body>
const bodyOpen = ssr.indexOf("<body");
const bodyStart = ssr.indexOf(">", bodyOpen) + 1;
const bodyEnd = ssr.lastIndexOf("</body>");
let body = ssr.slice(bodyStart, bodyEnd);

// Drop every remaining script whose payload is the Next flight data. The
// opening form is `(self.__next_f=` on some builds and `self.__next_f.push`
// on others, and one of them can span a huge chunk, so match on the marker
// itself and let each non-greedy run stop at that script's own close tag.
body = body.replace(
  /<script[^>]*>(?:(?!<\/script>)[\s\S])*?__next_(?:f|r)(?:(?!<\/script>)[\s\S])*?<\/script>/g,
  ""
);

// Drop remaining next scripts/styles that reference /_next
body = body.replace(/<script[^>]*src="\/_next[^"]*"[^>]*><\/script>/g, "");
body = body.replace(/<link[^>]*href="\/_next[^"]*"[^>]*>/g, "");
body = body.replace(/<link rel="preload"[^>]*>/g, "");

// Report what image refs remain so we can inline them.
const imgs = [...body.matchAll(/<img[^>]*src="([^"]+)"/g)].map((m) => m[1]);

fs.writeFileSync(process.argv[3], body, "utf8");

console.log("body length:", body.length);
console.log("img srcs:", [...new Set(imgs)].join(", "));
console.log("script tags left:", (body.match(/<script/g) || []).length);
console.log("link tags left:", (body.match(/<link/g) || []).length);