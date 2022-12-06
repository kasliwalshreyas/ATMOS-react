import React from "react";
import OuterNavBar from "./Navbar";
import styles from './Contact.module.css';


const Contact = () => {
    const [inputs, setInputs] = React.useState({ name: '', email: '', message: '' });

    const handleInputChange = (e) => {
        e.persist();
        setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
    }

    const sendMessage = (e) => {
        if (e) e.preventDefault();
        const message = inputs.message;
        const messageEnter = message.replace(/\r\n|\r|\n/g, "%0D%0A").replace(' ', "%20");
        const res = fetch("http://localhost:8000/contactList/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inputs.name,
                email: inputs.email,
                message: messageEnter
            })
        });
        console.log(res);
        setInputs({ name: '', email: '', message: '' });
    
        // const request = "mailto:YOUREMAIL?subject=Email%20from%20"
        //     + inputs.name + "/"
        //     + inputs.email + "&body="
        //     + messageEnter;
        // document.location = request;

        // console.log(request, message);
    }
    return (
        <>
            <OuterNavBar />
            <div className={styles.contactUsMainView}>
                <div className={styles.contactMainView}>
                    <div className={styles.contactInfo}>
                        <div className={styles.contactInfoHead}>
                            <h1>
                                Get a Quote
                            </h1>
                            <p className={styles.para2}> Fill Up the form and our team will get back to you within 24 hours</p>

                        </div>
                        <div className={styles.contactInfoBody}>
                            <div className={styles.contactNumberDiv}>
                                <img className={styles.phoneicon} src="https://img.icons8.com/glyph-neue/64/000000/phone.png" />

                                <div>
                                    <p className={styles.para}>1234567890</p>
                                </div>
                            </div>
                            <div className={styles.contactNumberDiv}>
                                <img className={styles.mailicon} src="https://img.icons8.com/material-rounded/48/000000/marked-mail.png" />

                                <div>
                                    <p className={styles.para}>contactatmos@atmos.in</p>
                                </div>
                            </div>
                            <div className={styles.contactNumberDiv}>
                                <img className={styles.locationicon} src="https://img.icons8.com/glyph-neue/64/000000/user-location.png" />

                                <div>
                                    <p className={styles.para}>IIIT Sri City</p>
                                </div>


                            </div>
                        </div>
                        <div className={styles.contactInfoFoot}>
                            <img className={styles.contactSocialMediaImage} src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" />
                            <img className={styles.contactSocialMediaImage} src="https://img.icons8.com/ios-filled/50/000000/instagram-new--v1.png" />
                            <img className={styles.contactSocialMediaImage} src="https://img.icons8.com/sf-ultralight-filled/75/000000/twitter.png" />
                        </div>

                    </div>
                    <div className={styles.contactForm}>
                        <div className={styles.contactFormDiv}>
                            <form
                                onSubmit={e => sendMessage(e)}
                                className="contact__form">
                                <input
                                    className={styles.field}
                                    value={inputs.name}
                                    onChange={e => handleInputChange(e)}
                                    type="text" name="name"
                                    placeholder="name"
                                    title="Your name"
                                    maxLength="50"
                                    required />
                                <input
                                    className={styles.field}
                                    value={inputs.email}
                                    onChange={e => handleInputChange(e)}
                                    type="email" name="email"
                                    placeholder="email"
                                    title="Your email"
                                    maxLength="50"
                                    required />
                                <textarea
                                    className={`${styles.textareaInput}, ${styles.field}`}
                                    rows={7}
                                    value={inputs.message}
                                    onChange={e => handleInputChange(e)}
                                    type="text" name="message"
                                    placeholder="message"
                                    title="Your message"
                                    maxLength="550"
                                    required />
                                <input
                                    className={styles.btn}
                                    type="submit"
                                    value="send message" />
                            </form>
                            {/* <h2>Contact Us</h2>
                            <input type="text" className={styles.field} placeholder="Your Name" />
                            <input type="text" className={styles.field} placeholder="Your Email" />
                            <input type="text" className={styles.field} placeholder="Phone" />
                            <textarea className={styles.textareaInput} placeholder="Message" ></textarea>
                            <button className={styles.btn}>Send</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
