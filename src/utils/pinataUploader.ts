import axios from "axios";

const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY!;
const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY!;

export const uploadToPinata = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: "memeagent",
    keyvalues: {
      uploadedBy: "memefrontend",
    },
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 1,
  });
  formData.append("pinataOptions", options);

  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      }
    );
    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading file to Pinata:", error);
    throw new Error("Failed to upload image");
  }
};
