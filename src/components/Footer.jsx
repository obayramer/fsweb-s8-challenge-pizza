import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer({ menuTitle }) {
  return (
    <footer>
      <div className="footer">
        <div className="contact">
          <img
            className="footer-logo"
            src="./Iteration-2-aseets/footer/logo-footer.svg"
            alt="Logo"
          />
          <ul>
            <li>
              <img src="./Iteration-2-aseets/footer/icons/icon-1.png" alt="Address" />
              <span> </span>
              341 Londonderry Road, İstanbul Türkiye
            </li>
            <li>
              <img src="./Iteration-2-aseets/footer/icons/icon-2.png" alt="Email" />
              <span> </span>
              aciktim@teknolojikyemekler.com
            </li>
            <li>
              <img src="./Iteration-2-aseets/footer/icons/icon-3.png" alt="Phone" />
              <span> </span>
              +90 216 123 45 67
            </li>
          </ul>
        </div>
        <div className="menus">
          <h4>{menuTitle}</h4>
          <ul>
            <li>Terminal Pizza</li>
            <li>5 Kişilik Hackathlon Pizza</li>
            <li>useEffect Tavuklu Pizza</li>
            <li>Beyaz Console Frosty</li>
            <li>Testler Geçti Mutlu Burger</li>
            <li>Position Absolute Acı Burger</li>
          </ul>
        </div>
        <div>
          <h4>Instagram</h4>
          <div className="instagram-container">
            <div><img src="./Iteration-2-aseets/footer/insta/li-0.png" alt="Instagram 1" /></div>
            <div><img src="./Iteration-2-aseets/footer/insta/li-1.png" alt="Instagram 2" /></div>
            <div><img src="./Iteration-2-aseets/footer/insta/li-2.png" alt="Instagram 3" /></div>
            <div><img src="./Iteration-2-aseets/footer/insta/li-3.png" alt="Instagram 4" /></div>
            <div><img src="./Iteration-2-aseets/footer/insta/li-4.png" alt="Instagram 5" /></div>
            <div><img src="./Iteration-2-aseets/footer/insta/li-5.png" alt="Instagram 6" /></div>
          </div>
        </div>
      </div>
      <div className="copyrigt">
        <p>© 2023 Teknolojik Yemekler.</p>
        <FontAwesomeIcon icon={faTwitter} size="2x" className="twitter-icon" />
      </div>
    </footer>
  );
}