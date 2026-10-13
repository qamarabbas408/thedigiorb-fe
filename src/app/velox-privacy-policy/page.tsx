import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Velox Downloader",
  description:
    "Privacy Policy for the Velox Downloader browser extension, developed by Qamar Abbas, Founder of TheDigiOrb.",
  alternates: {
    canonical: "https://thedigiorb.com/velox-privacy-policy",
  },
};

const sections = [
  {
    title: "1. Introduction",
    content: (
      <>
        <p>
          Velox Downloader is a browser extension developed by Qamar Abbas,
          Founder &amp; Developer of TheDigiOrb. The extension connects your
          browser to the Velox desktop download manager for macOS and Windows.
        </p>
        <p>
          It allows users to send download links to the desktop application
          through the browser context menu or extension popup. It also supports
          browser-assisted downloading when users explicitly request this
          functionality.
        </p>
        <p>
          Velox Downloader is designed to process extension settings locally.
          The extension does not send user data to TheDigiOrb servers or use
          TheDigiOrb-operated analytics or crash-reporting services.
        </p>
      </>
    ),
  },
  {
    title: "2. Information the Extension Accesses",
    content: (
      <>
        <p>
          Depending on the features you use, Velox Downloader may access the
          following information:
        </p>
        <ul>
          <li>
            <strong>Download URLs:</strong> Links you explicitly submit through
            the extension popup or select using the browser context menu.
          </li>
          <li>
            <strong>Browser tab information:</strong> Tab information needed to
            locate or open a page for a user-requested browser-assisted download.
          </li>
          <li>
            <strong>Extension preferences:</strong> Settings and connection-
            related state stored using the browser&apos;s local extension storage.
          </li>
          <li>
            <strong>Download status and errors:</strong> Messages exchanged
            with the local Velox desktop application to report connection
            status, download progress, and errors.
          </li>
          <li>
            <strong>Website response data:</strong> When browser-assisted
            downloading is requested, the extension may process the HTTP
            response and file data returned by the website hosting the resource.
          </li>
        </ul>
        <p>
          The extension is not designed to collect browsing history or monitor
          unrelated browsing activity for analytics.
        </p>
      </>
    ),
  },
  {
    title: "3. How Information Is Used",
    content: (
      <>
        <p>Information accessed by the extension is used to provide its core functionality:</p>
        <ul>
          <li>Sending user-requested download URLs to the Velox desktop application.</li>
          <li>Establishing and maintaining the local browser-to-desktop connection.</li>
          <li>Performing browser-assisted downloads when explicitly requested.</li>
          <li>Displaying connection status, download progress, and error messages.</li>
          <li>Remembering extension preferences and connection-related state.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Local Processing and Data Sharing",
    content: (
      <>
        <p>
          Velox Downloader communicates with the locally installed Velox
          desktop application through the browser&apos;s Native Messaging
          mechanism.
        </p>
        <p>
          The extension does not transmit user data to TheDigiOrb servers,
          analytics platforms, or crash-reporting services.
        </p>
        <p>
          When you submit a download URL, it is passed to the local Velox
          application. When browser-assisted downloading is used, your browser
          makes network requests to the website hosting the requested resource.
        </p>
        <p>
          Those websites may receive standard network information, such as
          your IP address, and may process cookies, authentication information,
          or other request data according to their own privacy policies.
          Velox Downloader does not export your browser cookies to TheDigiOrb.
        </p>
        <p>
          This policy describes the extension&apos;s handling of information.
          It does not replace the privacy policies of websites you visit or
          resources you download.
        </p>
      </>
    ),
  },
  {
    title: "5. Local Storage and Data Retention",
    content: (
      <>
        <p>
          The extension may store preferences and connection-related state in
          your browser&apos;s local extension storage. This information is
          retained locally until it is removed by the extension, cleared by
          the browser, or otherwise deleted.
        </p>
        <p>
          The extension does not upload this locally stored information to
          TheDigiOrb servers.
        </p>
        <p>
          Downloaded files, download history, and other download-management
          information handled by the Velox desktop application are managed
          separately by that application.
        </p>
      </>
    ),
  },
  {
    title: "6. Browser Permissions",
    content: (
      <>
        <p>Velox Downloader uses browser permissions to provide its features:</p>
        <ul>
          <li>
            <strong>Context Menus:</strong> Adds the option to send selected
            download links to Velox.
          </li>
          <li>
            <strong>Native Messaging:</strong> Establishes communication with
            the locally installed Velox desktop application.
          </li>
          <li>
            <strong>Storage:</strong> Saves extension preferences and
            connection-related state locally.
          </li>
          <li>
            <strong>Scripting:</strong> Executes the packaged browser-assistance
            script when a user requests a browser-assisted download.
          </li>
          <li>
            <strong>Tabs:</strong> Locates or opens the browser tab needed for
            a requested browser-assisted download and manages tabs created
            specifically for that operation.
          </li>
          <li>
            <strong>Host Permissions:</strong> Supports user-requested
            downloads and browser-assisted requests across supported websites.
          </li>
        </ul>
        <p>
          These permissions support the extension&apos;s download-management
          functionality. Browser-assisted operations depend on the website,
          browser permissions, and the resource&apos;s availability.
        </p>
      </>
    ),
  },
  {
    title: "7. Third-Party Services",
    content: (
      <>
        <p>
          Velox Downloader does not integrate with TheDigiOrb-operated
          analytics, advertising, or crash-reporting services.
        </p>
        <p>
          The extension may interact with third-party websites when users
          request downloads. Those websites operate independently and may
          collect or process information under their own policies.
        </p>
        <p>
          Installing the extension also involves the browser and its extension
          distribution platform, which operate under their own terms and
          privacy policies.
        </p>
      </>
    ),
  },
  {
    title: "8. Security",
    content: (
      <>
        <p>
          Velox Downloader is designed to minimize unnecessary data transmission
          by processing extension preferences locally and communicating with
          the desktop application through Native Messaging.
        </p>
        <p>
          Users should keep their browser and Velox desktop application updated
          to benefit from security fixes and improvements.
        </p>
        <p>
          No software or communication mechanism can guarantee absolute
          security. Users should exercise care when downloading files from
          unfamiliar websites.
        </p>
      </>
    ),
  },
  {
    title: "9. Children's Privacy",
    content: (
      <p>
        Velox Downloader is a general-purpose download utility and is not
        specifically designed to collect personal information from children.
        The extension does not operate a remote user-data collection service.
      </p>
    ),
  },
  {
    title: "10. Changes to This Policy",
    content: (
      <p>
        This Privacy Policy may be updated when the extension&apos;s
        functionality or privacy practices change. Updated versions will be
        published on this page with a revised effective date where appropriate.
      </p>
    ),
  },
  {
    title: "11. Contact",
    content: (
      <>
        <p>
          Velox Downloader is developed by <strong>Qamar Abbas</strong>,
          Founder &amp; Developer of TheDigiOrb.
        </p>
        <p>
          For questions about this Privacy Policy or the Velox Downloader
          extension, visit:
        </p>
        <p>
          <a href="https://thedigiorb.com/">https://thedigiorb.com/</a>
        </p>
      </>
    ),
  },
];

export default function VeloxPrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-12 text-gray-800 sm:px-8">
      <article className="mx-auto max-w-3xl">
        <header className="mb-10 border-b border-gray-200 pb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
            TheDigiOrb
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Velox Downloader Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            Effective date: October 13, 2026
          </p>

          <p className="mt-5 leading-7 text-gray-600">
            This policy explains how the Velox Downloader browser extension
            accesses, uses, and stores information when connecting your browser
            to the Velox desktop download manager.
          </p>
        </header>

        <div className="space-y-9">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                {section.title}
              </h2>

              <div className="space-y-3 leading-7 text-gray-700 [&_a]:text-blue-700 [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Qamar Abbas · TheDigiOrb
          </p>
          <p className="mt-1">
            Velox Downloader — Browser companion for the Velox desktop app.
          </p>
        </footer>
      </article>
    </main>
  );
}
