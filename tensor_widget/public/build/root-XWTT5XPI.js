import {
  ClientStyleContext,
  ServerStyleContext
} from "/build/_shared/chunk-XJYTEBPW.js";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "/build/_shared/chunk-LMDFFWAH.js";
import {
  ChakraProvider
} from "/build/_shared/chunk-DXHHX322.js";
import "/build/_shared/chunk-NMZL6IDN.js";
import {
  withEmotionCache
} from "/build/_shared/chunk-Z57QM6D6.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-PP77EWZX.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/root.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/root.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/root.tsx"
  );
  import.meta.hot.lastModified = "1709303040328.7424";
}
var meta = () => [{
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
}];
var links = () => {
  return [{
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  }, {
    rel: "preconnect",
    href: "https://fonts.gstatic.com"
  }, {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
  }];
};
var Document = _s(withEmotionCache(_c = _s(({
  children
}, emotionCache) => {
  _s();
  const serverStyleData = (0, import_react.useContext)(ServerStyleContext);
  const clientStyleData = (0, import_react.useContext)(ClientStyleContext);
  (0, import_react.useEffect)(() => {
    emotionCache.sheet.container = document.head;
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      ;
      emotionCache.sheet._insertTag(tag);
    });
    clientStyleData?.reset();
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 70,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      serverStyleData?.map(({
        key,
        ids,
        css
      }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("style", { "data-emotion": `${key} ${ids.join(" ")}`, dangerouslySetInnerHTML: {
        __html: css
      } }, key, false, {
        fileName: "app/root.tsx",
        lineNumber: 76,
        columnNumber: 13
      }, this))
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 69,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChakraProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 82,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 81,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 86,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 80,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 68,
    columnNumber: 10
  }, this);
}, "vFrPjx9OU/CyW6kig5dfFtYNdnQ=")), "vFrPjx9OU/CyW6kig5dfFtYNdnQ=");
_c2 = Document;
var _c;
var _c2;
$RefreshReg$(_c, "Document$withEmotionCache");
$RefreshReg$(_c2, "Document");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  links,
  meta
};
//# sourceMappingURL=/build/root-XWTT5XPI.js.map
