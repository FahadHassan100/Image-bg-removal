'use client'

import ImageUploader from './components/ImageUploader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export function BlockPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <ImageUploader />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Processed Image</h2>
            <div id="processedImageContainer" className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-64 flex items-center justify-center">
              <p className="text-gray-500">Processed image will appear here</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}