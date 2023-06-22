declare global {
  interface Window {
    _cio: {
      push(args: any[]): void;
      identify: (properties: { [key: string]: any }) => void;
    };
  }
}

export function initializeCustomerIO(): void {
  window._cio = window._cio || [];
  (function () {
    let a, b, c;
    a = function (f: string) {
      return function () {
        window._cio.push([f].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    b = ["load", "identify", "sidentify", "track", "page", "on", "off"];
    for (c = 0; c < b.length; c++) {
      window._cio[b[c]] = a(b[c]);
    }

    window._cio.identify({
      id: "email address",
      created_at: Date.now(),

      email: "email address",
    });
  })();

  const t: HTMLScriptElement = document.createElement("script");
  t.async = true;
  t.id = "cio-tracker";
  t.setAttribute("data-site-id", "YOUR SITE ID");
  t.setAttribute("data-use-array-params", "true");
  t.setAttribute("data-use-in-app", "true");
  t.src = "https://assets.customer.io/assets/track-eu.js";

  const customerIoKey = "YOUR SITE ID";
  const selector = `script[data-site-id="${customerIoKey}"]`;
  const s = document.querySelector(selector);
  if (s && s.parentNode) {
    if (s.nextSibling) {
      s.parentNode.insertBefore(t, s.nextSibling);
    } else {
      s.parentNode.appendChild(t);
    }
  } else {
    document.head.appendChild(t);
  }
}
