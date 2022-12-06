import React from "react";
import OuterNavBar from "./Navbar";
import styles from './Contact.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const Contact = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const [inputs, setInputs] = React.useState({ name: '', email: '', message: '' });
    // const[modal, setModal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
        // if(res){
        //     setModal(true);
        // }
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
                                    placeholder="Name"
                                    title="Your name"
                                    maxLength="50"
                                    required />
                                <input
                                    className={styles.field}
                                    value={inputs.email}
                                    onChange={e => handleInputChange(e)}
                                    type="email" name="email"
                                    placeholder="Email"
                                    title="Your email"
                                    maxLength="50"
                                    required />
                                <textarea
                                    className={`${styles.textareaInput}, ${styles.field}`}
                                    rows={7}
                                    value={inputs.message}
                                    onChange={e => handleInputChange(e)}
                                    type="text" name="message"
                                    placeholder="Type Your Message Here..."
                                    title="Your message"
                                    maxLength="550"
                                    required />
                                <input
                                    className={styles.btn}
                                    type="submit"
                                    value="Send Message" 
                                    onClick={handleOpen}/>
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
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thank You!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            We have received your message and will get back to you soon.
          </Typography>
        </Box>
      </Modal>
        </>
    );
}

export default Contact;
