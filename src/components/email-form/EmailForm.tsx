import { useState } from "react";

const EmailFormModal  = ({selections, handleReset, screenshotBlob, setScreenshotBlob }:{selections: Record<string, string[]>, handleReset: ()=>void, screenshotBlob: Blob | null, setScreenshotBlob: (blob: Blob | null) => void}) => {
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [email, setEmail] = useState<string>('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  console.log('Form Submitted:', { name, company, email, selections });
  
  // Create FormData object
  const formData = new FormData();
  formData.append('username', name);
  formData.append('companyname', company);
  formData.append('email', email);
  formData.append('selections', JSON.stringify(selections));
  
  // Append the screenshot blob if it exists
  if (screenshotBlob) {
    formData.append('screenshot', screenshotBlob, 'architecture.png');
    console.log('Screenshot blob added to FormData');
  } else {
    console.warn('No screenshot blob available');
  }

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: formData,
      // Don't set Content-Type - browser will set it automatically with boundary
    });

    console.log('Response status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('Success:', result);
      alert('Email sent successfully!');
      
      // Reset form
      setName('');
      setCompany('');
      setEmail('');
      setScreenshotBlob(null);
      handleReset();
    } else {
      const errorText = await response.text();
      console.error('Failed response:', errorText);
      alert('Failed to send email. Please try again.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    alert('An error occurred while sending the email. Please try again later.');
  }
};

  const inputClass = "w-full p-4 bg-[#232228] border-none rounded-lg text-white text-lg placeholder-gray-500 focus:outline-none";
  const labelClass = "text-white font-bold text-base uppercase mb-1";
 
  return (
    <div className="flex flex-col gap-8"> 
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Your Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>Your Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        {/* Company/Organization Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className={labelClass}>Company/Organization Name</label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
          />
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 mt-4 bg-[#27A689] text-white font-bold text-lg uppercase rounded-lg hover:opacity-90 transition-opacity"
          onClick={handleSubmit}
        >
          Email Architecture
        </button>
      </form>
    </div>
  );
};

export default EmailFormModal;