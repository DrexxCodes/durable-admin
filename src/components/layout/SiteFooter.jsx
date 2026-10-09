/** One credit line for the whole admin: used by the logged-in shell and the guest (login / activate / reset) screens. */
export default function SiteFooter({ guest = false }) {
  return (
    <footer className={guest ? "site-footer site-footer-guest" : "app-footer site-footer"}>
      <p className="site-credit">
        Developed &amp; Maintained by <strong>Drexx Technologies</strong>
      </p>
    </footer>
  );
}
