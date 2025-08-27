import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Upload, ImageIcon, X, Plus, Check, AlertCircle } from 'lucide-react';
import { doc, updateDoc, arrayUnion, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '@/config/firebaseConfig';

const ImageUploader = ({ tourId, currentImages = [], onImagesUpdated }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [documentExists, setDocumentExists] = useState(null);
  const [actualDocId, setActualDocId] = useState(null);
  const fileInputRef = useRef(null);

  // Check if document exists on component mount by querying the id field
  React.useEffect(() => {
    const checkDocumentExists = async () => {
      if (!tourId) {
        setError('Tour ID is required');
        return;
      }

      try {
        const q = query(collection(firestore, 'TP_Programs'), where('id', '==', tourId));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setDocumentExists(false);
          setError(`Tour with ID "${tourId}" does not exist. Please verify the tour ID.`);
        } else {
          setDocumentExists(true);
          // Get the actual document ID (not the id field)
          const docData = querySnapshot.docs[0];
          setActualDocId(docData.id);
          console.log('Found tour document:', docData.id, 'with id field:', tourId);
        }
      } catch (err) {
        console.error('Error checking document:', err);
        setError('Failed to verify tour document. Please check your connection.');
      }
    };

    checkDocumentExists();
  }, [tourId]);

  const handleFileSelection = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    // Filter for image files only
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      setError('Please select only image files (JPG, PNG, GIF, etc.)');
      return;
    }

    setSelectedFiles(imageFiles);
    setError(null);

    // Create preview URLs
    const previews = imageFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const removeSelectedImage = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    
    // Revoke the removed URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one image to upload');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(new Array(selectedFiles.length).fill(0));

    try {
      const uploadPromises = selectedFiles.map(async (file, index) => {
        // Create a unique filename
        const timestamp = Date.now();
        const fileName = `${file.name.split('.')[0]}_${timestamp}.${file.name.split('.').pop()}`;
        const storageRef = ref(storage, `products/${tourId}/${fileName}`);

        // Upload file
        const uploadResult = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(uploadResult.ref);

        // Update progress
        setUploadProgress(prev => {
          const newProgress = [...prev];
          newProgress[index] = 100;
          return newProgress;
        });

        return {
          downloadURL,
          name: file.name,
          ref: `products/${tourId}/${fileName}`,
          type: file.type,
          lastModifiedTS: timestamp
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);

      // Check if we have the actual document ID and document exists
      if (!actualDocId || !documentExists) {
        throw new Error(`Tour document with ID "${tourId}" was not found or is not accessible.`);
      }

      // Update Firestore document using the actual document ID (not the id field)
      const tourRef = doc(firestore, 'TP_Programs', actualDocId);
      await updateDoc(tourRef, {
        image: arrayUnion(...uploadedImages)
      });

      setSuccess(true);
      setSelectedFiles([]);
      setPreviewUrls([]);
      
      // Clean up preview URLs
      previewUrls.forEach(url => URL.revokeObjectURL(url));

      // Call callback if provided
      if (onImagesUpdated) {
        onImagesUpdated([...currentImages, ...uploadedImages]);
      }

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);

    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress([]);
    }
  };

  return (
    <section className="">
      <div className="">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-start mb-3"
        >
         <h2 className="text-2xl font-bold mt-2">Share Your Tour Experience</h2>
<p className="text-gray-600 mt-4 max-w-2xl">
  Upload photos from your trip to capture and share your experience. 
  Your images help others see what the adventure is really like through your eyes.
</p>

          
          {/* Document Status */}
          {/* <div className="mt-4 flex justify-center">
            {documentExists === null ? (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                <span>Verifying tour document...</span>
              </div>
            ) : documentExists ? (
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-4 h-4" />
                <span>Tour ID: {tourId} ✓</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span>Tour ID: {tourId} ✗</span>
              </div>
            )}
          </div> */}
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            {/* File Input Area */}
            <div 
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors duration-300 ${
                selectedFiles.length > 0 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-300 bg-gray-50 hover:border-primary-orange hover:bg-orange-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelection}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
              />
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  {selectedFiles.length > 0 ? (
                    <Check className="w-12 h-12 text-green-600" />
                  ) : (
                    <Upload className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {selectedFiles.length > 0 
                      ? `${selectedFiles.length} image${selectedFiles.length > 1 ? 's' : ''} selected`
                      : 'Choose images to upload'
                    }
                  </h3>
                  <p className="text-gray-600">
                    Drag and drop images here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports JPG, PNG, GIF files up to 10MB each
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Images Preview */}
            {selectedFiles.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-medium mb-4 text-gray-800">Selected Images</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-purple-600 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={url}
                          alt={selectedFiles[index].name}
                          className="w-full h-32 object-cover"
                        />
                        <button
                          onClick={() => removeSelectedImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                          disabled={uploading}
                        >
                          <X className="w-4 h-4" />
                        </button>
                        
                        {/* Progress bar during upload */}
                        {uploading && uploadProgress[index] !== undefined && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gray-200 h-1">
                            <div 
                              className="bg-green-500 h-1 transition-all duration-300"
                              style={{ width: `${uploadProgress[index]}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-2 truncate">
                        {selectedFiles[index].name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
              >
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-700">Images uploaded successfully!</p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 justify-center">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="px-6 py-3 border-2 border-gray-300 hover:border-primary-orange hover:text-primary-orange transition-colors duration-300"
                disabled={uploading}
              >
                <Plus className="w-5 h-5 mr-2" />
                Select More Images
              </Button>
              
              <Button
                onClick={uploadImages}
                disabled={selectedFiles.length === 0 || uploading || !documentExists || !actualDocId}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Upload Images
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

       
      </div>
    </section>
  );
};

export default ImageUploader;