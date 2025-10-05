import { useState } from "react";

const EmailFormModal  = ({selections, handleReset, pngBlob, onEmailSuccess }:{selections: Record<string, string[]>, handleReset: ()=>void, pngBlob: Blob | null, onEmailSuccess: (email: string, imageId: string, imageUrl: string) => void}) => {
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone,setPhone] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', { name, company, email, selections });
    
    // Convert PNG blob to base64 for sending
    let pngBase64 = null;
    if (pngBlob) {
      pngBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(pngBlob);
      });
    }

    const formData = {
        username: name,
        companyname: company,
        email,
        selections,
        phone,
        pngData: pngBase64
    };

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
    
        console.log('Response:', response);
        if (response.ok) {
            const result = await response.json();
            console.log('Email result:', result);
            if (result.success && result.data.imageId) {
                // Show thank you page even if imageUrl is null (upload failed)
                onEmailSuccess(email, result.data.imageId, result.data.imageUrl || '');
            } else {
                alert('Email sent successfully!');
                setName('');
                setCompany('');
                setEmail('');
                handleReset();
            }
        } else {
            alert('Failed to send email. Please try again.');
            console.log('Failed response:', await response.text());
        }
    } catch (error) {
        console.error('Error sending email:', error);
        alert('An error occurred while sending the email. Please try again later.');
    } 
  };

  const inputClass = "w-full p-4 bg-[#232228] border-none rounded-lg text-white text-lg placeholder-gray-500 focus:outline-none";
  const labelClass = "text-white font-bold text-base uppercase mb-1";
 
  return (
       <div className="mx-auto"> 
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* First Row: Name and Company */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className={labelClass}>
              Your Name<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="company" className={labelClass}>
              Company/Organization Name<span className="text-red-500">*</span>
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Second Row: Mobile and Email */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className={labelClass}>
              Mobile Number<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 bg-[#232228] rounded-lg border-none">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 225 150'%3E%3Crect fill='%23FF9933' width='225' height='50'/%3E%3Crect fill='%23fff' y='50' width='225' height='50'/%3E%3Crect fill='%23138808' y='100' width='225' height='50'/%3E%3Ccircle fill='%23000080' cx='112.5' cy='75' r='20'/%3E%3Ccircle fill='%23fff' cx='112.5' cy='75' r='17.5'/%3E%3Ccircle fill='%23000080' cx='112.5' cy='75' r='3.5'/%3E%3C/svg%3E" alt="IN" className="w-6 h-4" />
                <span className="text-white text-sm">▼</span>
              </div>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={labelClass}>
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full max-w-[400px] mx-auto py-4 px-6 mt-4 bg-[#27A689] text-white font-bold text-lg uppercase rounded-lg hover:opacity-90 transition-opacity"
        >
          Email Architecture
        </button>
      </form>
    </div>
  );
};

export default EmailFormModal;