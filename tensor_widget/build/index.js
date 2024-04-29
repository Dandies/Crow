var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { renderToString } from "react-dom/server";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { RemixServer } from "@remix-run/react";

// app/context.tsx
import { createContext } from "react";
var ServerStyleContext = createContext(null), ClientStyleContext = createContext(null);

// app/emotion.cache.ts
import createCache from "@emotion/cache";
var defaultCache = createEmotionCache();
function createEmotionCache() {
  return createCache({ key: "cha" });
}

// app/entry.server.tsx
import { jsxDEV } from "react/jsx-dev-runtime";
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let cache = createEmotionCache(), { extractCriticalToChunks } = createEmotionServer(cache), html = renderToString(
    /* @__PURE__ */ jsxDEV(ServerStyleContext.Provider, { value: null, children: /* @__PURE__ */ jsxDEV(CacheProvider, { value: cache, children: /* @__PURE__ */ jsxDEV(RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 23,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this) }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 21,
      columnNumber: 5
    }, this)
  ), chunks = extractCriticalToChunks(html), markup = renderToString(
    /* @__PURE__ */ jsxDEV(ServerStyleContext.Provider, { value: chunks.styles, children: /* @__PURE__ */ jsxDEV(CacheProvider, { value: cache, children: /* @__PURE__ */ jsxDEV(RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 33,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this) }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 31,
      columnNumber: 5
    }, this)
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  links: () => links,
  meta: () => meta
});
import { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var meta = () => [
  {
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1"
  }
], links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
  }
], Document = withEmotionCache(({ children }, emotionCache) => {
  let serverStyleData = useContext(ServerStyleContext), clientStyleData = useContext(ClientStyleContext);
  return useEffect(() => {
    emotionCache.sheet.container = document.head;
    let tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush(), tags.forEach((tag) => {
      emotionCache.sheet._insertTag(tag);
    }), clientStyleData?.reset();
  }, []), /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      serverStyleData?.map(({ key, ids, css }) => /* @__PURE__ */ jsxDEV2("style", { "data-emotion": `${key} ${ids.join(" ")}`, dangerouslySetInnerHTML: { __html: css } }, key, !1, {
        fileName: "app/root.tsx",
        lineNumber: 57,
        columnNumber: 11
      }, this))
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 53,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(ChakraProvider, { children: /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 62,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 64,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 65,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 66,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 52,
    columnNumber: 5
  }, this);
});

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index
});

// app/components/CollectionSpecificBox.tsx
import { useEffect as useEffect2, useState } from "react";
import { Badge } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var API_URI = "https://k8crcirvm2.execute-api.us-east-1.amazonaws.com/mint", CollectionSpecificBox = ({ nft }) => {
  let [crow, setCrow] = useState(void 0);
  return useEffect2(() => {
    (async () => {
      let r = await axios.get(`${API_URI}/${nft.tokenMint}`);
      r.status === 200 && (console.log(r.data), setCrow(r.data.crow));
    })();
  }, [nft]), crow === void 0 ? null : /* @__PURE__ */ jsxDEV3(Tooltip, { label: "some custom text", children: /* @__PURE__ */ jsxDEV3(Badge, { variant: "solid", children: crow.assets.length }, void 0, !1, {
    fileName: "app/components/CollectionSpecificBox.tsx",
    lineNumber: 54,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/CollectionSpecificBox.tsx",
    lineNumber: 53,
    columnNumber: 5
  }, this);
};

// app/routes/_index.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
function Index() {
  return /* @__PURE__ */ jsxDEV4(CollectionSpecificBox, { nft: { tokenMint: "8p6ADKeFFN37y1qcDp6jghdHAoxz5LVxWxbBhoEMYbF4" } }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 4,
    columnNumber: 10
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-A4BHYSYF.js", imports: ["/build/_shared/chunk-XJYTEBPW.js", "/build/_shared/chunk-LMDFFWAH.js", "/build/_shared/chunk-Z57QM6D6.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-PP77EWZX.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-XWTT5XPI.js", imports: ["/build/_shared/chunk-DXHHX322.js", "/build/_shared/chunk-NMZL6IDN.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-GXWLF4B2.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "5ddb7505", hmr: { runtime: "/build/_shared/chunk-PP77EWZX.js", timestamp: 1709303420669 }, url: "/build/manifest-5DDB7505.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
