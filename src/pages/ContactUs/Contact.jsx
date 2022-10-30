import React from "react";
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
        const request = "mailto:YOUREMAIL?subject=Email%20from%20"
            + inputs.name + "/"
            + inputs.email + "&body="
            + messageEnter;
        document.location = request;
    }
    return (
        <div className={styles.contactMainView}>
            <div className={styles.contactInfo}>
                <div className={styles.contactInfoHead}>
                    <h1>
                        Get a Quote
                    </h1>
                    <p className={styles.para}> Fill Up the form and our team will get back to you within 24 hours</p>

                </div>
                <div className={styles.contactInfoBody}>
                    <div className={styles.contactNumberDiv}>
                    <img className={styles.phoneicon} src="https://img.icons8.com/color/48/000000/phone.png" />
                    <p className={styles.para}>1234567890</p>
                    </div>
                    <div className={styles.contactNumberDiv}>
                        <img className={styles.mailicon} src="https://img.icons8.com/color/48/000000/filled-message.png" />
                        <p className={styles.para}>contactatmos@atmos.in</p>
                    </div>
                    <div className={styles.contactNumberDiv}>
                        <img className={styles.locationicon} src="https://img.icons8.com/doodle/48/000000/user-location.png" />
                        <p className={styles.para}>IIIT Sri City</p>


                    </div>
                </div>
                <div className={styles.contactInfoFoot}>
                    <img className={styles.contactSocialMediaImage} src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" />
                    <img className={styles.contactSocialMediaImage} src="https://img.icons8.com/fluency/48/000000/instagram-new.png" />


                    <img className={styles.contactSocialMediaImage} src="https://img.icons8.com/fluency/48/000000/twitter.png" />



                </div>

            </div>
            <div className={styles.contactForm}>

                <form
                    onSubmit={e => sendMessage(e)}
                    className="contact__form">
                    <input
                        value={inputs.name}
                        onChange={e => handleInputChange(e)}
                        type="text" name="name"
                        placeholder="name"
                        title="Your name"
                        maxLength="50"
                        required />
                    <input
                        value={inputs.email}
                        onChange={e => handleInputChange(e)}
                        type="email" name="email"
                        placeholder="email"
                        title="Your email"
                        maxLength="50"
                        required />
                    <textarea
                        value={inputs.message}
                        onChange={e => handleInputChange(e)}
                        type="text" name="message"
                        placeholder="message"
                        title="Your message"
                        maxLength="550"
                        required />
                    <input
                        type="submit"
                        value="send message" />
                </form>

            </div>
        </div>
    );
}

export default Contact;
