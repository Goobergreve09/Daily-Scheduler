const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_unsigned_upload_preset"); // Replace with your preset
  
    try {
      const response = await fetch("cloudinary://462931233534185:sRLerEqihcDKIB9q7tQSn2hvSuo@dokhvz05z", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      return data.secure_url; // This is the hosted image URL
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  };