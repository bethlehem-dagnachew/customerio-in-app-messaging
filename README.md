# customerio-in-app-messaging
This customerio-inapp-messaging code enables seamless integration of Customer.io's in-app messaging feature into your web or mobile application. With this package, you can effortlessly engage and communicate with your users in real-time, delivering personalized messages and notifications directly within your application.
If you are using Vue.js, add a separate TypeScript or JavaScript file, for example customerio.js or customerio.ts, and include the provided code from the index.ts file. Then, mount the created TypeScript or JavaScript file in your App.vue file.

```//customer.ts
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
```

Import the customerio.ts file into your App.vue and use onMount or mounted to initialize it.

```//app.vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { initializeCustomerIO } from '@/customer-io-in-app'
onMounted(() => {
  initializeCustomerIO()
})
</script>
```

If you are using Customer.io for a Vue.js Capacitor mobile application, add the following code to your build.gradle and MainActivity.java files, in addition to the above code. And create additional Customerio.java file

```//build.gradle
dependencies {
   
    implementation 'io.customer.android:tracking:<latest version>'
    implementation 'io.customer.android:messaging-push-fcm:<latest version>'
   
    
}
```


create new java file and the following code
```//Customerio.java
import android.app.Application;

public class Customerio extends Application {
}
```

Add the following code on your mainActivity.java file
```//mainActivity.java
import android.app.Application;
import io.customer.sdk.CustomerIO;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Application application = getApplication();
        if (application instanceof Customerio) {
            Customerio customerio = new Customerio();
            customerio=(Customerio) customerio;
            CustomerIO customerIO = new CustomerIO.Builder("YOUR-SITE-ID", "YOUR-API-KEY"", poko).build();
        }
    }
}
```


