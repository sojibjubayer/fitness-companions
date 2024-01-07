

const Footer = () => {


  return (
    <footer className="footer p-10 bg-teal-400  text-black">
  <nav>
    <header className="footer-title">Services</header> 
    <a className="link link-hover">Local Fitness </a>
    <a className="link link-hover">Fitness Product</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav> 
  <nav>
    <header className="footer-title">Company</header> 
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    
  </nav> 
  <nav>
    <header className="footer-title">Legal</header> 
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>

  </nav>
</footer>
  );
};

export default Footer;
