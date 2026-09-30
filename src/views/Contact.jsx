import { useState, useRef } from "react";
import styles from "../styles/Contact.module.css";
import { api } from "../services/apiService";
import Loading from "../components/Loading";

function Contact() {
  const [isContactSent, setContactSend] = useState(false);
  const [isLoading, setIsLoading ] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
    call: ""
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  async function submitContact() {

    const nameVal = nameRef.current.value;
    const emailVal = emailRef.current.value;
    const messageVal = messageRef.current.value;

    const errors = {
      name: "",
      email: "",
      message: "",
      call: ""
    };

    let isValid = true;

    if (!nameVal.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!messageVal.trim()) {
      errors.message = "Message cannot be empty";
      isValid = false;
    }

    setFormErrors(errors);

    if (isValid) {
      const payload = {
        name: nameVal,
        email: emailVal,
        message: messageVal
      };

      try {
        setIsLoading(true)
        const response = await api.post(`/api/contact`, payload);
        const computedData = response.data || response;

        if (computedData) {
          setContactSend(true);
          console.log("Form submitted successfully:", payload);
        }

        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        setFormErrors((prev) => ({
          ...prev,
          call: "An error has occurred, please try again later"
        }));

      }
    }
  }

  function refreshContact() {
    setContactSend(false);
    setFormErrors({
      name: "",
      email: "",
      message: "",
      call: ""
    });
  }

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
                onClick={refreshContact}
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
                  ref={nameRef}
                  type="text"
                  maxLength="225"
                  placeholder="John Doe"
                  name="name"
                />
                {formErrors.name && (
                  <p className={styles.errorMessage}>{formErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="johnDoe@gmail.com"
                />
                {formErrors.email && (
                  <p className={styles.errorMessage}>{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  ref={messageRef}
                  name="message"
                  maxLength="500"
                  placeholder="Type your message here.."
                />
                {formErrors.message && (
                  <p className={styles.errorMessage}>{formErrors.message}</p>
                )}
              </div>

              {formErrors.call && (
                <p className={styles.errorMessage}>{formErrors.call}</p>
              )}

              <button
                className={styles.contactButton}
                onClick={submitContact}
              >
                Submit
              </button>

              {isLoading && <Loading size='sm' />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;