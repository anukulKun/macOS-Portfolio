import "~/styles/mobile-notification.css";

const isMobile = (): boolean => {
  const ua = navigator.userAgent;
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(ua) ||
    (window.innerWidth <= 768 && "ontouchstart" in window);
};

const MobileNotification = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isMobile()) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="mobile-notification-overlay">
      <div className="mobile-notification-card">
        <div className="mobile-notification-icon">
          <img src="/logo/121.jpg" alt="Anukul" />
        </div>
        <h3 className="mobile-notification-title">Welcome!</h3>
        <p className="mobile-notification-text">
          This portfolio works best on a desktop browser for the full macOS experience.
        </p>
        <p className="mobile-notification-subtext">
          You can still browse on mobile, but some features like window dragging and resizing may be limited.
        </p>
        <button
          className="mobile-notification-btn"
          onClick={() => setVisible(false)}
        >
          Continue Anyway
        </button>
      </div>
    </div>
  );
};

export default MobileNotification;
