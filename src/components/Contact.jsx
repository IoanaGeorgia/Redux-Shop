
import { useState } from "react";
import styles from "../styles/Contact.module.css";
import { memo } from "react";
function Contact(){


  const [isContactSent, setContactSend] = useState(false)

  function submitContact(){
    setContactSend(true)
  }

  function refreshContact(){
    setContactSend(false)
  }

    return (
      <div className={styles.contactWrapper}>
        <p>Contact us</p>
        <div className={styles.contact}>
          <div className={styles.contactStore}>
            <p>
              <span>email:</span> casafashion@hr.com
            </p>
            <p>
              <span>phone:</span> (+1)3346 778 343
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
                <span>
                  <p>Name:</p>
                  <input
                    type="text"
                    maxLength="225"
                    placeholder="John Doe"
                  ></input>
                </span>
                <span>
                  <p>Email:</p>
                  <input type="email" placeholder="johnDoe@gmail.com"></input>
                </span>

                <span>
                  <p>Message:</p>
                  <textarea
                    maxLength="500"
                    placeholder="Type your message here.."
                  ></textarea>
                </span>
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


export default memo(Contact);