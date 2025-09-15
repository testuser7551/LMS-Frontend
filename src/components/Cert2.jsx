import React, {useRef} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";

const Cert2 = () => {
  const certRef = useRef(null);

  const location = useLocation();

  const { details } = location.state || {};

  if (!details) {
    return <div>No details found!</div>;
  }
  // const details = {
  //   name: "John Doe",
  //   course: "Full Stack Web Development",
  //   organization: "LMS Academy",
  //   day: "11 Sept",
  //   organizer: "Mr. Sharma",
  //   director: "Mr. Singh",
  //   year: "2025"
  // };

  const downloadPDF = async () => {
    const element = certRef.current;
    const canvas = await html2canvas(element, { scale: 2 }); // higher scale = better quality
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "pt", [element.offsetWidth, element.offsetHeight]);
    pdf.addImage(imgData, "PNG", 0, 0, element.offsetWidth, element.offsetHeight);
    pdf.save("certificate.pdf");
  };

  
  return (
    <div className="w-full flex justify-center flex-col items-center mt-16">
      <div ref={certRef} style={{ width: "800px", height: "600px", position: "relative" }}>
        {/* Certificate Background */}
        <img
          src="/assets/certificate/football.jpg" // put your uploaded background image inside /public
          alt="Certificate Background"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Title */}
          <div style={{position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", fontFamily: "Arial, sans-serif"}}>
              <h1 style={{ fontSize: "30px", fontWeight: "bold", margin: 0, color: "#0666bd", whiteSpace: "nowrap", letterSpacing: "3px", }}>CERTIFICATE OF COMPLETION</h1>
          </div>

        {/* Awarded To */}
        <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)", }}>
          <p style={{ fontSize: "20px", margin: 0, textAlign: "center", color: "#0666bd", }}>
            This is to certify that
          </p>
          <h2 style={{ textAlign:"center", marginTop: "12px", fontSize: "22px", color:'#2A3033', fontWeight: 'bold', letterSpacing: "1px", fontStyle: "italic", }}>{details.name}</h2>
        </div>

        {/* Participation Line */}
        <div style={{ position: "absolute", top: "40%", left: "55%", transform: "translateX(-50%)", width: "550px", fontSize: "20px", margin: 0, textAlign: "center",  color: "#0666bd", fontFamily: "Arial, sans-serif", }}>
          Has successfully completed the{" "}
          <span style={{ fontStyle: "italic", color:'#2A3033', fontWeight: 'bold' }}>{details.course}</span> Conducted by{" "}
          <span style={{ fontStyle: "italic", color:'#2A3033', fontWeight: 'bold' }}>{details.organization}</span>
        </div>

        {/* Appreciation Line */}
        <div
          style={{ position: "absolute", top: "55%", left: "58%", transform: "translateX(-50%)", width: "500px", fontSize: "20px", color: "#0666bd", fontFamily: "Arial, sans-serif", }} >
            We commend your dedication, hard work, and commitment throughout this course.
        </div>

        {/* Date Section */}
        <div
          style={{
            position: "absolute",
            bottom: "26%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            textAlign: "center",
            fontSize: "20px",
            color: "#0666bd",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Day of <span style={{ fontStyle: "italic", color:'#2A3033', fontWeight: 'bold' }}>{details.day}</span>{" "}
          Year <span style={{ fontStyle: "italic", color:'#2A3033', fontWeight: 'bold' }}>{details.year}</span>
        </div>

        {/* Organizer */}
        <div
          style={{
            position: "absolute",
            bottom: "13%",
            left: "30%",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            fontSize: "20px",
            color: "#0666bd",
          }}
        >
          <p style={{ marginBottom: "2px" }}>{details.organizer}</p>
          <small style={{ fontStyle: "italic", fontWeight: 'bold', fontSize: "14px" }}>Course Instructor</small>
        </div>

        {/* Coach */}
        <div
          style={{
            position: "absolute",
            bottom: "13%",
            right: "120px",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            fontSize: "20px",
              color: "#0666bd",
          }}
        >
          <p style={{ marginBottom: "2px" }}>{details.director}</p>
          <small style={{ fontStyle: "italic", fontWeight: 'bold', fontSize: "14px" }}>Director / Head</small>
        </div>
      </div>
      {/* Download Buttons */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={downloadPDF}
          style={{ marginRight: "10px", padding: "10px 20px", backgroundColor: "#0666bd", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "bold",}}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Cert2;