import React, { useState } from "react";

function ImageUploader() {
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="image-upload-box">

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

      {image && (
        <img
          src={image}
          alt="Preview"
          className="preview-image"
        />
      )}

    </div>
  );
}

export default ImageUploader;