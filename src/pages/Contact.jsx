import { useRef } from "react";
import { useBackgroundPaths } from "../components/BackgroundPaths";
import "../styles/Contact.css";

export default function Contact() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const svgRef2 = useRef(null);
  const itemRefs = useRef([null]);

  useBackgroundPaths({
    svgRef,
    svgRef2,
    sectionRef,
    itemRefs,
    projects: [{}],
    verticalStartOffset: 112,
    verticalStartOffset2: 158,
    finalVerticalOffset: 10,
  });

  return (
    <div className="page cta-section" ref={sectionRef}>
      <svg
        ref={svgRef}
        className="line-background"
        preserveAspectRatio="none"
      />
      <svg
        ref={svgRef2}
        className="line-background-accent"
        preserveAspectRatio="none"
      />

      <div className="contact-wrapper" ref={(el) => (itemRefs.current[0] = el)}>
        <div className="contact-content">
          {/* <h2 className="contact-heading">Ready to take your project to the next level?</h2>
        <p>Let's work together to build something amazing. Reach out today!</p> */}
          <p>
            Have a project in mind or just want to say hi? Fill out the form
            below and I’ll get back to you soon!
          </p>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="contact-form"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="redirect" value="/thank-you" />
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>
            <p>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />
            </p>
            <p>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                rows="4"
                required
              ></textarea>
            </p>
            <p>
              <button type="submit" className="cta-btn">
                Send Message
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
