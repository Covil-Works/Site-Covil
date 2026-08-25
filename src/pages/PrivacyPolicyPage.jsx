import "../styles/apps.css";

const APP_LOGOS = {
  splitup: "/img/logo-splitup.png",
  mywl: "/img/logo-mywl.png",
};

function PrivacyPolicyPage({ appSlug, theme = "dark" }) {
  const logo = APP_LOGOS[appSlug] || `/img/logo-${appSlug}.png`;

  return (
    <main className="policy-shell" data-theme={theme}>
      <article className="policy-card policy-card--content">
        {logo && (
          <div className="policy-logo-wrap">
            <img src={logo} alt={`Logo ${appSlug}`} className="policy-logo" />
          </div>
        )}
        <p className="policy-eyebrow">{appSlug}</p>
        <h1>Privacy Policy</h1>

        <p>
          This privacy policy is applicable to the SplitUp app (hereinafter referred to as "Application") for
          mobile devices, which was developed by Arthur Pimentel (hereinafter referred to as "Service Provider")
          as a Free service. This service is provided "AS IS".
        </p>

        <h2>Data Collection and Local Storage</h2>
        <p>
          The Application operates primarily offline. The Application does not require you to create an account or
          register with the Service Provider. All personal data you input into the Application-such as names of
          friends, check details, and expenses-is stored securely and strictly locally on your own mobile device. The
          Service Provider does not collect, transmit, or store this personal information on any external servers.
        </p>

        <h2>Device Permissions</h2>
        <p>
          To provide its core features, the Application may request specific device permissions:
        </p>
        <p>
          Storage Access: The Application requires access to your device&apos;s file system solely for the purpose of
          generating, saving, and exporting PDF reports of your split checks. These files are generated locally.
        </p>
        <p>
          Contacts Access (if applicable): If the Application requests access to your contact list, it is exclusively
          to facilitate adding friends to your checks within the app. Contact data is not uploaded to our servers or
          shared with third parties.
        </p>

        <h2>What information does the Application collect automatically?</h2>
        <p>
          The Application may collect certain non-personally identifiable information automatically, including, but
          not limited to, the type of mobile device you use, your mobile operating system, and anonymous crash reports
          or usage diagnostics to help the Service Provider improve the Application&apos;s stability.
        </p>

        <h2>Does the Application collect precise real time location information of the device?</h2>
        <p>This Application does not gather precise information about the location of your mobile device.</p>

        <h2>Does the Application use Artificial Intelligence (AI) technologies?</h2>
        <p>The Application does not use Artificial Intelligence (AI) technologies to process your data or provide features.</p>

        <h2>Do third parties see and/or have access to information obtained by the Application?</h2>
        <p>
          Since your personal data is stored locally on your device, the Service Provider does not share your personal
          data with third parties. Only aggregated, anonymized diagnostic data (such as crash logs) may be
          periodically transmitted to external services to aid the Service Provider in improving the Application.
        </p>
        <p>The Service Provider may disclose Automatically Collected Information:</p>
        <p>as required by law, such as to comply with a subpoena, or similar legal process;</p>
        <p>
          when they believe in good faith that disclosure is necessary to protect their rights, protect your safety
          or the safety of others, investigate fraud, or respond to a government request;
        </p>

        <h2>What are my opt-out rights?</h2>
        <p>
          You can halt all collection of information by the Application easily by uninstalling the Application.
          Uninstalling the Application will also permanently delete all the locally stored data (friends, checks, and
          history) associated with it.
        </p>

        <h2>Data Retention Policy and Managing Your Information</h2>
        <p>
          Because the Application stores data locally on your device, you are in full control of your information. The
          data is retained for as long as you keep the Application installed. You can delete your data at any time by
          clearing the Application&apos;s storage data in your device settings or by uninstalling the Application.
        </p>

        <h2>For Users in Brazil (LGPD - Lei Geral de Proteção de Dados)</h2>
        <p>
          In compliance with the Brazilian General Data Protection Law (LGPD), we clarify that the Service Provider
          does not collect, process, or store your personal data on external databases. You exercise your rights to
          data access, modification, and deletion directly within the Application by editing or deleting the
          information on your device, or by uninstalling the Application.
        </p>

        <h2>How does the Application address children&apos;s privacy?</h2>
        <p>
          The Service Provider does not use the Application to knowingly solicit data from or market to children under
          the age of 13. The Service Provider does not knowingly collect personally identifiable information from
          children on external servers.
        </p>

        <h2>How is your information kept secure?</h2>
        <p>
          Your information&apos;s security relies on your device&apos;s security. We recommend utilizing your device&apos;s
          standard security features (such as screen locks and encryption) to safeguard the data stored locally by the
          Application.
        </p>

        <h2>How will you be informed of changes to this Privacy Policy?</h2>
        <p>
          This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of
          any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to
          consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
        </p>

        <p>This privacy policy is effective as of 2026-05-05.</p>

        <h2>How do you give your consent?</h2>
        <p>
          By using the Application, you are giving your consent to the processing of your information as set forth in
          this Privacy Policy now and as amended by us. &quot;Processing&quot; in this context primarily refers to the
          local storage and management of data on your hand-held device.
        </p>

        <h2>How can you contact us?</h2>
        <p>
          If you have any questions regarding privacy while using the Application, or have questions about the
          practices, please contact the Service Provider via email at covildev@gmail.com.
        </p>
      </article>
    </main>
  );
}

export default PrivacyPolicyPage;
