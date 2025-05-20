import React from "react";
import Reveal from "@/components/Reveal";

export const BROWSER_INTERNALS_SECTIONS = [
  {
    key: "rendering",
    title: "Rendering Lifecycle",
    content: (
      <>
        <p>
          <b>Critical phases in page rendering:</b>
        </p>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>HTML Parsing</b>: Browser converts HTML to DOM tree.
          </li>
          <li>
            <b>CSS Parsing</b>: CSSOM tree built from stylesheets.
          </li>
          <li>
            <b>Render Tree</b>: Combined DOM + CSSOM for visual display.
          </li>
          <li>
            <b>Layout (Reflow)</b>: Browser calculates positions/sizes.
          </li>
          <li>
            <b>Painting</b>: Drawing pixels for each node.
          </li>
          <li>
            <b>Compositing</b>: Layers combined, GPU used for effects.
          </li>
        </ul>
        <div className="text-xs text-gray-500 mb-2">
          <b>Tip:</b> <code>Repaints</code> (visual changes) and{" "}
          <code>Reflows</code> (layout changes) are expensive—minimize in
          critical UI paths.
        </div>
      </>
    ),
  },
  {
    key: "events",
    title: "Browser Events Timeline",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>DOMContentLoaded</b>: DOM ready, no images/styles required
          </li>
          <li>
            <b>load</b>: Page fully loaded, including images/styles/scripts
          </li>
          <li>
            <b>beforeunload/unload</b>: User leaves, cleanup chance
          </li>
          <li>
            <b>visibilitychange</b>: Tab changes visibility
          </li>
        </ul>
        <div className="text-xs text-gray-500 mb-2">
          Use <code>DOMContentLoaded</code> for most JS init. <code>load</code>{" "}
          is late!
        </div>
      </>
    ),
  },
  {
    key: "js-engine",
    title: "JavaScript Engine & Event Loop",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Call Stack:</b> JS runs single-threaded, one call at a time
          </li>
          <li>
            <b>Event Loop:</b> Handles async callbacks (timers, promises,
            events)
          </li>
          <li>
            <b>Microtasks:</b> Promise handlers (run after sync code, before
            next render)
          </li>
          <li>
            <b>Macrotasks:</b> setTimeout, setInterval, I/O, rendering
          </li>
        </ul>
        <div className="text-xs text-gray-500 mb-2">
          <b>Interview tip:</b> &quot;Why <code>Promise.then</code> runs before{" "}
          <code>setTimeout</code>?&quot; <br />
          <span className="italic">
            Because microtasks have priority after current stack.
          </span>
        </div>
      </>
    ),
  },
  {
    key: "network",
    title: "Networking & Requests",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>DNS Lookup</b>: Domain resolves to IP address
          </li>
          <li>
            <b>TLS/SSL Handshake</b>: HTTPS secure connection
          </li>
          <li>
            <b>Request Sent</b>: Includes headers/cookies (if allowed by CORS!)
          </li>
          <li>
            <b>Response Received</b>: HTML, CSS, JS, images, etc.
          </li>
          <li>
            <b>Critical Rendering Path</b>: All blocking assets loaded
          </li>
        </ul>
        <div className="text-xs text-gray-500 mb-2">
          Use <code>preconnect</code> or <code>dns-prefetch</code> for
          performance.
        </div>
      </>
    ),
  },
  {
    key: "security",
    title: "Security Mechanisms (CORS, CSP, Cookies)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>CORS:</b> Restricts cross-origin requests; server must opt-in
          </li>
          <li>
            <b>CSP:</b> (Content Security Policy) Mitigates XSS by controlling
            sources
          </li>
          <li>
            <b>Cookies:</b> <code>Secure</code>, <code>HttpOnly</code>,{" "}
            <code>SameSite</code> flags limit attacks
          </li>
          <li>
            <b>Subresource Integrity:</b> Ensure 3rd party scripts aren’t
            tampered
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "storage",
    title: "Cookies, Storage & Session Management",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Cookies:</b> Server-managed, sent with each request to matching
            domain/path.
            <ul className="list-disc pl-5">
              <li>
                <code>Secure</code>: Only sent over HTTPS.
              </li>
              <li>
                <code>HttpOnly</code>: Inaccessible to JS (prevents XSS theft).
              </li>
              <li>
                <code>SameSite</code>: Controls cross-site sending (
                <b>Strict</b>, <b>Lax</b>, <b>None</b>).
              </li>
              <li>
                <code>Domain/Path</code>: Scoping rules.
              </li>
              <li>
                <code>Expires/Max-Age</code>: Persistent vs. session cookies.
              </li>
            </ul>
          </li>
          <li>
            <b>localStorage / sessionStorage:</b>
            <ul className="list-disc pl-5">
              <li>
                <b>localStorage:</b> 5-10MB per origin, persists after browser
                close.
              </li>
              <li>
                <b>sessionStorage:</b> Per-tab, cleared on tab close.
              </li>
              <li>
                Both: Synchronous, <b>never</b> sent to server, JS-accessible
                only.
              </li>
            </ul>
          </li>
          <li>
            <b>IndexedDB:</b> Large, structured, async storage (offline/PWA
            use).
          </li>
          <li>
            <b>Best Practices:</b>
            <ul className="list-disc pl-5">
              <li>
                Use <b>HttpOnly cookies</b> for auth tokens (protects from XSS).
              </li>
              <li>Never store secrets (tokens/passwords) in localStorage.</li>
              <li>
                Combine <b>SameSite</b> + <b>CSRF tokens</b> for robust
                protection.
              </li>
            </ul>
          </li>
          <li>
            <b>Session Management:</b>
            <ul className="list-disc pl-5">
              <li>
                Session ID in cookie (traditional), or JWT in{" "}
                <b>HttpOnly cookie</b> (modern SPA).
              </li>
              <li>Stateless auth: JWT (careful with logout/invalidation).</li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "service-workers",
    title: "Service Workers & Caching",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Service Worker:</b> JS file running in the background, intercepts
            network requests, enables offline and caching.
            <ul className="list-disc pl-5">
              <li>Scope is per-origin and per-path (not global).</li>
              <li>Runs separately from main JS thread.</li>
              <li>
                Cannot access DOM directly (uses <code>postMessage</code>).
              </li>
            </ul>
          </li>
          <li>
            <b>Lifecycle:</b>
            <ul className="list-disc pl-5">
              <li>
                <b>Install</b>: Downloaded, setup cache/resources.
              </li>
              <li>
                <b>Activate</b>: Takes control, cleans up old data.
              </li>
              <li>
                <b>Fetch</b>: Intercepts requests (
                <b>can serve from cache or network</b>).
              </li>
              <li>
                <b>Update</b>: When source changes, triggers new
                install/activate.
              </li>
            </ul>
          </li>
          <li>
            <b>Caching Strategies:</b>
            <ul className="list-disc pl-5">
              <li>
                <b>Cache-First</b>: Serve from cache, update in background.
              </li>
              <li>
                <b>Network-First</b>: Try network, fallback to cache.
              </li>
              <li>
                <b>Stale-While-Revalidate</b>: Serve cache, update in
                background, refresh next time.
              </li>
            </ul>
          </li>
          <li>
            <b>PWA Basics:</b> Add <code>manifest.json</code>, service worker,
            and HTTPS to make app installable and offline-capable.
          </li>
          <li>
            <b>Best Practices:</b>
            <ul className="list-disc pl-5">
              <li>
                Always handle <code>skipWaiting</code> and{" "}
                <code>clients.claim</code> for updates.
              </li>
              <li>Limit cache size; clean up outdated resources.</li>
              <li>
                Don&apos;t cache sensitive/authenticated responses unless
                encrypted.
              </li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "security-threats",
    title: "Security Threats & Defenses",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>XSS (Cross-Site Scripting):</b> Injecting JS into pages to steal
            data or impersonate users.
            <ul className="list-disc pl-5">
              <li>
                Always escape user input in HTML (
                <b>
                  use frameworks, avoid <code>dangerouslySetInnerHTML</code>
                </b>
                ).
              </li>
              <li>
                Set <code>Content-Security-Policy</code> (CSP) headers to
                restrict scripts.
              </li>
            </ul>
          </li>
          <li>
            <b>CSRF (Cross-Site Request Forgery):</b> Forcing users to make
            unwanted requests (when authenticated).
            <ul className="list-disc pl-5">
              <li>
                Use <b>SameSite</b> cookies and CSRF tokens (per-form or
                per-request).
              </li>
              <li>
                Validate <code>Origin</code>/<code>Referer</code> headers for
                sensitive actions.
              </li>
            </ul>
          </li>
          <li>
            <b>Clickjacking:</b> Tricking users into clicking hidden elements
            (iframes).
            <ul className="list-disc pl-5">
              <li>
                Set <code>X-Frame-Options: DENY</code> or{" "}
                <code>
                  Content-Security-Policy: frame-ancestors &apos;none&apos;
                </code>
                .
              </li>
            </ul>
          </li>
          <li>
            <b>CORS (Cross-Origin Resource Sharing):</b> Restricts cross-origin
            requests—must be enabled by the server, controls which
            origins/methods/headers are allowed.
          </li>
          <li>
            <b>CSP (Content Security Policy):</b> Limits sources of scripts,
            images, styles—prevents most XSS.
          </li>
          <li>
            <b>Subresource Integrity (SRI):</b> Protects against CDN script
            tampering; add <code>integrity</code> attribute to external
            scripts/styles.
          </li>
          <li>
            <b>Best Practices:</b>
            <ul className="list-disc pl-5">
              <li>Use HTTPS everywhere, including local development.</li>
              <li>
                Audit all third-party scripts and dependencies for
                vulnerabilities.
              </li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "http-rest",
    title: "HTTP & REST API Internals",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>HTTP Methods:</b>
            <ul className="list-disc pl-5">
              <li>
                <b>GET</b>: Retrieve resource (safe, idempotent)
              </li>
              <li>
                <b>POST</b>: Create resource (not idempotent)
              </li>
              <li>
                <b>PUT</b>: Replace resource (idempotent)
              </li>
              <li>
                <b>PATCH</b>: Partial update (not always idempotent)
              </li>
              <li>
                <b>DELETE</b>: Remove resource (idempotent)
              </li>
              <li>
                <b>OPTIONS</b>: Preflight/CORS negotiation
              </li>
            </ul>
          </li>
          <li>
            <b>Status Codes:</b>
            <ul className="list-disc pl-5">
              <li>
                1xx: Informational (<b>rare</b>)
              </li>
              <li>2xx: Success (200 OK, 201 Created, 204 No Content)</li>
              <li>3xx: Redirects (301, 302, 307)</li>
              <li>4xx: Client error (400 Bad Request, 401, 403, 404)</li>
              <li>5xx: Server error (500, 502, 503, 504)</li>
            </ul>
          </li>
          <li>
            <b>RESTful Design:</b>
            <ul className="list-disc pl-5">
              <li>
                Resources = nouns (e.g., <code>/users</code>,{" "}
                <code>/orders</code>)
              </li>
              <li>Stateless: No session stored on server between requests</li>
              <li>
                HATEOAS: Responses can include links to related
                actions/resources
              </li>
              <li>
                Versioning: <code>/v1/</code> in URL or via headers
              </li>
            </ul>
          </li>
          <li>
            <b>Headers to Know:</b>
            <ul className="list-disc pl-5">
              <li>
                <code>Authorization</code>: Bearer/JWT tokens
              </li>
              <li>
                <code>Content-Type</code>: JSON, form, etc.
              </li>
              <li>
                <code>Accept</code>: Expected response format
              </li>
              <li>
                <code>Cache-Control</code>, <code>ETag</code>: Caching
              </li>
              <li>
                <code>Set-Cookie</code>: Auth/session cookies
              </li>
            </ul>
          </li>
          <li>
            <b>Idempotency:</b> Repeating the same operation gives the same
            result (GET, PUT, DELETE are idempotent; POST is not).
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "websockets",
    title: "WebSockets & Real-Time Communication",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>WebSocket Protocol:</b> Enables persistent, bidirectional
            communication between client & server.
            <ul className="list-disc pl-5">
              <li>
                Initial handshake: HTTP request with{" "}
                <code>Upgrade: websocket</code>
              </li>
              <li>
                After upgrade, protocol is no longer HTTP—messages sent as
                frames
              </li>
              <li>
                No CORS checks after connection; initial handshake must pass
                CORS
              </li>
            </ul>
          </li>
          <li>
            <b>Use Cases:</b> Chat, live dashboards, gaming, real-time
            notifications
          </li>
          <li>
            <b>Alternatives:</b>
            <ul className="list-disc pl-5">
              <li>
                <b>Server-Sent Events (SSE):</b> Simple one-way (server→client)
                stream, auto-reconnect
              </li>
              <li>
                <b>HTTP Polling/Long Polling:</b> Repeated HTTP requests (less
                efficient)
              </li>
            </ul>
          </li>
          <li>
            <b>Security:</b>
            <ul className="list-disc pl-5">
              <li>
                Always use <code>wss://</code> for encrypted WebSockets
              </li>
              <li>Authenticate in handshake or immediately after connecting</li>
              <li>Implement rate limiting and message validation</li>
            </ul>
          </li>
          <li>
            <b>Best Practices:</b>
            <ul className="list-disc pl-5">
              <li>Gracefully handle connection loss and reconnection</li>
              <li>Clean up event listeners to prevent memory leaks</li>
              <li>
                Don’t use WebSockets for simple RESTful CRUD—use only for
                real-time needs
              </li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "performance",
    title: "Performance Optimization",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Critical Rendering Path:</b> Minimize blocking resources (CSS,
            JS), load above-the-fold content ASAP.
          </li>
          <li>
            <b>Lazy Loading:</b> Defer offscreen images/components with{" "}
            <code>loading=&quot;lazy&quot;</code> or dynamic import.
          </li>
          <li>
            <b>Code Splitting:</b> Split JS bundles (per route/component) for
            faster initial load (<code>React.lazy</code>, <code>import()</code>
            ).
          </li>
          <li>
            <b>Tree Shaking:</b> Remove unused code during build (ES modules).
          </li>
          <li>
            <b>HTTP/2 & HTTP/3:</b> Multiplexing, header compression, faster
            connection reuse.
          </li>
          <li>
            <b>CDN:</b> Serve static assets geographically closer to users.
          </li>
          <li>
            <b>Caching:</b>
            <ul className="list-disc pl-5">
              <li>
                <code>Cache-Control</code>: Set asset expiry (immutable,
                max-age).
              </li>
              <li>
                <code>ETag</code>, <code>Last-Modified</code>: Conditional
                requests for updated content.
              </li>
              <li>
                Use <b>service workers</b> for fine-grained caching logic (PWA).
              </li>
            </ul>
          </li>
          <li>
            <b>Preload, prefetch, dns-prefetch, preconnect:</b> Hints to
            optimize resource fetching.
          </li>
          <li>
            <b>Best Practices:</b>
            <ul className="list-disc pl-5">
              <li>
                Minimize reflows/repaints (batch DOM updates, avoid layout
                thrashing).
              </li>
              <li>
                Analyze and fix bottlenecks using DevTools <b>Performance</b>{" "}
                and <b>Network</b> tabs.
              </li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "sandbox",
    title: "Browser Sandbox & Security Model",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Same-Origin Policy:</b> Prevents scripts from one origin
            accessing data/methods of another.
            <ul className="list-disc pl-5">
              <li>
                <b>Origin =</b> protocol + domain + port.
              </li>
              <li>Affects DOM access, AJAX/fetch, storage, and cookies.</li>
            </ul>
          </li>
          <li>
            <b>iframe Sandboxing:</b>
            <ul className="list-disc pl-5">
              <li>
                <code>&lt;iframe sandbox&gt;</code> restricts JS, forms,
                navigation. Add <code>allow-scripts</code>,{" "}
                <code>allow-same-origin</code> selectively.
              </li>
              <li>
                <b>Use Cases:</b> Isolating 3rd party widgets, secure previews,
                code playgrounds.
              </li>
            </ul>
          </li>
          <li>
            <b>window.opener Attack:</b> Opening a new tab with{" "}
            <code>target=&quot;_blank&quot;</code> gives it access to{" "}
            <code>window.opener</code>.
            <ul className="list-disc pl-5">
              <li>
                Add <code>rel=&quot;noopener noreferrer&quot;</code> to prevent.
              </li>
            </ul>
          </li>
          <li>
            <b>postMessage API:</b> Safe cross-origin communication between
            windows/iframes.
            <ul className="list-disc pl-5">
              <li>
                Always verify <code>event.origin</code> before trusting
                messages.
              </li>
            </ul>
          </li>
          <li>
            <b>Browser Process Isolation:</b> Modern browsers run each tab/site
            in separate processes for security (site isolation).
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "devtools",
    title: "DevTools & Debugging Techniques",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Elements:</b> Inspect/edit DOM, live-edit styles, view computed
            properties.
          </li>
          <li>
            <b>Console:</b> Log output, run JS, view errors/warnings, set
            breakpoints.
          </li>
          <li>
            <b>Network:</b> Inspect requests/responses, see CORS, status codes,
            headers, payloads, waterfall.
          </li>
          <li>
            <b>Performance:</b> Record/visualize main thread activity, flame
            charts, find jank/reflows/slow frames.
          </li>
          <li>
            <b>Memory:</b> Detect leaks, view JS heap, snapshot memory usage.
          </li>
          <li>
            <b>Application/Storage:</b> Inspect cookies, localStorage,
            sessionStorage, IndexedDB, service workers, cache.
          </li>
          <li>
            <b>Sources:</b> Debug JS (set breakpoints, step through code), map
            minified sources.
          </li>
          <li>
            <b>Security:</b> Inspect HTTPS, CSP, mixed content, certs.
          </li>
          <li>
            <b>Common Debug Tasks:</b>
            <ul className="list-disc pl-5">
              <li>Find slow resources (Network/Performance tabs)</li>
              <li>Trace JS errors to source (Console/Sources)</li>
              <li>Verify CORS and cookie issues (Network/Application tabs)</li>
              <li>Inspect storage and clear cache/cookies</li>
            </ul>
          </li>
          <li>
            <b>Pro Tip:</b> Use <code>debugger;</code> in code to auto-pause,
            and <code>Preserve log</code> for SPA navigation issues.
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "request-lifecycle",
    title: "Request/Response Lifecycle",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>DNS Lookup:</b> Domain resolves to IP address (can be cached by
            browser, OS, or resolver).
          </li>
          <li>
            <b>TCP Connection:</b> Browser opens connection to server (TLS/SSL
            handshake if HTTPS).
          </li>
          <li>
            <b>Request Sent:</b>
            <ul className="list-disc pl-5">
              <li>Headers, cookies, method, body (if POST/PUT).</li>
              <li>
                May trigger preflight (OPTIONS) if cross-origin with custom
                headers/methods.
              </li>
            </ul>
          </li>
          <li>
            <b>Server Processing:</b> Auth, business logic, DB, caching,
            response assembly.
          </li>
          <li>
            <b>Response Returned:</b>
            <ul className="list-disc pl-5">
              <li>Status code, headers, cookies, body (HTML, JSON, etc.)</li>
              <li>May include caching, security, CORS headers.</li>
            </ul>
          </li>
          <li>
            <b>Browser Processing:</b> Parses headers, updates storage/cookies,
            renders content, runs JS.
          </li>
          <li>
            <b>Connection Reuse:</b> HTTP/1.1 keep-alive, HTTP/2 multiplexing
            (multiple requests over one connection).
          </li>
          <li>
            <b>Tools:</b> Use DevTools <b>Network</b> tab and HAR files to
            inspect full request/response cycle.
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "a11y-seo",
    title: "Accessibility & SEO Fundamentals",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Accessibility (a11y):</b>
            <ul className="list-disc pl-5">
              <li>
                Use semantic HTML: headings, lists, buttons, links (not just
                divs/spans).
              </li>
              <li>
                All images need <code>alt</code> text for screen readers.
              </li>
              <li>
                Labels for all form controls (<code>&lt;label&gt;</code> for
                inputs).
              </li>
              <li>
                Ensure keyboard navigation for all interactive elements (tab
                order, skip links).
              </li>
              <li>
                Use ARIA roles/attributes only when native elements don’t
                suffice.
              </li>
              <li>Test with tools: Lighthouse, axe, VoiceOver/NVDA.</li>
            </ul>
          </li>
          <li>
            <b>SEO (Search Engine Optimization):</b>
            <ul className="list-disc pl-5">
              <li>
                Meta tags: <code>&lt;title&gt;</code>,{" "}
                <code>&lt;meta name=&quot;description&quot;&gt;</code>,{" "}
                <code>viewport</code>.
              </li>
              <li>Heading hierarchy: H1-H6 for structure.</li>
              <li>
                Structured data: JSON-LD for rich snippets (
                <code>type=&quot;application/ld+json&quot;</code>).
              </li>
              <li>
                Use SSR or SSG (Next.js, etc.) for better crawlability (don’t
                rely on client-side rendering alone).
              </li>
              <li>OpenGraph/Twitter meta tags for social sharing.</li>
              <li>Sitemaps, robots.txt for crawl control.</li>
            </ul>
          </li>
          <li>
            <b>Best Practices:</b> Automated tools find many issues, but always
            do manual checks (screen reader, keyboard, slow connection).
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "modern-js-apis",
    title: "Modern JS & Browser APIs",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Fetch API:</b>
            <ul className="list-disc pl-5">
              <li>Promise-based; replaces XMLHttpRequest for AJAX.</li>
              <li>
                Supports <code>AbortController</code> to cancel requests.
              </li>
              <li>Works with async/await.</li>
            </ul>
          </li>
          <li>
            <b>Streams:</b>
            <ul className="list-disc pl-5">
              <li>
                Read/write blobs, files, network data in chunks (
                <code>ReadableStream</code>, <code>WritableStream</code>).
              </li>
            </ul>
          </li>
          <li>
            <b>Clipboard API:</b> Read/write to system clipboard (
            <code>navigator.clipboard</code>).
          </li>
          <li>
            <b>Notifications API:</b> Display system notifications (
            <code>Notification.requestPermission</code>).
          </li>
          <li>
            <b>Geolocation API:</b> Get user’s location (
            <code>navigator.geolocation.getCurrentPosition</code>).
          </li>
          <li>
            <b>Web Storage APIs:</b> <code>localStorage</code>,{" "}
            <code>sessionStorage</code>, <code>IndexedDB</code> for client-side
            persistence.
          </li>
          <li>
            <b>Intersection Observer:</b> Detect when elements enter/leave the
            viewport (lazy loading, animations).
          </li>
          <li>
            <b>Web Workers:</b> Run JS in background threads for heavy
            computations (<code>new Worker()</code>).
          </li>
          <li>
            <b>Other APIs:</b> Device APIs (battery, sensors), Payment Request,
            WebRTC (media streams), Service Workers, Push API, Cache API.
          </li>
          <li>
            <b>Best Practices:</b>
            <ul className="list-disc pl-5">
              <li>Always check browser compatibility before using new APIs.</li>
              <li>
                Handle permissions/errors gracefully for user experience and
                privacy.
              </li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "event-loop-deep-dive",
    title: "JS Event Loop",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Call Stack:</b> Executes one function at a time, LIFO order.
          </li>
          <li>
            <b>Web APIs:</b> setTimeout, AJAX, DOM events run in browser,
            callback queued when done.
          </li>
          <li>
            <b>Callback Queue:</b> Macrotasks (setTimeout, setInterval, I/O).
          </li>
          <li>
            <b>Microtasks:</b> Promises, MutationObserver (run after stack,
            before next render).
          </li>
          <li>
            <b>Order:</b> Current stack → microtasks → rendering → macrotasks.
          </li>
          <li>
            <b>Quiz:</b> What’s the log order?
            <pre className="bg-gray-100 rounded p-2 text-xs mt-2">{`console.log("A");
  setTimeout(() => console.log("B"), 0);
  Promise.resolve().then(() => console.log("C"));
  console.log("D");`}</pre>
            <Reveal>Answer: A, D, C, B</Reveal>
          </li>
        </ul>
        <div className="text-xs text-gray-500 mt-2">
          Try in DevTools Console: <code>debugger;</code> and watch micro/macro
          task queues.
        </div>
      </>
    ),
  },
  {
    key: "indexeddb-deep-dive",
    title: "IndexedDB",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            Async, NoSQL database in browser. Stores objects, files, blobs.
          </li>
          <li>Versioned schema: Can migrate and upgrade stores/tables.</li>
          <li>
            Works via <code>indexedDB.open(name, version)</code>,{" "}
            <code>transaction</code>, <code>objectStore</code>.
          </li>
          <li>
            Best for: offline apps, large or complex data, replacing
            localStorage for scale.
          </li>
          <li>Not blocked by main thread (doesn’t cause jank).</li>
          <li>Supports queries, indexes, key ranges.</li>
          <li>
            Debug: Use DevTools <b>Application</b> tab → IndexedDB to
            view/change data.
          </li>
          <li>
            Sample usage:
            <pre className="bg-gray-100 rounded p-2 text-xs mt-2">{`const db = await openDB("myDB", 1, {
    upgrade(db) { db.createObjectStore("notes", { keyPath: "id" }); }
  });
  await db.put("notes", { id: 1, content: "Hello!" });`}</pre>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "jwt-deep-dive",
    title: "JWT Authentication & Security",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>JWT (JSON Web Token):</b> Three parts:{" "}
            <code>header.payload.signature</code>
          </li>
          <li>
            <b>Usage:</b> Client stores JWT (usually in <b>HttpOnly cookie</b>),
            sends to server as <code>Authorization: Bearer ...</code> or via
            cookie.
          </li>
          <li>
            <b>Security:</b>
            <ul className="list-disc pl-5">
              <li>Never store in localStorage (XSS risk)</li>
              <li>
                Use <b>HttpOnly, Secure</b> cookies if possible
              </li>
              <li>
                JWTs are <b>signed</b> (not encrypted!); content is readable by
                anyone
              </li>
            </ul>
          </li>
          <li>
            <b>Invalidation:</b> Stateless by default—can&apos;t be “logged out”
            server-side unless you blacklist token IDs or rotate signing keys.
          </li>
          <li>
            <b>Best Practices:</b>
            <ul className="list-disc pl-5">
              <li>
                Set <code>exp</code> (expiry) and <code>iat</code> (issued at)
              </li>
              <li>Validate audience/issuer claims</li>
              <li>Keep tokens short-lived, use refresh tokens</li>
            </ul>
          </li>
          <li>
            <b>Quiz:</b> How to safely implement “remember me”?
            <Reveal>
              Use a short-lived JWT + long-lived refresh token in HttpOnly
              cookie
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "cors-deep-dive",
    title: "CORS Edge Cases",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Simple Requests:</b> GET, POST, HEAD with no custom headers &
            safe content-type (<code>text/plain</code>,{" "}
            <code>application/x-www-form-urlencoded</code>,{" "}
            <code>multipart/form-data</code>) = no preflight.
          </li>
          <li>
            <b>Preflighted Requests:</b> Any other method/header/content-type
            triggers OPTIONS.
          </li>
          <li>
            <b>Credentials & Origin:</b>{" "}
            <code>Access-Control-Allow-Credentials: true</code> <b>never</b>{" "}
            with <code>*</code> for origin.
          </li>
          <li>
            <b>Wildcard Pitfalls:</b>{" "}
            <code>Access-Control-Allow-Headers: *</code> is not supported in all
            browsers.
          </li>
          <li>
            <b>WithCredentials:</b> Must match{" "}
            <code>Access-Control-Allow-Credentials</code> and must not use{" "}
            <code>*</code> for origin.
          </li>
          <li>
            <b>Browser Caching:</b> Browsers cache preflight responses; use{" "}
            <code>Access-Control-Max-Age</code> to tune.
          </li>
          <li>
            <b>Quiz:</b> Why does a fetch with custom <code>Authorization</code>{" "}
            header trigger preflight?
            <Reveal>
              Custom headers aren’t “simple”—requires OPTIONS request.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "csrf-deep-dive",
    title: "CSRF Defense Patterns",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>CSRF:</b> Attacker tricks browser into submitting unwanted
            requests (using auth cookies).
          </li>
          <li>
            <b>Best Defenses:</b>
            <ul className="list-disc pl-5">
              <li>
                <b>SameSite Cookies:</b> <code>Lax</code> for most,{" "}
                <code>Strict</code> for critical
              </li>
              <li>
                <b>CSRF Tokens:</b> Random token per form/request, verified
                server-side
              </li>
              <li>
                Check <code>Origin</code>/<code>Referer</code> headers
              </li>
            </ul>
          </li>
          <li>
            <b>SPA Considerations:</b> If not using cookies for auth, CSRF is
            less of a threat, but XSS is more dangerous!
          </li>
          <li>
            <b>Quiz:</b> Why are <code>GET</code> requests generally safe from
            CSRF?
            <Reveal>
              They shouldn&apos;t cause state changes—enforced by REST.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "http2-deep-dive",
    title: "HTTP/2 & HTTP/3 Features",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>HTTP/2:</b> Single connection, multiplexes multiple requests—no
            head-of-line blocking.
          </li>
          <li>
            <b>Header Compression:</b> HPACK (HTTP/2) & QPACK (HTTP/3) reduce
            overhead.
          </li>
          <li>
            <b>Server Push:</b> Server can proactively send resources before
            client asks (rarely used now, deprecated in HTTP/3).
          </li>
          <li>
            <b>HTTP/3:</b> Runs over QUIC (UDP-based), even faster handshakes,
            better in poor networks.
          </li>
          <li>
            <b>Migration:</b> Most browsers/hosts negotiate best protocol
            transparently.
          </li>
          <li>
            <b>Quiz:</b> What’s the main perf win vs. HTTP/1.1?
            <Reveal>
              Parallel requests, faster TLS, no blocking on slow resources.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "sw-deep-dive",
    title: "Service Worker Gotchas",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Updating:</b> New service worker won’t take control until all
            tabs are closed (unless <code>skipWaiting()</code> called).
          </li>
          <li>
            <b>Cache Busting:</b> Always version your cache names to remove
            outdated resources.
          </li>
          <li>
            <b>DevTools:</b> “Update on reload” can help during
            development—otherwise updates are tricky.
          </li>
          <li>
            <b>Clients.claim():</b> Lets new SW control open tabs immediately
            (after activation).
          </li>
          <li>
            <b>Security:</b> SW can only be registered on same origin + HTTPS
            (or localhost).
          </li>
          <li>
            <b>Quiz:</b> What happens if fetch handler throws?
            <Reveal>Request fails—always use try/catch in fetch event!</Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "rendering-deep-dive",
    title: "Rendering Optimization",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Repaints vs. Reflows:</b>
            <ul className="list-disc pl-5">
              <li>
                <b>Repaint:</b> Visual changes (color, visibility, outline)
                don’t affect layout.
              </li>
              <li>
                <b>Reflow (Layout):</b> Affects geometry—size/position.
                Expensive, may trigger re-render of subtree or whole page.
              </li>
            </ul>
          </li>
          <li>
            <b>Compositing:</b> Elements with certain CSS (e.g.{" "}
            <code>transform</code>, <code>opacity</code>,{" "}
            <code>will-change</code>) get their own layers—GPU acceleration,
            reduces main thread work.
          </li>
          <li>
            <b>Optimization Tips:</b>
            <ul className="list-disc pl-5">
              <li>
                Batch DOM reads/writes; avoid forced synchronous layouts
                (triggered by <code>offsetHeight</code>,{" "}
                <code>getBoundingClientRect</code> in JS).
              </li>
              <li>Use CSS animations/transforms over JS where possible.</li>
              <li>
                Minimize expensive properties: <code>box-shadow</code>,{" "}
                <code>filter</code>, <code>border-radius</code> on large
                elements.
              </li>
              <li>
                Use <code>contain</code> and <code>will-change</code> CSS for
                performance hints.
              </li>
              <li>
                Profile using DevTools <b>Performance</b> tab; watch for
                “Layout” and “Paint” spikes.
              </li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "a11y-deep-dive",
    title: "Accessibility Patterns",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Focus Management:</b> Use <code>tabindex</code>,{" "}
            <code>autofocus</code>, focus traps for modals/dialogs.
          </li>
          <li>
            <b>Keyboard Nav:</b> All features should be usable with keyboard
            only—test with <kbd>Tab</kbd>, <kbd>Shift+Tab</kbd>,{" "}
            <kbd>Enter</kbd>, <kbd>Space</kbd>.
          </li>
          <li>
            <b>Color Contrast:</b> Ensure at least 4.5:1 for normal text, 3:1
            for large text.
          </li>
          <li>
            <b>ARIA Roles:</b> Use for custom widgets (e.g.,{" "}
            <code>role=&quot;dialog&quot;</code>, <code>aria-expanded</code> on
            accordions).
          </li>
          <li>
            <b>Live Regions:</b> Announce updates dynamically with{" "}
            <code>aria-live</code>, <code>aria-atomic</code>.
          </li>
          <li>
            <b>Testing:</b> Lighthouse, axe, screen readers, manual tab order
            checks.
          </li>
          <li>
            <b>Quiz:</b> What’s wrong with{" "}
            <code>&lt;div onClick=...&gt;Click me&lt;/div&gt;</code> for a
            button?
            <Reveal>
              Not keyboard accessible, not announced as button, no default
              focus/role.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "ssr-deep-dive",
    title: "SSR, SSG & Hydration",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>SSR (Server-Side Rendering):</b> HTML rendered on server, sent to
            client for fast First Contentful Paint & SEO.
          </li>
          <li>
            <b>SSG (Static Site Generation):</b> Pages built at build-time;
            ultra-fast for public pages (Next.js <code>getStaticProps</code>).
          </li>
          <li>
            <b>Hydration:</b> Browser JS takes over static HTML, binds
            events—required for interactivity.
          </li>
          <li>
            <b>CSR (Client-Side Rendering):</b> All JS, blank page before bundle
            loads. Fast for SPA nav, bad for SEO/slow networks.
          </li>
          <li>
            <b>Best Practices:</b>
            <ul className="list-disc pl-5">
              <li>
                Use SSR for dynamic, SEO-critical pages (blogs, e-commerce
                product pages).
              </li>
              <li>Use SSG for marketing/home/docs.</li>
              <li>
                Watch for hydration errors (DOM mismatch, non-deterministic
                rendering).
              </li>
              <li>
                Progressively enhance CSR with Suspense, streaming for best UX.
              </li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "rest-graphql-deep-dive",
    title: "REST vs GraphQL",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>REST:</b> Multiple endpoints, fixed responses, follows HTTP
            verbs, stateless.
          </li>
          <li>
            <b>GraphQL:</b> Single endpoint, clients specify shape, type-safe,
            one roundtrip.
          </li>
          <li>
            <b>REST Pros:</b> Simple, cacheable, works everywhere, standard
            tools (Postman, curl).
          </li>
          <li>
            <b>GraphQL Pros:</b> Over/underfetching solved, great for
            complex/mobile UIs, schema introspection, typed.
          </li>
          <li>
            <b>Drawbacks:</b>
            <ul className="list-disc pl-5">
              <li>
                REST: Overfetch, multiple roundtrips, versioning can be hard.
              </li>
              <li>
                GraphQL: Harder caching, needs schema management, more complex
                backend, some security gotchas (introspection, n+1).
              </li>
            </ul>
          </li>
          <li>
            <b>Best Practices:</b> Use REST for simple/CRUD, GraphQL for
            data-rich/mobile/SPA.
          </li>
          <li>
            <b>Quiz:</b> Why can REST be better for CDN caching?
            <Reveal>
              Each endpoint is a URL, so CDN can cache responses by path.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "security-headers-deep-dive",
    title: "Modern Web Security Headers",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Content-Security-Policy (CSP):</b> Restricts allowed scripts,
            styles, images, etc. Mitigates XSS.
          </li>
          <li>
            <b>X-Frame-Options:</b> <code>DENY</code> or <code>SAMEORIGIN</code>{" "}
            blocks clickjacking.
          </li>
          <li>
            <b>Strict-Transport-Security (HSTS):</b> Forces HTTPS for all future
            requests.
          </li>
          <li>
            <b>Referrer-Policy:</b> Limits what referrer info is sent (e.g.,{" "}
            <code>strict-origin-when-cross-origin</code>).
          </li>
          <li>
            <b>X-Content-Type-Options:</b> <code>nosniff</code> stops browser
            from guessing types (prevents drive-by attacks).
          </li>
          <li>
            <b>Permissions-Policy:</b> Limits access to sensitive APIs (e.g.,
            geolocation, camera, mic).
          </li>
          <li>
            <b>Quiz:</b> Why is CSP effective for preventing XSS?
            <Reveal>
              Blocks inline/scripts from other domains; only trusted sources
              run.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "memory-deep-dive",
    title: "Browser Memory Management & Leaks",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Garbage Collection:</b> JS engine uses mark-and-sweep; reclaims
            objects not reachable from root.
          </li>
          <li>
            <b>Common Leaks:</b>
            <ul className="list-disc pl-5">
              <li>Uncleared intervals/timeouts</li>
              <li>
                Detached DOM nodes (removed from DOM, still referenced in JS)
              </li>
              <li>Global variables (accidentally not block-scoped)</li>
              <li>
                Closures holding onto large data (especially in event listeners)
              </li>
            </ul>
          </li>
          <li>
            <b>Detecting Leaks:</b> Use DevTools <b>Memory</b> panel, heap
            snapshots, allocation instrumentation.
          </li>
          <li>
            <b>Prevention:</b> Always cleanup in <code>useEffect</code> or on
            component unmount; avoid large objects in closures.
          </li>
          <li>
            <b>Quiz:</b> What happens if you add an event listener to{" "}
            <code>window</code> but never remove it?
            <Reveal>
              It keeps references alive—potential memory leak, especially in
              SPAs.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "paint-pipeline-deep-dive",
    title: "Browser Paint Pipeline",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Steps:</b>
            <ul className="list-disc pl-5">
              <li>Style: CSSOM built from CSS</li>
              <li>Layout: Calculate geometry for all nodes (reflows)</li>
              <li>Paint: Draw layers (text, images, backgrounds) as bitmaps</li>
              <li>Composite: GPU merges layers to the screen</li>
            </ul>
          </li>
          <li>
            <b>Optimization:</b> Minimize layout thrashing (batch DOM
            reads/writes), prefer transform/opacity for smoothness.
          </li>
          <li>
            <b>DevTools:</b> Performance tab → &quot;Paint&quot; events; Layers
            tab to debug composite layers.
          </li>
          <li>
            <b>Quiz:</b> Why does animating <code>top/left</code> cause jank,
            but <code>transform: translate</code> does not?
            <Reveal>
              Transform is handled by GPU in composite stage; top/left triggers
              layout and paint on main thread.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "cdn-deep-dive",
    title: "Content Delivery Networks (CDN)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Purpose:</b> Distribute static content (JS, CSS, images) via edge
            servers worldwide.
          </li>
          <li>
            <b>Benefits:</b>
            <ul className="list-disc pl-5">
              <li>Lower latency—served from server close to user</li>
              <li>Offloads origin—reduces load spikes</li>
              <li>Improved reliability—auto failover, DDoS protection</li>
              <li>Optional image/video optimization at edge</li>
            </ul>
          </li>
          <li>
            <b>Cache Keys:</b> Path, query, sometimes cookies/headers.
          </li>
          <li>
            <b>Best Practices:</b> Use <code>Cache-Control</code>, version
            static assets (e.g., <code>app.abc123.js</code>), invalidate on
            deploy.
          </li>
          <li>
            <b>Quiz:</b> Why not cache API responses on CDN by default?
            <Reveal>
              APIs are often user- or session-specific; risk leaking data across
              users.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "tls-quic-deep-dive",
    title: "TLS, QUIC & HTTP/3",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>TLS (Transport Layer Security):</b> Encrypts HTTP traffic; uses
            handshake to establish session keys.
          </li>
          <li>
            <b>QUIC:</b> Modern UDP-based protocol (by Google); multiplexes
            streams, built-in encryption, fast handshake.
          </li>
          <li>
            <b>HTTP/3:</b> Runs on QUIC, not TCP. No head-of-line blocking,
            instant reconnections after packet loss.
          </li>
          <li>
            <b>Benefits:</b> Faster connection establishment, lower latency,
            better for mobile/unreliable networks.
          </li>
          <li>
            <b>Quiz:</b> Why does HTTP/3 use UDP not TCP?
            <Reveal>
              UDP is connectionless and avoids head-of-line blocking; QUIC adds
              reliability, order, and security on top.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "feature-detection-deep-dive",
    title: "Feature Detection & Polyfills",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Feature Detection:</b> Use <code>typeof</code>, <code>in</code>{" "}
            operator, or try/catch to check API support.
          </li>
          <li>
            <b>Polyfills:</b> Code that implements missing features for old
            browsers (e.g., <code>Promise</code>, <code>fetch</code>).
          </li>
          <li>
            <b>Progressive Enhancement:</b> Provide core experience to all, add
            advanced features if supported.
          </li>
          <li>
            <b>Modern Tools:</b> Use <code>core-js</code>,{" "}
            <code>polyfill.io</code>, Babel for transpiling/polyfilling.
          </li>
          <li>
            <b>Quiz:</b> Why not just always use a polyfill for everything?
            <Reveal>
              Polyfills add size/perf overhead. Prefer feature detection to load
              only if needed.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "resource-hints-deep-dive",
    title: "Resource Hints & Preloading",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Resource Hints:</b> Help browser optimize network for what’s
            coming.
            <ul className="list-disc pl-5">
              <li>
                <code>&lt;link rel=&quot;preload&quot;&gt;</code> — load a
                resource early (JS, font, image).
              </li>
              <li>
                <code>&lt;link rel=&quot;prefetch&quot;&gt;</code> —
                low-priority fetch for future navigation.
              </li>
              <li>
                <code>&lt;link rel=&quot;dns-prefetch&quot;&gt;</code> — resolve
                DNS early.
              </li>
              <li>
                <code>&lt;link rel=&quot;preconnect&quot;&gt;</code> — set up
                TCP/TLS to domain early.
              </li>
            </ul>
          </li>
          <li>
            <b>Best Practices:</b> Use <code>preload</code> for critical assets,{" "}
            <code>prefetch</code> for likely next pages; avoid overusing.
          </li>
          <li>
            <b>Quiz:</b> Why not preload everything?
            <Reveal>
              Can overload network, defeat browser prioritization—be selective!
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "wasm-deep-dive",
    title: "WebAssembly (WASM) in the Browser",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>What is WASM?</b> Binary format for running native-like code in
            browser at near-native speed.
          </li>
          <li>
            <b>Languages:</b> C/C++, Rust, Go, AssemblyScript compile to WASM.
          </li>
          <li>
            <b>Use Cases:</b> Image/video editors, games, crypto, heavy
            computation, legacy code reuse.
          </li>
          <li>
            <b>Interop:</b> JS can call WASM and vice versa; data passed as
            typed arrays.
          </li>
          <li>
            <b>Limitations:</b> No direct DOM access, no garbage collection
            (yet), sandboxed.
          </li>
          <li>
            <b>Quiz:</b> When would you choose WASM over JS?
            <Reveal>
              For CPU-intensive tasks, or when porting code from non-JS
              language.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "asset-loading-deep-dive",
    title: "Modern Asset Loading (Fonts, Images, Video)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Fonts:</b>
            <ul className="list-disc pl-5">
              <li>
                <code>font-display: swap</code> for instant fallback, avoid
                invisible text.
              </li>
              <li>
                Self-host or use Google Fonts with <code>preconnect</code>/
                <code>preload</code>.
              </li>
              <li>Variable fonts—single file for multiple weights/styles.</li>
            </ul>
          </li>
          <li>
            <b>Images:</b>
            <ul className="list-disc pl-5">
              <li>
                Use <code>srcset</code>/<code>sizes</code> for responsive,{" "}
                <code>loading=&quot;lazy&quot;</code> for offscreen.
              </li>
              <li>WebP/AVIF formats—better compression than JPEG/PNG.</li>
              <li>
                Use CDNs/image optimizers for resizing and next-gen format
                conversion.
              </li>
            </ul>
          </li>
          <li>
            <b>Video:</b>
            <ul className="list-disc pl-5">
              <li>
                <code>preload</code>=&quot;none/metadata/auto&quot; for
                bandwidth control.
              </li>
              <li>Use adaptive streaming (HLS/DASH) for large/long videos.</li>
              <li>
                <b>Accessibility:</b> Always add captions and audio
                descriptions.
              </li>
            </ul>
          </li>
          <li>
            <b>Quiz:</b> Why prefer <code>font-display: swap</code> for web
            fonts?
            <Reveal>
              Improves perceived performance, avoids FOIT (flash of invisible
              text).
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "samesite-cookie-deep-dive",
    title: "Modern SameSite Cookie Changes",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>SameSite:</b> Controls if cookies are sent with cross-site
            requests.
          </li>
          <li>
            <b>Values:</b>
            <ul className="list-disc pl-5">
              <li>
                <b>Lax (default):</b> Sent for top-level navigation GETs, not
                POST/iframe.
              </li>
              <li>
                <b>Strict:</b> Sent only for same-site navigation.
              </li>
              <li>
                <b>None:</b> Sent cross-site, <b>must</b> be Secure (HTTPS).
              </li>
            </ul>
          </li>
          <li>
            <b>Modern Browsers:</b> Treat missing as <code>Lax</code> by
            default.
          </li>
          <li>
            <b>Best Practices:</b> Use <b>Lax</b> for most, <b>Strict</b> for
            critical, <b>None</b> only for third-party APIs/services with Secure
            flag.
          </li>
          <li>
            <b>Quiz:</b> Why did Chrome make Lax the default?
            <Reveal>Reduces CSRF by default for most cookies.</Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "concurrency-deep-dive",
    title: "Browser Concurrency (Web Workers, Shared Workers, Atomics)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Web Workers:</b> Run JS in a separate thread; communicate via{" "}
            <code>postMessage</code>. No DOM access.
          </li>
          <li>
            <b>Shared Workers:</b> One worker shared between tabs/windows of
            same origin; good for sync/caching/messaging.
          </li>
          <li>
            <b>Service Workers:</b> Proxy for network requests, PWA/offline,
            background sync.
          </li>
          <li>
            <b>Atomics & SharedArrayBuffer:</b> Low-level, allows thread-safe
            shared memory and locking (advanced, needs HTTPS and COOP/COEP
            headers).
          </li>
          <li>
            <b>Use Cases:</b> Image/video processing, heavy computation, shared
            caches, real-time collaboration, background sync.
          </li>
          <li>
            <b>Quiz:</b> Why use workers instead of setTimeout or batching on
            main thread?
            <Reveal>
              Avoid UI jank—offloads CPU work so UI stays responsive.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "http-caching-deep-dive",
    title: "HTTP Caching—Strategies, Headers, Pitfalls",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Browser Cache:</b> Stores responses for fast repeat loads.
          </li>
          <li>
            <b>Key Headers:</b>
            <ul className="list-disc pl-5">
              <li>
                <code>Cache-Control</code>: <code>public</code>,{" "}
                <code>private</code>, <code>no-cache</code>,{" "}
                <code>max-age</code>
              </li>
              <li>
                <code>ETag</code>: Unique version ID for resource; used for
                conditional requests.
              </li>
              <li>
                <code>Last-Modified</code>: Timestamp of last change.
              </li>
              <li>
                <code>Expires</code>: HTTP/1.0 legacy version of{" "}
                <code>max-age</code>.
              </li>
            </ul>
          </li>
          <li>
            <b>Validation:</b> Browser sends <code>If-None-Match</code> or{" "}
            <code>If-Modified-Since</code>, server replies{" "}
            <code>304 Not Modified</code> if no changes.
          </li>
          <li>
            <b>Common Pitfalls:</b> Setting <code>Cache-Control: no-cache</code>{" "}
            disables caching, <code>must-revalidate</code> enforces server
            checks.
          </li>
          <li>
            <b>Immutable:</b> <code>Cache-Control: immutable</code> for
            never-changing assets.
          </li>
          <li>
            <b>Quiz:</b> Why use both ETag and Last-Modified?
            <Reveal>
              Browser/server may choose the best; some proxies strip ETag.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "state-management-deep-dive",
    title: "Modern State Management Patterns",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Local State:</b> useState/useReducer, Context for component tree
            state.
          </li>
          <li>
            <b>Global/App State:</b> Redux Toolkit, Zustand, Jotai, Context
            API—choose based on app scale and complexity.
          </li>
          <li>
            <b>Server State:</b> React Query, SWR for fetching/caching/syncing
            API data.
          </li>
          <li>
            <b>Best Practices:</b> Minimize global state, colocate state as
            close to where used as possible.
          </li>
          <li>
            <b>Patterns:</b> Lifting state up, custom hooks, event bus for
            cross-tree comms.
          </li>
          <li>
            <b>Quiz:</b> Why use React Query/SWR for API data over
            Redux/Context?
            <Reveal>
              Handles caching, deduping, retries, background refresh—less code,
              fewer bugs.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "microfrontends-deep-dive",
    title: "Micro-frontends & Modular Web Apps",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Concept:</b> Multiple teams/apps deliver features independently,
            composed at runtime (or build).
          </li>
          <li>
            <b>Techniques:</b>
            <ul className="list-disc pl-5">
              <li>iframe composition (old, secure, poor UX)</li>
              <li>
                Module Federation (Webpack 5+), import remote components at
                runtime
              </li>
              <li>
                Custom build + runtime integration (single-spa, qiankun, etc.)
              </li>
            </ul>
          </li>
          <li>
            <b>Challenges:</b> Routing, state sharing, CSS isolation,
            deployment, cross-team contracts.
          </li>
          <li>
            <b>Best Practices:</b> Expose only what’s needed, version
            interfaces, automate integration tests.
          </li>
          <li>
            <b>Quiz:</b> Why use module federation for MFEs?
            <Reveal>
              Enables runtime sharing of code/components—decouples deploys,
              enables true independence.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "logging-monitoring-deep-dive",
    title: "Logging, Monitoring & Error Reporting in SPAs",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Client-side Logging:</b> Use <code>console.log</code> for local
            debugging, but for production, log to a service (Sentry, LogRocket,
            Datadog).
          </li>
          <li>
            <b>Global Error Boundaries:</b> React error boundaries (
            <code>componentDidCatch</code> or <code>ErrorBoundary</code>) catch
            render/runtime errors.
          </li>
          <li>
            <b>Unhandled Promises:</b> Listen for{" "}
            <code>window.onunhandledrejection</code>.
          </li>
          <li>
            <b>Performance Monitoring:</b> Use <code>PerformanceObserver</code>,
            Web Vitals, custom timings.
          </li>
          <li>
            <b>User Tracking:</b> Always anonymize PII; respect privacy/GDPR.
          </li>
          <li>
            <b>Quiz:</b> Why use error boundaries in React?
            <Reveal>
              Prevents entire app from crashing, surfaces errors for
              reporting/UI fallback.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "ci-cd-deep-dive",
    title: "Modern CI/CD for Front-End",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Continuous Integration:</b> Lint, build, test, static analysis on
            every PR (GitHub Actions, GitLab CI, CircleCI).
          </li>
          <li>
            <b>Preview Deployments:</b> Deploy feature branches to temp URLs for
            review.
          </li>
          <li>
            <b>Deployment:</b> Automated to Netlify, Vercel, AWS, or your own
            infra; zero-downtime via atomic swaps.
          </li>
          <li>
            <b>Common Steps:</b> <code>npm ci</code>, build, test,{" "}
            <code>eslint</code>, <code>prettier</code>, e2e tests (Cypress).
          </li>
          <li>
            <b>Monitoring:</b> Alert on build failures, visual regression, perf
            drops.
          </li>
          <li>
            <b>Quiz:</b> Why is <code>npm ci</code> preferred in CI over{" "}
            <code>npm install</code>?
            <Reveal>
              Ensures deterministic install (from lockfile), avoids surprises.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "devtools-profiling-deep-dive",
    title: "Advanced DevTools & Profiling",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Performance Tab:</b> Record frames, analyze main thread, detect
            long tasks and layout thrashing.
          </li>
          <li>
            <b>Memory Tab:</b> Snapshots, detect detached DOM, monitor live
            memory usage, track leaks.
          </li>
          <li>
            <b>Coverage Tab:</b> Find unused JS/CSS for tree shaking.
          </li>
          <li>
            <b>Lighthouse:</b> Automated audits for PWA, perf, SEO, a11y, best
            practices.
          </li>
          <li>
            <b>React/Vue DevTools:</b> Inspect component tree, props, state,
            hooks, update causes.
          </li>
          <li>
            <b>Quiz:</b> What’s the best way to debug layout jank?
            <Reveal>
              Use Performance tab → look for frequent Layout events; use paint
              flashing in Rendering panel.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "code-splitting-deep-dive",
    title: "Code-Splitting & Dynamic Imports (Real-World Patterns)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Purpose:</b> Split JS into multiple bundles, load only what’s
            needed for current route/view.
          </li>
          <li>
            <b>Techniques:</b>
            <ul className="list-disc pl-5">
              <li>
                <code>import()</code> for dynamic loading (supported in all
                major bundlers).
              </li>
              <li>
                <code>React.lazy</code> with <code>&lt;Suspense&gt;</code> for
                route/component-level splits.
              </li>
              <li>
                Route-based code splitting (Next.js, React Router, Vue Router).
              </li>
            </ul>
          </li>
          <li>
            <b>Best Practices:</b> Preload above-the-fold, lazy-load the rest;
            monitor bundle size with source-map-explorer.
          </li>
          <li>
            <b>Pitfalls:</b> Too many small chunks = network overhead, too few =
            slow initial load.
          </li>
          <li>
            <b>Quiz:</b> Why use <code>Suspense fallback</code>?
            <Reveal>
              Shows loading UI while async chunk is fetched—prevents UI flashes.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "advanced-security-deep-dive",
    title: "Advanced Security Pitfalls for Seniors",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>OAuth & OIDC:</b> Know implicit vs. authorization code flow;
            never store tokens in localStorage, avoid sending access tokens in
            URLs.
          </li>
          <li>
            <b>Sensitive Data:</b> Redact PII before logging; watch for
            analytics leaks.
          </li>
          <li>
            <b>3rd-Party Scripts:</b> Always audit, restrict via CSP, and SRI;
            beware supply-chain attacks.
          </li>
          <li>
            <b>iframe/Widget Embedding:</b> Sandbox iframes, use{" "}
            <code>allow-scripts</code> sparingly, never{" "}
            <code>allow-same-origin</code> unless trusted.
          </li>
          <li>
            <b>Package Updates:</b> Monitor npm audit, use dependabot, set up
            lockfile-linting.
          </li>
          <li>
            <b>Quiz:</b> What’s the most common cause of token theft in modern
            SPAs?
            <Reveal>
              XSS, especially when JWT/token is stored in localStorage.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "rate-limiting-deep-dive",
    title: "API Rate Limiting—Patterns & Best Practices",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Purpose:</b> Prevent abuse, protect backend, ensure fair usage.
          </li>
          <li>
            <b>Patterns:</b>
            <ul className="list-disc pl-5">
              <li>
                <b>Fixed Window:</b> Limit N requests per window (e.g., per
                minute)
              </li>
              <li>
                <b>Sliding Log:</b> Track request timestamps, allow N in any
                period
              </li>
              <li>
                <b>Token Bucket/Leaky Bucket:</b> Flexible burst handling,
                smooths traffic
              </li>
              <li>
                <b>Global vs. Per-user:</b> API-wide, per-key, per-IP, per-route
              </li>
            </ul>
          </li>
          <li>
            <b>Implementation:</b> CDN (Cloudflare, AWS API Gateway), reverse
            proxy (nginx), app logic (Redis for counters)
          </li>
          <li>
            <b>Headers:</b> <code>X-RateLimit-Limit</code>,{" "}
            <code>X-RateLimit-Remaining</code>, <code>Retry-After</code>
          </li>
          <li>
            <b>Quiz:</b> Why is token bucket preferred for APIs?
            <Reveal>
              Allows occasional bursts; smoother real-user experience.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "pwa-deep-dive",
    title: "Progressive Web Apps (PWAs) in Production",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Installability:</b> Manifest.json with name, icons, start_url,
            display, theme_color
          </li>
          <li>
            <b>Offline Support:</b> Service Worker caches, fallback pages
          </li>
          <li>
            <b>Push Notifications:</b> Browser Push API + background service
          </li>
          <li>
            <b>App-Like UX:</b> Fullscreen, splash, home screen icon
          </li>
          <li>
            <b>Security:</b> HTTPS required, all resources from same origin
          </li>
          <li>
            <b>Best Practices:</b> Always provide manual update flow (service
            worker update), test install/uninstall, test on mobile real devices
          </li>
          <li>
            <b>Quiz:</b> Why do many PWA installs silently fail on iOS?
            <Reveal>
              Safari’s limited support—no push, background sync, some manifest
              fields ignored.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "realtime-protocols-deep-dive",
    title: "WebSockets vs. SSE vs. HTTP Polling",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>WebSockets:</b> Full-duplex, persistent, client/server both push
            data. Needs custom protocol/server, no native browser reconnect.
          </li>
          <li>
            <b>SSE (EventSource):</b> One-way (server→client), built-in
            reconnect, simple for notifications/feeds, uses plain HTTP.
          </li>
          <li>
            <b>HTTP Polling:</b> Client requests repeatedly (interval or
            long-poll). High latency, server load.
          </li>
          <li>
            <b>Best Practices:</b> Use SSE for simple push (notifications,
            feeds), WebSockets for chats/games, polling for rare/legacy.
          </li>
          <li>
            <b>Quiz:</b> Why not use WebSocket for everything?
            <Reveal>
              Higher infra complexity, no caching, firewall issues, overkill for
              basic push.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "authorization-deep-dive",
    title: "Modern Authorization (RBAC, ABAC, JWT, OAuth2)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>RBAC:</b> Role-Based Access Control; user gets roles, roles
            define permissions.
          </li>
          <li>
            <b>ABAC:</b> Attribute-Based Access Control; permissions based on
            user/resource/context attributes.
          </li>
          <li>
            <b>JWT Claims:</b> Store roles/scopes/attributes in JWT for
            stateless APIs.
          </li>
          <li>
            <b>OAuth2:</b> AuthZ protocol—authorization code (web), device,
            implicit (legacy).
          </li>
          <li>
            <b>Best Practices:</b> Principle of least privilege; audit trails;
            always validate claims server-side.
          </li>
          <li>
            <b>Quiz:</b> Why is stateless JWT risky for critical access?
            <Reveal>
              Can’t instantly revoke/expire a token without blacklist or
              rotation.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "cors-advanced-deep-dive",
    title: "CORS Preflight, Pitfalls, Debugging",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Preflight:</b> For non-simple requests (custom headers,
            PUT/DELETE), browser sends OPTIONS request first.
          </li>
          <li>
            <b>Access-Control-Allow-*</b> headers control access, must match
            request exactly (origin, method, headers).
          </li>
          <li>
            <b>Debugging:</b> Use browser Network tab, look for OPTIONS and
            errors, check server logs.
          </li>
          <li>
            <b>Pitfalls:</b> Credentials with <code>*</code> origin forbidden,
            Vary: Origin header needed for caching.
          </li>
          <li>
            <b>CDN Gotchas:</b> CDN can cache CORS headers; misconfig can break
            requests only for some users.
          </li>
          <li>
            <b>Quiz:</b> Why can two identical-looking requests result in
            different CORS errors?
            <Reveal>
              Server misconfiguration, wrong headers, CDN caching headers
              incorrectly, or credential mode mismatch.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "routing-advanced-deep-dive",
    title: "Advanced Client-Side Routing",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Hash vs. History:</b> Hash (#) for legacy, History API for
            SEO/SSR.
          </li>
          <li>
            <b>SSR Integration:</b> Hydration, routing state sync (Next.js,
            Remix, Gatsby).
          </li>
          <li>
            <b>Code Splitting:</b> Per-route bundles; lazy-load heavy pages.
          </li>
          <li>
            <b>Page Transitions:</b> Animate with Suspense, use{" "}
            <code>startTransition</code> (React 19+) for smooth UX.
          </li>
          <li>
            <b>404 Handling:</b> Catch-all, fallback routes (wildcard patterns).
          </li>
          <li>
            <b>Quiz:</b> Why can navigation block rendering in SPA?
            <Reveal>
              If blocking data loads or sync effects run before paint—defer with
              Suspense/startTransition.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "webrtc-deep-dive",
    title: "WebRTC—Real-Time Audio/Video/Data",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>WebRTC:</b> Peer-to-peer media/data (audio/video/file) in
            browser, via <code>RTCPeerConnection</code>.
          </li>
          <li>
            <b>Signaling:</b> Needs out-of-band (usually WebSocket/HTTP) for
            peer handshake.
          </li>
          <li>
            <b>STUN/TURN:</b> NAT/firewall traversal, relaying media if direct
            connect fails.
          </li>
          <li>
            <b>Security:</b> Always encrypted (SRTP/DTLS).
          </li>
          <li>
            <b>Best Practices:</b> Handle permission UI, fallback, multi-peer
            scaling.
          </li>
          <li>
            <b>Quiz:</b> Why do WebRTC calls fail sometimes in the enterprise?
            <Reveal>
              Corporate firewalls may block UDP or STUN/TURN relays.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "fingerprinting-deep-dive",
    title: "Browser Fingerprinting & Evasion",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Fingerprinting:</b> Combining non-cookie data—user agent, canvas,
            WebGL, fonts, screen size, plugins, etc.
          </li>
          <li>
            <b>Persistence:</b> Even if cookies cleared, fingerprint remains
            stable unless entropy is reduced.
          </li>
          <li>
            <b>Evasion:</b> Tor, privacy browsers randomize/limit entropy;
            browser APIs (Storage Access, Privacy Sandbox) limit tracking.
          </li>
          <li>
            <b>Ethics/Legality:</b> Many jurisdictions require user
            notice/opt-out.
          </li>
          <li>
            <b>Quiz:</b> Why is fingerprinting still a privacy risk with
            GDPR/CCPA?
            <Reveal>
              Most users don’t realize or cannot easily block; hard to
              audit/enforce.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "webcomponents-deep-dive",
    title: "Web Components (Custom Elements, Shadow DOM, Slots)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Custom Elements:</b> Define new HTML tags (
            <code>class MyEl extends HTMLElement</code> +{" "}
            <code>customElements.define</code>)
          </li>
          <li>
            <b>Shadow DOM:</b> True encapsulation for styles/DOM—prevents
            bleed/leak.
          </li>
          <li>
            <b>Slots:</b> Declarative content projection into custom elements.
          </li>
          <li>
            <b>Interop:</b> Use in any framework (React, Vue, Angular), but must
            handle events/refs carefully.
          </li>
          <li>
            <b>Best Practices:</b> Use for shareable, style-isolated widgets.
          </li>
          <li>
            <b>Quiz:</b> Why not use Shadow DOM everywhere?
            <Reveal>
              Can break global styles, hard to theme; tools like React already
              solve most component isolation issues.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "observability-deep-dive",
    title: "Observability & Distributed Tracing for Front-End Apps",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Observability:</b> Complete visibility into app health—metrics,
            logs, traces.
          </li>
          <li>
            <b>Tracing:</b> Track user/session across services
            (frontend↔backend), tie requests to logs/errors.
          </li>
          <li>
            <b>Tools:</b> Sentry, Datadog RUM, OpenTelemetry, Jaeger, Zipkin,
            Honeycomb.
          </li>
          <li>
            <b>Custom Spans:</b> Use tracing APIs to annotate user flows (login,
            payment, slow network).
          </li>
          <li>
            <b>Correlation IDs:</b> Pass request IDs (in headers or JS context)
            from browser to backend for end-to-end debugging.
          </li>
          <li>
            <b>Best Practices:</b> Sample only “interesting” traces to avoid
            data overload, respect privacy for PII in logs/traces.
          </li>
          <li>
            <b>Quiz:</b> Why add correlation IDs to every API request?
            <Reveal>
              Lets you trace a user action through every system, crucial for
              debugging issues in production.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "performance-budget-deep-dive",
    title: "Performance Budgets & Continuous Performance Monitoring",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Performance Budget:</b> Limits for JS/CSS bundle size, requests,
            critical rendering time, etc.
          </li>
          <li>
            <b>Metrics:</b> Largest Contentful Paint (LCP), First Input Delay
            (FID), Cumulative Layout Shift (CLS), Time To Interactive (TTI).
          </li>
          <li>
            <b>CI/CD Integration:</b> Lighthouse CI, WebPageTest, Calibre—fail
            build if budget exceeded.
          </li>
          <li>
            <b>Alerting:</b> Automated alerts when budgets/regressions detected.
          </li>
          <li>
            <b>Best Practices:</b> Track perf in real user monitoring (RUM) and
            synthetic, always profile on slow devices/networks.
          </li>
          <li>
            <b>Quiz:</b> Why use budgets instead of “just optimize”?
            <Reveal>
              Prevents slow bloat over time, maintains UX quality, keeps perf a
              team priority.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "graphql-federation-deep-dive",
    title: "GraphQL Federation & API Gateways",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Federation:</b> Compose a supergraph from multiple
            teams/services—each exposes its own schema.
          </li>
          <li>
            <b>API Gateway:</b> Sits in front of all APIs, handles routing,
            auth, caching, rate limiting.
          </li>
          <li>
            <b>Resolvers:</b> Federated schema can “delegate” fields to correct
            service.
          </li>
          <li>
            <b>Tools:</b> Apollo Federation, Apollo Gateway, Hasura Remote
            Schemas, GraphQL Mesh.
          </li>
          <li>
            <b>Challenges:</b> Cross-service joins, circular dependencies,
            schema versioning, error handling.
          </li>
          <li>
            <b>Quiz:</b> Why use GraphQL Federation instead of a monolithic
            schema?
            <Reveal>
              Enables independent deploys, team autonomy, and scales well for
              orgs with many teams/services.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "service-mesh-deep-dive",
    title: "Service Mesh—API Resilience, Traffic Management, Observability",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Service Mesh:</b> Layer between app and network; controls
            traffic, security, observability (e.g., Istio, Linkerd).
          </li>
          <li>
            <b>Traffic Control:</b> Circuit breaking, retries, timeouts,
            canary/beta rollouts, A/B testing at network level.
          </li>
          <li>
            <b>Zero Trust Security:</b> Encrypts all service traffic, mTLS,
            policy enforcement.
          </li>
          <li>
            <b>Observability:</b> Automatic metrics, distributed tracing,
            traffic logs.
          </li>
          <li>
            <b>API Gateway Integration:</b> Route/secure APIs, offload auth,
            rate-limiting.
          </li>
          <li>
            <b>Quiz:</b> Why use a service mesh instead of hand-rolling these
            features?
            <Reveal>
              Centralizes cross-cutting concerns, less app code, consistency,
              faster iteration for ops/security.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "serverless-deep-dive",
    title: "Serverless Architectures (Edge Functions, Lambdas, Cold Starts)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Serverless:</b> Deploy code as functions (AWS Lambda, Vercel Edge
            Functions) with no server management.
          </li>
          <li>
            <b>Scaling:</b> Automatic; you pay only for usage.
          </li>
          <li>
            <b>Edge Functions:</b> Run at CDN edge, ultra low-latency (e.g.,
            Vercel/Cloudflare Workers).
          </li>
          <li>
            <b>Cold Start:</b> First request to a function may be slow while
            infra “warms up” a container/VM.
          </li>
          <li>
            <b>Best Practices:</b> Bundle minimal deps, short timeouts, plan for
            stateless execution, externalize secrets.
          </li>
          <li>
            <b>Quiz:</b> Why are cold starts a challenge for API SLAs?
            <Reveal>
              Adds unpredictable latency, impacts UX on rarely used functions;
              must be measured and mitigated.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "feature-flags-deep-dive",
    title: "Feature Flags, Remote Config & Experimentation",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Feature Flags:</b> Enable/disable features at runtime, target by
            user, group, environment.
          </li>
          <li>
            <b>Remote Config:</b> Change config/behavior without deploy; dynamic
            A/B tests, kill switches, gradual rollout.
          </li>
          <li>
            <b>Tools:</b> LaunchDarkly, Unleash, Optimizely, Firebase Remote
            Config, homegrown systems.
          </li>
          <li>
            <b>Patterns:</b> Canary releases, phased rollouts, rollback/kill
            switch.
          </li>
          <li>
            <b>Best Practices:</b> Remove stale flags, document intent, test off
            and on paths.
          </li>
          <li>
            <b>Quiz:</b> Why are feature flags critical for CI/CD and agile?
            <Reveal>
              Enables safe deploys, rapid iteration, instant rollback—decouples
              release from deploy.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "supply-chain-deep-dive",
    title: "Dependency Management & Supply Chain Security",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Vulnerabilities:</b> Outdated/compromised dependencies are a
            major attack vector.
          </li>
          <li>
            <b>Best Practices:</b>
            <ul className="list-disc pl-5">
              <li>Automated audits (npm audit, Snyk, GitHub Dependabot)</li>
              <li>
                Pin dependencies with lockfiles, verify package signatures
              </li>
              <li>Least privilege (don’t install dev deps in prod)</li>
              <li>Periodic update policy, test after every upgrade</li>
            </ul>
          </li>
          <li>
            <b>Supply Chain Attacks:</b> Compromised npm/yarn packages,
            typo-squatting, malicious post-install scripts.
          </li>
          <li>
            <b>Quiz:</b> What is the “event-stream” incident?
            <Reveal>
              Popular npm package taken over, attacker injected malicious code,
              stole user data—showed risk in transitive deps.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "i18n-deep-dive",
    title: "Internationalization (i18n) & Localization (l10n)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Internationalization (i18n):</b> App ready for multiple
            languages, currencies, time zones, formatting rules.
          </li>
          <li>
            <b>Localization (l10n):</b> Translate strings, content, images,
            currencies, legal info per region.
          </li>
          <li>
            <b>Frameworks:</b> react-intl, i18next, FormatJS, Lingui,
            Polyglot.js
          </li>
          <li>
            <b>Patterns:</b> ICU message syntax, runtime language switch,
            lazy-loading translations.
          </li>
          <li>
            <b>Best Practices:</b> Externalize all strings, no hard-coded text,
            fallback/default locale, pluralization rules.
          </li>
          <li>
            <b>Quiz:</b> Why use ICU or similar for message formatting?
            <Reveal>
              Handles pluralization, gender, date/number/currency
              formatting—essential for correctness in many languages.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "polyfill-deep-dive",
    title: "Browser API Polyfilling and Shimming for Legacy Support",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Polyfill:</b> Adds missing API to older browsers (Promise, fetch,
            Array.prototype.flat, etc.)
          </li>
          <li>
            <b>Shim:</b> Monkey-patches or augments existing browser method.
          </li>
          <li>
            <b>Strategies:</b> Use Babel, core-js, Polyfill.io CDN;
            conditionally load for unsupported browsers.
          </li>
          <li>
            <b>Testing:</b> Always test on old/rare browsers, use
            BrowserStack/SauceLabs.
          </li>
          <li>
            <b>Best Practices:</b> Only polyfill what’s needed; too many
            polyfills = perf hit.
          </li>
          <li>
            <b>Quiz:</b> Why not always use every polyfill “just in case”?
            <Reveal>
              Increases bundle size, slows down page, sometimes breaks native
              behavior in newer browsers.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "cloud-native-deep-dive",
    title: "Cloud-Native Architecture (12-Factor, Containers, Orchestration)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>12-Factor App:</b> Codebase, dependencies, config, backing
            services, build/release/run, stateless, concurrency, disposability,
            parity, dev/prod parity, logs, admin processes.
          </li>
          <li>
            <b>Containers:</b> Pack app & dependencies for consistent runs
            (Docker, OCI). Immutable, portable, easy CI/CD.
          </li>
          <li>
            <b>Orchestration:</b> Automate deploy, scale, heal containers
            (Kubernetes, ECS, GKE, AKS).
          </li>
          <li>
            <b>Infrastructure as Code (IaC):</b> Use code (Terraform, Pulumi,
            CloudFormation) to manage infra.
          </li>
          <li>
            <b>Cloud Providers:</b> AWS, Azure, GCP, OCI—global scale, managed
            DBs, serverless, storage, monitoring.
          </li>
          <li>
            <b>Quiz:</b> Why are containers preferred for cloud-native?
            <Reveal>
              Portable, reproducible, fast scaling, works everywhere (local,
              cloud, CI).
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "iac-gitops-deep-dive",
    title: "Infrastructure as Code (IaC), GitOps, and Immutable Deployments",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>IaC:</b> Write/commit infra as code (Terraform, CloudFormation).
            Enables code review, versioning, repeatability.
          </li>
          <li>
            <b>GitOps:</b> CI/CD driven by git state; “source of truth” for app
            & infra; ops = pull request.
          </li>
          <li>
            <b>Immutable Deployments:</b> Deploy new containers/images, never
            patch in place. Rollbacks are instant (swap to old image).
          </li>
          <li>
            <b>Best Practices:</b> All infra tracked in git, automated PR
            review, environment promotion via merge.
          </li>
          <li>
            <b>Quiz:</b> Why is mutable infra dangerous?
            <Reveal>
              Drifts over time, hard to reproduce/roll back, config change not
              tracked—leads to “it works on my machine.”
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "ddos-deep-dive",
    title: "DDoS Mitigation, Rate Limiting, and Traffic Filtering",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>DDoS:</b> Distributed Denial-of-Service, floods service with fake
            traffic; aim: exhaust server/network.
          </li>
          <li>
            <b>Mitigation Layers:</b>
            <ul className="list-disc pl-5">
              <li>
                <b>CDN/WAF:</b> Cloudflare, AWS Shield, Akamai; filters at the
                edge, blocks bad IPs, bot signatures, geo.
              </li>
              <li>
                <b>Rate Limiting:</b> Limit N requests per IP/token/user in CDN,
                LB, app server.
              </li>
              <li>
                <b>CAPTCHA:</b> For suspicious traffic.
              </li>
              <li>
                <b>Scaling:</b> Auto-scale infra, isolate backend, drop at edge.
              </li>
              <li>
                <b>Blackholing/Scrubbing:</b> Drop packets at ISP or upstream
                before hitting your network.
              </li>
            </ul>
          </li>
          <li>
            <b>Quiz:</b> Why filter at CDN/WAF and not just app?
            <Reveal>
              Keeps junk traffic off your infra, saves bandwidth/CPU, prevents
              overload before app is touched.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "advanced-browser-security-deep-dive",
    title:
      "Advanced Browser Security (Trusted Types, COOP/COEP, SameSite, SRI, Anti-CSRF)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Trusted Types:</b> Enforces safe DOM injection—blocks XSS via
            innerHTML, dangerous assignment.
          </li>
          <li>
            <b>COOP/COEP:</b> Cross-Origin Opener/Embedder Policy; enables “site
            isolation” for tabs, SharedArrayBuffer, security against cross-site
            leaks.
          </li>
          <li>
            <b>SameSite:</b> Cookie flag: <b>Strict</b>, <b>Lax</b>, <b>None</b>
            ; blocks cross-site requests for cookies—essential for anti-CSRF.
          </li>
          <li>
            <b>SRI:</b> Subresource Integrity; checks hashes for external
            scripts/styles; blocks tampered CDN resources.
          </li>
          <li>
            <b>Anti-CSRF:</b> <b>SameSite cookies</b> +{" "}
            <b>per-request tokens</b> (double submit, hidden form) block
            cross-site request forgery.
          </li>
          <li>
            <b>Quiz:</b> Why are COOP/COEP needed for SharedArrayBuffer in
            browsers?
            <Reveal>
              To prevent side-channel info leaks, enable strong tab/process
              isolation for high-risk features.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "cdn-edge-deep-dive",
    title:
      "Content Delivery Networks (CDN), Cache Invalidation & Edge Computing",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>CDN:</b> Global edge servers, cache assets close to users,
            offload origin, improve TTFB & throughput.
          </li>
          <li>
            <b>Cache Invalidation:</b> <code>Cache-Control</code> headers, purge
            API, cache busting via version/hash in file name.
          </li>
          <li>
            <b>Edge Computing:</b> Run code at CDN edge (Cloudflare Workers, AWS
            Lambda@Edge) for auth, A/B, geo/routing logic.
          </li>
          <li>
            <b>Best Practices:</b> Immutable assets, versioned URLs, minimize
            purges.
          </li>
          <li>
            <b>Quiz:</b> Why run logic at CDN edge?
            <Reveal>
              Lower latency, less origin load, enables per-region customization,
              global scaling.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "secrets-management-deep-dive",
    title: "Secure Secrets Management in Cloud-Native & DevOps",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Don’t store secrets in code or env files checked into git!</b>
          </li>
          <li>
            <b>Vaults:</b> Use AWS Secrets Manager, Azure Key Vault, GCP Secret
            Manager, Hashicorp Vault.
          </li>
          <li>
            <b>Principle of Least Privilege:</b> Only grant minimal access for
            apps/services.
          </li>
          <li>
            <b>Rotation:</b> Auto-rotate secrets (passwords, tokens, keys)
            periodically.
          </li>
          <li>
            <b>CI/CD:</b> Inject secrets via pipeline, never in build artifacts.
          </li>
          <li>
            <b>Quiz:</b> Why not keep secrets in plain .env files in repo?
            <Reveal>
              Leak risk (git history, fork, deploy by accident), no rotation,
              hard to audit usage/access.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "zero-trust-deep-dive",
    title: "Zero Trust Security Model for Modern Web Apps",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Zero Trust:</b> Assume no implicit trust, verify everything;
            “never trust, always verify.”
          </li>
          <li>
            <b>Core Principles:</b> Micro-segmentation, least privilege, strong
            identity, always-encrypted traffic.
          </li>
          <li>
            <b>Network:</b> MFA, mTLS for service comms, never rely on
            perimeter/firewall alone.
          </li>
          <li>
            <b>Continuous Verification:</b> Regularly re-authn/re-authorize,
            audit logs, monitor for suspicious activity.
          </li>
          <li>
            <b>Quiz:</b> Why is Zero Trust the modern default for cloud apps?
            <Reveal>
              Perimeter-based security fails with cloud/mobile/remote access;
              need to defend against insider, lateral, or compromised device
              threats.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "ha-dr-deep-dive",
    title: "Multi-Region, Disaster Recovery & High Availability",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>High Availability (HA):</b> Multiple instances/zones,
            auto-failover, health checks, no single point of failure.
          </li>
          <li>
            <b>Multi-Region:</b> Deploy across regions/continents; geo DNS, data
            sync, lowest latency for users.
          </li>
          <li>
            <b>Disaster Recovery (DR):</b> Backups, cross-region replication,
            tested recovery plans, RPO/RTO targets.
          </li>
          <li>
            <b>Patterns:</b> Active-active, active-passive, cold standby, warm
            standby.
          </li>
          <li>
            <b>Quiz:</b> Why is it not enough to just take backups?
            <Reveal>
              Need to *test* recovery (restore drills), automate failover,
              replicate both app and data, minimize downtime/data loss.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "appsec-testing-deep-dive",
    title: "Modern Application Security Testing (DAST, SAST, SCA, Bug Bounty)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>SAST (Static App Security Testing):</b> Analyze source code for
            bugs, vulnerabilities (SonarQube, CodeQL).
          </li>
          <li>
            <b>DAST (Dynamic App Security Testing):</b> Automated scans (Burp
            Suite, OWASP ZAP) of running app for XSS, SQLi, etc.
          </li>
          <li>
            <b>SCA (Software Composition Analysis):</b> Scan dependencies for
            known CVEs (Snyk, OSS Index).
          </li>
          <li>
            <b>Bug Bounty:</b> Crowdsourced pen testing (HackerOne, Bugcrowd).
          </li>
          <li>
            <b>Best Practices:</b> Integrate into CI/CD, regular audits, fix &
            monitor for regressions.
          </li>
          <li>
            <b>Quiz:</b> Why run both SAST and DAST?
            <Reveal>
              SAST finds code bugs *before* deploy, DAST finds runtime bugs
              missed by static analysis; together they cover more attack
              surface.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "anti-fraud-bot-detection-deep-dive",
    title: "Browser Anti-Fraud & Bot Detection Techniques",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Detection:</b> Fingerprinting, behavioral (mouse, timing),
            honeypots, JS challenges, captchas.
          </li>
          <li>
            <b>Rate Limiting:</b> Slow down or block abusive patterns.
          </li>
          <li>
            <b>3rd Party APIs:</b> reCAPTCHA, hCaptcha, Arkose Labs.
          </li>
          <li>
            <b>Edge/Server:</b> Use WAF, log analysis, block IPs/ASNs.
          </li>
          <li>
            <b>Quiz:</b> Why combine JS-based and server-side bot detection?
            <Reveal>
              Bots evolve; only some can be caught by JS checks, some only by
              analyzing traffic/server logs—layered defense is strongest.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "cloud-native-cicd-deep-dive",
    title: "Cloud-Native CI/CD (Build, Test, Deploy at Scale)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>CI/CD:</b> Continuous Integration/Continuous Delivery—automate
            build, test, deploy on every commit/PR.
          </li>
          <li>
            <b>Pipeline Stages:</b> Lint → Unit Test → Build → Integration Test
            → Security Scan → Deploy.
          </li>
          <li>
            <b>Cloud-Native:</b> Pipelines run in containers/VMs (GitHub
            Actions, GitLab CI, Jenkins X, AWS CodeBuild).
          </li>
          <li>
            <b>Infrastructure-as-Code (IaC):</b> Automate infra changes
            alongside app deploys.
          </li>
          <li>
            <b>Patterns:</b> Blue/Green, Canary, Feature Flags for safe
            release/rollback.
          </li>
          <li>
            <b>Best Practices:</b> Fast feedback (less than 60s for lint/test),
            automated rollbacks, parallel jobs, caching, PR environments.
          </li>
          <li>
            <b>Quiz:</b> Why run tests inside containers?
            <Reveal>
              Same as prod—catches infra/config issues early, reproducible
              builds, easier scaling.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "logging-monitoring-at-scale",
    title: "Logging & Monitoring at Scale (Centralized, Real-Time, Alerting)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Centralized Logging:</b> All app, infra, audit logs → one place
            (ELK/EFK Stack, Datadog, Splunk, AWS CloudWatch).
          </li>
          <li>
            <b>Log Structure:</b> Structured (JSON) logs—parseable, filterable,
            queryable.
          </li>
          <li>
            <b>Real-Time Monitoring:</b> Metrics (Prometheus, Grafana), logs,
            traces, distributed tracing (OpenTelemetry).
          </li>
          <li>
            <b>Alerting:</b> Automated alerts on errors, high latency, downtime,
            anomaly detection.
          </li>
          <li>
            <b>Best Practices:</b> Correlate logs/metrics/traces via IDs, sample
            logs at high traffic, redact PII.
          </li>
          <li>
            <b>Quiz:</b> Why structured logs over plain text?
            <Reveal>
              Easier to search, visualize, automate alerting and build
              dashboards—critical at scale.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "identity-oauth-sso-deep-dive",
    title: "Identity, OAuth2, OpenID Connect, and SSO in Modern Web Apps",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>OAuth2:</b> Delegated access—don’t share passwords; use{" "}
            <b>authorization code</b> flow for web apps.
          </li>
          <li>
            <b>OpenID Connect (OIDC):</b> Layer on OAuth2 for authentication (ID
            tokens, user info endpoint).
          </li>
          <li>
            <b>SSO (Single Sign-On):</b> Login once, use everywhere—SAML, OIDC,
            social (Google, GitHub, SSO providers).
          </li>
          <li>
            <b>PKCE:</b> Proof Key for Code Exchange—prevents interception
            attacks (public clients/mobile).
          </li>
          <li>
            <b>Best Practices:</b> Always use HTTPS, rotate/expire tokens,
            validate scopes/claims, use libraries (not homegrown).
          </li>
          <li>
            <b>Quiz:</b> Why use OIDC on top of OAuth2?
            <Reveal>
              OAuth2 is for authorization (access to APIs), OIDC adds
              authentication (who is user)—required for SSO and secure login.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "cloud-cost-optimization-deep-dive",
    title: "Cloud Cost Optimization (FinOps, Rightsizing, Spot, Budgets)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>FinOps:</b> Cloud financial ops—optimize spend via real-time
            monitoring, showback/chargeback, forecasts.
          </li>
          <li>
            <b>Rightsizing:</b> Scale resources to match demand—auto-scale,
            scheduled downscaling, delete zombie resources.
          </li>
          <li>
            <b>Spot/Preemptible:</b> Use spot/preemptible instances for
            non-critical workloads—huge savings.
          </li>
          <li>
            <b>Budgets & Alerts:</b> Set, track, and alert on spend per
            project/team.
          </li>
          <li>
            <b>Best Practices:</b> Use cost dashboards, automate cleanup, tag
            resources, optimize storage/egress, leverage savings plans/reserved
            instances.
          </li>
          <li>
            <b>Quiz:</b> Why are untagged resources a cost risk?
            <Reveal>
              Can’t track ownership, hard to optimize or terminate—leads to
              wasted spend.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "secrets-rotation-deep-dive",
    title: "Advanced Secrets Rotation & Zero Downtime Deploys",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Secrets Rotation:</b> Regularly change keys, passwords,
            certs—minimize breach impact.
          </li>
          <li>
            <b>Zero Downtime:</b> Rotate secrets (DB, API keys) without service
            interruption—support “old + new” in app during rollout.
          </li>
          <li>
            <b>Blue/Green Deploy:</b> Cutover traffic to new version after
            secrets/test pass; instant rollback.
          </li>
          <li>
            <b>Automate:</b> Use Vault/Secrets Manager rotation, CI/CD hooks,
            staged rollout.
          </li>
          <li>
            <b>Quiz:</b> Why allow both old and new secret during rotate?
            <Reveal>
              Ensures no requests fail during in-flight cutover, old connections
              can finish, zero user downtime.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "cloud-networking-deep-dive",
    title:
      "Advanced Cloud Networking (VPC, Peering, PrivateLink, egress control)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>VPC:</b> Isolated, private network per app/team; subnets for
            tiering (public/private/DB).
          </li>
          <li>
            <b>Peering:</b> Secure connect VPCs (same or cross-cloud), no public
            IPs.
          </li>
          <li>
            <b>PrivateLink:</b> Access cloud services privately (S3, DB, 3rd
            party) over internal IP—no public traffic.
          </li>
          <li>
            <b>Egress Control:</b> Outbound traffic firewalls, restrict access
            to only needed addresses.
          </li>
          <li>
            <b>Quiz:</b> Why split app into public/private subnets?
            <Reveal>
              Web/edge exposed, DB and services protected; reduces attack
              surface, meets compliance/security requirements.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "real-time-analytics-deep-dive",
    title: "Real-Time Log Analytics and Anomaly Detection",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Real-Time Analytics:</b> Stream logs to systems (Elasticsearch,
            Splunk, Datadog, BigQuery) for dashboards/alerts.
          </li>
          <li>
            <b>Anomaly Detection:</b> ML/statistical models flag unusual error
            rates, spikes, rare patterns.
          </li>
          <li>
            <b>Automation:</b> Auto-remediation on alert (restart, scale, page
            SRE).
          </li>
          <li>
            <b>Alert Fatigue:</b> Use noise reduction, “auto-grouping,”
            suppression for known noisy events.
          </li>
          <li>
            <b>Quiz:</b> Why run real-time log analytics vs. daily batch?
            <Reveal>
              Spot outages/incidents instantly, react before users notice,
              prevent revenue loss/brand damage.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "multi-tenancy-deep-dive",
    title: "Advanced Multi-Tenancy (Data Isolation, Billing, Security)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Multi-Tenancy:</b> Serve multiple customers from same infra/app,
            but strict data/isolation.
          </li>
          <li>
            <b>Isolation:</b> Separate DB schema, row-level ACL, dedicated VPC,
            or even per-tenant containers.
          </li>
          <li>
            <b>Billing:</b> Usage metering per tenant, tag resources, rate-limit
            or quota, automated invoices.
          </li>
          <li>
            <b>Security:</b> Prevent “tenant escape” (broken access control =
            biggest SaaS breach risk).
          </li>
          <li>
            <b>Quiz:</b> Why prefer row-level security in DB for SaaS?
            <Reveal>
              Strong, efficient, less complex than many schemas; handled by DB
              engine for safety.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "api-gateway-advanced-deep-dive",
    title:
      "API Gateway Advanced Patterns (Throttling, Caching, Custom Auth, Transformation)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>API Gateway:</b> Single entry for all APIs; handles routing,
            security, rate limits, response shaping.
          </li>
          <li>
            <b>Throttling:</b> Per-user/IP limits, global concurrency, burst
            handling.
          </li>
          <li>
            <b>Caching:</b> Response cache at gateway (short-circuit DB for
            popular queries).
          </li>
          <li>
            <b>Custom Auth:</b> JWT, OAuth, HMAC, IP white/blacklist—can
            centralize cross-team logic.
          </li>
          <li>
            <b>Transformation:</b> Re-write headers, payloads, versioning—adapt
            legacy and new APIs.
          </li>
          <li>
            <b>Quiz:</b> Why do custom transformations at gateway layer?
            <Reveal>
              Avoids touching app code for common patterns, smooth migration
              between API versions or providers.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "identity-federation-deep-dive",
    title: "Identity Federation (SAML, OIDC, Cross-Domain SSO)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Federation:</b> Trust between organizations/domains—SSO without
            duplicating user DB.
          </li>
          <li>
            <b>SAML:</b> XML-based, enterprise, classic SSO (Okta, AzureAD,
            OneLogin).
          </li>
          <li>
            <b>OIDC:</b> JSON/REST-based, modern web/mobile, social login
            (Google, Microsoft, Auth0).
          </li>
          <li>
            <b>Token Exchange:</b> Pass SAML/OIDC tokens, translate for
            cross-cloud/SaaS auth.
          </li>
          <li>
            <b>Quiz:</b> Why is OIDC preferred for new apps?
            <Reveal>
              Easier to implement, REST/JSON, stateless, works for web/mobile,
              easier debugging and scaling.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "blue-green-canary-deep-dive",
    title: "Cloud-Native Blue/Green & Canary Deployments",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Blue/Green:</b> Two identical prod stacks (blue=live, green=new),
            cut traffic after test—instant rollback.
          </li>
          <li>
            <b>Canary:</b> Gradually shift % of users/traffic to new version,
            monitor for issues, halt or rollback if needed.
          </li>
          <li>
            <b>Tools:</b> Kubernetes Deployments, AWS CodeDeploy, Spinnaker,
            Flagger.
          </li>
          <li>
            <b>Best Practices:</b> Automate metrics/alert checks; rollback fast,
            audit who/when changes.
          </li>
          <li>
            <b>Quiz:</b> Why use canary vs. blue/green?
            <Reveal>
              Canary is safer for very large, global scale—tests with real
              traffic in small dose; blue/green is faster for whole-cluster
              swap.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "advanced-caching-deep-dive",
    title:
      "Advanced Caching Strategies (CDN, DB, Client, Invalidation, Consistency)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Multi-layer Caching:</b> Client-side (browser, service worker),
            CDN/edge, API gateway, in-app memory, database (Redis, Memcached).
          </li>
          <li>
            <b>Invalidation:</b> Purge/expire on deploy, cache-busting (file
            hashes), ETag, “stale-while-revalidate”.
          </li>
          <li>
            <b>Cache Consistency:</b> Strong (update everywhere instantly) vs.
            eventual (fast but may be stale).
          </li>
          <li>
            <b>Patterns:</b> Write-through, write-behind, read-through,
            cache-aside, “dogpile” protection.
          </li>
          <li>
            <b>Best Practices:</b> Monitor hit/miss, automate TTLs, beware of
            cache poisoning.
          </li>
          <li>
            <b>Quiz:</b> Why is “stale-while-revalidate” useful?
            <Reveal>
              User gets fast (possibly stale) data, then background refresh for
              next time—best UX/perf tradeoff.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "chaos-engineering-deep-dive",
    title: "Chaos Engineering & Fault Injection for Web and Cloud",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Chaos Engineering:</b> Intentionally inject failures (kill
            servers, break network) to test system resilience.
          </li>
          <li>
            <b>Tools:</b> Gremlin, Chaos Monkey (Netflix), Litmus, AWS Fault
            Injection Simulator.
          </li>
          <li>
            <b>Patterns:</b> Kill random pods/VMs, latency injection, break DNS,
            simulate region outage.
          </li>
          <li>
            <b>Goal:</b> Ensure graceful failover, auto-recovery, no data loss,
            observability under stress.
          </li>
          <li>
            <b>Quiz:</b> Why do chaos in prod, not just staging?
            <Reveal>
              Only prod has real load, real data—exposes hidden bugs; staged
              chaos is safer for major new features.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "cost-control-advanced-deep-dive",
    title:
      "Advanced Cost Control—Spot, Autoscale, Serverless, Intelligent Scheduling",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Spot/Preemptible:</b> Use for stateless/“loss-tolerant”
            workloads—CI, batch jobs, queue processing.
          </li>
          <li>
            <b>Autoscale:</b> Scale up/down infra based on real metrics (queue
            depth, RPS, latency).
          </li>
          <li>
            <b>Serverless:</b> Only pay for actual usage; good for event-driven,
            unpredictable, or bursty traffic.
          </li>
          <li>
            <b>Intelligent Scheduling:</b> Kubernetes taints/tolerations, node
            affinity, reserved/committed use discounts.
          </li>
          <li>
            <b>Quiz:</b> Why schedule non-critical jobs on spot/cheap nodes?
            <Reveal>
              Slashes cost, frees up “guaranteed” compute for prod/critical
              workloads.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "edge-auth-mtls-deep-dive",
    title: "Edge Authentication, mTLS, and End-to-End Encryption",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Edge Authentication:</b> Authenticate users and APIs at CDN or
            gateway before passing to origin.
          </li>
          <li>
            <b>mTLS (Mutual TLS):</b> Both sides present certificates—prevents
            “man-in-the-middle” even inside private cloud.
          </li>
          <li>
            <b>End-to-End Encryption:</b> Encrypt all traffic (user→CDN→app→DB)
            to prevent data leaks at every hop.
          </li>
          <li>
            <b>Best Practices:</b> Rotate certs, use HSM/managed PKI, enforce
            strong ciphers, test with “curl --cert”.
          </li>
          <li>
            <b>Quiz:</b> Why do mTLS *between* microservices?
            <Reveal>
              Prevents lateral movement if one host/service is compromised;
              defense-in-depth for service mesh/cloud-native.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "privacy-compliance-deep-dive",
    title: "Data Privacy, GDPR, CCPA, and Data Minimization Patterns",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>GDPR/CCPA:</b> Regulations—user data rights, consent, right to
            erase/export, breach notification.
          </li>
          <li>
            <b>Data Minimization:</b> Only collect/store absolutely required
            info; encrypt in transit and at rest.
          </li>
          <li>
            <b>User Control:</b> Privacy dashboards, consent management,
            self-service data export/delete.
          </li>
          <li>
            <b>Best Practices:</b> Audit data flows, automate DSAR (data subject
            access request), data retention policies.
          </li>
          <li>
            <b>Quiz:</b> Why “data minimization” even for non-EU/US users?
            <Reveal>
              Reduces breach/abuse risk, lowers liability, simplifies compliance
              if/when user location or laws change.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "k8s-operators-crd-deep-dive",
    title: "Kubernetes Operators & Custom Resource Definitions (CRD)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Operator:</b> App-specific “controller” automates deploy, scale,
            healing (e.g., DB clusters, monitoring).
          </li>
          <li>
            <b>CRD:</b> Extend k8s API with custom resources (not just Pods,
            Services, etc.).
          </li>
          <li>
            <b>Pattern:</b> “Declarative” config for complex stateful services,
            auto self-heal, upgrade, backup.
          </li>
          <li>
            <b>Tools:</b> Helm, Kustomize, Operator SDK.
          </li>
          <li>
            <b>Quiz:</b> Why use Operators over scripts?
            <Reveal>
              Integrates with k8s control loop, reacts instantly to
              desired/actual state changes, handles upgrades/recovery
              automatically.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "api-versioning-deep-dive",
    title: "API Versioning & Backward Compatibility at Scale",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>API Versioning:</b> URL path (<code>/v1/</code>), header (
            <code>Accept-Version</code>), or media type.
          </li>
          <li>
            <b>Backward Compatibility:</b> Additive (new fields), never break
            contract, deprecate with warning period.
          </li>
          <li>
            <b>Tools:</b> OpenAPI/Swagger, GraphQL schema, automated contract
            tests.
          </li>
          <li>
            <b>Deprecation:</b> Clear roadmap, communicate changes, migration
            guides, sunset headers.
          </li>
          <li>
            <b>Quiz:</b> Why prefer additive changes for API evolution?
            <Reveal>
              Existing clients keep working, new features can roll out safely,
              fewer outages/support tickets.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "cloud-iam-advanced-deep-dive",
    title: "Advanced Cloud IAM—Roles, Policies, Resource Boundaries, Audit",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>IAM (Identity & Access Mgmt):</b> Fine-grained, role-based
            access—users, groups, service accounts.
          </li>
          <li>
            <b>Least Privilege:</b> Grant only needed permissions, use policies
            not individual users.
          </li>
          <li>
            <b>Resource Boundaries:</b> Restrict what roles can access, by
            project/environment/region.
          </li>
          <li>
            <b>Audit Logging:</b> Monitor/alert on permission changes, access
            attempts, privilege escalation.
          </li>
          <li>
            <b>Quiz:</b> Why rotate access keys/creds for service accounts?
            <Reveal>
              Prevents stale/leaked creds, limits blast radius if compromised,
              meets compliance needs.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "event-driven-architecture-deep-dive",
    title: "Event-Driven Architecture, Message Queues & Pub/Sub",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Event-Driven:</b> Decouple producers & consumers, use events for
            async, scalable communication.
          </li>
          <li>
            <b>Message Queues:</b> (RabbitMQ, SQS, Kafka) Guarantee delivery,
            order, retry; buffer traffic spikes.
          </li>
          <li>
            <b>Pub/Sub:</b> Fan out to multiple consumers (SNS, Kafka topics,
            Google Pub/Sub).
          </li>
          <li>
            <b>Patterns:</b> CQRS, Event Sourcing, Outbox, Saga for distributed
            consistency.
          </li>
          <li>
            <b>Best Practices:</b> Idempotent handlers, dead letter queues,
            trace correlation IDs.
          </li>
          <li>
            <b>Quiz:</b> Why use message queue instead of direct API call?
            <Reveal>
              Handles burst traffic, avoids cascading failure, enables retry,
              async processing, looser coupling.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "distributed-tracing-deep-dive",
    title:
      "Distributed Tracing & Observability (OpenTelemetry, Jaeger, Zipkin)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Distributed Tracing:</b> Track a request across microservices—see
            where time is spent, where errors happen.
          </li>
          <li>
            <b>Tools:</b> OpenTelemetry (standard), Jaeger, Zipkin, AWS X-Ray,
            Datadog APM.
          </li>
          <li>
            <b>Traces:</b> Spans, parent/child, service map, flame graph.
          </li>
          <li>
            <b>Best Practices:</b> Add trace IDs to all logs/requests, sample
            intelligently, monitor high-latency/failed spans.
          </li>
          <li>
            <b>Quiz:</b> Why is tracing vital for microservices?
            <Reveal>
              Debugging slow/failed requests, seeing cross-service dependencies,
              root cause analysis—can’t do with logs alone!
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "data-lake-warehouse-deep-dive",
    title: "Data Lake vs. Data Warehouse—Modern Analytics at Scale",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Data Lake:</b> Raw, unstructured data at scale (S3, GCS,
            HDFS)—store everything, schema-on-read.
          </li>
          <li>
            <b>Data Warehouse:</b> Structured, cleaned, fast analytics
            (BigQuery, Redshift, Snowflake, Synapse)—schema-on-write.
          </li>
          <li>
            <b>Modern Patterns:</b> “Lakehouse” combines both—cheap storage,
            fast queries, managed catalog (Databricks, Snowflake).
          </li>
          <li>
            <b>Best Practices:</b> ETL/ELT pipelines, data governance, cost
            control, partitioning.
          </li>
          <li>
            <b>Quiz:</b> Why keep cold/raw data in lake and only hot/reporting
            data in warehouse?
            <Reveal>
              Minimize warehouse cost, keep all history for ML, only
              index/report “need-to-know” for perf/cost.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "api-security-deep-dive",
    title: "API Security—OWASP API Top 10, Rate Limiting, JWT Best Practices",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>OWASP API Top 10:</b> Common vulnerabilities (broken auth,
            excessive data, lack of rate limiting, mass assignment, injection).
          </li>
          <li>
            <b>JWT:</b> Signed, not encrypted! Validate signature, exp, issuer,
            audience; store in HttpOnly cookies.
          </li>
          <li>
            <b>Rate Limiting:</b> Per user/token/IP; return 429, backoff
            headers.
          </li>
          <li>
            <b>Security Headers:</b> CORS, CSP, X-Frame, SRI—protect APIs and
            frontend.
          </li>
          <li>
            <b>Audit & Monitoring:</b> Log all authz failures, token usage, rate
            limit hits.
          </li>
          <li>
            <b>Quiz:</b> Why avoid storing JWT in localStorage?
            <Reveal>
              Exposed to XSS; use HttpOnly cookies for sensitive tokens/auth.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "feature-flags-experimentation-deep-dive",
    title: "Feature Flags, Dark Launches, and Continuous Experimentation",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Feature Flags:</b> Toggle features on/off by user, group,
            region—fast rollback, A/B test.
          </li>
          <li>
            <b>Dark Launch:</b> Deploy code to prod but only enable for
            internal/staff/test users.
          </li>
          <li>
            <b>Continuous Experimentation:</b> Test variants, rollout slowly,
            measure impact (GrowthBook, LaunchDarkly, custom).
          </li>
          <li>
            <b>Kill Switch:</b> Instantly disable broken features w/o redeploy.
          </li>
          <li>
            <b>Quiz:</b> Why use kill switch/flag for risky features?
            <Reveal>
              Instant rollback if issue in prod—no need to revert/redeploy
              entire app; improves release confidence.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "graphql-advanced-deep-dive",
    title: "Advanced GraphQL—Security, Batching, Federation, n+1",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Security:</b> Depth limiting, query complexity, cost analysis,
            whitelisting.
          </li>
          <li>
            <b>Batching:</b> DataLoader or server-resolvers for efficient joins
            (avoid n+1 queries).
          </li>
          <li>
            <b>Federation:</b> Compose schemas/services (Apollo Federation,
            GraphQL Mesh) for large orgs.
          </li>
          <li>
            <b>Persisted Queries:</b> Only allow pre-approved, cached queries
            for public APIs.
          </li>
          <li>
            <b>Quiz:</b> Why is “n+1” a risk in GraphQL?
            <Reveal>
              Nested queries can trigger 100s of DB hits—batch/merge requests to
              avoid massive slowdowns.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "wasm-performance-deep-dive",
    title: "WebAssembly (WASM) & Client-Side Performance Engineering",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>WebAssembly:</b> Run compiled code (Rust, C, Go) in
            browser—super-fast for CPU-heavy workloads (e.g. image, video, ML).
          </li>
          <li>
            <b>Interop:</b> Call JS ↔ WASM, share memory, pass data.
          </li>
          <li>
            <b>Use Cases:</b> Games, emulators, codecs, encryption, Figma/CAD,
            on-device ML.
          </li>
          <li>
            <b>Best Practices:</b> Minimize bridge calls, optimize data
            transfer, WASM streaming/instantiation.
          </li>
          <li>
            <b>Quiz:</b> Why not use WASM for all logic?
            <Reveal>
              Best for CPU-bound, not DOM; JS is still faster for UI/events/DOM
              manipulation.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "ddos-waf-deep-dive",
    title: "DDoS Defense, Rate Limiting & Web Application Firewalls (WAF)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>DDoS Protection:</b> Cloudfront, Cloudflare, AWS
            Shield—auto-detect and mitigate volumetric and protocol attacks.
          </li>
          <li>
            <b>WAF:</b> Web Application Firewall—filters malicious traffic
            (SQLi, XSS, bots), managed rules or custom.
          </li>
          <li>
            <b>Rate Limiting:</b> Per IP/token/user to slow brute force, API
            abuse, scrape attempts; often layered (gateway, CDN, app).
          </li>
          <li>
            <b>Behavioral Analysis:</b> ML-based anomaly detection for evolving
            attacks.
          </li>
          <li>
            <b>Quiz:</b> Why block at CDN/gateway not at app?
            <Reveal>
              Stops attack before it hits infra/bandwidth; saves cost, prevents
              resource exhaustion and downstream failures.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "service-mesh-zero-trust-deep-dive",
    title: "Service Mesh (Istio, Linkerd) & Zero Trust Networking",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Service Mesh:</b> Layer for traffic management, observability,
            security between microservices.
          </li>
          <li>
            <b>Zero Trust:</b> Never trust, always verify—authn/authz at every
            hop (mTLS, policy, identity, RBAC).
          </li>
          <li>
            <b>Traffic Control:</b> Fine-grained routing (canary, shadow,
            retries, circuit breaking) handled by mesh.
          </li>
          <li>
            <b>Telemetry:</b> Automatic metrics, logs, traces for all
            service-to-service calls.
          </li>
          <li>
            <b>Quiz:</b> Why use mesh vs. code libraries for cross-cutting
            concerns?
            <Reveal>
              No code changes, policy/control at ops level, consistent
              enforcement, language-agnostic, instant updates/rollbacks.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "multi-cloud-hybrid-deep-dive",
    title: "Multi-Cloud, Hybrid Cloud & Cloud Portability",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Multi-Cloud:</b> Run workloads across multiple providers (AWS +
            Azure + GCP) for redundancy, best-of-breed, price leverage.
          </li>
          <li>
            <b>Hybrid Cloud:</b> Mix public cloud + on-prem/private data centers
            (compliance, latency, legacy).
          </li>
          <li>
            <b>Portability:</b> Use containers, k8s, IaC (Terraform) to avoid
            lock-in, ease migration, disaster recovery.
          </li>
          <li>
            <b>Best Practices:</b> Unified identity/auth, global logging, common
            data formats, cross-cloud failover.
          </li>
          <li>
            <b>Quiz:</b> Why is “true” portability hard?
            <Reveal>
              Vendor APIs, managed services, and networking are never 100%
              compatible; always test DR/failover!
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "supply-chain-security-deep-dive",
    title: "Secure Software Supply Chain (SBOM, SCA, Provenance, CI Security)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>SBOM:</b> Software Bill of Materials—track all dependencies,
            versions, sources for every build.
          </li>
          <li>
            <b>SCA:</b> Software Composition Analysis—scan deps for known vulns
            (Snyk, Dependabot, OWASP Dependency-Check).
          </li>
          <li>
            <b>Provenance:</b> Proven build path and artifact origin (Sigstore,
            in-toto); verify against tampering.
          </li>
          <li>
            <b>CI Security:</b> Secure runners, secrets, code scanning, signed
            builds, PR checks.
          </li>
          <li>
            <b>Quiz:</b> Why sign release artifacts?
            <Reveal>
              Prevents attackers from injecting malicious code into official
              builds/releases—core for modern “zero trust” software.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "serverless-architecture-deep-dive",
    title: "Serverless Architectures—Limits, Patterns, Cold Start, State",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Serverless:</b> Functions-as-a-Service (AWS Lambda, GCP Cloud
            Functions, Azure Functions)—auto-scale, pay per use.
          </li>
          <li>
            <b>Patterns:</b> REST APIs, queue/event processing, cron, glue code,
            webhooks, fanout.
          </li>
          <li>
            <b>Limits:</b> Cold start latency, max runtime, package size,
            stateless by default.
          </li>
          <li>
            <b>State Handling:</b> Use external storage (S3, Dynamo, Redis),
            design for retries/idempotency.
          </li>
          <li>
            <b>Quiz:</b> Why do “cold starts” hurt UX for some apps?
            <Reveal>
              New function instance must spin up (sometimes seconds)—hurts
              real-time or latency-sensitive endpoints; warm pools/keep-alive
              can help.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "sre-error-budgets-deep-dive",
    title: "SRE, Error Budgets, and SLIs/SLOs/SLAs",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>SRE (Site Reliability Engineering):</b> Dev + Ops
            discipline—focus on automation, reliability, monitoring.
          </li>
          <li>
            <b>SLI/SLO/SLA:</b> Service Level Indicator, Objective,
            Agreement—measure and guarantee reliability.
          </li>
          <li>
            <b>Error Budgets:</b> Allowed “failure” rate; can release new
            features as long as not exceeded.
          </li>
          <li>
            <b>Blameless Postmortem:</b> Analyze outages/failures to improve
            system, not assign blame.
          </li>
          <li>
            <b>Quiz:</b> Why do error budgets make release safer?
            <Reveal>
              Forces risk tradeoff—can release fast, but must pause/fix if
              reliability drops; aligns dev and ops incentives.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "web3-fundamentals-deep-dive",
    title: "Web3 Fundamentals—Blockchain, Smart Contracts, DApps",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Blockchain:</b> Distributed, immutable ledger; consensus via
            proof-of-work/proof-of-stake.
          </li>
          <li>
            <b>Smart Contracts:</b> Code runs on-chain, auto-executes (e.g.,
            Ethereum/Solidity); transparent, trustless.
          </li>
          <li>
            <b>DApps:</b> Decentralized apps—frontend on web, backend is
            blockchain/smart contract.
          </li>
          <li>
            <b>Wallets & Keys:</b> Users sign txns with private keys (MetaMask,
            Ledger, WalletConnect).
          </li>
          <li>
            <b>APIs:</b> Use <code>ethers.js</code>, <code>web3.js</code> to
            interact with contracts, query chain, send txns.
          </li>
          <li>
            <b>Quiz:</b> Why are smart contracts “trustless”?
            <Reveal>
              Rules/logic are on-chain, transparent, and can’t be changed
              unilaterally; no central admin.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "browser-extension-security-deep-dive",
    title:
      "Browser Extension Security (Manifest V3, CSP, Permissions, XSS, Supply Chain)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Manifest V3:</b> Modern extension format—limits <code>eval</code>
            , uses service worker, declarativeNetRequest.
          </li>
          <li>
            <b>Permissions:</b> Always request minimal; “activeTab” {">"} “
            <code>&lt;all_urls&gt;</code>”; use optional permissions.
          </li>
          <li>
            <b>CSP:</b> Strict Content Security Policy; no inline JS; only
            trusted sources.
          </li>
          <li>
            <b>XSS:</b> Sanitize all DOM writes, no dynamic code loading.
          </li>
          <li>
            <b>Supply Chain:</b> All dependencies must be audited
            (typosquatting, malicious npm packages).
          </li>
          <li>
            <b>Review Process:</b> Chrome/Firefox review, automated + manual;
            always test least-permission and CSP before release.
          </li>
          <li>
            <b>Quiz:</b> Why is “eval” (dynamic JS) forbidden in V3?
            <Reveal>
              Prevents arbitrary code execution via extension update or
              dependency compromise—huge risk to all browser data.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "gdpr-implementation-deep-dive",
    title: "Practical GDPR Implementation for Developers",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Data Mapping:</b> Document what personal data you collect, where
            it lives, and who accesses it.
          </li>
          <li>
            <b>Consent:</b> Explicit opt-in for cookies, tracking, marketing (no
            pre-checked boxes).
          </li>
          <li>
            <b>Access/Erase:</b> Implement user APIs/UI for export/delete of
            their data (DSAR).
          </li>
          <li>
            <b>Minimization:</b> Collect/store only data you truly need (see
            “data minimization” best practices).
          </li>
          <li>
            <b>Security:</b> Encrypt at rest and in transit, access controls,
            audit logs for personal data.
          </li>
          <li>
            <b>Vendor Management:</b> Ensure all processors/subprocessors comply
            (DPA, audits).
          </li>
          <li>
            <b>Quiz:</b> Why is “explicit consent” required for non-essential
            cookies?
            <Reveal>
              User must agree before tracking, per GDPR—no silent or “by using
              site you agree” opt-in allowed.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "web3-security-deep-dive",
    title: "Web3 Security—Reentrancy, Audits, Rug Pulls, Exploits",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Reentrancy:</b> Contract calls another contract (or self), which
            then calls back before original call finishes—can drain funds if
            state not updated first.
          </li>
          <li>
            <b>Rug Pulls:</b> Malicious dev pulls liquidity/ownership; code
            allows owner to withdraw or block users unexpectedly.
          </li>
          <li>
            <b>Audits:</b> Third-party review (OpenZeppelin, Trail of
            Bits)—checks for known bugs (overflow, underflow, logic flaws,
            missing checks).
          </li>
          <li>
            <b>Common Exploits:</b> Integer overflow, unchecked return values,
            improper randomness, unsafe delegatecall, lack of access control.
          </li>
          <li>
            <b>Best Practices:</b> Use battle-tested libraries (OpenZeppelin),
            require audits, run bug bounty, follow least-privilege (no owner,
            time locks, upgradeable patterns carefully).
          </li>
          <li>
            <b>Quiz:</b> Why must you update state before external calls in
            Solidity?
            <Reveal>
              Prevents reentrancy attacks—state reflects new balance before
              funds leave contract.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "browser-extension-best-practices-deep-dive",
    title:
      "Browser Extension Best Practices (Messaging, Sandboxing, Manifest V3)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Cross-Origin Messaging:</b> Use{" "}
            <code>chrome.runtime.sendMessage</code> or <code>postMessage</code>{" "}
            with strict origin checks; never trust message content blindly.
          </li>
          <li>
            <b>Sandboxing:</b> Use <code>sandbox.html</code> for untrusted code
            (iframes with <code>sandbox</code> attr); separate
            privileged/background from content scripts.
          </li>
          <li>
            <b>Manifest V3 Migration:</b> Service workers replace background
            pages; declarativeNetRequest replaces webRequest for
            blocking/modifying traffic.
          </li>
          <li>
            <b>Permissions Hygiene:</b> Only request what’s needed, use{" "}
            <code>host_permissions</code>, optional permissions.
          </li>
          <li>
            <b>Best Practices:</b> CSP, content script isolation, audit
            dependencies, use <code>chrome.storage</code> not localStorage,
            manual reviews before store upload.
          </li>
          <li>
            <b>Quiz:</b> Why are content scripts isolated from the page’s JS
            context?
            <Reveal>
              Prevents leaking privileged extension APIs/data to untrusted site
              code—defense against XSS and supply chain attacks.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "cloud-native-patterns-deep-dive",
    title: "Cloud-Native Patterns—Twelve-Factor, Self-Heal, Immutable Infra",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Twelve-Factor:</b> Strict separation of config/code, stateless,
            disposable, logs to stdout, dev/prod parity, declarative deploy.
          </li>
          <li>
            <b>Self-Healing:</b> Auto-restart, health checks, rolling deploys,
            pod/node eviction/replacement.
          </li>
          <li>
            <b>Immutable Infrastructure:</b> Don’t patch live systems—replace
            with new builds/images (golden image).
          </li>
          <li>
            <b>Best Practices:</b> IaC (Terraform, CDK), blue/green deploy,
            canary, observability by default.
          </li>
          <li>
            <b>Quiz:</b> Why prefer immutable infra?
            <Reveal>
              Prevents config drift, guarantees known-good state, enables fast
              rollback—core to modern cloud ops.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "saas-multitenancy-deep-dive",
    title: "SaaS Multi-Tenancy—Isolation, Sharding, Tenant-Aware Auth",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Models:</b> Shared DB + tenant ID, schema-per-tenant, or full
            DB-per-tenant—choose by scale/security needs.
          </li>
          <li>
            <b>Isolation:</b> Enforce tenant access at every layer (API, DB,
            cache); row-level security, separate keys.
          </li>
          <li>
            <b>Sharding:</b> Partition tenants by region/customer; hot tenants
            may get own DB/node (vertical partition).
          </li>
          <li>
            <b>Tenant-Aware Auth:</b> JWT claims, scoped API tokens,
            tenant-specific roles.
          </li>
          <li>
            <b>Quiz:</b> Why is isolation critical in multi-tenant SaaS?
            <Reveal>
              One bug/leak can expose data to wrong customer—serious breach;
              needs rigorous defense in depth.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "testing-at-scale-deep-dive",
    title: "Testing at Scale—Contract, Chaos, E2E, Synthetic Monitoring",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Contract Tests:</b> Validate API/schema between teams/services
            (Pact, OpenAPI, GraphQL).
          </li>
          <li>
            <b>End-to-End (E2E):</b> Simulate full user flows (Cypress,
            Playwright, Selenium); cover integrations, not just unit.
          </li>
          <li>
            <b>Chaos Testing:</b> Randomly kill/restart nodes/services to ensure
            graceful failure.
          </li>
          <li>
            <b>Synthetic Monitoring:</b> Probes/robots hit endpoints, simulate
            user behavior; catch issues before users do.
          </li>
          <li>
            <b>Quiz:</b> Why use contract tests in microservices?
            <Reveal>
              Catch breaking changes across teams before prod; guarantee version
              compatibility.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "sso-oauth-saml-deep-dive",
    title: "SAML, OAuth, OIDC—Enterprise SSO & Delegated Identity",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>SAML:</b> XML-based, enterprise SSO; browser POSTs signed
            assertion; widely used for old-school B2B apps.
          </li>
          <li>
            <b>OAuth2:</b> “Delegated auth”; app never sees user’s password;
            user approves scopes for access.
          </li>
          <li>
            <b>OIDC:</b> OpenID Connect = OAuth2 + ID token (JWT) for user
            identity; supports modern “Sign in with X.”
          </li>
          <li>
            <b>Risks:</b> Redirect/CSRF bugs, token leaks, misuse of implicit
            flow.
          </li>
          <li>
            <b>Best Practices:</b> Use PKCE, rotate secrets, validate
            issuer/audience, always HTTPS.
          </li>
          <li>
            <b>Quiz:</b> Why does OIDC matter for SPAs?
            <Reveal>
              OIDC provides strong, verifiable user identity via JWT; works with
              modern OAuth flows for web/mobile.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "payment-rails-deep-dive",
    title: "Payment Rails, PCI-DSS, Stripe/PayPal API, Fraud Defense",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Payment Rails:</b> ACH, cards (Visa/Mastercard), SEPA, crypto,
            mobile—integrate via gateways (Stripe, Adyen, PayPal).
          </li>
          <li>
            <b>PCI-DSS:</b> Card data rules—never touch PAN/CVV; use
            tokenization, SAQ-A, never store raw card info.
          </li>
          <li>
            <b>API Flows:</b> Stripe Elements/Checkout—PCI compliant by design;
            webhooks for updates (success, fail, refund).
          </li>
          <li>
            <b>Fraud Defense:</b> Risk scoring, 3DSecure, velocity checks,
            blacklist, ML/AI fraud models.
          </li>
          <li>
            <b>Quiz:</b> Why should your server never log/store card numbers?
            <Reveal>
              Instant PCI-DSS violation; massive fines, breach liability; always
              use gateway/token flow.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "webrtc-deep-dive-2",
    title: "WebRTC—Real-Time Media, TURN/STUN, Security & Scaling",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>WebRTC:</b> Peer-to-peer video, audio, data (browser-native);
            signaling done separately (e.g., via WebSocket).
          </li>
          <li>
            <b>STUN/TURN:</b> NAT traversal for real-world connectivity; STUN =
            discovery, TURN = relay when P2P fails.
          </li>
          <li>
            <b>Security:</b> Encrypted by default (DTLS, SRTP); browser prompts
            for mic/cam access.
          </li>
          <li>
            <b>Scaling:</b> For multi-party, use SFU/MCU servers (mediasoup,
            Janus, Jitsi); record/relay streams centrally.
          </li>
          <li>
            <b>Quiz:</b> Why does WebRTC need TURN for some users?
            <Reveal>
              Firewalls or double-NAT can block direct P2P; TURN acts as
              fallback relay server to ensure connectivity.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "api-gateway-deep-dive",
    title: "API Gateways—Throttling, Auth, Aggregation, Observability",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>API Gateway:</b> Single entry for microservices—handles routing,
            rate limiting, auth, logging.
          </li>
          <li>
            <b>Throttling/Quota:</b> Prevent API abuse by user/IP/token;
            backoff/retry patterns.
          </li>
          <li>
            <b>Auth & Policy:</b> JWT verification, OAuth2, API keys, per-route
            RBAC.
          </li>
          <li>
            <b>Aggregation:</b> Fan-out or join multiple downstream calls—reduce
            client roundtrips.
          </li>
          <li>
            <b>Observability:</b> Auto logging, distributed tracing, error
            reporting, metrics.
          </li>
          <li>
            <b>Quiz:</b> Why put auth/throttle at gateway, not app?
            <Reveal>
              Centralizes security, reduces duplicated code, blocks abusers
              early, simplifies service design.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "cqrs-event-sourcing-deep-dive",
    title: "CQRS & Event Sourcing—Write/Read Split, Replay, Audit",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>CQRS:</b> Command Query Responsibility Segregation—split write
            (commands) from read (queries); enables scale.
          </li>
          <li>
            <b>Event Sourcing:</b> Store state as sequence of events, not just
            current value; can rebuild history, audit, undo.
          </li>
          <li>
            <b>Benefits:</b> Replay for bug fix/debug, audit log, enables
            complex business logic.
          </li>
          <li>
            <b>Challenges:</b> Event schema/versioning, consistency, rebuilding
            projections.
          </li>
          <li>
            <b>Best Practices:</b> Use for high-complexity, high-scale,
            regulatory apps (finance, logistics, etc.).
          </li>
          <li>
            <b>Quiz:</b> Why split read and write models?
            <Reveal>
              Each can be optimized—fast writes (append events), fast reads
              (cache/projection); decouples business logic from reporting.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "idempotency-distributed-locks-deep-dive",
    title: "Idempotency, Distributed Locks, and Consistency Models",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Idempotency:</b> Safe retry of API/command—multiple identical
            requests have same result (e.g., payments, provisioning).
          </li>
          <li>
            <b>Distributed Locks:</b> Use Redis/ZooKeeper/etcd to prevent race
            conditions in multi-node ops.
          </li>
          <li>
            <b>Consistency:</b> Strong (ACID, global), eventual (AP systems),
            causal—choose per use-case.
          </li>
          <li>
            <b>Patterns:</b> Idempotency keys, “compare-and-swap”,
            optimistic/pessimistic locking.
          </li>
          <li>
            <b>Quiz:</b> Why is idempotency critical for payments/APIs?
            <Reveal>
              Prevents accidental double-charge or resource creation on
              retry/network failure.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "automated-rollbacks-canary-deploy-deep-dive",
    title: "Automated Rollbacks, Canary & Blue-Green Deployments",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Canary Deploy:</b> Release to small user %; monitor,
            auto-rollback if errors/latency rise.
          </li>
          <li>
            <b>Blue-Green Deploy:</b> Two prod environments; switch all traffic
            instantly if needed.
          </li>
          <li>
            <b>Automated Rollback:</b> CI/CD detects failures (metrics, logs,
            alerts), triggers instant revert.
          </li>
          <li>
            <b>Observability:</b> Critical for safe rollouts; always monitor
            business + tech metrics.
          </li>
          <li>
            <b>Quiz:</b> Why do canary vs. blue-green?
            <Reveal>
              Canary lets you test with real traffic and minimize blast radius
              before full cutover.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "secret-management-deep-dive",
    title: "Secret Management & Secure Config (Vault, KMS, .env, Rotation)",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Secrets:</b> API keys, DB passwords, JWT secrets—never in
            codebase or image; use secure storage (Vault, AWS KMS, GCP Secret
            Manager).
          </li>
          <li>
            <b>Env Vars:</b> Prefer for runtime injection (.env), but secure
            source; rotate regularly.
          </li>
          <li>
            <b>Rotation:</b> Rotate creds/secrets periodically and on breach;
            automate rotation for cloud keys/tokens.
          </li>
          <li>
            <b>Access Control:</b> RBAC on secrets; audit logs for access/use.
          </li>
          <li>
            <b>Quiz:</b> Why not bake secrets into Docker images?
            <Reveal>
              Image is static and widely distributed; secrets must be dynamic,
              revocable, and never stored long-term on disk.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "db-scaling-sharding-cap-deep-dive",
    title: "Database Scaling—Sharding, Read Replicas, CAP Theorem",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Sharding:</b> Split data by key/range (horizontal scaling);
            custom logic for split/merge/rebalancing.
          </li>
          <li>
            <b>Read Replicas:</b> Scale reads, improve latency; eventually
            consistent—writes go to primary.
          </li>
          <li>
            <b>CAP Theorem:</b> Consistency, Availability, Partition
            tolerance—pick any 2; no distributed DB has all 3.
          </li>
          <li>
            <b>Best Practices:</b> Cache for hot data, use connection pooling,
            partition for big data.
          </li>
          <li>
            <b>Quiz:</b> Why do sharding?
            <Reveal>
              Spreads load, enables scaling past single DB server, but adds
              ops/consistency complexity.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "feature-toggles-experimentation-deep-dive",
    title: "Feature Toggles, Gradual Rollouts & Experimentation at Scale",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Feature Toggles:</b> Enable/disable features per user/group—zero
            downtime, fast rollback.
          </li>
          <li>
            <b>Gradual Rollout:</b> Enable for % of users, regions, or groups;
            measure impact (A/B test).
          </li>
          <li>
            <b>Infrastructure:</b> LaunchDarkly, Unleash, homegrown flags with
            config services.
          </li>
          <li>
            <b>Experimentation:</b> Growth/UX teams can test, collect analytics
            before global release.
          </li>
          <li>
            <b>Quiz:</b> Why not use branches for features instead?
            <Reveal>
              Feature toggles enable trunk-based dev, reduce merge hell, and
              support true CI/CD with safe, fast deploys.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "iac-terraform-cdk-deep-dive",
    title: "Infrastructure as Code (IaC)—Terraform, CDK, Policy as Code",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>IaC:</b> Version infra alongside code; Terraform (HCL), AWS CDK
            (TypeScript), Pulumi (multi-language).
          </li>
          <li>
            <b>Policy as Code:</b> OPA, Sentinel—enforce org rules (e.g., no
            public S3, restrict regions).
          </li>
          <li>
            <b>Benefits:</b> Reproducible, auditable, reviewable infra; fast
            disaster recovery; infra testing in CI.
          </li>
          <li>
            <b>Best Practices:</b> Module reuse, state locking/backups,
            automated PR checks.
          </li>
          <li>
            <b>Quiz:</b> Why enforce policy as code?
            <Reveal>
              Prevents human error, ensures compliance/security standards,
              codifies best practices for all teams.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "serverless-edge-cdn-deep-dive",
    title: "Serverless at the Edge—CDN Compute, Global Low-Latency APIs",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Edge Compute:</b> Run code at CDN edge nodes (Cloudflare Workers,
            AWS Lambda@Edge, Vercel Edge Functions).
          </li>
          <li>
            <b>Benefits:</b> Ultra-low latency, request/response rewriting,
            geo-aware responses, faster auth/session/cookie handling.
          </li>
          <li>
            <b>Limits:</b> Cold start, code size, restricted APIs, stateless
            (persist data elsewhere).
          </li>
          <li>
            <b>Patterns:</b> Geo AB test, split traffic by location,
            personalized headers, DDoS mitigation, bot defense at edge.
          </li>
          <li>
            <b>Quiz:</b> Why move logic to edge?
            <Reveal>
              Dramatically reduces round-trip time for global users, offloads
              backend, enables real-time customization/security.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "distributed-cache-deep-dive",
    title: "Distributed Cache—Redis, Memcached, CDN, Invalidation",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Cache Layers:</b> Local memory (process), shared cache
            (Redis/Memcached), global CDN.
          </li>
          <li>
            <b>Patterns:</b> Read-through, write-through, cache-aside; use TTLs,
            manual/auto invalidation.
          </li>
          <li>
            <b>Consistency:</b> Strong (write-through) vs. eventual
            (cache-aside), cache stampede mitigation.
          </li>
          <li>
            <b>Invalidation:</b> The “hardest problem”—always purge/update cache
            on writes.
          </li>
          <li>
            <b>Quiz:</b> Why cache at CDN edge?
            <Reveal>
              Instant global delivery, massive cost/latency savings, scales
              infinitely for static/dynamic content.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "advanced-observability-deep-dive",
    title: "Advanced Observability—Tracing, Metrics, Logging, SLOs",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Three Pillars:</b> Tracing (OpenTelemetry, Jaeger), Metrics
            (Prometheus, CloudWatch), Logs (ELK, Loki, Datadog).
          </li>
          <li>
            <b>Correlation IDs:</b> Pass unique ID across all logs, spans,
            metrics for each request.
          </li>
          <li>
            <b>Dashboards/Alerts:</b> SLO/SLI-driven; on-call owns
            auto/esc/alerts, not just “infra team.”
          </li>
          <li>
            <b>Best Practices:</b> “Red/Golden signals” (latency, errors,
            saturation, traffic); distributed traces for all requests.
          </li>
          <li>
            <b>Quiz:</b> Why push trace ID to logs?
            <Reveal>
              Instantly connects logs/metrics/traces for root-cause and
              postmortems; must-have for microservices scale.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "cloud-cost-optimization-deep-dive-2",
    title: "Cloud Cost Optimization—Budgets, Autoscale, Spot, FinOps",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Budgets/Alerts:</b> Set spending caps/alerts for teams/products;
            tie to app metrics.
          </li>
          <li>
            <b>Autoscaling:</b> Right-size clusters, shut down unused (dev,
            test) infra, scale to demand.
          </li>
          <li>
            <b>Spot/Savings:</b> Use spot/preemptible for non-critical/batch
            workloads; long-term reserved for baseline.
          </li>
          <li>
            <b>FinOps:</b> Make engineers responsible for cost, not just
            ops/finance; review cloud spend as team.
          </li>
          <li>
            <b>Quiz:</b> Why is FinOps important in cloud-native teams?
            <Reveal>
              Engineers make infra decisions—must own cost/risk tradeoffs, not
              just features or uptime.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "ml-engineering-mlops-deep-dive",
    title:
      "Machine Learning Engineering—MLOps, Model Serving, Drift, Pipelines",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>MLOps:</b> CI/CD for models; automate training, versioning,
            testing, deployment (Kubeflow, MLflow).
          </li>
          <li>
            <b>Model Serving:</b> Real-time (REST/gRPC, TensorFlow Serving),
            batch, A/B/canary testing for new models.
          </li>
          <li>
            <b>Data/Model Drift:</b> Detect when input data or model behavior
            changes over time—auto re-train or alert.
          </li>
          <li>
            <b>Pipelines:</b> Data ingestion → cleaning → feature engineering →
            training → validation → deployment.
          </li>
          <li>
            <b>Quiz:</b> Why treat ML models as code (with CI/CD)?
            <Reveal>
              Ensures reproducibility, audit trail, automated rollback, and
              faster iterations; key to “real” AI in production.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "advanced-authentication-deep-dive",
    title:
      "Advanced Authentication—MFA, Passkeys, Delegation, Secrets Rotation",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>MFA:</b> Multi-factor (TOTP apps, hardware keys, SMS); push
            “strongest available” for user type/risk.
          </li>
          <li>
            <b>Passkeys (FIDO2/WebAuthn):</b> Phish-proof, device-bound (Touch
            ID, Face ID); browser/platform native.
          </li>
          <li>
            <b>Delegation:</b> OAuth2 scopes/roles, API token expiry,
            Just-in-Time (JIT) permissions.
          </li>
          <li>
            <b>Secrets Rotation:</b> Rotate all auth tokens/secrets on schedule
            or on breach; use cloud KMS.
          </li>
          <li>
            <b>Quiz:</b> Why is WebAuthn so much safer than passwords?
            <Reveal>
              No shared secret—private key never leaves device, no credential
              phishing or reuse possible.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "mobile-engineering-deep-dive",
    title: "Mobile Engineering—Offline, Push, App Stores, Native Bridges",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Offline-First:</b> Local DB (SQLite, Room, CoreData), sync on
            reconnect, handle merge/conflict.
          </li>
          <li>
            <b>Push Notifications:</b> APNs (iOS), FCM (Android); opt-in, manage
            tokens/lifecycle.
          </li>
          <li>
            <b>App Stores:</b> Code review, privacy, billing rules; test
            flight/internal testing.
          </li>
          <li>
            <b>Bridges:</b> Native modules for JS (React Native, Flutter,
            Cordova); access sensors, camera, biometrics.
          </li>
          <li>
            <b>Quiz:</b> Why use local DB, not just REST for mobile apps?
            <Reveal>
              Offline mode, fast UX, reliable sync—even in flaky networks or
              airplane mode.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "edge-ai-deep-dive",
    title: "Edge AI—Inference on Device, Model Optimization, Privacy",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Edge Inference:</b> Run models directly on browser, mobile, or
            IoT device (TensorFlow.js, Core ML, ONNX).
          </li>
          <li>
            <b>Optimization:</b> Quantization, pruning, distillation to shrink
            models (less RAM/CPU, faster startup).
          </li>
          <li>
            <b>Privacy:</b> Data stays on device—critical for health, biometric,
            or sensitive apps.
          </li>
          <li>
            <b>Update Patterns:</b> Push new models to devices, test/monitor
            version adoption, fallback gracefully.
          </li>
          <li>
            <b>Quiz:</b> Why is edge AI critical for privacy-sensitive or
            real-time apps?
            <Reveal>
              No raw data leaves device; real-time latency; enables ML when
              cloud is unavailable (IoT, cars, AR, etc.).
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "automation-engineering-deep-dive",
    title: "Automation Engineering—RPA, Headless, Infra Bots, CI Bots",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>RPA (Robotic Process Automation):</b> Automate repetitive
            UIs/tasks (UiPath, Blue Prism, Selenium).
          </li>
          <li>
            <b>Headless Automation:</b> Puppeteer, Playwright—test, scrape,
            monitor with browser API (headless).
          </li>
          <li>
            <b>Infra Bots:</b> Bots for cloud resource cleanup, scaling,
            deployment automation.
          </li>
          <li>
            <b>CI Bots:</b> Automate PR review, code quality, integration,
            merges (GitHub Actions, CircleCI bots).
          </li>
          <li>
            <b>Quiz:</b> Why use RPA vs. regular API automation?
            <Reveal>
              RPA can automate apps with no API (legacy, human-driven), but is
              fragile—use only if no better option.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "advanced-networking-deep-dive",
    title: "Advanced Networking—Load Balancing, CDN, TLS, QUIC, HTTP/3",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Load Balancing:</b> Distributes traffic across servers;
            algorithms: round-robin, least connections, geo-based.
          </li>
          <li>
            <b>Global CDN:</b> Caches static/dynamic content at edge; protects
            against DDoS, origin overload.
          </li>
          <li>
            <b>TLS/SSL:</b> Encrypts in transit; always use HTTPS, manage certs,
            rotate keys, enable HSTS.
          </li>
          <li>
            <b>QUIC/HTTP/3:</b> UDP-based, multiplexes streams, faster
            handshake, auto recovers from packet loss.
          </li>
          <li>
            <b>Zero Trust Networking:</b> Authn/authz everywhere, not just at
            edge; mTLS, identity-based routing.
          </li>
          <li>
            <b>Quiz:</b> Why do modern CDNs terminate TLS at edge?
            <Reveal>
              Reduces latency, offloads cert handling, protects origins, enables
              secure edge logic (WAF, bot defense, etc.).
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "browser-internals-advanced-deep-dive",
    title:
      "Browser Internals—Painting, Memory Leaks, GC, DOM Limits, Browser Quirks",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Painting & Compositing:</b> Paint phase is GPU-accelerated; too
            many layers or “paint storms” cause jank.
          </li>
          <li>
            <b>Memory Leaks:</b> Detached DOM nodes, event listeners not
            removed, closures capturing large state.
          </li>
          <li>
            <b>Garbage Collection (GC):</b> Modern JS uses generational GC
            (mark-sweep, incremental); long-lived closures/arrays delay GC.
          </li>
          <li>
            <b>DOM Limits:</b> Huge node trees (100k+) slow everything (render,
            querySelector, layout, accessibility).
          </li>
          <li>
            <b>Browser Differences:</b> CSS, JS, and rendering differ—test on
            Chrome, Firefox, Safari, Edge; use feature detection, not UA
            sniffing.
          </li>
          <li>
            <b>Quiz:</b> Why does adding/removing thousands of DOM nodes cause
            jank?
            <Reveal>
              Triggers expensive layout/paint cycles, fills GC heap, event
              handler churn; batch updates and use virtualization.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "modern-security-deep-dive",
    title: "Modern Security—Zero Trust, mTLS, SAST/DAST, Secret Rotation",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Zero Trust:</b> Every request is authenticated/authorized, no
            “trusted” networks; segment everything.
          </li>
          <li>
            <b>mTLS:</b> Mutual TLS—client and server verify each other; used in
            service mesh (Istio, Linkerd).
          </li>
          <li>
            <b>SAST/DAST:</b> Static (code) and dynamic (running app) analysis;
            automate scans in CI/CD.
          </li>
          <li>
            <b>Secret Rotation:</b> Automated (cloud KMS, Vault), log and alert
            on use of old/expired creds.
          </li>
          <li>
            <b>Quiz:</b> Why is “trust but verify” dead in cloud security?
            <Reveal>
              Cloud/internet = no perimeter; lateral movement must be blocked at
              every hop—verify every user, device, service, request.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "compliance-deep-dive",
    title: "Compliance—GDPR, SOC2, PCI, HIPAA, Audit, Data Residency",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>GDPR:</b> EU data, explicit consent, data subject rights, breach
            reporting.
          </li>
          <li>
            <b>SOC2:</b> Security, availability, processing integrity,
            confidentiality, privacy—3rd-party audit.
          </li>
          <li>
            <b>PCI-DSS:</b> Cardholder data—encrypt, don’t store, audit, segment
            card flows.
          </li>
          <li>
            <b>HIPAA:</b> US healthcare—PHI protection, audit logs, breach
            rules.
          </li>
          <li>
            <b>Data Residency:</b> Store/process data in required
            region/country; audit for movement/export.
          </li>
          <li>
            <b>Quiz:</b> Why are audit trails critical for compliance?
            <Reveal>
              Prove (to regulator or customer) what happened, who did it,
              when—defense against breach, fine, loss of trust.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "pwa-offline-deep-dive",
    title: "PWA/Offline-First—App Shell, Sync, Background, Resilience",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>App Shell:</b> Precache core UI for instant load, offline
            fallback; service worker caches shell, swaps content.
          </li>
          <li>
            <b>Offline Sync:</b> Queue actions, retry on reconnect; “background
            sync” API, local DB (IndexedDB).
          </li>
          <li>
            <b>Background:</b> Push notifications, background fetch, periodic
            sync—limited by browser, battery, user opt-in.
          </li>
          <li>
            <b>Resilience:</b> Handle partial failure; show stale data, graceful
            errors, explicit “sync” action.
          </li>
          <li>
            <b>Quiz:</b> Why is service worker central to PWA?
            <Reveal>
              Controls caching/network, enables instant/offline UX, allows
              push/background tasks—bridge between browser and app logic.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "advanced-devops-deep-dive",
    title: "Advanced DevOps—Service Mesh, GitOps, Auto Remediation, Chaos",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Service Mesh:</b> Traffic routing, retries, mTLS, metrics,
            tracing at network layer (Istio, Linkerd, Consul).
          </li>
          <li>
            <b>GitOps:</b> All infra/app changes via git PR/merge; controller
            auto-applies desired state.
          </li>
          <li>
            <b>Auto Remediation:</b> Infra auto-heals via alert rules, bots,
            scripts—replace failing nodes, restart crashed pods.
          </li>
          <li>
            <b>Chaos Engineering:</b> Test resilience by injecting faults
            (gremlin, chaos monkey); automate in CI/CD.
          </li>
          <li>
            <b>Quiz:</b> Why does GitOps speed up compliance and ops?
            <Reveal>
              Changes are always reviewable, auditable, rollbackable; no manual
              drift or “secret” fixes.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "regulatory-fintech-deep-dive",
    title: "Regulatory/Fintech—KYC, AML, Payments, Audit, Latency",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>KYC (Know Your Customer):</b> User ID, docs, sanctions
            screening—must be auditable and secure.
          </li>
          <li>
            <b>AML (Anti-Money Laundering):</b> Track transaction flows, flag
            suspicious patterns, auto-escalate.
          </li>
          <li>
            <b>Payments:</b> PCI compliance, strong auth (3DSecure), instant
            settlement, fraud scoring.
          </li>
          <li>
            <b>Audit & Compliance:</b> Immutable logs, data access records,
            fine-grained RBAC.
          </li>
          <li>
            <b>Latency:</b> Regulatory SLAs for trade/settlement (MiFID, SEC),
            must optimize end-to-end response time.
          </li>
          <li>
            <b>Quiz:</b> Why is RBAC essential for fintech?
            <Reveal>
              Reduces risk of fraud/breach; every action traceable to user/role;
              required for regulatory sign-off.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "aiops-deep-dive",
    title: "AI Operations (AIOps)—Monitoring, Drift, Self-Heal, Cost Control",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>AIOps:</b> Use ML for infra/app monitoring (anomaly detection,
            root-cause, auto ticketing).
          </li>
          <li>
            <b>Drift Monitoring:</b> Detects config/model drift; triggers
            retrain or rollback; closes the ML-in-prod loop.
          </li>
          <li>
            <b>Self-Healing:</b> AI triggers remediation: scale out, roll back,
            auto-restart, auto-patch.
          </li>
          <li>
            <b>Cost Control:</b> Predicts usage, recommends scaling/resources,
            right-sizing.
          </li>
          <li>
            <b>Quiz:</b> What’s the win vs. old-school ops?
            <Reveal>
              Proactive, not reactive; finds “unknown unknowns”; enables scale
              with less manual work.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "zero-downtime-migration-deep-dive",
    title: "Zero-Downtime Migration—DB Swaps, Canary Data, Feature Flip",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>DB Swaps:</b> Dual-write/read during migration; gradually switch
            traffic; rollback path ready.
          </li>
          <li>
            <b>Canary Data:</b> Migrate/test with a slice of prod data/users
            before global cutover.
          </li>
          <li>
            <b>Feature Flip:</b> Toggle new code path by flag; instant switch,
            rollback.
          </li>
          <li>
            <b>Tools:</b> Gh-ost, pt-online-schema-change, shadow tables, change
            data capture (CDC).
          </li>
          <li>
            <b>Quiz:</b> Why dual-write before cutover?
            <Reveal>
              Keeps new DB in sync, validates migration logic; gives rollback if
              issues found in prod.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "multi-region-ha-deep-dive",
    title: "Multi-Region High Availability—Failover, Data Sync, Split Brain",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Failover:</b> Health checks + DNS/Anycast or traffic director
            auto-switches regions.
          </li>
          <li>
            <b>Data Sync:</b> Active-active or active-passive; conflict
            resolution (last-write-wins, vector clocks, CRDT).
          </li>
          <li>
            <b>Split Brain:</b> Prevent inconsistent state (partitioned
            clusters); prefer quorum consensus.
          </li>
          <li>
            <b>Latency:</b> Georoute users to nearest healthy region; replicate
            for RPO/RTO targets.
          </li>
          <li>
            <b>Quiz:</b> Why is “split brain” so dangerous?
            <Reveal>
              Simultaneous writes in partitioned regions = data loss/corruption;
              must detect, block, or merge on heal.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "api-versioning-deep-dive-2",
    title: "API Versioning—Path, Header, Backward Compat, Deprecation",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Version in Path:</b> /v1/resource—easy to route, but “bakes in”
            version.
          </li>
          <li>
            <b>Header-Based:</b> Accept-Version or custom header; enables
            “clean” URLs.
          </li>
          <li>
            <b>Backward Compat:</b> Additive changes = safe, breaking changes =
            new version.
          </li>
          <li>
            <b>Deprecation:</b> Warn, sunset, auto alert clients; always
            document and publish timelines.
          </li>
          <li>
            <b>Quiz:</b> Why not just “fix bugs” in v1 forever?
            <Reveal>
              Breaking changes risk clients/users; versioning gives safety,
              control, trust.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "real-time-streaming-deep-dive",
    title: "Real-Time Streaming—Kafka, Pulsar, WebSockets, Event Sourcing",
    content: (
      <>
        <ul className="list-disc pl-5 mb-2 text-sm">
          <li>
            <b>Kafka/Pulsar:</b> Distributed log; at-least-once, exactly-once,
            partitioned streams; high durability.
          </li>
          <li>
            <b>Consumers:</b> Pull, checkpoint offsets, can “replay” history;
            scale by consumer group.
          </li>
          <li>
            <b>WebSockets:</b> Real-time browser/app push; useful for
            dashboards, chat, presence.
          </li>
          <li>
            <b>Event Sourcing:</b> Store state as ordered events; downstream
            systems consume, process in real time.
          </li>
          <li>
            <b>Quiz:</b> Why does streaming scale better than polling?
            <Reveal>
              Push-based; lower latency, fewer wasted requests, can scale to
              millions of updates/minute across clients.
            </Reveal>
          </li>
        </ul>
      </>
    ),
  },
];
