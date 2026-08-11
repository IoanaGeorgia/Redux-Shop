import { useState } from "react";
import styles from "../styles/Contact.module.css";
function Contact() {
  const [isContactSent, setContactSend] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    mail: "",
    message: "",
  });

  function submitContact() {
    const errors = {
      name: "",
      email: "",
      message: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message cannot be empty";
      isValid = false;
    }

    setFormErrors(errors);

    if (isValid) {
      setContactSend(true);
      console.log("Form submitted successfully:", formData);
    }
  }

  function refreshContact() {
    setContactSend(false);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  const handleInput = (e) => {
    console.log(e.target.value, e.target.name);
    if (e) {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  return (
    <div className={styles.contactWrapper}>
      <div className={styles.contact}>
        <div className={styles.contactStore}>
          <p className={styles.title}>Contact us</p>
          <p>
            <span>email:</span>
            <a href="mailto:casafashion@hr.com" className={styles.contactLink}>
              casafashion@hr.com
            </a>
          </p>
          <p>
            <span>phone:</span>
            <a href="tel:+13346778343" className={styles.contactLink}>
              (+1)3346 778 343
            </a>
          </p>
          <p>
            <span>address:</span> 9934 London Street, Cairo, Egypt
          </p>
        </div>

        <div className={styles.contactForm}>
          {isContactSent ? (
            <div className={styles.sentContact}>
              <p>Thank you for your message!</p>
              <button
                className={styles.contactButton}
                onClick={() => refreshContact()}
              >
                New message
              </button>
            </div>
          ) : (
            <div className={styles.formArea}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  type="text"
                  maxLength="225"
                  placeholder="John Doe"
                  value={formData.name}
                  name="name"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
                {formErrors.name && (
                  <p className={styles.errorMessage}>{formErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="johnDoe@gmail.com"
                  value={formData.email}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
                {formErrors.email && (
                  <p className={styles.errorMessage}>{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  maxLength="500"
                  placeholder="Type your message here.."
                  value={formData.message}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
                {formErrors.message && (
                  <p className={styles.errorMessage}>{formErrors.message}</p>
                )}
              </div>

              <button
                className={styles.contactButton}
                onClick={() => submitContact()}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
