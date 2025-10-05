"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface ThankYouPageProps {
  email: string;
  imageId: string;
  imageUrl: string;
  onBackToArchitecture: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ 
  email, 
  imageId, 
  imageUrl,
  onBackToArchitecture 
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    // Generate QR code that links directly to the Supabase Storage image
    if (imageUrl) {
      QRCode.toDataURL(imageUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#27A689',
          light: '#FFFFFF'
        }
      })
      .then((url) => {
        setQrCodeUrl(url);
      })
      .catch((err) => {
        console.error('Error generating QR code:', err);
      });
    } else {
      // Fallback: generate QR code for the API endpoint
      const fallbackUrl = `${window.location.origin}/api/image/${imageId}`;
      QRCode.toDataURL(fallbackUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#27A689',
          light: '#FFFFFF'
        }
      })
      .then((url) => {
        setQrCodeUrl(url);
      })
      .catch((err) => {
        console.error('Error generating QR code:', err);
      });
    }
  }, [imageUrl, imageId]);

  return (
    <div className=" fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-[#232228] rounded-lg p-8 max-w-[50vw] w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onBackToArchitecture}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>

        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#27A689] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#27A689] mb-2">EMAIL SENT SUCCESSFULLY</h2>
        </div>

        {/* Message */}
        <div className="text-center mb-6">
          <p className="text-white text-lg mb-4">
            A PNG containing all the selected details has been emailed to{" "}
            <span className="text-[#27A689] font-semibold">{email}</span>
          </p>
          
          {/* QR Code Section */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <p className="text-gray-700 text-sm mb-3 font-medium">
              Scan this QR code to view your architecture:
            </p>
            {qrCodeUrl && (
              <div className="flex justify-center">
                <img src={qrCodeUrl} alt="QR Code" className="w-100 h-100" />
              </div>
            )}
            <p className="text-gray-500 text-xs mt-2">
              Or visit: <span className="font-mono text-xs break-all">
                {imageUrl || `${window.location.origin}/api/image/${imageId}`}
              </span>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onBackToArchitecture}
            className="bg-[#27A689] hover:bg-[#1e8a6b] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
          >
            BUILD YOUR OWN ARCHITECTURE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
